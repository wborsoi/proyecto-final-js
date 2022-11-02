function agregarTarea({ titulo, descripcion, prioridad, vencimiento, grupo }) {
    let tarea = {
        id: getTareaID(),
        titulo: titulo,
        descripcion: descripcion,
        prioridad: prioridad,
        vencimiento: vencimiento,
        grupo: grupo
    };
    let listaTareas = obtenerListadoTareas();
    if (!listaTareas) {
        listaTareas = [];
    }
    listaTareas.push(tarea);

    localStorage.setItem("TareasList", JSON.stringify(listaTareas));
    location.reload();
}

function eliminarTarea(id) {
    let tareasList = obtenerListadoTareas();

    let index = tareasList.findIndex((tarea) => tarea.id == id);
    tareasList.splice(index, 1);

    localStorage.setItem("TareasList", JSON.stringify(tareasList));

    actualizarTareasDOM();
}

function obtenerListadoTareas() {
    let tareasList = JSON.parse(localStorage.getItem('TareasList'));   
    return tareasList; 
}

function obtenerListadoTareasPorVencer() {
    let tareasList =  obtenerListadoTareas();
    tareasList.sort((a, b) => {
        if(!a.vencimiento){
            return new Date("01/01/9999") - new Date(b.vencimiento);
        }
        else if (!b.vencimiento) {
            return new Date(a.vencimiento) - new Date("01/01/9999");
        }
        else {
            return new Date(a.vencimiento) - new Date(b.vencimiento);
        }
    });
    return tareasList; 
}

function obtenerListadoTareasPorPrioridad(orden) {
    let tareasList = obtenerListadoTareas();
    tareasList.sort((a, b) => {
        if(orden == "MAYOR"){
            return b.prioridad - a.prioridad;
        }
        else {
            return a.prioridad - b.prioridad;
        }
    });
    return tareasList; 
}

function procesarFormTarea(e) {
    e.preventDefault();
    let formulario = e.target;
    let tarea = {
        titulo: formulario.inputTaskTitulo.value,
        descripcion: formulario.inputTaskDescripcion.value,
        prioridad: formulario.inputTaskPrioridad.value,
        vencimiento: new Date(formulario.inputTaskVencimiento.value),
        grupo: formulario.inputTaskGrupo.value
    }

    if (tarea.titulo == "") {
        swal({
            text: "Por favor completar el titulo de la tarea para poder continuar",
            icon: "error"
        });
    }
    else {
        if (formulario.inputTaskVencimiento.value == "") {
            tarea.vencimiento = null;
        }
        agregarTarea(tarea);
    }

}

