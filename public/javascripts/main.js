const reload = document.getElementById('reload');
reload.addEventListener('click', () => {
    location.reload();
})

const form = document.getElementById('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    fetch('/files?target=/uploads', {
        method: 'POST',
        body: formData
    }).then((response) => {
        form.innerHTML = "Bien joué josué !";
        if (response.status !== 201) {
            form.innerHTML = "T'es moche josh !";
        }
        console.log(response);
    }).catch((err) => {
        console.log(err);
    })
});

const formDelete = document.getElementById('form-delete');
const formInput = document.getElementById('fileDelete');
formDelete.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(formDelete);
    console.log(formInput.value);
    fetch(`/files?target=/uploads/${formInput.value}`, {
        method: 'DELETE',
        body: formData
    }).then((response) => {
        formDelete.innerHTML = "Bien joué josué !";
        if (response.status !== 201) {
            formDelete.innerHTML = "T'es moche josh !";
        }
        console.log(response);
    }).catch((err) => {
        console.log(err);
    })
} );

const formRename = document.getElementById('form-rename');
const formInputRename = document.getElementById('fileRename');
const formInputRenameTo = document.getElementById('fileRenameTo');
formRename.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(formRename);
    fetch(`/files?target=/uploads/${formInputRename.value}&to=${formInputRenameTo.value}`, {
        method: 'PUT',
        body: formData
    }).then((response) => {
        formRename.innerHTML = "Bien joué josué !";
        if (response.status !== 201) {
            formRename.innerHTML = "T'es moche josh !";
        }
        console.log(response);
    }).catch((err) => {
        console.log(err);
        formRename.innerHTML = "T'es moche patoche !";
    })
});
