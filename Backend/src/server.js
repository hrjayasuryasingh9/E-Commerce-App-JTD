const app = require("./app");
require("dotenv").config();
const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
