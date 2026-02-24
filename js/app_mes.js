const btnAddNota = document.querySelector("#btnAddNota");
const nota = document.querySelector("#nota");
const descripcion = document.querySelector("#descripcion");
const listaNotas = document.querySelector("#listaNotas");


btnAddNota.addEventListener("click", function (event) {
    event.preventDefault();
    let ulNotas1 = document.createElement(nota.value);
    let ulNotas2 = document.createElement(descripcion.value);
    listaNotas.appendChild();
})