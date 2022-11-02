function cambiarColorNotaDOM(color) {
    for (let i = 1; i <= 5; i++) {
        document.getElementsByClassName("note-modal-container")[0].classList.remove(("note-color" + i));
    }
    document.getElementsByClassName("note-modal-container")[0].classList.add(("note-color" + color));
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
