import http from 'http';
import fs from 'fs/promises';
import { writeHtmlResponse, readHtmlFile, readCssFile, writeCssResponce, addBreed, readBreed, breedOptions, addCat, readCats, getCatById, editCat, deleteCat } from './utility.js';
import cats from './cats.js';
import { renderHomeView } from './homeView.js';
import { renderShelterView } from './shelter-catView.js';
import { renderEditView } from './editView,js';


const server = http.createServer(async (req, res) => {
    //  console.log(readCats());


    if (req.method === 'POST') {

        if (req.url === '/cats/add-breed') {
            let body = '';

            req.on('data', (chunk) => {
                body += chunk;
            })
            req.on('end', async () => {
                const formData = new URLSearchParams(body);
                const breedName = formData.get('breed');
                addBreed(breedName);
            })
            return res.writeHead(302, { location: '/' }).end();
        }

        if (req.url === '/add-cat') {
            let body = '';

            req.on('data', (chunk) => {
                body += chunk
            })
            req.on('end', async () => {
                const formData = new URLSearchParams(body);

                const name = formData.get('name');
                const description = formData.get('description')
                const imageUrl = formData.get('imageUrl');
                const breed = formData.get('breed');
 
                addCat(name, imageUrl, breed, description);

            })
            return res.writeHead(302, { location: '/' }).end();
        }

        if (req.url.startsWith('/edit-cat/')) {
            const catId = req.url.split('/').pop();

            let body = '';

            req.on('data', (chunk) => {
                body += chunk
            })
            req.on('end', async () => {
                const formData = new URLSearchParams(body);

                const name = formData.get('name');
                const description = formData.get('description')
                const imageUrl = formData.get('imageUrl');
                const breed = formData.get('breed');

                editCat(catId, { name, imageUrl, breed, description });


            })
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
        homePage = renderHomeView(homePage, cats)

        writeHtmlResponse(res, homePage);
    };

    if (req.url.startsWith('/edit-cat')) {
    
        const catId = req.url.split('/').pop();
        console.log('The id is:',catId);
        
        let editView = await readHtmlFile('./views/editCat.html');

        editView = renderEditView(catId, editView);

        writeHtmlResponse(res, editView);
    };

    if (req.url.startsWith('/shelter-cat/')) {
        const id = req.url.split('/').pop();

        let catShelterView = await readHtmlFile('./views/catShelter.html');
        const template = renderShelterView(id, cats, catShelterView)

        writeHtmlResponse(res, template);
    }

    if (req.url.startsWith('/search')) {
        const params = new URLSearchParams(req.url.split('?')[1]);
        const name = params.get('name');
        let homePage = await readHtmlFile('./views/home/index.html');

        homePage = renderHomeView(homePage, cats, { name })
        writeHtmlResponse(res, homePage);
    }

});


server.listen(5000, () => console.log('Server is running on http://localhost:5000...'));