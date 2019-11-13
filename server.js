const http = require("http");
const fs = require("fs");
const url = require("url");

http
  .createServer((request, response) => {
    let addr = request.url;
    let q = url.parse(addr, true);
    let filePath = "";

    if (q.pathname.includes("documentation")) {
      filePath = __dirname + "/documentation.html";
    } else {
      filePath = "index.html";
    }

    fs.readFile(filePath, function(err, data) {
      if (err) {
        throw err;
      }

      fs.appendFile(
        "log.txt",
        "URL: " + addr + "\nTimestamp: " + new Date() + "\n\n",
        function(err) {
          if (err) {
            console.log(err);
          } else {
            console.log("Added to log.");
          }
        }
      );

      response.writeHead(200, { "Content-Type": "text/html" });
      response.write(data);
      response.end("");
    });
  })
  .listen(8080);

console.log("Server running on port 8080");
