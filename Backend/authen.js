

async function recupWorks() {
    const work = await fetch("http://localhost:5678/api/works").then(work => work.json());
    return work;

}



const clef = window.sessionStorage.getItem("clef"); // récupère la clef et la stock dans une variable

if (clef !== null) {
    // création du div qui sera la bande noire du  mode édition
    const bandeNoire = document.createElement("div");
    //je lui donne une class pour pouvoir le gérer en css
    bandeNoire.classList.add("edition");
    //création du div qui contiendra le texte et l'icone
    const editeur = document.createElement("div")
    editeur.classList.add("editeur")
    //texte 
    const paragraphe = document.createElement("button")
    paragraphe.classList.add("btnModification");
    paragraphe.innerText = " \u270F mode edition";// en attendant de trouver le bon symbole, j'ai mis ça

    //appel de la fonction générerDynamiquement
    paragraphe.addEventListener("click", async function () {
        modal1();
    })

    //mise en place dans l'arbre dom
    editeur.appendChild(paragraphe);
    bandeNoire.appendChild(editeur);
    const header = document.getElementById("header")
    const body = document.body
    // j'utilise la method insertBefore
    body.insertBefore(bandeNoire, header);

    //ajout du logout
    const logout = document.querySelector(".noLine")
    logout.innerHTML = "logout"
}

async function ajouterImage(image) {

    try {

        const reponse = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {

                "Authorization": `bearer ${clef}`// j'inclus la clef d'authorisation pour avoir le droit d'accès
            },
            body: image
        })// Convertir les données de l'objet FormData en un objet JavaScript pour l'afficher dans la console
        const formDataObject = {};
        for (let [key, value] of image.entries()) {
            formDataObject[key] = value;
        }

        console.log("Données envoyées :", formDataObject);
        const resultat = reponse.json();
        console.log("résultat :", resultat)
        console.log(reponse.status)
    } catch (erreur) {
        console.error("erreur : ", erreur)
    }


}
/**<form action='http://localhost/traitementbackend' method='POST'>
 * <button type='submit'>Envoyer</button>s
 */

const myForm = document.querySelector("#myForm")
const infoformulaire = new FormData(myForm)


// fonction pour supprimer les images
    async function modifierImage(id) {
        try {
            const response = await fetch(`http://localhost:5678/api/works/${id}`, {
                method: "DELETE", // ou "PATCH" selon votre cas d'utilisation
                headers: {
                    "Authorization": `Bearer ${clef}`, // Assurez-vous que votre clé d'autorisation est correcte
                }
            });
    
            if (response.ok) {
                console.log(`Image avec l'ID ${id} supprimée avec succès.`);
                alert("Image  supprimée avec succès.");
            } else {
                console.error(`La suppression de l'image avec l'ID ${id} a échoué.`);
            }
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'image :', error);
        }
    }





async function modal1() {

    //apparition de la modal
    const overlay = document.querySelector(".overlay")
    overlay.style.display = "block"//la modal passe de display : none à block, ce qui la fait apparaitre

    //récupération de divModal1
    const divModal1 = document.querySelector(".divModal1")
    const divTravaux = document.querySelector(".divTravaux")
    //récupère les images
    const works = await recupWorks()

    for (let i = 0; i < works.length; i++) {

        //création d'une balise figure
        const figure = document.createElement("figure");
        //ajout des image en background
        figure.style.backgroundImage = "url(" + works[i].imageUrl + ")";
        figure.style.backgroundSize = "cover"
        //création de la balise img
        const image = document.createElement("img");
        // affectation de l'url de l'image de la corebil
        image.src = "https://cdn.icon-icons.com/icons2/17/PNG/256/recyclebinfilled_recycling_full_garbage_1993.png";
        image.classList.add("btnsupprime");
        // mise en place du alt au cas l'image ne s'affiche pas
        image.alt = works[i].title;
        //récupère l'id de l'image
        image.dataset.idImage = works[i].id;
        //mise en place des éléments enfants de la balise figure
        figure.appendChild(image);
        //ajout du tout dans ma section ensemble de travaux
        divTravaux.appendChild(figure)

    }


    //tous léléments de la première modal sont ajouté à la div
    divModal1.appendChild(divTravaux)

    //tous léléments de la première modal sont ajouté au DOM
    document.body.appendChild(divModal1);

    const btnsupprime = document.querySelectorAll(".btnsupprime");

    btnsupprime.forEach(btnsupprime => {
        btnsupprime.addEventListener("click", async function () {
            const idImage = btnsupprime.dataset.idImage;
            modifierImage(idImage)
        })
    });
}


//écoute du click sur le bouton ajouter une image
const btnAjoutImage = document.querySelector(".btnAjoutImage")
btnAjoutImage.addEventListener("click", async function () {

    //disparition de la première modal
    const divModal1 = document.querySelector(".divModal1")
    divModal1.style.display = "none"

    const divModal2 = document.querySelector(".divModal2")
    divModal2.style.display = "block"

    const galerieModal2 = document.querySelector(".galerieModal2")
    galerieModal2.innerHTML = "Ajout photo";


    const travauxModal2 = document.querySelector(".travauxModal2")

    travauxModal2.setAttribute("id", "travauxModal2")
/*
    //récupération de l'image du rectangle
    const imgRectangle = document.querySelector(".imgRectangle")

    // récupérer les input
    const inputTitre = document.querySelector(".inputTitre")
    const inputCategorie = document.querySelector(".inputCategorie")
    const searchImage = document.querySelector("#searchImage")
    //récupérer le bouton validé
    const btnValider = document.querySelector("#btnValider")

    infoformulaire.append("title", inputTitre.value)
    infoformulaire.append("imageUrl", searchImage.value)
    infoformulaire.append("categoryId", inputCategorie.value)
    infoformulaire.append("id", 0)
    infoformulaire.append("userId", 0)
   
   */ btnValider.addEventListener("click", async function () {
        /* if (searchImage && inputCategorie && inputTitre) {
             imgRectangle.src = searchImage.value
             console.log(inputTitre.value)
             console.log(searchImage.value)
             console.log(inputCategorie.value)
             
         }*/
        ajouterImage(infoformulaire)
    })

    //tous léléments de la deuxieme modal sont ajouté au DOM
    /**comme j'ai tout nettoyé, il fallait que je le redéfinisse avec un appendChild pour que le nouveau titre apparaisse */
    divModal2.appendChild(travauxModal2)
    /*  if (searchImage.value) {
          ajouterImage()
          console.log("ça marche")
      }*/
})

const btnback = document.querySelector("#btnback")
btnback.addEventListener("click", async function () {

    const divModal1 = document.querySelector(".divModal1")
    divModal1.style.display = "block"

    const divModal2 = document.querySelector(".divModal2")
    divModal2.style.display = "none"
})

const btnFermer = document.querySelector("#btnFermer")
btnFermer.addEventListener("click", async function () {

    const divModal1 = document.querySelector(".divModal1")
    divModal1.style.display = "none"

    const divModal2 = document.querySelector(".divModal2")
    divModal2.style.display = "none"


    const overlay = document.querySelector(".overlay")
    overlay.style.display = "none"
})





/**
 * l'idée serait de créer tous les styles de tous les types de modal et de les masquer.
 * lorsque je clique sur le bouton ajouter une image
 */




/*<figure style='background-image:url(chemin vers image)'><img src='icone de suppression'/></figure>*/






/**
 * mettre l'image en background
 * <figure style='background-size:cover;background-repeat:no-repeat;width:120px;heigth:200px;background-image:url(http:// ....)' alt="nom de l'image">
<img src="http:/imagedu bouton" alt="supprimer"/>
</figure> */


/*// modification du login en logout
 const logout = document.getElementById("noLine");
 console.log(logout)
 logout.innerText = "logout"

//récupère son parent
const ul = document.getElementById("logParent");
ul.appendChild(logout)*/
//
