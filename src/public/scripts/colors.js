const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#CCF3FA',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#CAAAFF',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
}

const pokemons = document.getElementsByClassName('pokemon');


for (let i = 0; i < pokemons.length; i++) {
    const element = pokemons[i];
    let pokeType = document.getElementsByClassName('poke-type')[i].textContent;
    
    pokeType.includes('/') ? pokeType = pokeType.split('/')[0] : pokeType;

    element.style.backgroundColor = colors[pokeType.trim()];
    
}
