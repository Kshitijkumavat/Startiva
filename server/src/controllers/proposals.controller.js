const prisma = require("../utils/prisma");
const { success, error } = require("../utils/response");
const { sendInviteEmail } = require("../utils/email");
const nodemailer = require("nodemailer");

async function getProposals(req, res) {
  const { status, dealId } = req.query;

  const proposals = await prisma.proposal.findMany({
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
    orderBy: { createdAt: "desc" },
  });

  return success(res, proposals);
}

async function getProposal(req, res) {
  const proposal = await prisma.proposal.findFirst({
    where: { id: req.params.id, teamId: req.user.teamId },
    include: {
      deal: {
        include: {
          lead: { select: { id: true, name: true, email: true, company: true } },
        },
      },
    },
  });

  if (!proposal) return error(res, "Proposal not found", 404);
  return success(res, proposal);
}

async function createProposal(req, res) {
  const { dealId, title, content } = req.body;

  if (!dealId || !title || !content) {
    return error(res, "Deal, title and content are required");
  }

  const deal = await prisma.deal.findFirst({
    where: { id: dealId, teamId: req.user.teamId, deletedAt: null },
  });
  if (!deal) return error(res, "Deal not found", 404);

  const proposal = await prisma.proposal.create({
    data: {
      teamId: req.user.teamId,
      dealId,
      title,
      content,
      status: "DRAFT",
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
      entity: "proposal",
      entityId: proposal.id,
      meta: { proposalTitle: proposal.title },
    },
  });

  return success(res, proposal, 201);
}

async function updateProposal(req, res) {
  const { title, content, status } = req.body;

  const existing = await prisma.proposal.findFirst({
    where: { id: req.params.id, teamId: req.user.teamId },
  });
  if (!existing) return error(res, "Proposal not found", 404);
  if (existing.status === "SENT") {
    return error(res, "Cannot edit a proposal that has already been sent");
  }

  const proposal = await prisma.proposal.update({
    where: { id: req.params.id },
    data: {
      ...(title && { title }),
      ...(content && { content }),
      ...(status && { status }),
    },
  });

  return success(res, proposal);
}

async function aiDraft(req, res) {
  const { dealId } = req.body;

  if (!process.env.GROQ_API_KEY) {
    return error(res, "AI drafting not configured", 503);
  }

  const deal = await prisma.deal.findFirst({
    where: { id: dealId, teamId: req.user.teamId, deletedAt: null },
    include: { lead: true, team: true },
  });
  if (!deal) return error(res, "Deal not found", 404);

  const Groq = require("groq-sdk");
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  const prompt = `You are a professional proposal writer for a student startup called "${deal.team.startupName}".

Write a professional client proposal for the following deal:
- Client: ${deal.lead.name} from ${deal.lead.company || "their company"}
- Project: ${deal.title}
- Value: ₹${deal.value}
- Notes: ${deal.notes || "No additional notes"}

Write the proposal in this exact structure:
1. Executive Summary (2-3 sentences)
2. Scope of Work (3-5 bullet points)
3. Deliverables (3-5 specific outputs)
4. Timeline (estimated weeks per phase)
5. Pricing Breakdown (line items summing to the deal value)
6. Next Steps (2-3 action items)

Keep it concise, professional, and convincing. Format it cleanly.`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    max_tokens: 1500,
    messages: [{ role: "user", content: prompt }],
  });

  const draft = completion.choices[0].message.content;
  return success(res, { draft });
}

async function sendProposal(req, res) {
  const proposal = await prisma.proposal.findFirst({
    where: { id: req.params.id, teamId: req.user.teamId },
    include: {
      deal: {
        include: {
          lead: true,
          team: true,
        },
      },
    },
  });

  if (!proposal) return error(res, "Proposal not found", 404);
  if (proposal.status === "SENT") return error(res, "Proposal already sent");

  if (!process.env.SMTP_USER) {
    const updated = await prisma.proposal.update({
      where: { id: req.params.id },
      data: { status: "SENT", sentAt: new Date() },
    });
    return success(res, { message: "Proposal marked as sent (no SMTP configured)", proposal: updated });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  await transporter.sendMail({
    from: `"${proposal.deal.team.startupName}" <${process.env.SMTP_USER}>`,
    to: proposal.deal.lead.email,
    subject: `Proposal: ${proposal.title}`,
    html: `
      <h2>${proposal.title}</h2>
      <p>Dear ${proposal.deal.lead.name},</p>
      <div style="white-space: pre-wrap; font-family: Arial; line-height: 1.6;">
        ${proposal.content}
      </div>
      <br/>
      <p>Best regards,<br/>${proposal.deal.team.startupName}</p>
    `,
  });

  const updated = await prisma.proposal.update({
    where: { id: req.params.id },
    data: { status: "SENT", sentAt: new Date() },
  });

  await prisma.activityLog.create({
    data: {
      teamId: req.user.teamId,
      userId: req.user.id,
      action: "sent",
      entity: "proposal",
      entityId: proposal.id,
      meta: { to: proposal.deal.lead.email },
    },
  });

  return success(res, { message: "Proposal sent successfully", proposal: updated });
}

module.exports = { getProposals, getProposal, createProposal, updateProposal, aiDraft, sendProposal };