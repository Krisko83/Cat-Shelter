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

export function breedOptions(selectedBreed) {

     return readBreed().map(breed => `<option value="${breed.id}" ${breed.breed === selectedBreed ? ' selected' : ''}>${breed.breed}</option>`);
};

export function readCats(){
    return cats;
}

export function addCat(name, imageUrl, breedid, description) {
    // const breed = breeds.find(breed => breed.id === breedid).breed;
    const breed = getBreedById(breedid).breed;
    
    const newCat = {
        id: v4(), 
        name, 
        imageUrl,
        breed, 
        description
    }
    cats.push(newCat)
};

export function getCatById(catId) {
    return cats.find(cat => cat.id === catId);
}

export function getBreedById(breedId) {
    console.log(breedId);
    
    const breed = breeds.find(b => b.id === breedId);
    console.log('value' ,breed);
    
    return breed
}

export function editCat(catId, catData) {
    const catIndex = cats.findIndex(cat => cat.id === catId);

    const breedName = getBreedById(catData.breed).breed;

    cats[catIndex] = {
        id: catId,
        ...catData,
        breed: breedName
    }
    return true;
}

export function deleteCat(catId) {
    const catIndex = cats.findIndex(cat => cat.id = catId);
    cats.splice(catIndex, 1)
}