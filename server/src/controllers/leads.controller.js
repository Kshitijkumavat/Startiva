const prisma = require("../utils/prisma");
const { success, error } = require("../utils/response");
const { getIO } = require("../socket");

async function getLeads(req, res) {
  const { status, source, assignedTo, search, page = 1, limit = 20 } = req.query;

  const where = {
    teamId: req.user.teamId,
    deletedAt: null,
    ...(status && { status }),
    ...(source && { source }),
    ...(assignedTo && { assignedTo }),
    ...(search && {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { company: { contains: search, mode: "insensitive" } },
      ],
    }),
  };

  const [leads, total] = await Promise.all([
    prisma.lead.findMany({
      where,
      include: {
        assignee: { select: { id: true, name: true, email: true } },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: Number(limit),
    }),
    prisma.lead.count({ where }),
  ]);

  return success(res, { leads, total, page: Number(page), limit: Number(limit) });
}

async function getLead(req, res) {
  const lead = await prisma.lead.findFirst({
    where: { id: req.params.id, teamId: req.user.teamId, deletedAt: null },
    include: {
      assignee: { select: { id: true, name: true, email: true } },
      deals: true,
      meetings: true,
    },
  });

  if (!lead) return error(res, "Lead not found", 404);
  return success(res, lead);
}

async function createLead(req, res) {
  const { name, email, company, phone, source, assignedTo, notes } = req.body;

  if (!name || !email || !source) {
    return error(res, "Name, email and source are required");
  }

  const lead = await prisma.lead.create({
    data: {
      teamId: req.user.teamId,
      name, email, company, phone, source,
      assignedTo: assignedTo || null,
      notes: notes || null,
    },
    include: {
      assignee: { select: { id: true, name: true, email: true } },
    },
  });

  await prisma.activityLog.create({
    data: {
      teamId: req.user.teamId,
      userId: req.user.id,
      action: "created",
      entity: "lead",
      entityId: lead.id,
      meta: { leadName: lead.name },
    },
  });

  if (assignedTo && assignedTo !== req.user.id) {
    await prisma.notification.create({
      data: {
        userId: assignedTo,
        teamId: req.user.teamId,
        message: `You have been assigned lead: ${name}`,
        type: "lead_assigned",
      },
    });

    try {
      getIO().to(req.user.teamId).emit("lead:assigned", {
        leadId: lead.id, leadName: name, assignedTo,
      });
    } catch {}
  }

  return success(res, lead, 201);
}

async function updateLead(req, res) {
  const { name, email, company, phone, source, status, assignedTo, notes } = req.body;

  const existing = await prisma.lead.findFirst({
    where: { id: req.params.id, teamId: req.user.teamId, deletedAt: null },
  });
  if (!existing) return error(res, "Lead not found", 404);

  const lead = await prisma.lead.update({
    where: { id: req.params.id },
    data: {
      ...(name && { name }),
      ...(email && { email }),
      ...(company !== undefined && { company }),
      ...(phone !== undefined && { phone }),
      ...(source && { source }),
      ...(status && { status }),
      ...(assignedTo !== undefined && { assignedTo }),
      ...(notes !== undefined && { notes }),
    },
    include: {
      assignee: { select: { id: true, name: true, email: true } },
    },
  });

  await prisma.activityLog.create({
    data: {
      teamId: req.user.teamId,
      userId: req.user.id,
      action: "updated",
      entity: "lead",
      entityId: lead.id,
      meta: { leadName: lead.name },
    },
  });

  return success(res, lead);
}

async function deleteLead(req, res) {
  const existing = await prisma.lead.findFirst({
    where: { id: req.params.id, teamId: req.user.teamId, deletedAt: null },
  });
  if (!existing) return error(res, "Lead not found", 404);

  await prisma.lead.update({
    where: { id: req.params.id },
    data: { deletedAt: new Date() },
  });

  return success(res, { message: "Lead deleted" });
}

async function assignLead(req, res) {
  const { assignedTo } = req.body;

  const member = await prisma.user.findFirst({
    where: { id: assignedTo, teamId: req.user.teamId },
  });
  if (!member) return error(res, "Team member not found", 404);

  const lead = await prisma.lead.update({
    where: { id: req.params.id },
    data: { assignedTo },
  });

  await prisma.notification.create({
    data: {
      userId: assignedTo,
      teamId: req.user.teamId,
      message: `You have been assigned lead: ${lead.name}`,
      type: "lead_assigned",
    },
  });

  try {
    getIO().to(req.user.teamId).emit("lead:assigned", {
      leadId: lead.id, leadName: lead.name, assignedTo,
    });
  } catch {}

  return success(res, lead);
}

module.exports = { getLeads, getLead, createLead, updateLead, deleteLead, assignLead };