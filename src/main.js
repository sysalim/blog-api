import { web } from "./app/web.js";
const port = 300;
try {
  web.listen(port, () => {
    console.log(`berhasil terhubung ke port: ${port}`);
  });
} catch (e) {
  console.info(e);
}
