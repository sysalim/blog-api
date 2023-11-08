import {
  deleting,
  getAll,
  getByCategori,
  getById,
  getByLatestPost,
  getByUsername,
  post,
  update,
} from "../service/blogService.js";

/**
 * @param {request.json} req
 * @param {response.json} res
 * @param {callback} next
 * @author sayyid salim <mohsalim951@gmail.com>
 */
const postControler = async (req, res, next) => {
  try {
    const data = await post(req);
    if (!data) {
      res.status(403).json({
        message: "mohon isi lampiranmu yang benar",
      });
      next();
    }
    res.status(200).json({
      message: "succes to create your blog",
      data,
    });
  } catch (e) {
    next(e);
  }
};

/**
 * @param {request.json} req
 * @param {response.json} res
 * @param {callback} next
 * @author sayyid salim <mohsalim951@gmail.com>
 */
const updateController = async (req, res, next) => {
  try {
    const data = await update(req);
    if (!data) {
      res.status(403).json({
        message: "data gagal di update",
      });
      next();
    }
    res.status(200).json({
      message: "Succes to update",
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
 */
const deleteController = async (req, res, next) => {
  try {
    const data = await deleting(req);
    res.status(200).json({
      message: "Deleted your data",
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
 * @param {middlaware transport} next
 */
const getAllController = async (req, res, next) => {
  try {
    const data = await getAll();
    if (!data) {
      res.status(403).json({
        message: "Data Not Found",
      });
    }
    res.status(200).json({
      message: "succes to get all data",
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
 */
const getByIdController = async (req, res, next) => {
  try {
    const data = await getById(req);
    if (!data) {
      res.status(404).json({
        message: "Data Not Found",
      });
      return;
    }
    res.status(200).json({
      message: "succes to get data by id",
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
 * @param {} next
 * @returns {close}
 */
const getByCategoriController = async (req, res, next) => {
  try {
    const data = await getByCategori(req);
    if (!data.blog.length) {
      res.status(404).json({
        message: "data not found",
      });
      return;
    }
    res.status(200).json({
      message: "succes to get by category",
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
 */
const getByUsernameController = async (req, res, next) => {
  try {
    const data = await getByUsername(req);
    if (!data) {
      res.status(404).json({
        message: "Data Not Found",
      });
      return;
    }
    res.status(200).json({
      message: "Succes to get data by category",
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
 * @param {midlleware transport} next
 */
const getByLatestPostController = async (req, res, next) => {
  try {
    const data = await getByLatestPost();
    if (!data) {
      res.status(404).json({
        errors: "Not Found",
      });
      return;
    }
    res.status(200).json({
      message: "SuccesFully",
      data,
    });
  } catch (e) {
    next(e);
  }
};
export default {
  postControler,
  updateController,
  deleteController,
  getAllController,
  getByIdController,
  getByCategoriController,
  getByUsernameController,
  getByLatestPostController,
};
