const prisma = require("../utils/prisma");
const { success, error } = require("../utils/response");
const { getIO } = require("../socket");

const STAGE_PROBABILITY = {
  PROSPECT: 10,
  PROPOSAL_SENT: 30,
  NEGOTIATION: 60,
  CLOSED_WON: 100,
  CLOSED_LOST: 0,
};

async function getDeals(req, res) {
  const { stage, leadId, includeArchived, page = 1, limit = 50 } = req.query;

  const where = {
    teamId: req.user.teamId,
    deletedAt: null,
    ...(stage && { stage }),
    ...(leadId && { leadId }),
    ...(!includeArchived && {
      stage: { notIn: ["CLOSED_WON", "CLOSED_LOST"] },
    }),
  };

  const deals = await prisma.deal.findMany({
    where,
    include: {
      lead: { select: { id: true, name: true, email: true, company: true } },
    },
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * limit,
    take: Number(limit),
  });

  const pipeline = {
    PROSPECT: [],
    PROPOSAL_SENT: [],
    NEGOTIATION: [],
    CLOSED_WON: [],
    CLOSED_LOST: [],
  };

  deals.forEach((deal) => {
    if (pipeline[deal.stage]) pipeline[deal.stage].push(deal);
  });

  const stageTotals = {};
  Object.keys(pipeline).forEach((stage) => {
    stageTotals[stage] = pipeline[stage].reduce(
      (sum, d) => sum + Number(d.value),
      0
    );
  });

  return success(res, { pipeline, stageTotals, total: deals.length });
}

async function getDeal(req, res) {
  const deal = await prisma.deal.findFirst({
    where: { id: req.params.id, teamId: req.user.teamId, deletedAt: null },
    include: {
      lead: { select: { id: true, name: true, email: true, company: true } },
      proposals: true,
      payments: true,
    },
  });

  if (!deal) return error(res, "Deal not found", 404);
  return success(res, deal);
}

async function createDeal(req, res) {
  const { leadId, title, value, expectedClose, notes } = req.body;

  if (!leadId || !title || !value) {
    return error(res, "Lead, title and value are required");
  }

  const lead = await prisma.lead.findFirst({
    where: { id: leadId, teamId: req.user.teamId, deletedAt: null },
  });
  if (!lead) return error(res, "Lead not found", 404);

  const deal = await prisma.deal.create({
    data: {
      teamId: req.user.teamId,
      leadId,
      title,
      value,
      stage: "PROSPECT",
      probability: 10,
      expectedClose: expectedClose ? new Date(expectedClose) : null,
      notes: notes || null,
    },
    include: {
      lead: { select: { id: true, name: true, email: true, company: true } },
    },
  });

  await prisma.lead.update({
    where: { id: leadId },
    data: { status: "QUALIFIED" },
  });

  await prisma.activityLog.create({
    data: {
      teamId: req.user.teamId,
      userId: req.user.id,
      action: "created",
      entity: "deal",
      entityId: deal.id,
      meta: { dealTitle: deal.title, value: deal.value },
    },
  });

  return success(res, deal, 201);
}

async function updateDeal(req, res) {
  const { title, value, expectedClose, notes } = req.body;

  const existing = await prisma.deal.findFirst({
    where: { id: req.params.id, teamId: req.user.teamId, deletedAt: null },
  });
  if (!existing) return error(res, "Deal not found", 404);

  const deal = await prisma.deal.update({
    where: { id: req.params.id },
    data: {
      ...(title && { title }),
      ...(value !== undefined && { value }),
      ...(expectedClose !== undefined && {
        expectedClose: expectedClose ? new Date(expectedClose) : null,
      }),
      ...(notes !== undefined && { notes }),
    },
    include: {
      lead: { select: { id: true, name: true, email: true, company: true } },
    },
  });

  return success(res, deal);
}

async function updateStage(req, res) {
  const { stage, probability } = req.body;

  if (!stage || !STAGE_PROBABILITY.hasOwnProperty(stage)) {
    return error(res, "Invalid stage");
  }

  const existing = await prisma.deal.findFirst({
    where: { id: req.params.id, teamId: req.user.teamId, deletedAt: null },
  });
  if (!existing) return error(res, "Deal not found", 404);

  const deal = await prisma.deal.update({
    where: { id: req.params.id },
    data: {
      stage,
      probability: probability ?? STAGE_PROBABILITY[stage],
    },
    include: {
      lead: { select: { id: true, name: true, email: true, company: true } },
    },
  });

  await prisma.activityLog.create({
    data: {
      teamId: req.user.teamId,
      userId: req.user.id,
      action: "stage_changed",
      entity: "deal",
      entityId: deal.id,
      meta: {
        dealTitle: deal.title,
        from: existing.stage,
        to: stage,
      },
    },
  });

  try {
    getIO().to(req.user.teamId).emit("deal:stage_changed", {
      dealId: deal.id,
      dealTitle: deal.title,
      from: existing.stage,
      to: stage,
      movedBy: req.user.id,
    });
  } catch {}

  return success(res, deal);
}

async function deleteDeal(req, res) {
  const existing = await prisma.deal.findFirst({
    where: { id: req.params.id, teamId: req.user.teamId, deletedAt: null },
  });
  if (!existing) return error(res, "Deal not found", 404);

  await prisma.deal.update({
    where: { id: req.params.id },
    data: { deletedAt: new Date() },
  });

  return success(res, { message: "Deal deleted" });
}

module.exports = { getDeals, getDeal, createDeal, updateDeal, updateStage, deleteDeal };