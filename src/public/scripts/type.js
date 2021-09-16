const types = document.getElementsByClassName('poke-type');
const profile = document.querySelector('.profile');
const profileType = document.querySelector('.profile-type');
const messageType = document.querySelector('.message-type');


function getMax(json){
    let maxName;
    let max=0;
    for (const key of Object.keys(json)) {
        if(json[key] > max){
            maxName = key;
            max = json[key];
        }
    }

    return maxName
}


function createImageTypeProfile(pokeType,element){
	
	let img = document.createElement('img');
	img.src = typeIconsForProfile[pokeType];
	img.title = `Trainer Type: ${pokeType}`;
	img.style.width = '35px';
	img.style.height = '35px';
	element.appendChild(img);

}

const typeIconsForProfile = {
    bug : "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Pok%C3%A9mon_Bug_Type_Icon.svg/512px-Pok%C3%A9mon_Bug_Type_Icon.svg.png",
    dark : "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Pok%C3%A9mon_Dark_Type_Icon.svg/512px-Pok%C3%A9mon_Dark_Type_Icon.svg.png",
    dragon : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Pok%C3%A9mon_Dragon_Type_Icon.svg/512px-Pok%C3%A9mon_Dragon_Type_Icon.svg.png",
    electric: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Pok%C3%A9mon_Electric_Type_Icon.svg/512px-Pok%C3%A9mon_Electric_Type_Icon.svg.png",
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

const colorsForProfile = {
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
const typeRank = {
    fire: 0,
    grass: 0,
	electric: 0,
	water: 0,
	ground: 0,
	rock: 0,
	fairy: 0,
	poison: 0,
	bug: 0,
	dragon: 0,
	psychic: 0,
	flying: 0,
	fighting: 0,
	normal: 0,
	steel: 0,
	ice: 0,
	ghost: 0,
    dark: 0
}

for (let i = 0; i < types.length; i++) {
    let type = types[i].textContent.trim();
    if(type.includes('/')){
        type = type.split('/');
        typeRank[type[0]]= typeRank[type[0]] + 1;
        typeRank[type[1]]= typeRank[type[1]] + 1;
    }
    else{
        typeRank[type]= typeRank[type] + 1;
    }

}

createImageTypeProfile(getMax(typeRank).trim(),profileType);    

profile.style.backgroundColor = colorsForProfile[getMax(typeRank).trim()];
console.log(messageType);
if(messageType)messageType.style.color = colorsForProfile[messageType.textContent.trim()];
