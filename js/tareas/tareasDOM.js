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
