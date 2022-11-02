function agregarNota({ texto, color }) {
    let nota = {
        id: getNotaID(),
        texto: texto,
        color: color
    };
    let listaNotas = obtenerListadoNotas(); // Se obtendran todas las notas ya agregadas previamente.
    if (!listaNotas) {
        listaNotas = [];
    }
    listaNotas.push(nota);
    console.log(listaNotas);

    localStorage.setItem("NotasList", JSON.stringify(listaNotas));
    location.reload()
    //guardarNota(listaNotas); // Por ultimo se guarda la nueva lista de notas
}

function eliminarNota(id) {
    animarNotaEliminar(id);

    let notasList = obtenerListadoNotas();

    let index = notasList.findIndex((nota) => nota.id == id);
    notasList.splice(index, 1);

    localStorage.setItem("NotasList", JSON.stringify(notasList));

    setTimeout(actualizarNotasDOM, 800);
}

function obtenerListadoNotas() {
    let notasList = JSON.parse(localStorage.getItem('NotasList'));     //Para el desafio se deja un placeholder.
    return notasList;  // Se obtiene el listado de notas desde el almacenamiento local
}


function procesarFormNota(e) {
    e.preventDefault();
    let formulario = e.target;
    let nota = {
        texto: formulario.inputNotaTexto.value,
        color: 0
    };
    let colorSeleccionado = {
        color1: document.getElementById("INPUT_NOTA_COLOR_1").checked,
        color2: document.getElementById("INPUT_NOTA_COLOR_2").checked,
        color3: document.getElementById("INPUT_NOTA_COLOR_3").checked,
        color4: document.getElementById("INPUT_NOTA_COLOR_4").checked,
        color5: document.getElementById("INPUT_NOTA_COLOR_5").checked,
    }
    if (colorSeleccionado.color1) {
        nota.color = 1;
    }
    else if (colorSeleccionado.color2) {
        nota.color = 2;
    }
    else if (colorSeleccionado.color3) {
        nota.color = 3;
    }
    else if (colorSeleccionado.color4) {
        nota.color = 4;
    }
    else if (colorSeleccionado.color5) {
        nota.color = 5;
    }

    if (nota.texto == "") {
        swal("Por favor escribir una nota antes de guardar");
    }
    else {
        agregarNota(nota);
    }
}
