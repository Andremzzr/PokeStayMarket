const button = document.getElementById('btn-close');

function closeDiv(){ 
    document.getElementById("message-alert").style.display += "none"; 
} 

button.addEventListener('click', closeDiv);

