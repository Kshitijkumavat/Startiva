const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const prisma = require("../utils/prisma");
const { sendInviteEmail } = require("../utils/email");
const { success, error } = require("../utils/response");

async function getMembers(req, res) {
  const members = await prisma.user.findMany({
    where: { teamId: req.user.teamId },
    select: {
      id: true, name: true, email: true,
      role: true, createdAt: true,
    },
  });
  return success(res, members);
}

async function inviteMember(req, res) {
  const { email, role } = req.body;

  if (!email) return error(res, "Email is required");
  if (!["ADMIN", "MEMBER"].includes(role)) {
    return error(res, "Role must be ADMIN or MEMBER");
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) return error(res, "User already exists");

  const existingInvite = await prisma.invite.findFirst({
    where: { email, teamId: req.user.teamId, used: false },
  });
  if (existingInvite) return error(res, "Invite already sent to this email");

  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000);

  await prisma.invite.create({
    data: {
      email,
      role,
      token,
      teamId: req.user.teamId,
      invitedBy: req.user.id,
      expiresAt,
    },
  });

  const inviter = await prisma.user.findUnique({ where: { id: req.user.id } });
  const team = await prisma.team.findUnique({ where: { id: req.user.teamId } });
  const inviteLink = `${process.env.CLIENT_URL}/accept-invite?token=${token}`;

  if (process.env.SMTP_USER) {
    await sendInviteEmail(email, inviter.name, team.startupName, inviteLink);
  }

  return success(res, { message: "Invite sent", inviteLink }, 201);
}

async function acceptInvite(req, res) {
  const { token, name, password } = req.body;

  if (!token || !name || !password) {
    return error(res, "Token, name and password are required");
  }

  const invite = await prisma.invite.findUnique({ where: { token } });

  if (!invite) return error(res, "Invalid invite token");
  if (invite.used) return error(res, "Invite already used");
  if (invite.expiresAt < new Date()) return error(res, "Invite has expired");

  const passwordHash = await bcrypt.hash(password, 12);

  const result = await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        name,
        email: invite.email,
        passwordHash,
        role: invite.role,
        teamId: invite.teamId,
      },
    });

    await tx.invite.update({
      where: { token },
      data: { used: true },
    });

    return user;
  });

  return success(res, { message: "Account created successfully", userId: result.id }, 201);
}

async function updateRole(req, res) {
  const { id } = req.params;
  const { role } = req.body;

  if (!["ADMIN", "MEMBER"].includes(role)) {
    return error(res, "Role must be ADMIN or MEMBER");
  }

  const member = await prisma.user.findFirst({
    where: { id, teamId: req.user.teamId },
  });

  if (!member) return error(res, "Member not found", 404);
  if (member.role === "OWNER") return error(res, "Cannot change owner role");

  const updated = await prisma.user.update({
    where: { id },
    data: { role },
    select: { id: true, name: true, email: true, role: true },
  });

  return success(res, updated);
}

async function removeMember(req, res) {
  const { id } = req.params;

  const member = await prisma.user.findFirst({
    where: { id, teamId: req.user.teamId },
  });

  if (!member) return error(res, "Member not found", 404);
  if (member.role === "OWNER") return error(res, "Cannot remove the owner");
  if (member.id === req.user.id) return error(res, "Cannot remove yourself");

  await prisma.user.delete({ where: { id } });

  return success(res, { message: "Member removed" });
}

module.exports = { getMembers, inviteMember, acceptInvite, updateRole, removeMember };