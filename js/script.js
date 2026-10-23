<<<<<<< HEAD
console.log("Olá, Izabella!");

const nome= "Izabella Souza Matos";
let hora = new Date() .getHours();
console.log(hora);

let saudacacao;
if (hora < 12) {
    saudacacao = "Bom dia!";
} else if (hora >= 12 && hora < 18) {
    saudacacao = "Boa tarde!";
} else {
    saudacacao = "Boa noite!";
}
console.log(saudacacao);

const título= document.querySelector("h1");
título.textContent= saudacacao + ",eu sou a " + nome;
=======
console.log("Olá, Izabella!");

const nome= "Izabella Souza Matos";
let hora = new Date() .getHours();
console.log(hora);

let saudacacao;
if (hora < 12) {
    saudacacao = "Bom dia!";
} else if (hora >= 12 && hora < 18) {
    saudacacao = "Boa tarde!";
} else {
    saudacacao = "Boa noite!";
}
console.log(saudacacao);

const título= document.querySelector("h1");
título.textContent= saudacacao + ",eu sou a " + nome;
>>>>>>> 51796b1215c95e7ffb7ee21343f57a6bcba13de0
