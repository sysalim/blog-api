import express from "express";
import blogController from "../controller/blog-controller.js";
import upload from "../upload/upload.js";
import { error, errorNotFound } from "../errors/error.js";
import userController from "../controller/user-controller.js";
import authorization from "../auth/authorization.js";
import { searchController } from "../controller/search-controller.js";

const blogRouter = express.Router();
blogRouter.post(
  "/blog/create",
  authorization,
  upload.single("file"),
  blogController.postControler
);

blogRouter.put(
  "/blog/update/:id",
  authorization,
  upload.single("file"),
  blogController.updateController
);

blogRouter.delete(
  "/blog/delete/:id",
  authorization,
  blogController.deleteController
);
blogRouter.get("/blog/current", blogController.getAllController);
blogRouter.get("/blog/current/id/:id", blogController.getByIdController);
blogRouter.get(
  "/blog/current/category/:category",
  blogController.getByCategoriController
);
blogRouter.get(
  "/blog/current/username/:username",
  blogController.getByUsernameController
);
blogRouter.post(
  "/users/sendVerification",
  userController.sendVerificationController
);
blogRouter.post("/users/verifyCode", userController.verifyCodeController);
blogRouter.post("/users/login", userController.loginController);
blogRouter.get("/search", searchController);
blogRouter.get("/blog/latest", blogController.getByLatestPostController);
blogRouter.use(error);
blogRouter.use(errorNotFound);
export default blogRouter;
