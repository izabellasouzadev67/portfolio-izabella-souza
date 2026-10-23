console.log("Olá, Izabella!");
const nome= "Izabella Souza Matos";
let hora = new Date() .getHours();
console.log(hora);
let saudacao;
if (hora < 12) {
    saudacao = "Bom dia!";
} else if (hora >= 12 && hora < 18) {
    saudacao = "Boa tarde!";
} else {
    saudacao = "Boa noite!";
}
console.log(saudacao);
const título= document.querySelector("h1");
título.textContent= saudacao + ",eu sou a " + nome; 
console.log("Olá, Izabella!");
