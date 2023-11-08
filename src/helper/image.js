import { fileURLToPath } from "url";
import { dirname, join } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const image = (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = join(__dirname, "../../uploads", imageName);
  res.sendFile(imagePath);
};

export default image;
