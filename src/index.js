import http from 'http';
import fs from 'fs/promises';
import { writeHtmlResponse, readHtmlFile ,readCssFile, writeCssResponce} from './utility.js';
import cats from './cats.js';
import { renderHomeView } from './homeView.js';

const server = http.createServer(async (req, res) => {

    if (req.url === '/content/styles/site.css') {
        const style = await readCssFile('./content/styles/site.css')
        writeCssResponce(res, style)
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
        homePage = renderHomeView(homePage, cats)
        writeHtmlResponse(res, homePage);
    };

    if (req.url === '/edit-cat') {
        let editView = await readHtmlFile('./views/editCat.html');
        writeHtmlResponse(res, editView);
    };

    if (req.url === '/shelter-cat') {
        let catShelterView = await readHtmlFile('./views/catShelter.html');
        writeHtmlResponse(res, catShelterView);
    };

});


server.listen(5000, () => console.log('Server is running on http://localhost:5000...'));