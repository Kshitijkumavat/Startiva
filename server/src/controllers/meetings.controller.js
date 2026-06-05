const prisma = require("../utils/prisma");
const { success, error } = require("../utils/response");

async function getMeetings(req, res) {
  const { leadId, upcoming } = req.query;

  const where = {
    teamId: req.user.teamId,
    ...(leadId && { leadId }),
    ...(upcoming === "true" && { scheduledAt: { gte: new Date() } }),
  };

  const meetings = await prisma.meeting.findMany({
    where,
    include: {
      lead: { select: { id: true, name: true, email: true, company: true } },
      creator: { select: { id: true, name: true } },
    },
    orderBy: { scheduledAt: "asc" },
  });

  return success(res, meetings);
}

async function getMeeting(req, res) {
  const meeting = await prisma.meeting.findFirst({
    where: { id: req.params.id, teamId: req.user.teamId },
    include: {
      lead: { select: { id: true, name: true, email: true, company: true } },
      creator: { select: { id: true, name: true } },
    },
  });

  if (!meeting) return error(res, "Meeting not found", 404);
  return success(res, meeting);
}

async function createMeeting(req, res) {
  const { title, leadId, scheduledAt, notes, actionItems } = req.body;

  if (!title || !scheduledAt) {
    return error(res, "Title and scheduled date are required");
  }

  const items = actionItems || [];
  if (!Array.isArray(items)) {
    return error(res, "Action items must be an array");
  }

  const meeting = await prisma.meeting.create({
    data: {
      teamId: req.user.teamId,
      leadId: leadId || null,
      title,
      scheduledAt: new Date(scheduledAt),
      notes: notes || null,
      actionItems: items,
      createdBy: req.user.id,
    },
    include: {
      lead: { select: { id: true, name: true, email: true, company: true } },
      creator: { select: { id: true, name: true } },
    },
  });

  await prisma.activityLog.create({
    data: {
      teamId: req.user.teamId,
      userId: req.user.id,
      action: "created",
      entity: "meeting",
      entityId: meeting.id,
      meta: { meetingTitle: meeting.title },
    },
  });

  return success(res, meeting, 201);
}

async function updateMeeting(req, res) {
  const { title, scheduledAt, notes, actionItems } = req.body;

  const existing = await prisma.meeting.findFirst({
    where: { id: req.params.id, teamId: req.user.teamId },
  });
  if (!existing) return error(res, "Meeting not found", 404);

  const meeting = await prisma.meeting.update({
    where: { id: req.params.id },
    data: {
      ...(title && { title }),
      ...(scheduledAt && { scheduledAt: new Date(scheduledAt) }),
      ...(notes !== undefined && { notes }),
      ...(actionItems !== undefined && { actionItems }),
    },
    include: {
      lead: { select: { id: true, name: true, email: true, company: true } },
      creator: { select: { id: true, name: true } },
    },
  });

  return success(res, meeting);
}

async function toggleActionItem(req, res) {
  const { index } = req.body;

  const meeting = await prisma.meeting.findFirst({
    where: { id: req.params.id, teamId: req.user.teamId },
  });
  if (!meeting) return error(res, "Meeting not found", 404);

  const items = [...meeting.actionItems];
  if (index === undefined || !items[index]) {
    return error(res, "Invalid action item index");
  }

  items[index].done = !items[index].done;

  const updated = await prisma.meeting.update({
    where: { id: req.params.id },
    data: { actionItems: items },
  });

  return success(res, updated);
}

async function deleteMeeting(req, res) {
  const existing = await prisma.meeting.findFirst({
    where: { id: req.params.id, teamId: req.user.teamId },
  });
  if (!existing) return error(res, "Meeting not found", 404);

  await prisma.meeting.delete({ where: { id: req.params.id } });
  return success(res, { message: "Meeting deleted" });
}

module.exports = { getMeetings, getMeeting, createMeeting, updateMeeting, toggleActionItem, deleteMeeting };