const http = require("node:http")

const server = http.createServer((request, response) => {
    console.log("request received thanks")
})

server.listen(9090, (err) => {
    if(err) console.log(err, "Server not listening")
        else console.log("Server listening on port 9090")
})