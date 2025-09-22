console.log("JS chargé !");

// Variables globales
const tailleGrille = 10;
const grille = document.getElementById("grille");
const compteurElement = document.getElementById("compteur");
const dernierTirElement = document.getElementById("dernier-tir");
const boutonRecommencer = document.getElementById("recommencer");
let plateau = [];
let coupsJoues = 0;

// Crée la grille et les cases cliquables
function creerGrille() {
    plateau = [];
    grille.innerHTML = "";

    for (let i = 0; i < tailleGrille; i++) {
        plateau[i] = [];
        for (let j = 0; j < tailleGrille; j++) {
            plateau[i][j] = 0; // 0 = eau
            const caseDiv = document.createElement("div");
            caseDiv.dataset.ligne = i;
            caseDiv.dataset.colonne = j;
            grille.appendChild(caseDiv);

            // Clique sur la case
            caseDiv.addEventListener("click", () => jouerCoup(i, j, caseDiv));
        }
    }
}

// Place aléatoirement les bateaux sans chevauchement
function placerBateaux() {
    const bateaux = [
        { taille: 3 },
        { taille: 2 },
        { taille: 2 }
    ];

    for (const bateau of bateaux) {
        let placeOk = false;

        while (!placeOk) {
            const orientation = Math.random() < 0.5 ? "horizontale" : "verticale";
            const ligne = Math.floor(Math.random() * tailleGrille);
            const colonne = Math.floor(Math.random() * tailleGrille);

            let peutPlacer = true;
            for (let k = 0; k < bateau.taille; k++) {
                const li = orientation === "horizontale" ? ligne : ligne + k;
                const co = orientation === "horizontale" ? colonne + k : colonne;
                if (li >= tailleGrille || co >= tailleGrille || plateau[li][co] === 1) {
                    peutPlacer = false;
                    break;
                }
            }

            if (peutPlacer) {
                for (let k = 0; k < bateau.taille; k++) {
                    const li = orientation === "horizontale" ? ligne : ligne + k;
                    const co = orientation === "horizontale" ? colonne + k : colonne;
                    plateau[li][co] = 1; // 1 = bateau
                }
                placeOk = true;
            }
        }
    }
}

// Jouer un coup sur la case (ligne, colonne)
function jouerCoup(ligne, colonne, caseDiv) {
    if (caseDiv.classList.contains("touche") || caseDiv.classList.contains("manque")) return;

    coupsJoues++;
    compteurElement.textContent = `Coups joués : ${coupsJoues}`;

    if (plateau[ligne][colonne] === 1) {
        caseDiv.classList.add("touche");
        dernierTirElement.textContent = "Dernier tir : Touché !";
        plateau[ligne][colonne] = 2; // marque comme touché
    } else {
        caseDiv.classList.add("manque");
        dernierTirElement.textContent = "Dernier tir : Manqué !";
    }

    if (tousCoules()) {
        dernierTirElement.textContent = `Bravo ! Vous avez coulé tous les bateaux en ${coupsJoues} coups.`;
    }
}

// Vérifie si tous les bateaux ont été touchés
function tousCoules() {
    for (let i = 0; i < tailleGrille; i++) {
        for (let j = 0; j < tailleGrille; j++) {
            if (plateau[i][j] === 1) return false;
        }
    }
    return true;
}

// Réinitialise le jeu
function recommencerJeu() {
    coupsJoues = 0;
    compteurElement.textContent = `Coups joués : 0`;
    dernierTirElement.textContent = "Dernier tir : -";
    creerGrille();
    placerBateaux();
}

// Initialisation
creerGrille();
placerBateaux();

// Gestion du bouton recommencer
boutonRecommencer.addEventListener("click", recommencerJeu);














