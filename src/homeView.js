import { readCats } from "./catService.js";

export function renderHomeView(homePage, filter = {}) {
    let cats = readCats();

    if (filter.name) {
        cats = cats.filter(cat => cat.name.toLowerCase().includes(filter.name.toLowerCase()));
    }

    homePage = homePage
        .replace('{{cats}}', `<ul>${cats.map(cat => catTemplate(cat)).join('\n')}</ul>`)
        .replace('{{name}}', filter.name || '');

    return homePage;
}

const catTemplate = (cat) =>
    `<li>
                    <img src="${cat.imageUrl}" alt="${cat.name}">
                    <h3>${cat.name}</h3>
                    <p><span>Breed: </span>${cat.breed}</p>
                    <p><span>Description: </span>${cat.description}</p>
                    <ul class="buttons">
                        <li class="btn edit"><a href="/edit-cat/${cat.id}">Change Info</a></li>
                        <li class="btn delete"><a href="/shelter-cat/${cat.id}">New Home</a></li>
                    </ul>
                </li>`;