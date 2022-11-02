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
