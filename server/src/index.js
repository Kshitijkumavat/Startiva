require("dotenv").config();
const http = require("http");
const app = require("./app");
const { initSocket } = require("./socket");
const { startOverduePaymentJob } = require("./jobs/overduePayments");

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
initSocket(server);
startOverduePaymentJob();

server.listen(PORT, () => {
  console.log(`Startiva server running on port ${PORT}`);
});