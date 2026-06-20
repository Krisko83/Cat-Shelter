import http from 'http';
import fs from 'fs/promises';
import { writeHtmlResponse, readHtmlFile ,readCssFile, writeCssResponce, addBreed, readBreed, breedOptions} from './utility.js';
import cats from './cats.js';
import { renderHomeView } from './homeView.js';
import { renderShelterView} from './shelter-catView.js';
 

const server = http.createServer(async (req, res) => {
    console.log(readBreed());
    
    if(req.method === 'POST') {
        if(req.url === '/cats/add-breed') {
            let body = '';
            req.on('data' , (chunk) => {
                body += chunk;
            })
            req.on('end', async () => {
                const formData = new URLSearchParams(body);
                const breedName = formData.get('breed');
                addBreed(breedName);
            })
        }
        return res.writeHead(302, { location: '/'}).end();
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

    if (req.url === '/edit-cat') {
        let editView = await readHtmlFile('./views/editCat.html');
        writeHtmlResponse(res, editView);
    };
 
    if(req.url.startsWith('/shelter-cat/')) {
        const id = req.url.split('/')[2];
 
        let catShelterView = await readHtmlFile('./views/catShelter.html');
        const template = renderShelterView(id, cats, catShelterView)  
        
        writeHtmlResponse(res, template);
    }

});


server.listen(5000, () => console.log('Server is running on http://localhost:5000...'));