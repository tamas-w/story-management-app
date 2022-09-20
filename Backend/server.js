require("dotenv").config();
const http = require("http");
const app = require("./app");
const PORT = process.env.PORT;
/*  This is good practice, We can use it for more things like  -> websocket */

// const { makeConnectionToDB } = require("./src/models/connection.model");

const server = http.createServer(app);

async function startServer() {
  // We make sure data is available before we start listening
  // await loadData()  or makeConnectionToDB() ;

  server.listen(PORT, () => {
    console.log("Server is running on port: ", PORT);
  });
}

startServer();
