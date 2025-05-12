import * as dotenv from "dotenv";
import * as http from "http";
import { users } from "./data";
import { deleteMethod, getMethod, postMethod, putMethod } from "./methods";

dotenv.config();
const PORT = process.env.PORT || 4000;

http
  .createServer(async (req, res) => {
    try {
      const url = req.url || "";
      const method = req.method || "";
      const [_, api, resource, id] = url.split("/");
      res.setHeader("Content-Type", "application/json; charset=utf-8");

      if (api !== "api" || resource !== "users") {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "This endpoint doesn't exist." }));
        return;
      }

      switch (method) {
        case "GET":
          await getMethod(method, id, res, users);
          return;
        case "POST":
          await postMethod(req, res, users);
          return;
        case "PUT":
          await putMethod(req, res, users, id);
          return;
        case "DELETE":
          await deleteMethod(res, users, id);
          return;
        default:
          res.writeHead(405, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: `It's impossible to use ${method} method.` }));
          return;
      }
    } catch (error) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Server error." }));
      return;
    }
  })
  .listen(PORT, () => {
    console.log(`Server is started on http://localhost:${PORT}`);
  });
