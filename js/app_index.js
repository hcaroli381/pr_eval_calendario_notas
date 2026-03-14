
const listaNotas = document.querySelector("#listaNotas");
const btnListaNotas = document.querySelector("#btnListaNotas");
const btnLimpiarCalendario = document.querySelector("#btnLimpiarCalendario");
const listaMeses = document.querySelectorAll(".item");

console.log(listaMeses);

//TODO : estilo a meses pares por probar que funciona
function aplicarEstilosMeses() {
    let notasGenerales = "";

    notasGenerales = JSON.parse(localStorage.getItem("calendarioNota")) || [];
    console.log(notasGenerales);

    for (let i = 0; i < listaMeses.length; i++) {
        for (let j = 0; j < notasGenerales.length; j++) {
            if (notasGenerales[i] !== null) {
                listaMeses[i].classList.add("notasAdded");
            }

        }

    }
};

let notasGlobales = JSON.parse(localStorage.getItem("calendarioNota")) || [];
aplicarEstilosMeses();

btnLimpiarCalendario.addEventListener("click", () => {
    if (confirm("¿Estás seguro de borrar TODAS las notas?")) {
        localStorage.removeItem("calendarioNota");
        location.reload();
    }
});
