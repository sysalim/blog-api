import { search } from "../service/searchService.js";

export const searchController = async (req, res, next) => {
  try {
    const output = await search(req.query.q);
    if (!output) {
      res.status(404).json({
        errors: "Not Found",
      });
    }
    res.status(200).json({
      message: "Your Data Output",
      data: output,
    });
  } catch (e) {
    next(e);
  }
};
