import { login, sendVerification, verifyCode } from "../service/userService.js";

/**
 *
 * @param {http request} req
 * @param {http response} res
 * @param {middleware transport} next
 * @returns {close}
 */
const sendVerificationController = async (req, res, next) => {
  try {
    const data = await sendVerification(req);
    if (!data) {
      res.status(500).json({
        errors: "Something Wrong",
      });
      return;
    } else if (data === "Please Send Your Data") {
      res.status(400).json({
        errors: data,
      });
      return;
    } else if (data === "Please send Your name length") {
      res.status(403).json({
        errors: data,
      });
      return;
    } else if (data === "Your Email Is Invalid") {
      res.status(403).json({
        errors: data,
      });
      return;
    } else if (data === "Your Name / Email Is Already Exist") {
      res.status(409).json({
        errors: data,
      });
      return;
    }

    res.status(200).json({
      message: "Succes to send verification code",
      data,
    });
  } catch (e) {
    next(e);
  }
};


/**
 * 
 * @param {http requesr} req 
 * @param {http response} res 
 * @param {middleware transport} next 
 * @returns {close}
 */
const verifyCodeController = async (req, res, next) => {
  try {
    const data = await verifyCode(req);
    if (!data) {
      res.status(500).json({
        errors: "Something Wrong",
      });
      return;
    }
    if (data === "Your Code is Invalid") {
      res.status(405).json({
        errors: data,
      });
      return;
    }
    res.status(200).json({
      message: "succes registrasi",
      data,
    });
  } catch (e) {
    next(e);
  }
};


/**
 * 
 * @param {http request} req 
 * @param {http response} res 
 * @param {middleware transport} next 
 * @returns {close}
 */
const loginController = async (req, res, next) => {
  try {
    const data = await login(req);
    if (!data) {
      res.status(500).json({
        errors: "Something Wrong",
      });
      return;
    }
    if (data === "Please Send Your Username/Password") {
      res.status(400).json({
        errors: data,
      });
      return;
    } else if (data === "Your Password Is Wrong") {
      res.status(401).json({
        errors: data,
      });
      return;
    } else if (data === "Your Acount Not Registered") {
      res.status(404).json({
        errors: data,
      });
    }
    res.status(200).json({
      message: "succes to login",
      token: data,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  verifyCodeController,
  sendVerificationController,
  loginController,
};
