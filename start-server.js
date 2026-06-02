import { createServer } from "http";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import the Nitro server
const { default: handler } = await import("./dist/server/server.mjs");

const server = createServer(async (req, res) => {
  try {
    // Forward request to the Nitro handler
    const response = await handler.fetch(
      new Request(new URL(req.url || "/", `http://${req.headers.host}`), {
        method: req.method,
        headers: req.headers,
        body: req.method !== "GET" && req.method !== "HEAD" ? req : undefined,
      }),
    );

    // Send response
    res.writeHead(response.status, Object.fromEntries(response.headers));
    res.end(await response.arrayBuffer());
  } catch (error) {
    console.error("Server error:", error);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  }
});

const port = process.env.PORT || 3000;
server.listen(port, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${port}`);
});
