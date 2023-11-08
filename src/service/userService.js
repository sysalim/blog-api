import { prismaClient } from "../app/database.js";
import { sendEmail } from "../helper/sendEmail.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// yang akan menampung sebuah data user yang akan di registrasi
let users = {};
/**
 * @param {request body} request
 * @returns {just message to send email}
 */
export const sendVerification = async (request) => {
  const { name, email } = request.body;
  if (!name || !email) {
    return "Please Send Your Data";
  }
  if (name.length < 2) {
    return "Please send Your name length";
  }

  if (!email.includes("@gmail.com")) {
    return "Your Email Is Invalid";
  }
  const findName = await prismaClient.user.findUnique({
    where: {
      name,
    },
  });
  const findEmail = await prismaClient.user.findUnique({
    where: {
      email,
    },
  });

  if (findEmail || findName) {
    return "Your Name / Email Is Already Exist";
  }
  const verificationCode = Math.floor(1000 + Math.random() * 9000);
  users = {
    code: verificationCode,
    verified: false,
  };
  sendEmail(email, verificationCode);
  return "Succes To Send Your Code";
};

/**
 *
 * @param {request body || request file} request
 * @returns {data response}
 */
export const verifyCode = async (request) => {
  const { name, email, image, password, code } = request.body;
  if (users.code != code) {
    return "Your Code is Invalid";
  } else {
    users.verified = true;
  }
  if (users.verified) {
    return await prismaClient.user.create({
      data: {
        name,
        email,
        password: bcrypt.hashSync(password, 10),
      },
      select: {
        name: true,
        email: true,
      },
    });
  }
};

export const login = async (request) => {
  const { username, password } = request.body;

  if (!username || !password) return "Please Send Your Username/Password";
  const user = await prismaClient.user.findUnique({
    where: {
      name: username,
    },
    select: {
      name: true,
      password: true,
    },
  });

  if (!user) return "Your Acount Not Registered";

  const validation = bcrypt.compareSync(password, user.password);
  if (!validation) return "Your Password Is Wrong";
  const token = jwt.sign({ user: user.name }, "ibukucantik", {
    expiresIn: "7d",
  });
  if (token) return token;
};
