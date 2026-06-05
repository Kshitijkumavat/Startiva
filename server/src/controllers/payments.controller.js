const prisma = require("../utils/prisma");
const { success, error } = require("../utils/response");

async function getPayments(req, res) {
  const { status, dealId } = req.query;

  const payments = await prisma.payment.findMany({
    where: {
      teamId: req.user.teamId,
      ...(status && { status }),
      ...(dealId && { dealId }),
    },
    include: {
      deal: {
        include: {
          lead: { select: { id: true, name: true, email: true, company: true } },
        },
      },
    },
    orderBy: { dueDate: "asc" },
  });

  const summary = {
    totalPending: 0,
    totalReceived: 0,
    totalOverdue: 0,
  };

  payments.forEach((p) => {
    const amount = Number(p.amount);
    if (p.status === "PENDING") summary.totalPending += amount;
    if (p.status === "RECEIVED") summary.totalReceived += amount;
    if (p.status === "OVERDUE") summary.totalOverdue += amount;
  });

  return success(res, { payments, summary });
}

async function getPayment(req, res) {
  const payment = await prisma.payment.findFirst({
    where: { id: req.params.id, teamId: req.user.teamId },
    include: {
      deal: {
        include: {
          lead: { select: { id: true, name: true, email: true, company: true } },
        },
      },
    },
  });

  if (!payment) return error(res, "Payment not found", 404);
  return success(res, payment);
}

async function createPayment(req, res) {
  const { dealId, amount, dueDate, invoiceNumber, notes } = req.body;

  if (!dealId || !amount || !dueDate) {
    return error(res, "Deal, amount and due date are required");
  }

  const deal = await prisma.deal.findFirst({
    where: { id: dealId, teamId: req.user.teamId, deletedAt: null },
  });
  if (!deal) return error(res, "Deal not found", 404);

  const payment = await prisma.payment.create({
    data: {
      teamId: req.user.teamId,
      dealId,
      amount,
      dueDate: new Date(dueDate),
      status: "PENDING",
      invoiceNumber: invoiceNumber || null,
      notes: notes || null,
    },
    include: {
      deal: {
        include: {
          lead: { select: { id: true, name: true, email: true, company: true } },
        },
      },
    },
  });

  await prisma.activityLog.create({
    data: {
      teamId: req.user.teamId,
      userId: req.user.id,
      action: "created",
      entity: "payment",
      entityId: payment.id,
      meta: { amount: payment.amount, dueDate: payment.dueDate },
    },
  });

  return success(res, payment, 201);
}

async function updateStatus(req, res) {
  const { status } = req.body;

  if (!["PENDING", "RECEIVED", "OVERDUE"].includes(status)) {
    return error(res, "Invalid status");
  }

  const existing = await prisma.payment.findFirst({
    where: { id: req.params.id, teamId: req.user.teamId },
  });
  if (!existing) return error(res, "Payment not found", 404);

  const payment = await prisma.payment.update({
    where: { id: req.params.id },
    data: {
      status,
      ...(status === "RECEIVED" && { paidAt: new Date() }),
      ...(status !== "RECEIVED" && { paidAt: null }),
    },
    include: {
      deal: {
        include: {
          lead: { select: { id: true, name: true, company: true } },
        },
      },
    },
  });

  await prisma.activityLog.create({
    data: {
      teamId: req.user.teamId,
      userId: req.user.id,
      action: "status_changed",
      entity: "payment",
      entityId: payment.id,
      meta: { from: existing.status, to: status },
    },
  });

  return success(res, payment);
}

async function updatePayment(req, res) {
  const { amount, dueDate, invoiceNumber, notes } = req.body;

  const existing = await prisma.payment.findFirst({
    where: { id: req.params.id, teamId: req.user.teamId },
  });
  if (!existing) return error(res, "Payment not found", 404);

  const payment = await prisma.payment.update({
    where: { id: req.params.id },
    data: {
      ...(amount !== undefined && { amount }),
      ...(dueDate && { dueDate: new Date(dueDate) }),
      ...(invoiceNumber !== undefined && { invoiceNumber }),
      ...(notes !== undefined && { notes }),
    },
  });

  return success(res, payment);
}

async function deletePayment(req, res) {
  const existing = await prisma.payment.findFirst({
    where: { id: req.params.id, teamId: req.user.teamId },
  });
  if (!existing) return error(res, "Payment not found", 404);

  await prisma.payment.delete({ where: { id: req.params.id } });
  return success(res, { message: "Payment deleted" });
}

module.exports = { getPayments, getPayment, createPayment, updateStatus, updatePayment, deletePayment };