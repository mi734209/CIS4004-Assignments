const pokemonCache = {};

const searchBtn = document.getElementById('search-btn');
const pokeInput = document.getElementById('poke-input');
const errorMsg = document.getElementById('error-msg');

const displaySection = document.getElementById('current-pokemon-display');
const pokeNameEl = document.getElementById('poke-name');
const pokeImgEl = document.getElementById('poke-image');
const pokeAudioEl = document.getElementById('poke-audio');

const moveSelects = [
    document.getElementById('move-1'),
    document.getElementById('move-2'),
    document.getElementById('move-3'),
    document.getElementById('move-4')
];

const addToTeamBtn = document.getElementById('add-team-btn');
const teamContainer = document.getElementById('team-container');
pokeInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        searchBtn.click(); 
    }
});

searchBtn.addEventListener('click', () => {
    const query = pokeInput.value.trim().toLowerCase();
    if (!query) return;

    errorMsg.textContent = "";

    if (pokemonCache[query]) {
        console.log(`[Cache Hit] Loading ${query} from local cache.`);
        renderPokemonBuilder(pokemonCache[query]);
    } else {
        console.log(`[Cache Miss] Fetching ${query} from API.`);
        fetchPokemon(query);
    }
});

async function fetchPokemon(query) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
        
        if (!response.ok) {
            throw new Error("Pokemon not found!");
        }

        const data = await response.json();
        pokemonCache[data.name] = data;
        pokemonCache[data.id] = data;

        renderPokemonBuilder(data);

    } catch (error) {
        errorMsg.textContent = "Error: Pokemon not found. Please check spelling or ID.";
        displaySection.style.display = "none";
    }
}

function renderPokemonBuilder(data) {
    displaySection.style.display = "block";

    pokeNameEl.textContent = `${data.name} (#${data.id})`;

   
    pokeImgEl.src = data.sprites.front_default || '';

    if (data.cries && data.cries.latest) {
        pokeAudioEl.src = data.cries.latest;
    } else {
        pokeAudioEl.src = ""; 
    }

   
    moveSelects.forEach(select => select.innerHTML = '');

    const moves = data.moves; 

    if (moves.length === 0) {
        moveSelects.forEach(select => {
            const opt = document.createElement('option');
            opt.text = "No Moves Available";
            select.add(opt);
        });
    } else {
        moveSelects.forEach((select, index) => {
            moves.forEach(m => {
                const option = document.createElement('option');
                option.value = m.move.name;
                option.textContent = m.move.name;
                select.appendChild(option);
            });

            if (moves.length > index) {
                select.selectedIndex = index;
            }
        });
    }

    addToTeamBtn.dataset.currentName = data.name;
    addToTeamBtn.dataset.currentImg = data.sprites.front_default;
}

addToTeamBtn.addEventListener('click', () => {
    const name = pokeNameEl.textContent;
    const imgUrl = addToTeamBtn.dataset.currentImg;
    
    const selectedMoves = moveSelects.map(select => select.value);

    const card = document.createElement('div');
    card.className = 'team-card';

    const cardTitle = document.createElement('h3');
    cardTitle.style.textTransform = 'capitalize';
    cardTitle.textContent = name;

    const cardImg = document.createElement('img');
    cardImg.src = imgUrl;
    cardImg.className = 'poke-img';
    cardImg.style.width = '100px';
    cardImg.style.height = '100px';

    const moveList = document.createElement('ul');
    selectedMoves.forEach(move => {
        const li = document.createElement('li');
        li.textContent = move;
        moveList.appendChild(li);
    });

    card.appendChild(cardTitle);
    card.appendChild(cardImg);
    card.appendChild(moveList);
    teamContainer.appendChild(card);
});