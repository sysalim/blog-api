export const error = (err, req, res, next) => {
  console.log(err.track);
  res.status(500).json({
    errors: "terjadi kesalahan",
  });
  next(err);
};

export const errorNotFound = (req, res, next) => {
  res.status(404).json({
    message: "Data Not Found",
  });
};
