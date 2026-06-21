import { v4 } from 'uuid';
import cats from './cats.js'
import { readHtmlFile } from './utility.js';
import { getBreedById } from './breedService.js';

export function readCats() {
    return cats;
}

export function addCat(catData) {    
    const breed = getBreedById(catData.id);

    const newCat = {
        id: v4(),
        name: catData.name,
        imageUrl: catData.imageUrl,
        breed: catData.breed,
        description: catData.description
    };

    cats.push(newCat)
};

export function getCatById(catId) {
    return cats.find(cat => cat.id === catId);
}

export function editCat(catId, catData) {
    const catIndex = cats.findIndex(cat => cat.id === catId);

    const breedName = getBreedById(catData.breed).breed;

    cats[catIndex] = {
        id: catId,
        ...catData,
        breed: breedName
    };

    return true;
}

export function deleteCat(catId) {
    const catIndex = cats.findIndex(cat => cat.id === catId);

    cats.splice(catIndex, 1)
}

 