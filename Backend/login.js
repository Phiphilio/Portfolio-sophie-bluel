
const buttonLogin = document.getElementById("buttonLogin");

buttonLogin.addEventListener("click", async function (event) {
    event.preventDefault();
    console.log("ça soumet")

    const emailInput = document.getElementById("email").value;

    const passwordInput = document.getElementById("password").value;

    const identifiants = {
        email: emailInput,
        password: passwordInput
    };

    const chargeUtile = JSON.stringify(identifiants);// convertit les données en json 

    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: chargeUtile,
    })
        .then(response => {
            console.log(response.status);
            if (response.status === 404) {
                alert("erreur dans l'identifiant ou le mot de passe"); // affiche ce message sur une fenêtre 
            }

            return response.json(); //renvoie les données sous la forme d'un objet javascript
        })
        .then(data => {
            if (data && data.token) {
                window.sessionStorage.setItem("clef", data.token);
                window.location.href = "../frontend/index.html"; // redirige l'utilisateur vers la page d'accueil qui sera modifiée
            }
        })
        .catch(error => {
            console.error("Erreur lors de la requête :", error);
        });

})
