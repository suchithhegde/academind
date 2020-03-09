const http = require ('http');

const server = http.createServer((req,res) => {
    console.log('EventLoop');
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.setHeader('Content-Type','text/html');
        res.write('<html>');
        res.write('<head><title>Welcome to my Assignment</title></head>');
        res.write('<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Search</button></form></body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/create-user' && method === 'POST') {
        console.log('User has been created');
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        req.on('end', () => {
            const searchItem = Buffer.concat(body).toString();
            console.log(searchItem.split("=")[1]);
        });
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }
});

server.listen(3000);
console.log('Listening on port 3000........');