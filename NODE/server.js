const http = require('http');
const server = http.createServer((req,res)=>{//instance
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    res.end('Hello form Server! \n');

});
server.listen(3000,'127.0.0.1',()=>{
    console.log('Server running at http://127.0.0.1:3000/');
});