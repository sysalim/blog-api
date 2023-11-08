import jwt from "jsonwebtoken";
const authorization = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization)
    res.status(401).json({
      errors: "Unauthorized",
    });
  const token = authorization.split(" ");
  const [authType, authToken] = token;

  if (authType != "Bearer")
    res.status(401).json({
      errors: "Unauthorized",
      message: "Your Token Is Not Jwt Bearer",
    });

  try {
    jwt.verify(authToken, "ibukucantik");
  } catch (e) {
    res.status(401).json({
      errors: "Unauthorized",
      message: "Your Token Is Invalid",
    });
  }
  next();
};
export default authorization;
