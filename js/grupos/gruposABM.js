let gruposDummy = [
    {
        nombre: "General"
    },
    {
        nombre: "Coderhouse"
    }
];

function agregarGrupo(nombre) {
    let listaGrupos = obtenerListadoGrupos(); // Se obtendra el listado de grupos de tareas
    listaGrupos.push({ nombre: nombre });
    //guardarGrupo(listaGrupos);
}

function obtenerListadoGrupos() {
    gruposList = gruposDummy;       //Para el desafio se deja un placeholder.
    return gruposList;  // Se obtiene el listado de grupos desde el almacenamiento local
}
