

async function recupWorks() {
    const work = await fetch("http://localhost:5678/api/works").then(work => work.json());
    return work;

}



const clef = window.sessionStorage.getItem("clef"); // récupère la clef et la stock dans une variable

if (clef !== null) {

    const edition = document.querySelector("#edition");
    edition.style.display = "flex";
    const btnModification = document.querySelector(".btnModification");

    //appel de la fonction modal1()
    btnModification.addEventListener("click", async function () {
        modal1();
    })

    //ajout du logout
    const logout = document.querySelector(".noLine");
    logout.innerHTML = "logout";

    //suppression des groupes
    const groupe = document.querySelector(".groupe");
    groupe.innerHTML = "";

    //ajout du logo à côté du titre
    const portf = document.querySelector(".port-titre span ");
    portf.style.display = "block";
}


/*const submit = document.querySelector("#btnValider");

submit.addEventListener("click", async function(e) {
    const reponse = document.querySelector("#myForm");
    console.log("ça passe");
    e.preventDefault();
    let datas = new FormData(reponse);
    
    try {
        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                "Authorization": `bearer ${clef}`
            },
            body: datas
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log("ça passe aussi");
            // Faire quelque chose avec les données de réponse
        } else {
            console.error("Erreur de réponse du serveur:", response.status);
        }
    } catch (erreur) {
        console.error("Erreur lors de la requête:", erreur);
    }
});*/

const rechercheImage = document.querySelector("#inputId");

rechercheImage.addEventListener("change", async function(){
    await inputChange();
})

async function inputChange() {
    // récupère la valeur de l'input
    const input = document.querySelector("#inputId");
    

      // change l'affichage quand on a chargé une image
   const icone = document.querySelector("#searchImage");
   icone.innerHTML ="";

    // Vérification s'il y a des fichiers sélectionnés
    if (input.files && input.files[0]) {
        const reader = new FileReader();

        // Lecture du contenu du fichier sélectionné en tant qu'URL de données
        reader.readAsDataURL(input.files[0]);

        // Attente que la lecture soit terminée
        await new Promise((resolve, reject) => {
            reader.onload = function (e) {
                // Création d'un élément img pour afficher l'image
                const img = document.createElement('img');
                // attribution d'une class
                img.classList.add("previewRectangle")
                // Définition de la source de l'image avec l'URL de données
                img.src = e.target.result;
                // Ajout de l'image à l'élément de prévisualisation
                icone.appendChild(img);
                resolve();
            };
        });
    } }

/* 
    const icone = document.querySelector("#searchImage");
    icone.innerHTML ="";

    const nouvelleImage = document.querySelector("#inputId").value;

    const image = document.createElement("img");
    image.src = nouvelleImage;

    icone.appendChild(image);
*/




async function ajouterImage() {
    /**
     *  mon code ne marchait pas pour 2 raisons
     * 1) les "name" dans mon formulaire doivent correspendre aux noms attendus pour chaque propriété de l'objet 
     * 2) parce que les deux éléments qui suivent étaient hors de la fonction, ce qui faisait que j'envoyais des valeurs vides
     * 3) la propriété "catgory" prend des chiffres et non pas les noms de catégorie directement. 
     * dans la version finale on aura la possiblité de séléctionner des catégorie, mais derrière chaque choix, je cacherai le chiffre correspondant
     * 
     */
    const myForm = document.querySelector("#myForm");
    console.log("voilà ce qu'envoie mon myForm", myForm);
    //j'ajoute la valeur selectionnée dans le inout caché qui porte le name "category" et qui va envoyer la donnée au bidule
    const selectCategorie = document.querySelector(".selectCategorie").value;
    const inputCategorie = document.querySelector(".inputCategorie");
    inputCategorie.value = selectCategorie;

    const infoformulaire = new FormData(myForm);
   

    try {

        const reponse = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {

                "Authorization": `bearer ${clef}`// j'inclus la clef d'authorisation pour avoir le droit d'accès
            },
            body: infoformulaire
        })// Convertir les données de l'objet FormData en un objet JavaScript pour l'afficher dans la console
        const formDataObject = {};
        for (let [key, value] of infoformulaire.entries()) {
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




// fonction pour supprimer les images
async function supprimerImage(id) {
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

            const work = await fetch("http://localhost:5678/api/works").then(work => work.json());

        } else {
            console.error(`La suppression de l'image avec l'ID ${id} a échoué.`);
        }
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'image :', error);
    }
}


//pour avoir la longueur de toute la page, ça servira pour la modal
let viewportWidth, viewportHeight;

async function getSizeOfPage() {
    // Récupérer la taille du document
    const documentWidth = document.documentElement.scrollWidth;
    const documentHeight = document.documentElement.scrollHeight;


    // Récupérer la taille de la fenêtre de visualisation
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;



    // Calculer la taille totale de la page
    const totalWidth = Math.max(documentWidth, viewportWidth);
    const totalHeight = Math.max(documentHeight, viewportHeight);

    return { width: totalWidth, height: totalHeight };
}
getSizeOfPage();

//fonction pour créer la première modal
async function modal1() {

    //apparition de l'overlay
    const overlay = document.querySelector(".overlay");
    overlay.style.display = "block";//la modal passe de display : none à block, ce qui la fait apparaitre
    // Attendre que getSizeOfPage() récupère les dimensions de la page
    const pageSize = await getSizeOfPage();
    //attribuer la valeur 
    overlay.style.height = pageSize.height + "px";
    overlay.style.width = pageSize.width + "px";
    document.body.style.overflowX = "hidden";

    //récupération de divModal1
    const divModal1 = document.querySelector(".divModal1");
    divModal1.style.display = "block";
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
            const imageElement = document.getElementById(idImage);
            if (imageElement) {
                imageElement.style.display = "none";
            }
            supprimerImage(idImage)
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
    btnValider.addEventListener("click", async function () {

        ajouterImage();
    })

    //tous léléments de la deuxieme modal sont ajouté au DOM
    /**comme j'ai tout nettoyé, il fallait que je le redéfinisse avec un appendChild pour que le nouveau titre apparaisse */
    divModal2.appendChild(travauxModal2)

})

const btnback = document.querySelector("#btnback")
btnback.addEventListener("click", async function (event) {

    const divModal1 = document.querySelector(".divModal1")
    divModal1.style.display = "block"

    const divModal2 = document.querySelector(".divModal2")
    divModal2.style.display = "none";

})

const btnFermer1 = document.querySelector("#btnFermer1")
btnFermer1.addEventListener("click", async function (event) {

    const divModal1 = document.querySelector(".divModal1");
    divModal1.style.display = "none";

    const divModal2 = document.querySelector(".divModal2");
    divModal2.style.display = "none";


    const overlay = document.querySelector(".overlay");
    overlay.style.display = "none";

})

const btnFermer2 = document.querySelector("#btnFermer2")
btnFermer2.addEventListener("click", async function (event) {

    const divModal1 = document.querySelector(".divModal1");
    divModal1.style.display = "none";

    const divModal2 = document.querySelector(".divModal2");
    divModal2.style.display = "none";


    const overlay = document.querySelector(".overlay");
    overlay.style.display = "none";

})

const overlay = document.querySelector(".overlay")
overlay.addEventListener("click", async function () {

    overlay.style.display = "none";
    const divModal1 = document.querySelector(".divModal1");
    divModal1.style.display = "none";

    const divModal2 = document.querySelector(".divModal2");
    divModal2.style.display = "none";

    //rafraichit la page
    window.location.reload();
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
