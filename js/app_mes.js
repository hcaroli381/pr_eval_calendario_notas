const params = new URLSearchParams(window.location.search);
const mes = Number(params.get("mes"));
const btnAddNota = document.querySelector("#btnAddNota");
const nota = document.querySelector("#nota");
const descripcion = document.querySelector("#descripcion");
const listaNotas = document.querySelector("#listaNotas");
const tituloMes = document.querySelector("#tituloMes");
const form = document.querySelector("#frmNota");


console.log(params)
console.log(mes)


form.addEventListener("submit", onFormSubmit);

function onFormSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const titulo = data.get("titulo");
    const descripcion = data.get("descripcion");


    const jsonNota = { "titulo": titulo, "descripcion": descripcion, "mes": mes };

    //extraigo la lista de notas de localstorage
    const lsNotaStr = localStorage.getItem("calendarioNota");
    let lsNotaJson = [];

    if (lsNotaStr != null) {
        lsNotaJson = JSON.parse(lsNotaStr);
    }

    lsNotaJson.push(jsonNota);
    listarNota(jsonNota);
    localStorage.setItem("calendarioNota", JSON.stringify(lsNotaJson));

    form.reset();
}

function getMonth(intMes) {
    lsMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    return lsMeses[intMes];
};
function listarNota(nota) {
    const nuevaLista = document.createElement('li');
    nuevaLista.innerHTML = `<b>${nota.titulo}</b> ${nota.descripcion}`;
    nuevaLista.appendChild(crearBtnEliminar(nuevaLista, nota));
    nuevaLista.appendChild(crearBtnEditar(nuevaLista, nota));
    listaNotas.appendChild(nuevaLista);
}
function crearBtnEliminar(nuevaLista, nota) {
    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'Eliminar nota';
    btnEliminar.type = 'button';
    btnEliminar.addEventListener('click', () => {
        if (confirm("Estas seguro?")) {
            nuevaLista.remove();
            eliminarNotaStorage(nota);
        }

    });
    return btnEliminar;
}
function crearBtnEditar(nuevaLista, nota) {
    const btnEditar = document.createElement('button');
    btnEditar.textContent = 'Editar';
    btnEditar.type = 'button';
    btnEditar.addEventListener('click', () => {
        editarNota(nuevaLista, nota);
    });
    return btnEditar;
}

function eliminarNotaStorage(nota) {

    let listaNotas = localStorage.getItem("calendarioNota");
    listaNotas = JSON.parse(listaNotas);
    for (let i = 0; i < listaNotas.length; i++) {
        if ((listaNotas[i].mes === nota.mes) && (listaNotas[i].titulo === nota.titulo) && (listaNotas[i].descripcion === nota.descripcion)) {
            listaNotas[i] = "";
        }
    }

    localStorage.setItem("calendarioNota", JSON.stringify(listaNotas));
}
function editarNota(nuevaLista, nota) {
    const tituloEditar = form.querySelector('input[name="titulo"]');
    const descripcionEditar = form.querySelector('input[name = "descripcion"]');

    tituloEditar.value = nota.titulo;
    descripcionEditar.value = nota.descripcion;
    nuevaLista.remove();
    eliminarNotaStorage();
    listaNotas.innerHTML = "";
    cargarNotas();
}


//hace que las notas esten en su mes correspondiente
function cargarNotas() {
    if (localStorage.getItem("calendarioNota") != null) {
        const cargaNotas = JSON.parse(localStorage.getItem("calendarioNota"));
        for (let i = 0; i < cargaNotas.length; i++) {
            if (cargaNotas[i].mes === mes) {
                listarNota(cargaNotas[i]);
            }
        }
    }


}
tituloMes.innerHTML = `Notas de ${getMonth(mes)}`;
cargarNotas();
