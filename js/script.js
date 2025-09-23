// variable grille joueur
const taille = 10;
const grille = document.getElementById("grille");
const compteurEl = document.getElementById("compteur");
const dernierTirEl = document.getElementById("dernier-tir");
const boutonRecommencer = document.getElementById("recommencer");

let compteurCoups = 0;
let grilleJeu = [];
let navires = [];

// création grille joueur
function creerGrille() {
    grille.innerHTML = "";
    grilleJeu = [];
    for (let i = 0; i < taille; i++) {
        let ligne = [];
        for (let j = 0; j < taille; j++) {
            const cellule = document.createElement("div");
            cellule.dataset.ligne = i;
            cellule.dataset.colonne = j;
            grille.appendChild(cellule);
            ligne.push(0);
        }
        grilleJeu.push(ligne);
    }
}

// placement des navires (aléatoires)
function placerNavires() {
    navires = [];
    const taillesNavires = [5, 4, 3, 3, 2];
    for (let tailleNavire of taillesNavires) {
        let place = false;
        while (!place) {
            const orientation = Math.random() < 0.5 ? "horizontal" : "vertical";
            const ligne = Math.floor(Math.random() * taille);
            const colonne = Math.floor(Math.random() * taille);

            if (orientation === "horizontal" && colonne + tailleNavire <= taille) {
                let libre = true;
                for (let k = 0; k < tailleNavire; k++) {
                    if (grilleJeu[ligne][colonne + k] === 1) {
                        libre = false;
                        break;
                    }
                }
                if (libre) {
                    for (let k = 0; k < tailleNavire; k++) {
                        grilleJeu[ligne][colonne + k] = 1;
                    }
                    navires.push({ taille: tailleNavire, cases: tailleNavire });
                    place = true;
                }
            } else if (orientation === "vertical" && ligne + tailleNavire <= taille) {
                let libre = true;
                for (let k = 0; k < tailleNavire; k++) {
                    if (grilleJeu[ligne + k][colonne] === 1) {
                        libre = false;
                        break;
                    }
                }
                if (libre) {
                    for (let k = 0; k < tailleNavire; k++) {
                        grilleJeu[ligne + k][colonne] = 1;
                    }
                    navires.push({ taille: tailleNavire, cases: tailleNavire });
                    place = true;
                }
            }
        }
    }
}

// tirs sur la grille du joueur
function tirer(event) {
    const ligne = event.target.dataset.ligne;
    const colonne = event.target.dataset.colonne;

    if (!ligne || !colonne) return;

    if (event.target.classList.contains("touche") || event.target.classList.contains("manque")) {
        return;
    }

    compteurCoups++;
    compteurEl.textContent = "Coups joués : " + compteurCoups;

    if (grilleJeu[ligne][colonne] == 1) {
        event.target.classList.add("touche");
        dernierTirEl.textContent = "Dernier tir : Touché !";
    } else {
        event.target.classList.add("manque");
        dernierTirEl.textContent = "Dernier tir : Manqué...";
    }
}

grille.addEventListener("click", tirer);

// bouton pour recommencer
boutonRecommencer.addEventListener("click", initialiserJeu);
function initialiserJeu() {
    compteurCoups = 0;
    compteurEl.textContent = "Coups joués : 0";
    dernierTirEl.textContent = "Dernier tir : -";
    creerGrille();
    placerNavires();
}

initialiserJeu();

// variable de la grille ennemie
const grilleEnnemie = document.getElementById("grille-ennemie");
let grilleJeuEnnemie = [];
let naviresEnnemis = [];

// création de grille ennemie
function creerGrilleEnnemie() {
    grilleEnnemie.innerHTML = "";
    grilleJeuEnnemie = [];
    for (let i = 0; i < taille; i++) {
        let ligne = [];
        for (let j = 0; j < taille; j++) {
            const cellule = document.createElement("div");
            cellule.dataset.ligne = i;
            cellule.dataset.colonne = j;
            grilleEnnemie.appendChild(cellule);
            ligne.push(0);
        }
        grilleJeuEnnemie.push(ligne);
    }
}

// placement des navires (aléatoire)
function placerNaviresEnnemis() {
    naviresEnnemis = [];
    const taillesNavires = [5, 4, 3, 3, 2];
    for (let tailleNavire of taillesNavires) {
        let place = false;
        while (!place) {
            const orientation = Math.random() < 0.5 ? "horizontal" : "vertical";
            const ligne = Math.floor(Math.random() * taille);
            const colonne = Math.floor(Math.random() * taille);

            if (orientation === "horizontal" && colonne + tailleNavire <= taille) {
                let libre = true;
                for (let k = 0; k < tailleNavire; k++) {
                    if (grilleJeuEnnemie[ligne][colonne + k] === 1) {
                        libre = false;
                        break;
                    }
                }
                if (libre) {
                    for (let k = 0; k < tailleNavire; k++) {
                        grilleJeuEnnemie[ligne][colonne + k] = 1;
                    }
                    naviresEnnemis.push({ taille: tailleNavire, cases: tailleNavire });
                    place = true;
                }
            } else if (orientation === "vertical" && ligne + tailleNavire <= taille) {
                let libre = true;
                for (let k = 0; k < tailleNavire; k++) {
                    if (grilleJeuEnnemie[ligne + k][colonne] === 1) {
                        libre = false;
                        break;
                    }
                }
                if (libre) {
                    for (let k = 0; k < tailleNavire; k++) {
                        grilleJeuEnnemie[ligne + k][colonne] = 1;
                    }
                    naviresEnnemis.push({ taille: tailleNavire, cases: tailleNavire });
                    place = true;
                }
            }
        }
    }
}

// tirs sur la grille ennemie
function tirerEnnemi(event) {
    const ligne = event.target.dataset.ligne;
    const colonne = event.target.dataset.colonne;

    if (!ligne || !colonne) return;

    if (event.target.classList.contains("touche") || event.target.classList.contains("manque")) {
        return;
    }

    if (grilleJeuEnnemie[ligne][colonne] == 1) {
        event.target.classList.add("touche");
        dernierTirEl.textContent = "Dernier tir sur l’ennemi : Touché !";
    } else {
        event.target.classList.add("manque");
        dernierTirEl.textContent = "Dernier tir sur l’ennemi : Manqué...";
    }
}

grilleEnnemie.addEventListener("click", tirerEnnemi);

// réinitialisation du jeu
function initialiserJeuComplet() {
    initialiserJeu();
    creerGrilleEnnemie();
    placerNaviresEnnemis();
}

boutonRecommencer.removeEventListener("click", initialiserJeu);
boutonRecommencer.addEventListener("click", initialiserJeuComplet);

// lancement du jeu au démarrage
initialiserJeuComplet();
