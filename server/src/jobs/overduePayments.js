const cron = require("node-cron");
const prisma = require("../utils/prisma");

function startOverduePaymentJob() {
  cron.schedule("0 8 * * *", async () => {
    console.log("Running overdue payment check...");

    try {
      const overduePayments = await prisma.payment.findMany({
        where: {
          status: "PENDING",
          dueDate: { lt: new Date() },
        },
        include: {
          deal: {
            include: {
              lead: { select: { name: true, company: true } },
              team: true,
            },
          },
        },
      });

      if (overduePayments.length === 0) {
        console.log("No overdue payments found");
        return;
      }

      for (const payment of overduePayments) {
        await prisma.payment.update({
          where: { id: payment.id },
          data: { status: "OVERDUE" },
        });

        const admins = await prisma.user.findMany({
          where: {
            teamId: payment.teamId,
            role: { in: ["OWNER", "ADMIN"] },
          },
        });

        const message = `Payment of ₹${payment.amount} from ${
          payment.deal.lead.company || payment.deal.lead.name
        } is overdue (due: ${payment.dueDate.toDateString()})`;

        await prisma.notification.createMany({
          data: admins.map((admin) => ({
            userId: admin.id,
            teamId: payment.teamId,
            message,
            type: "payment_overdue",
          })),
        });

        console.log(`Marked payment ${payment.id} as overdue`);
      }

      console.log(`Processed ${overduePayments.length} overdue payment(s)`);
    } catch (err) {
      console.error("Overdue payment job failed:", err.message);
    }
  });

  console.log("Overdue payment cron job scheduled (daily at 8:00 AM)");
}

module.exports = { startOverduePaymentJob };