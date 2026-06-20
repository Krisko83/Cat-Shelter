import { readHtmlFile } from "./utility.js"

export function renderShelterView (id, cats, catShelterView) {
    const cat = cats.find(c => c.id === id);
  
    const catShelterTemp = shelterViewTemplate(cat);
    return catShelterView.replaceAll('{{shelter}}', catShelterTemp)
}

const shelterViewTemplate = (cat) => `
        <form action="#" method="" class="cat-form">
            <h2>Shelter the cat</h2>
            <img src="${cat.imageUrl} "alt="">
            <label for="name">${cat.name}}</label>
            <input type="text" id="name" value="Pretty Kitty" disabled>
            <label for="description">Description</label>
            <textarea id="description" disabled>${cat.description}}</textarea>
            <label for="group">${cat.breed}}</label>
            <select id="group" disabled>
                <option value="Fluffy Cat">Fluffy Cat</option>
            </select>
            <button>SHELTER THE CAT</button>
        </form>
`;