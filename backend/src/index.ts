import "dotenv/config";
import { app } from "./app.js";

const port = process.env.PORT ?? 4000;

app.listen(port, () => {
  console.log(`syn-be backend rodando em http://localhost:${port}`);
});
