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

function agregarGrupo(nombre) {
    let listaGrupos = obtenerListadoGrupos(); // Se obtendra el listado de grupos de tareas
    listaGrupos.push({ nombre: nombre });
    //guardarGrupo(listaGrupos);
}

function eliminarTarea(id) {
    let tareasList = obtenerListadoTareas();

    let index = tareasList.findIndex((tarea) => tarea.id == id);
    tareasList.splice(index, 1);

    localStorage.setItem("TareasList", JSON.stringify(tareasList));

    actualizarTareasDOM();
}

function eliminarNota(id) {
    animarNotaEliminar(id);

    let notasList = obtenerListadoNotas();

    let index = notasList.findIndex((nota) => nota.id == id);
    notasList.splice(index, 1);

    localStorage.setItem("NotasList", JSON.stringify(notasList));

    setTimeout(actualizarNotasDOM, 800);
}

/******     [Instancias de Objetos Placeholder]   ******/
let tareasDummy = [
    {
        id: 1,
        titulo: "Sacar a pasear al perro el sabado",
        descripcion: "",
        prioridad: 1,
        vencimiento: null,
        grupo: {
            nombre: "General"
        }
    },
    {
        id: 2,
        titulo: "Entregar desafio de coderhouse",
        descripcion: "Desario de 'Incorporar Arrays'",
        prioridad: 3,
        vencimiento: "13/09/2022 23:59",
        grupo: {
            nombre: "Coderhouse"
        }
    }
];

let notasDummy = [
    {
        id: 1,
        texto: "Todos los jueves sale capitulo nuevo de She-Hulk",
        color: "#FFE68A"
    },
    {
        id: 2,
        texto: "Quien aprende de sus caidas, no se ha equivocado",
        color: "#FFE68A"
    }
];

let gruposDummy = [
    {
        nombre: "General"
    },
    {
        nombre: "Coderhouse"
    }
];

/******     [END]      ******/

function obtenerListadoNotas() {
    let notasList = JSON.parse(localStorage.getItem('NotasList'));     //Para el desafio se deja un placeholder.
    return notasList;  // Se obtiene el listado de notas desde el almacenamiento local
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

function obtenerListadoGrupos() {
    gruposList = gruposDummy;       //Para el desafio se deja un placeholder.
    return gruposList;  // Se obtiene el listado de grupos desde el almacenamiento local
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

function inicializarEventos() {
    let formTareas = document.getElementById("FORM_TAREAS");
    formTareas.addEventListener("submit", procesarFormTarea);

    let formNotas = document.getElementById("FORM_NOTAS");
    formNotas.addEventListener("submit", procesarFormNota);


    let inputNotaColor1 = document.getElementById("INPUT_NOTA_COLOR_1");
    let inputNotaColor2 = document.getElementById("INPUT_NOTA_COLOR_2");
    let inputNotaColor3 = document.getElementById("INPUT_NOTA_COLOR_3");
    let inputNotaColor4 = document.getElementById("INPUT_NOTA_COLOR_4");
    let inputNotaColor5 = document.getElementById("INPUT_NOTA_COLOR_5");
    inputNotaColor1.onclick = () => { cambiarColorNotaDOM(1) };
    inputNotaColor2.onclick = () => { cambiarColorNotaDOM(2) };
    inputNotaColor3.onclick = () => { cambiarColorNotaDOM(3) };
    inputNotaColor4.onclick = () => { cambiarColorNotaDOM(4) };
    inputNotaColor5.onclick = () => { cambiarColorNotaDOM(5) };

    actualizarTareasDOM();
    actualizarNotasDOM();
}

function cambiarColorNotaDOM(color) {
    for (let i = 1; i <= 5; i++) {
        document.getElementsByClassName("note-modal-container")[0].classList.remove(("note-color" + i));
    }
    document.getElementsByClassName("note-modal-container")[0].classList.add(("note-color" + color));
}

function addTareaDOM({ id, titulo, descripcion, prioridad, vencimiento, grupo }) {
    let DOMListado = document.getElementsByClassName("task-list")[0];
    let article_tarea = document.createElement("article");
    article_tarea.classList.add("task-container");
    article_tarea.id = id;
    //let div_BtnCheck = `<div class="task-markAsCompleted-container"><button class="task-markAsCompleted-btn"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16"><path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" /></svg></button></div>`;
    let div_BtnCheck = document.createElement("div");
    div_BtnCheck.classList.add("task-markAsCompleted-container");

    let btnCheck = document.createElement("button");
    btnCheck.classList.add("task-markAsCompleted-btn");
    btnCheck.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16"><path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" /></svg>`;
    btnCheck.addEventListener("click", () => {
        eliminarTarea(id);
    });

    div_BtnCheck.append(btnCheck);

    let div_info = document.createElement("div");

    let h3_titulo = document.createElement("h3");
    h3_titulo.innerHTML = titulo;

    let p_vencimiento = document.createElement("p");
    if (vencimiento) {
        let vencimientoIcono = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar4" viewBox="0 0 16 16"> <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1H2zm13 3H1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5z" /> </svg>`;
        let span_vencimiento = `<span class="fw-bold"> Vencimiento: </span>`;
        p_vencimiento.innerHTML += vencimientoIcono;
        p_vencimiento.innerHTML += span_vencimiento;
        p_vencimiento.append((new Date(vencimiento)).toLocaleString('es-AR'));
    }

    let p_descripcion = document.createElement("p");
    p_descripcion.innerHTML = descripcion;

    div_info.append(h3_titulo, p_vencimiento, p_descripcion);

    //article_tarea.innerHTML += div_BtnCheck;
    article_tarea.append(div_BtnCheck, div_info);

    DOMListado.append(article_tarea);
}

function addNotaDOM({ id, texto, color }) {
    let color_classname = "note-color" + color;
    let random_number = Math.floor(Math.random()*100);
    let note_animation_side = ((random_number % 2) == 1) ? "note-animation-left" : "note-animation-right";
    let DOM_Listado = document.getElementsByClassName("notes-list-container")[0];
    let article_nota = document.createElement("article");
    article_nota.classList.add("note-container", note_animation_side, color_classname);
    article_nota.id = id;

    let btn_eliminar = document.createElement("button");
    btn_eliminar.classList.add("note-btn-remove", "btn", "btn-danger");
    btn_eliminar.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16"><path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/></svg>`;
    btn_eliminar.addEventListener("click", () => {
        swal("¿Esta seguro que desea eliminar la nota?", {
            dangerMode: true,
            buttons: {
                cancelar: {
                    className:'btn btn-secondary',
                    text: "Cancelar",
                    value: "cancelar",
                },
                eliminar: {
                    className:'btn btn-danger',
                    text: "Eliminar",
                    value: "eliminar",
                }
            },
        }).then((value) => {
            console.log(value)
            switch (value) {
                case "eliminar":
                    eliminarNota(id);
                    break;
            }
        });
    });

    let h3_texto = document.createElement("h3");
    h3_texto.innerHTML = texto;

    article_nota.append(btn_eliminar, h3_texto);
    DOM_Listado.append(article_nota);
}

function actualizarTareasDOM() {
    let DOMListado = document.getElementsByClassName("task-list")[0];
    DOMListado.innerHTML = "";
    let listaTareas = obtenerListadoTareas();
    if (listaTareas) {
        for (const tarea of listaTareas) {
            addTareaDOM(tarea);
        }
    };
}

function actualizarNotasDOM() {
    let DOMListado = document.getElementsByClassName("notes-list-container")[0];
    DOMListado.innerHTML = "";
    let listaNotas = obtenerListadoNotas();
    if (listaNotas) {
        for (const nota of listaNotas) {
            addNotaDOM(nota);
        }
    };

    //Al final se añade el boton para agregar una nueva nota.
    DOMListado = document.getElementsByClassName("notes-list-container")[0];
    let section_nuevaNota = document.createElement("section");
    section_nuevaNota.classList.add("note-container", "note-new");
    section_nuevaNota.innerHTML = `
        <button class="btn-note-new" data-bs-toggle="modal" data-bs-target="#nuevaNotaModal">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                class="bi bi-pen" viewBox="0 0 16 16">
                <path
                    d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
            </svg>
        </button>`;
    DOMListado.append(section_nuevaNota);
}

function getTareaID() {
    const id = Number.parseInt(localStorage.getItem("TareaID"));
    if (id) {
        localStorage.setItem("TareaID", (id + 1));
        return id + 1;
    }
    else {
        console.log("TareaID: No se encontro el id" + id, typeof id)
        localStorage.setItem("TareaID", 1);
        return 1;
    }
}

function getNotaID() {
    const id = Number.parseInt(localStorage.getItem("NotaID"));
    if (id) {
        localStorage.setItem("NotaID", (id + 1));
        return id;
    }
    else {
        localStorage.setItem("NotaID", 1);
        return 1;
    }
}

function animarNotaEliminar(id) {
    const animationKeyframes = [
        {
            transform: 'translateZ(0) translateX(0)',
            opacity: 1
        },
        {
            transform: 'translateZ(600px) translateX(-400px)',
            opacity: 0
        }
    ];

    let notasList = document.getElementsByClassName("note-container");
    let DOM_nota;
    for (const nota of notasList) {
        if (nota.id == id) {
            DOM_nota = nota;
        }
    }

    if (DOM_nota) {
        DOM_nota.classList.add("swing-out-left-bck");
        //DOM_nota.animate(animationKeyframes);
    }
}

