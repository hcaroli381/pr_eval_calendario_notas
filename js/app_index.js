const params = new URLSearchParams(window.location.search);
const mes = Number(params.get("mes"));
const listaNotas = document.querySelector("#listaNotas");
const btnListaNotas = document.querySelector("#btnListaNotas");
const btnLimpiarCalendario = document.querySelector("#btnLimpiarCalendario");


let notasGlobales = JSON.parse(localStorage.getItem("calendarioNotas")) || [];


btnLimpiarCalendario.addEventListener("click", () => {
    if (confirm("¿Estás seguro de borrar TODAS las notas?")) {
        localStorage.removeItem("calendarioNotas");
        location.reload();
    }
});

btnListaNotas.addEventListener("click", () => {
    listaNotas.innerHTML = "";
    notasGlobales.forEach(n => {
        const item = document.createElement("li");
        item.textContent = `Mes ${n.mes + 1}: ${n.titulo}`;
        listaNotas.appendChild(item);
    });
});