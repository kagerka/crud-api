import { IncomingMessage, ServerResponse } from "http";
import { v4 } from "uuid";
import { getReqBody } from "./getReqBody";
import { PostUser, User } from "./interfaces";

export const getMethod = async (method: string, id: string | undefined, res: ServerResponse, users: User[]) => {
  if (method === "GET" && !id) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
    return;
  }

  if (method === "GET" && id) {
    const user = users.find((el) => el.id === id);
    if (!user) {
      res.writeHead(404, { "Content-type": "application/json" });
      res.end(JSON.stringify({ message: "User not found" }));
      return;
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(user));
    return;
  }
};

export const postMethod = async (req: IncomingMessage, res: ServerResponse, users: User[]) => {
  try {
    const body = (await getReqBody(req)) as PostUser;
    if (typeof body.username !== "string" || typeof body.age !== "number" || !Array.isArray(body.hobbies)) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Body content is not valid" }));
      return;
    }

    const userData: User = {
      id: v4(),
      username: body.username,
      age: body.age,
      hobbies: body.hobbies,
    };
    users.push(userData);
    res.writeHead(201, { "Content-type": "application/json" });
    res.end(JSON.stringify(userData));
    return;
  } catch (error) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: (error as Error).message }));
    return;
  }
};

export const putMethod = async (req: IncomingMessage, res: ServerResponse, users: User[], id?: string) => {
  if (!id) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "User id is not valid." }));
    return;
  }

  const user = users.findIndex((el) => el.id === id);

  if (user === -1) {
    res.writeHead(404, { "Content-type": "application/json" });
    res.end(JSON.stringify({ message: "User not found." }));
    return;
  }

  try {
    const body = (await getReqBody(req)) as PostUser;

    if (typeof body.username !== "string" || typeof body.age !== "number" || !Array.isArray(body.hobbies)) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Body content is not valid" }));
      return;
    }

    users[user] = {
      id,
      username: body.username,
      age: body.age,
      hobbies: body.hobbies,
    };

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users[user]));
    return;
  } catch (error) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: (error as Error).message }));
    return;
  }
};
