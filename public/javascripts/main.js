const signIn = document.getElementById('sign-in-form');

signIn.addEventListener('submit', (e) => {

});
const data = () => {
    const data = {
        email: signIn.email.value,
        lastname: signIn.lastname.value,
        firstname: signIn.firstname.value,
        role: signIn.role.value,
    }
    console.log(data);
}


const createUser = () => {
    const data = {
        email: signIn.email.value,
        lastname: signIn.lastname.value,
        firstname: signIn.firstname.value,
        role: signIn.role.value,
    }
    console.log(data);

    fetch('http://localhost:3000/api/users', {
        method: 'POST',
        body: JSON.stringify(data)

    })
}