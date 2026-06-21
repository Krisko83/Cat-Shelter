import http from 'http';
import { writeHtmlResponse, readHtmlFile, readCssFile, writeCssResponce, readFormData } from './utility.js';
import { renderHomeView } from './homeView.js';
import { renderShelterView } from './shelter-catView.js';
import { renderEditView } from './editView,js';
import { addBreed, readBreed, breedOptions } from './breedService.js';
import { addCat, readCats, getCatById, editCat, deleteCat } from './catService.js';

const server = http.createServer(async (req, res) => {

    if (req.method === 'POST') {

        if (req.url === '/cats/add-breed') {
            const formData = await readFormData(req);
            const breedName = formData.get('breed');
            addBreed(breedName);

            return res.writeHead(302, { location: '/' }).end();
        }

        if (req.url === '/add-cat') {
            const formData = await readFormData(req);

            const catDate = {
                name: formData.get('name'),
                description: formData.get('description'),
                imageUrl: formData.get('imageUrl'),
                breed: formData.get('breed')
            };

            addCat(catDate);

            return res.writeHead(302, { location: '/' }).end();
        };

        if (req.url.startsWith('/edit-cat/')) {
            const catId = req.url.split('/').pop();

            const formData = await readFormData(req);

            const catDate = {
                name: formData.get('name'),
                description: formData.get('description'),
                imageUrl: formData.get('imageUrl'),
                breed: formData.get('breed')
            }

            editCat(catId, catDate);

            return res.writeHead(302, { location: '/' }).end();
        }

        if (req.url.startsWith('/shelter-cat/')) {
            const id = req.url.split('/').pop();

            deleteCat(id);

            return res.writeHead(302, { location: '/' }).end();
        }
    };

    if (req.url === '/content/styles/site.css') {
        const style = await readCssFile('./content/styles/site.css')
        writeCssResponce(res, style)
    };

    if (req.url === '/cats/add-breed') {
        const addBreed = await readHtmlFile('./views/addBreed.html')
        writeHtmlResponse(res, addBreed);
    };

    if (req.url === '/cats/add-cat') {
        let addCat = await readHtmlFile('./views/addCat.html')
        addCat = addCat.replace('{{breedOptions}}', breedOptions())
        writeHtmlResponse(res, addCat);
    };

    if (req.url === '/') {
        let homePage = await readHtmlFile('./views/home/index.html');
        homePage = renderHomeView(homePage)

        writeHtmlResponse(res, homePage);
    };

    if (req.url.startsWith('/edit-cat')) {
        const catId = req.url.split('/').pop();
        let editView = await readHtmlFile('./views/editCat.html');

        editView = await renderEditView(catId, editView);

        writeHtmlResponse(res, editView);
    };

    if (req.url.startsWith('/shelter-cat/')) {
        const id = req.url.split('/').pop();

        let catShelterView = await readHtmlFile('./views/catShelter.html');
        const template = await renderShelterView(id, catShelterView)

        writeHtmlResponse(res, template);
    }

    if (req.url.startsWith('/search')) {
        const params = new URLSearchParams(req.url.split('?')[1]);
        const name = params.get('name');
        let homePage = await readHtmlFile('./views/home/index.html');

        homePage = renderHomeView(homePage, { name })
        writeHtmlResponse(res, homePage);
    }

});


server.listen(5000, () => console.log('Server is running on http://localhost:5000...'));