
async function recupWorks() {
    const work = await fetch("http://localhost:5678/api/works").then(work => work.json());
    return work;

}

async function recupCats() {
    const classification = await fetch(" http://localhost:5678/api/categories").then(classification => classification.json());
    return classification;
}
async function categorieDom () {
    const cate = await recupCats();
    const groupe = document.getElementById("groupe");
    console.log(groupe)
    for (let i = 0; i < cate.length; i++) {
        //création des boutons
        const btn = document.createElement("button");
        //attribution des id
        btn.setAttribute("id", cate[i].name );
        //attribution du nom
        btn.innerText = cate[i].name;
        //écoute d'un évènement
        btn.addEventListener("click", async function () {

            const boutons = groupe.getElementsByTagName("button");
            for (let j = 0; j < boutons.length; j++) {
                boutons[j].style.color = ""; // Réinitialisation de la couleur du texte
                boutons[j].style.backgroundColor = ""; // Réinitialisation de la couleur de fond
            }

            btn.style.color = "#FFFFFF";
            btn.style.backgroundColor = "#1D6154";
            await choixCategorie(cate[i].id);
        })
        //ajout à l'arbre dom
        groupe.appendChild(btn);
    }
}
//par mesure de prudence, j'ai fait en sorte que la fonction "categorieDom" s'execute APRES le chargement du DOM
document.addEventListener("DOMContentLoaded", async function () {
    await categorieDom();
});

async function miseAJourDom() {
    const works = await recupWorks()
    const sectionPortofolio = document.querySelector("#portfolio");
    const divGallery = document.getElementById("gallery");

    //j'actualise la section gallery pour qu'elle redevienne vierge
    divGallery.innerHTML = "";

    for (let i = 0; i < works.length; i++) {

        //création d'une balise figure
        const figure = document.createElement("figure");
        //création de la balise img
        const image = document.createElement("img");
        // affectation de l'url de l'image
        image.src = works[i].imageUrl;
        // mise en place du alt au cas l'image ne s'affiche pas
        image.alt = works[i].title;
        //récupère l'id de l'image
        image.dataset.id = works[i].id;
        // création de la balise figcaption
        const figcaption = document.createElement("figcaption");
        // insertion de la description
        figcaption.innerText = works[i].title;

        //mise en place des éléments enfants de la balise figure
        figure.appendChild(image);
        figure.appendChild(figcaption);

        //mise en place des éléments enfants de la div de class = gallery
        divGallery.appendChild(figure);


    }
    sectionPortofolio.appendChild(divGallery);

}



//par mesure de prudence, j'ai fait en sorte que la fonction "miseAjouDom" s'execute APRES le chargement du DOM
document.addEventListener("DOMContentLoaded", async function () {
    await miseAJourDom();
});

async function galeriCategorie(categoryId) {
    const works = await recupWorks()
    const galerie = {
        categorie1: [],
        categorie2: [],
        categorie3: []

    };
    for (let i = 0; i < works.length; i++) {

        // je stocke chaque élémnent selon sa catégorie dans le tableau correspondant
        if (works[i].categoryId === 1) {
            galerie.categorie1.push(works[i]);

        } else if (works[i].categoryId === 2) {
            galerie.categorie2.push(works[i]);
        } else {
            galerie.categorie3.push(works[i]);
        }
    }
        // nous renvoie le résultat correespondant si la condition est remplie
    return categoryId === 1 ? galerie.categorie1 : categoryId === 2 ? galerie.categorie2 : galerie.categorie3;

}

async function choixCategorie(categoryId) {


    const selectedCat = await galeriCategorie(categoryId);

    const sectionPortofolio = document.getElementById("portfolio");
    const divGallery = document.getElementById("gallery");
    //j'actualise la section gallery pour  qu'elle redevienne vierge
    divGallery.innerHTML = "";

    for (let i = 0; i < selectedCat.length; i++) {

        //création d'une balise figure
        const figure = document.createElement("figure");
        //création de la balise img
        const image = document.createElement("img");
        // affectation de l'url de l'image
        image.src = selectedCat[i].imageUrl;
        // mise en place du alt au cas l'image ne s'affiche pas
        image.alt = selectedCat[i].title;
        // création de la balise figcaption
        const figcaption = document.createElement("figcaption");
        // insertion de la description
        figcaption.innerText = selectedCat[i].title;

        //mise en des éléments enfants de la balise figure
        figure.appendChild(image);
        figure.appendChild(figcaption);

        //mise en des éléments enfants de la div de class = gallery
        divGallery.appendChild(figure);


    }
    sectionPortofolio.appendChild(divGallery);
}

const tous = document.getElementById("tous");
tous.addEventListener("click", async function () {
    const boutons = groupe.getElementsByTagName("button");
    for (let j = 0; j < boutons.length; j++) {
        boutons[j].style.color = ""; // Réinitialisation de la couleur du texte
        boutons[j].style.backgroundColor = ""; // Réinitialisation de la couleur de fond
    }

    tous.style.color = "#FFFFFF";
    tous.style.backgroundColor = "#1D6154";
    await miseAJourDom();
})

/**
 * site où quelqu'un a crée un espace de connexion
 * https://codes-sources.commentcamarche.net/source/15833-mot-de-passe-pseudo-faire-un-page-de-connexion 
 * 
 * 
 */