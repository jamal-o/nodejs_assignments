const {createServer} = require("http");
const os = require("os");


function randomDelay() {
    let max = 3000;
    let min = 1000;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function serveSystemInformation(res) {
    let jsonResObj = {};
    jsonResObj = {
        "Operating System": `${os.platform()}`,
        "CPU Info": os.cpus()
    };

    res.write(JSON.stringify(jsonResObj));
    res.end();
}

function handleGetRequest(req, res) {
    setTimeout(() => {
        switch (req.url) {
            case '/sysinfo':
                res.writeHead(200, {"Content-type": "text/json"});
                serveSystemInformation(res);
                break;
            default:
                res.writeHead(200, {"Content-type": "text/html"});
                res.write("<h1>Welcome !!!</h1>");
                res.end();
        }
    }, randomDelay())
}
const requestHandler = (req, res) => {

    if (req.method === "GET"){
        handleGetRequest(req, res);
    }else{
        res.writeHead(404);
        res.write("Not found");
        res.end();

    }

}


const server = createServer(requestHandler);
server.listen(3000, () => console.log("Server Listening "));
