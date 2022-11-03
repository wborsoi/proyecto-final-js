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

function getUsuarioLogin() {
    fetch("https://randomuser.me/api/")
        .then((response) => response.json())
        .then((json) => actualizarDOMUsuario(json.results[0]));

    const actualizarDOMUsuario = (usuario) => {
        console.log("usuario:", usuario);

        let {name, picture, email, login: {username}} = usuario
        let DOM_foto_perfil = document.getElementById("USER_PICTURE");
        console.log("picture:", picture)
        DOM_foto_perfil.src = picture.thumbnail;

        let DOM_nombre = document.getElementById("USER_FISTNAME");
        DOM_nombre.innerHTML = name.first;

        let DOM_apellido = document.getElementById("USER_LASTNAME");
        DOM_apellido.innerHTML = name.last;

        let DOM_email = document.getElementById("USER_EMAIL");
        DOM_email.innerHTML = email;

        let DOM_username = document.getElementById("USER_USERNAME");
        DOM_username.innerHTML = username;
    }
}