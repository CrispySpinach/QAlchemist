import { createServer } from "node:http";

const port = Number(process.env.PORT ?? 4000);

const server = createServer((_request, response) => {
  response.writeHead(200, { "content-type": "application/json" });
  response.end(JSON.stringify({ status: "ok" }));
});

server.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
