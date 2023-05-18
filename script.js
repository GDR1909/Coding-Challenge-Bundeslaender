let bundeslaender = [];
let letters = ['B', 'H', 'M', 'N', 'R', 'S', 'T'];


async function init() {
    let response = await fetch('./bundesland.json');
    let responseAsJson = await response.json();
    bundeslaender = responseAsJson;
    renderCards();
    renderLetters();
}


function renderCards(filter) {
    document.getElementById('cardsContainer').innerHTML = '';

    for (let i = 0; i < bundeslaender.length; i++) {
        let land = bundeslaender[i];
        let population = (land['population'] + '').replace('.', ',');

        if (!filter || filter == land['name'].charAt(0)) {
            document.getElementById('cardsContainer').innerHTML += templateRenderCards(land, population);
        }
    }
}


function renderLetters() {
    document.getElementById('lettersContainer').innerHTML = '';

    for (let i = 0; i < letters.length; i++) {
        let letter = letters[i];
        document.getElementById('lettersContainer').innerHTML += /*html*/ `
            <div class="letterBox" onclick="setFilter('${letter}')">${letter}</div>
        `;
    }
}


function setFilter(letter) {
    renderCards(letter);
}



//Templates

function templateRenderCards(land, population) {
    return /*html*/ `
        <a href="${land['url']}" target="_blank" class="card">
            <h3>${land['name']}</h3>
            <span>${population} Millionen</span>
        </a>
    `;
}