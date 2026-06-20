import fs from 'fs/promises';
import breeds from './breeds.js';
import {v4} from 'uuid';
import cats from './cats.js'

export async function readHtmlFile(path) {
    const htmlFile = await fs.readFile(path, 'utf-8');
    return htmlFile;
};

export function writeHtmlResponse(res, htmlFile) {
    res.writeHead(200, { 'Content-type': 'text/html' });
    res.write(htmlFile);

    return res.end();
};

export async function readCssFile(path) {
    const cssFile = await fs.readFile(path, 'utf-8');
    return cssFile;
};

export function writeCssResponce(res, cssFile) {
    res.writeHead(200, { 'Content-type': 'text/css' });
    res.write(cssFile);

    return res.end();
};

export function addBreed(breed) {
    const newBreed = {
        id: v4(),
        breed
    }
    breeds.push(newBreed);
};

export function readBreed() {
    return breeds;
}

export function breedOptions() {
     return readBreed().map(breed => `<option value="${breed.id}">${breed.breed}</option>`);
};

export function readCats(){
    return cats;
}

export function addCat(name, imageUrl, breedid, description) {
    const breed = breeds.find(b => b.id === breedid).breed;
 
    const newCat = {
        id: v4(), 
        name, 
        imageUrl,
        breed, 
        description
    }
    cats.push(newCat)
}