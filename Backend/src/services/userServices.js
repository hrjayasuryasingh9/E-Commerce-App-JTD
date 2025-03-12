const prisma = require("../prisma/prismaclient");

const registration = async (
  name,
  email,
  password_hash,
  role,
  is_verified,
  verificationToken
) => {
  const user = await prisma.all_users_data.create({
    data: {
      name,
      email,
      password_hash: password_hash,
      role,
      is_verified,
      verification_token: verificationToken, // Store token in DB
    },
  });
  return user;
};

const verification = async (token) => {
  const user = await prisma.all_users_data.findFirst({
    where: { verification_token: token },
  });

  if (!user) {
    return "Invalid or expired token";
  }
  await prisma.all_users_data.update({
    where: { id: user.id },
    data: {
      is_verified: true,
      verification_token: "null", // Remove token after verification
    },
  });
  return "Registration and verification successfull!";
};

const loginInfo = async (email, role) => {
  const user = await prisma.all_users_data.findFirst({
    where: { email: email, role: role },
  });
  return user || false;
};
module.exports = { registration, verification, loginInfo };
