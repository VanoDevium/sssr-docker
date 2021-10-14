const app = require("express");
const SSSR = require("sssr");
const sssr = new SSSR();

const shouldWeUseSSSR = (request) => {
  const isBot =
    request.headers["user-agent"] &&
    request.headers["user-agent"].includes("bot");

  return isBot && request.method === "GET" && !request.query[sssr.MARKER];
};

app.use((req, res, next) => {
  if (!shouldWeUseSSSR(req)) {
    return next();
  }

  (async () => {
    const host = `${req.protocol}://${req.header("host")}`;
    const pageOptions = {
      headers: req.headers,
    };
    const url = host + req.originalUrl;
    const { status, content } = await sssr.get(url, pageOptions);
    return res.status(status).send(content);
  })();
});
