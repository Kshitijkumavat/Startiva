const bcrypt = require("bcryptjs");
const prisma = require("../utils/prisma");
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require("../utils/jwt");
const { success, error } = require("../utils/response");

// ── Register (creates user + team) ──
async function register(req, res) {
  const { name, email, password, startupName } = req.body;

  if (!name || !email || !password || !startupName) {
    return error(res, "All fields are required");
  }

  if (password.length < 8) {
    return error(res, "Password must be at least 8 characters");
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return error(res, "Email already in use");

  const passwordHash = await bcrypt.hash(password, 12);

  // Create team and owner in one transaction
  const result = await prisma.$transaction(async (tx) => {
    const team = await tx.team.create({
      data: { name: startupName, startupName },
    });

    const user = await tx.user.create({
      data: {
        name,
        email,
        passwordHash,
        role: "OWNER",
        teamId: team.id,
      },
    });

    return { team, user };
  });

  const payload = {
    id: result.user.id,
    email: result.user.email,
    role: result.user.role,
    teamId: result.team.id,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  return success(res, {
    accessToken,
    refreshToken,
    user: {
      id: result.user.id,
      name: result.user.name,
      email: result.user.email,
      role: result.user.role,
      teamId: result.team.id,
      startupName: result.team.startupName,
    },
  }, 201);
}

// ── Login ──
async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) return error(res, "Email and password are required");

  const user = await prisma.user.findUnique({
    where: { email },
    include: { team: true },
  });

  if (!user) return error(res, "Invalid credentials", 401);

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return error(res, "Invalid credentials", 401);

  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
    teamId: user.teamId,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  return success(res, {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      teamId: user.teamId,
      startupName: user.team.startupName,
    },
  });
}

// ── Refresh Token ──
async function refresh(req, res) {
  const { refreshToken } = req.body;
  if (!refreshToken) return error(res, "Refresh token required");

  try {
    const decoded = verifyRefreshToken(refreshToken);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: { team: true },
    });

    if (!user) return error(res, "User not found", 401);

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
      teamId: user.teamId,
    };

    const newAccessToken = generateAccessToken(payload);

    return success(res, { accessToken: newAccessToken });
  } catch {
    return error(res, "Invalid or expired refresh token", 401);
  }
}

// ── Get current user ──
async function me(req, res) {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    include: { team: true },
  });

  if (!user) return error(res, "User not found", 404);

  return success(res, {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    teamId: user.teamId,
    startupName: user.team.startupName,
  });
}

module.exports = { register, login, refresh, me };