import * as http from "http";
import { users } from "./src/data";

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

    if (method === "GET" && !id) {
      res.writeHead(200);
      res.end(JSON.stringify(users));
    }

    if (method === "GET" && id) {
      const user = users.find((el) => el.id === id);
      if (!user) {
        res.writeHead(404, { "Content-type": "application/json" });
        res.end(JSON.stringify({ message: "User not found" }));
      }
      res.writeHead(200);
      res.end(JSON.stringify(user));
      return;
    }
  })
  .listen(4000, () => {
    console.log("Server is started on http://localhost:4000");
  });
