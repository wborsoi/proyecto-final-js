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

    let inputFiltroTareas = document.getElementById("INPUT_FILTRO_TAREAS");
    inputFiltroTareas.onchange = (criterio) => {
        localStorage.setItem("TareaFiltro", criterio.target.value);
        actualizarTareasDOM();
    }
    let filterNumber = localStorage.getItem("TareaFiltro");
    let DOMElement = document.getElementById(("INPUT_FILTRO_TAREAS-V" + filterNumber));
    DOMElement.setAttribute("selected", true);

    actualizarTareasDOM();
    actualizarNotasDOM();
}
