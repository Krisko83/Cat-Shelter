import http from 'http';
import fs from 'fs/promises';


const server = http.createServer(async (req, res) => {
console.log(req.url);

    if (req.url === '/content/styles/site.css') {

        const style = await fs.readFile('./content/styles/site.css', 'utf-8');
        res.writeHead(200, { 'Content-type': 'text/css' })
        res.write(style);
        return res.end();
    }

    const homePage = await fs.readFile('./views/home/index.html', 'utf-8');

    res.writeHead(200, { 'content-type': 'text/html' })
    res.write(homePage)

    res.end();
})



server.listen(5000, () => console.log('Server is running on http://localhost:5000...'));