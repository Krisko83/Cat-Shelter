import http from 'http';
import fs from 'fs/promises';
import { writeHtmlResponse, readHtmlFile } from './utility.js';
import cats from './cats.js';
import { showHomeView } from './homeView.js';

const server = http.createServer(async (req, res) => {

    if (req.url === '/content/styles/site.css') {
        const style = await fs.readFile('./content/styles/site.css', 'utf-8');
        res.writeHead(200, { 'Content-type': 'text/css' })
        res.write(style);
        return res.end();
    };

    if (req.url === '/cats/add-breed') {
        const addBreed = await readHtmlFile('./views/addBreed.html')
        writeHtmlResponse(res, addBreed);
    };

    if (req.url === '/cats/add-cat') {
        const addCat = await readHtmlFile('./views/addCat.html')
        writeHtmlResponse(res, addCat);
    };

    if (req.url === '/') {
        let homePage = await readHtmlFile('./views/home/index.html');
        homePage = showHomeView(homePage, cats)
        writeHtmlResponse(res, homePage);
    };


})





server.listen(5000, () => console.log('Server is running on http://localhost:5000...'));