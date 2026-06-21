import { getBreedById, readHtmlFile, renderNotFound } from "./utility.js"

export function renderShelterView (id, cats, catShelterView) {
    const cat = cats.find(c => c.id === id);
   
    if(!cat) {
        return renderNotFound();
    }
    const catShelterTemp = shelterViewTemplate(cat);
    return catShelterView.replaceAll('{{shelter}}', catShelterTemp)
}

const shelterViewTemplate = (cat) => `
        <form method="post" class="cat-form">
            <h2>Shelter the cat</h2>
            <img src="${cat.imageUrl}" alt="cat-image">
            <label for="name">Name</label>
            <input type="text" id="name" value=${cat.name} disabled>
            <label for="description">Description</label>
            <textarea id="description" disabled>${cat.description}</textarea>
            <label for="group">${cat.breed}</label>
            <select id="group" disabled>
                <option value=${cat.breed}>${cat.breed}</option>
            </select>
            <button>SHELTER THE CAT</button>
        </form>
`