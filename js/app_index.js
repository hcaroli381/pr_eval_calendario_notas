const params = new URLSearchParams(window.location.search);
const mes = Number(params.get("mes"));
const listaNotas = document.querySelector("#listaNotas");
const btnListaNotas = document.querySelector("#btnListaNotas");
const btnLimpiarCalendario = document.querySelector("#btnLimpiarCalendario");
const listaMeses = document.querySelectorAll(".item");

console.log(listaMeses);

//TODO : estilo a meses pares por probar que funciona
function aplicarEstilosMeses() {
    for (let i = 0; i < listaMeses.length; i++) {
        if (i % 2 == 0) {
            listaMeses[i].classList.add("notasAdded");
        }
    }
}

let notasGlobales = JSON.parse(localStorage.getItem("calendarioNotas")) || [];
aplicarEstilosMeses();

btnLimpiarCalendario.addEventListener("click", () => {
    if (confirm("¿Estás seguro de borrar TODAS las notas?")) {
        localStorage.removeItem("calendarioNotas");
        location.reload();
    }
});

btnListaNotas.addEventListener("click", () => {

    if (localStorage.getItem("calendarioNota") != null) {
        const cargaNotas = JSON.parse(localStorage.getItem("calendarioNota"));
        for (let i = 0; i < cargaNotas.length; i++) {
            if (cargaNotas[i].mes === mes) {
                listarNota(cargaNotas[i]);
            }
        }
    }
});