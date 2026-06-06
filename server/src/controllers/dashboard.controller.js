const prisma = require("../utils/prisma");
const { success } = require("../utils/response");

async function getDashboard(req, res) {
  const teamId = req.user.teamId;
  const now = new Date();

  const [
    leadCounts,
    deals,
    overduePayments,
    upcomingMeetings,
    recentActivity,
  ] = await Promise.all([
    prisma.lead.groupBy({
      by: ["status"],
      where: { teamId, deletedAt: null },
      _count: true,
    }),

    prisma.deal.findMany({
      where: { teamId, deletedAt: null },
      select: { stage: true, value: true },
    }),

    prisma.payment.findMany({
      where: { teamId, status: "OVERDUE" },
      select: { amount: true },
    }),

    prisma.meeting.findMany({
      where: { teamId, scheduledAt: { gte: now } },
      include: {
        lead: { select: { name: true, company: true } },
      },
      orderBy: { scheduledAt: "asc" },
      take: 5,
    }),

    prisma.activityLog.findMany({
      where: { teamId },
      include: {
        user: { select: { name: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
  ]);

  const leadSummary = { NEW: 0, CONTACTED: 0, QUALIFIED: 0, LOST: 0 };
  leadCounts.forEach((l) => { leadSummary[l.status] = l._count; });

  const pipelineValue = {};
  deals.forEach((d) => {
    pipelineValue[d.stage] = (pipelineValue[d.stage] || 0) + Number(d.value);
  });

  const won = deals.filter((d) => d.stage === "CLOSED_WON").length;
  const lost = deals.filter((d) => d.stage === "CLOSED_LOST").length;
  const winRate = won + lost > 0 ? Math.round((won / (won + lost)) * 100) : 0;

  const overdueTotal = overduePayments.reduce((sum, p) => sum + Number(p.amount), 0);

  return success(res, {
    leads: leadSummary,
    pipeline: pipelineValue,
    winRate,
    overduePayments: {
      count: overduePayments.length,
      total: overdueTotal,
    },
    upcomingMeetings,
    recentActivity,
  });
}

module.exports = { getDashboard };