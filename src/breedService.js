import breeds from './breeds.js';
import { v4 } from 'uuid';

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

 

export function getBreedById(breedId) {

    const breed = breeds.find(b => b.id === breedId);


    return breed
}