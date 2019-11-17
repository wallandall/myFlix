const http = require("http");

//create a server object:
http
  .createServer(function(req, res) {
    res.write("Hello from client!");
    res.end();
  })
  .listen(3000);
