const http = require("node:http");
const fs = require("fs/promises");
const server = http.createServer((request, response) => {
  const { method, url } = request;
  if (method === "GET" && url === "/api") {
    response.setHeader("Content-Type", "application/json");
    response.statusCode = 200;
    response.write(JSON.stringify({ message: "Server running proper" }));
    response.end();
  }
  if (method === "GET" && url === "/api/users") {
    fs.readFile("./data/users.json", "utf-8").then((data) => {
      response.setHeader("Content-Type", "application/json");
      response.statusCode = 200;
      const result = JSON.parse(data);
      response.write(JSON.stringify({ users: result }));
      response.end();
    });
  }
  if (method === "GET" && url === "/api/posts") {
    fs.readFile("./data/posts.json", "utf-8").then((data) => {
      response.setHeader("Content-Type", "application/json");
      response.statusCode = 200;
      const result = JSON.parse(data);
      response.write(JSON.stringify({ posts: result }));
      response.end();
    });
  }
  if (method === "POST" && url === "/api/users") {
    let body = "";
    request.on("data", (packet) => {
      body += packet.toString();
    });
    request.on("end", async() => {
        try{

        
      const newUser = JSON.parse(body);
      const fileData = fs.readFile("./data/users.json","utf-8")
      const users = JSON.parse(fileData)
      users.push(newUser);
      fs.writeFile("./data/users.json", JSON.stringify(users, null, 2), "utf-8")
      response.setHeader("Content-Type", "application/json");
      response.statusCode = 201;
      response.end(JSON.stringify({message: "User added successfully", user:newUser}))
      }
      catch(error){
        response.statusCode = 500
        response.end(JSON.stringify({error:"Failed to add user"}))
      }
    });
  }
});

server.listen(9090, (err) => {
  if (err) console.log(err, "Server not listening");
  else console.log("Server listening on port 9090");
});
