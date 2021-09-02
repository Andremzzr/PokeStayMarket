const typeIcons = {
    bug : "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Pok%C3%A9mon_Bug_Type_Icon.svg/512px-Pok%C3%A9mon_Bug_Type_Icon.svg.png",
    dark : "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Pok%C3%A9mon_Dark_Type_Icon.svg/512px-Pok%C3%A9mon_Dark_Type_Icon.svg.png",
    dragon : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Pok%C3%A9mon_Dragon_Type_Icon.svg/512px-Pok%C3%A9mon_Dragon_Type_Icon.svg.png",
    eletric: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Pok%C3%A9mon_Electric_Type_Icon.svg/512px-Pok%C3%A9mon_Electric_Type_Icon.svg.png",
    fairy : "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Pok%C3%A9mon_Fairy_Type_Icon.svg/512px-Pok%C3%A9mon_Fairy_Type_Icon.svg.png",
    fighting : "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Pok%C3%A9mon_Fighting_Type_Icon.svg/512px-Pok%C3%A9mon_Fighting_Type_Icon.svg.png",
    fire : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Pok%C3%A9mon_Fire_Type_Icon.svg/512px-Pok%C3%A9mon_Fire_Type_Icon.svg.png",
    flying: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Pok%C3%A9mon_Flying_Type_Icon.svg/512px-Pok%C3%A9mon_Flying_Type_Icon.svg.png",
    ghost: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Pok%C3%A9mon_Ghost_Type_Icon.svg/512px-Pok%C3%A9mon_Ghost_Type_Icon.svg.png",
    grass: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Pok%C3%A9mon_Grass_Type_Icon.svg/512px-Pok%C3%A9mon_Grass_Type_Icon.svg.png",
    ground : "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Pok%C3%A9mon_Ground_Type_Icon.svg/512px-Pok%C3%A9mon_Ground_Type_Icon.svg.png",
    ice : "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Pok%C3%A9mon_Ice_Type_Icon.svg/64px-Pok%C3%A9mon_Ice_Type_Icon.svg.png",
    normal: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Pok%C3%A9mon_Normal_Type_Icon.svg/512px-Pok%C3%A9mon_Normal_Type_Icon.svg.png",
    poison : "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Pok%C3%A9mon_Poison_Type_Icon.svg/512px-Pok%C3%A9mon_Poison_Type_Icon.svg.png",
    psychic: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Pok%C3%A9mon_Psychic_Type_Icon.svg/512px-Pok%C3%A9mon_Psychic_Type_Icon.svg.png",
    rock : "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Pok%C3%A9mon_Rock_Type_Icon.svg/512px-Pok%C3%A9mon_Rock_Type_Icon.svg.png",
    steel : "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Pok%C3%A9mon_Steel_Type_Icon.svg/512px-Pok%C3%A9mon_Steel_Type_Icon.svg.png",
    water : "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Pok%C3%A9mon_Water_Type_Icon.svg/512px-Pok%C3%A9mon_Water_Type_Icon.svg.png"
};

const colors = {
    fire: '#FDDFDF',
    grass: '#A3FFC1',
	electric: '#FCF7DE',
	water: '#A6D5FF',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#CAAAFF',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5',
	steel: '#DEDEDE',
	ice: "#C7DEE5",
	ghost: "#D2C5E6"
}


const pokemons = document.getElementsByClassName('pokemon');

function trimTypes(array) {
	let newArray = [];
	for (let i = 0; i < array.length; i++) {
		const element = array[i];
		newArray.push(element.trim());
		
	}

	return newArray;
}

function createImageArray(array,element){
	
	for (let index = 0; index < array.length; index++) {
		const type = array[index];
		let img = document.createElement('img');
		img.src = typeIcons[type];
		img.title = `Pokemon Type: ${type}`;
		
		img.style.width = '35px';
		img.style.height = '35px';
		element.appendChild(img);

	}
}

function createImageSolo(pokeType,element){
	
	let img = document.createElement('img');
	img.src = typeIcons[pokeType];
	img.title = `Pokemon Type: ${pokeType}`;
	img.style.width = '35px';
	img.style.height = '35px';
	element.appendChild(img);

}


for (let i = 0; i < pokemons.length; i++) {
    const element = pokemons[i];
    let pokeType = document.getElementsByClassName('poke-type')[i].textContent;

	let arrayTypes;
	
	if(pokeType.includes('/')) {
		arrayTypes = pokeType.split('/');
		arrayTypes = trimTypes(arrayTypes);
		createImageArray(arrayTypes,element);
	}
	else{
		createImageSolo(pokeType.trim(),element);

	} 
	
	
	

    pokeType.includes('/') ? pokeType = pokeType.split('/')[0] : pokeType;



    element.style.backgroundColor = colors[pokeType.trim()];
    
}
