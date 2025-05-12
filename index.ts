import * as http from "http";
import { users } from "./src/data";
import { getMethod, postMethod } from "./src/methods";

http
  .createServer(async (req, res) => {
    const url = req.url || "";
    const method = req.method || "";
    const [_, api, resource, id] = url.split("/");
    res.setHeader("Content-Type", "application/json; charset=utf-8");

    if (api !== "api" || resource !== "users") {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Not found" }));
      return;
    }

    switch (method) {
      case "GET":
        await getMethod(method, id, res, users);
        return;
      case "POST":
        await postMethod(req, res, users);
        return;

      default:
        res.writeHead(405, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: `It's impossible to use ${method} method.` }));
        return;
    }
  })
  .listen(4000, () => {
    console.log("Server is started on http://localhost:4000");
  });
