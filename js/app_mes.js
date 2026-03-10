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

function onFormSubmit(event){
    event.preventDefault();
    const data = new FormData(event.target);
    const titulo = data.get("titulo");
    const descripcion = data.get("descripcion");

    
    const jsonNota = {"titulo":titulo, "descripcion":descripcion, "mes":mes};

    //extraigo la lista de notas de localstorage
    const lsNotaStr = localStorage.getItem("calendarioNota");
    let lsNotaJson  = [];
    
    if (lsNotaStr != null){
        lsNotaJson = JSON.parse(lsNotaStr);
    }

    lsNotaJson.push(jsonNota);
    listarNota(jsonNota);
    localStorage.setItem("calendarioNota",JSON.stringify(lsNotaJson));
    
    form.reset();
}

function getMonth(intMes){
    lsMeses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
    return lsMeses[intMes];
};
function listarNota(nota) {
    const nuevaLista = document.createElement('li');
    nuevaLista.innerHTML = `<b>${nota.titulo}</b> ${nota.descripcion}`;
    nuevaLista.appendChild(crearBtnEliminar(nuevaLista,nota));
    listaNotas.appendChild(nuevaLista);
}
function crearBtnEliminar(nuevaLista,nota) {
    const btnEliminar = document.createElement('button');
     btnEliminar.textContent = 'Eliminar nota';
    btnEliminar.type = 'button';
    btnEliminar.addEventListener('click', () => {
        nuevaLista.remove();
        eliminarNotaStorage(nota);
    });
    return btnEliminar;
}

function eliminarNotaStorage(nota) {
    let notaBorrado = localStorage.getItem("calendarioNota");
    notaBorrado = JSON.parse(notaBorrado);
    for (let i = 0; i < notaBorrado.length; i++) {
        if ((notaBorrado[i].mes === nota.mes)&& (notaBorrado[i].titulo === nota.titulo)&&(notaBorrado[i].descripcion === nota.descripcion)) {
            
        }
    }
    
localStorage.setItem("calendarioNota",JSON.stringify(notaBorrado));
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
