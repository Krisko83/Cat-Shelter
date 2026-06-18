

export function showHomeView(homePage, cats) {
    const catTemplate = (cat) =>
                `<li>
                    <img src="${cat.imageUrl}" alt="${cat.name}">
                    <h3>${cat.name}</h3>
                    <p><span>Breed: </span>${cat.breed}</p>
                    <p><span>Description: </span>${cat.description}</p>
                    <ul class="buttons">
                        <li class="btn edit"><a href="/edit-cat">Change Info</a></li>
                        <li class="btn delete"><a href="/shelter-cat">New Home</a></li>
                    </ul>
                </li>`

    homePage = homePage.replace('{{cats}}', cats.map(cat => catTemplate(cat)).join('\n'));       
    return homePage;   
}