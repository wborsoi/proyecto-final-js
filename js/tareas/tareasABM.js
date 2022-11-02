function agregarTarea({ titulo, descripcion, prioridad, vencimiento, grupo }) {
    let tarea = {
        id: getTareaID(),
        titulo: titulo,
        descripcion: descripcion,
        prioridad: prioridad,
        vencimiento: vencimiento,
        grupo: grupo
    };
    let listaTareas = obtenerListadoTareas(); // Se obtendran todas las tareas almacenadas previamente
    if (!listaTareas) {
        listaTareas = [];
    }
    listaTareas.push(tarea);

    localStorage.setItem("TareasList", JSON.stringify(listaTareas));
    addTareaDOM(tarea);
    //guardarTarea(listaTareas) // Por ultimo se guarda la nueva lista de tareas
}

function eliminarTarea(id) {
    let tareasList = obtenerListadoTareas();

    let index = tareasList.findIndex((tarea) => tarea.id == id);
    tareasList.splice(index, 1);

    localStorage.setItem("TareasList", JSON.stringify(tareasList));

    actualizarTareasDOM();
}

function obtenerListadoTareas() {
    let tareasList = JSON.parse(localStorage.getItem('TareasList'));    //Para el desafio se deja un placeholder.
    return tareasList;  // Se obtiene el listado de tareas desde el almacenamiento local
}

function obtenerListadoTareasPorVencer() {
    let tareasList = tareasDummy;   //Para el desafio se deja un placeholder.
    tareasList.sort((a, b) => {
        return new Date(b.vencimiento) - new Date(a.vencimiento);
    });
    return tareasList;  // Se obtiene el listado de tareas desde el almacenamiento local
}

function obtenerListadoTareasPorPrioridad() {
    let tareasList = tareasDummy;   //Para el desafio se deja un placeholder.
    tareasList.sort((a, b) => {
        return b.prioridad - a.prioridad;
    });
    return tareasList;  // Se obtiene el listado de tareas desde el almacenamiento local
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
    console.log(formulario.inputTaskVencimiento.value == "")
    if (formulario.inputTaskVencimiento.value == "") {
        tarea.vencimiento = null;
    }
    agregarTarea(tarea);
}

