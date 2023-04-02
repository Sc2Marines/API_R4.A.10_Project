import fill_db from "../part1/Country.js";

// variable de SAUT pour la pagination
const SAUT = 25;

// valeurs initiales pour affichage
var deb = 0;
var fin = SAUT;

// liste de tous les pays
var listCountries = fill_db();

// trie le tableau initial par noms français
// effectue une copie du tableau initiale pour pouvoir le manipuler plus facilement
var listCountriesCopy = Object.values(listCountries).slice();
// parcours tous les pays
for (let i = 0; i < listCountriesCopy.length; i++) {
    // parcours les éléménts avant lui
    for (let j = i - 1; j > -1; j--) {
        // compare si l'élément est inférieur
        if (listCountriesCopy[j + 1].translationFR.localeCompare(listCountriesCopy[j].translationFR) < 0) {
            // échange les éléments
            [listCountriesCopy[j + 1], listCountriesCopy[j]] = [listCountriesCopy[j],
            listCountriesCopy[j + 1],
            ];
        }
    }
}
// remplace la liste des pays par la liste triées
listCountries = listCountriesCopy;

// affiche les pays
fillTable(deb, fin);

// event listener
var previousButtons = document.querySelectorAll('.previous-button');
var nextButtons = document.querySelectorAll('.next-button');

// fonction pour remplir la tableau avec la liste des pays
function fillTable(start, end) {
    // parcours les pays
    for (let theCountry in listCountries) {

        // récupère les informations du pays
        let country = listCountries[theCountry];

        // séléctionne le tableau
        let tableau = document.querySelector('.lesPays tbody');

        // Créer l'élément de ligne de tableau
        var tr = document.createElement("tr");

        // Créer les éléments de données pour chaque colonne
        var td1 = document.createElement("td");
        td1.textContent = country.translationFR;

        // verifie que l'élément existe
        var td2 = document.createElement("td");
        if (country.population) {
            // met en forme les nombres afin de mettre des espaces tous les 3 numéros
            td2.textContent = country.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        } else {
            td2.textContent = "Indéfini";
        }

        var td3 = document.createElement("td");
        if (country.area) {
            td3.textContent = country.area.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " km²";
        } else {
            td3.textContent = "Indéfini";
        }

        var td4 = document.createElement("td");
        if (td2.textContent != "Indéfini" && td3.textContent != "Indéfini") {
            td4.textContent = Math.round(country.getPopDensity() * 100) / 100 + " hab/km²";
        } else {
            td4.textContent = "Indéfini";
        }

        var td5 = document.createElement("td");
        td5.textContent = country.region;

        var td6 = document.createElement("td");
        var img = document.createElement("img");
        // ajoute le lien et une description pour le drapeau
        img.src = country.flags.png;
        img.alt = "Drapeau de " + country.translationFR;
        td6.appendChild(img);

        // Ajouter les éléments de données à la ligne de tableau
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);

        // ajoute les lignes au tableau
        tableau.appendChild(tr);
    }

    // masque les éléments qui ne sont pas entre la séléction de début et de fin
    let count = 0;
    document.querySelectorAll(".lesPays tbody tr").forEach(element => {
        if (count < start || count > end) {
            element.style.display = "none";
        }
        count = count + 1;
    });
}

// les boutons SUIV
nextButtons.forEach(nextButton => {
    nextButton.addEventListener('click', () => {

        //remonte en haut de la page
        window.scrollTo(0, 0);

        // nouvelle selection de pays
        deb = deb + SAUT;
        fin = fin + SAUT;

        // les numéros de page
        let pageNumber = document.querySelectorAll('.page-number');

        // Ajoute 1 aux numéros de page
        pageNumber.forEach(element => {
            let pageNumberText = element.textContent;
            let pageNumberArray = pageNumberText.split(' '); // diviser le texte en un tableau de chaînes de caractères, séparées par un espace
            let dernier = parseInt(pageNumberArray[pageNumberArray.length - 1]); // accéder au dernier élément du tableau et le convertir en un nombre entier  
            element.textContent = 'Page ' + (dernier + 1);
        });

        // active les boutons PREC
        previousButtons.forEach(element => {
            element.disabled = false;
        });

        // désactive les boutons SUIV si jamais on arrive à la fin de la liste
        nextButtons.forEach(element => {
            if (fin >= Object.keys(listCountries).length) {
                element.disabled = true;
            }
        });

        // Vide le contenu de la table
        let tableau = document.querySelector('.lesPays');
        let rowCount = tableau.rows.length;
        for (let i = rowCount - 1; i > 0; i--) {
            tableau.deleteRow(i);
        }

        // ajoute la nouvelle selection dans le table
        fillTable(deb, fin);
    });
});

// boutons PREC
previousButtons.forEach(previousButton => {
    previousButton.addEventListener('click', () => {

        // remonte en haut de la page
        window.scrollTo(0, 0);

        // verifie que deb ne va pas être negatif, car le pays -1 (et tous les autres negatifs) n'existe pas
        if (deb >= SAUT) {
            // fait reculer les variables pour afficher ceux d'avant
            deb = deb - SAUT;
            fin = fin - SAUT;

            // numéro de page
            let pageNumber = document.querySelectorAll('.page-number');

            // change tous les numéros de page par "Page "-1
            pageNumber.forEach(element => {
                let pageNumberText = element.textContent;
                let pageNumberArray = pageNumberText.split(' '); // diviser le texte en un tableau de chaînes de caractères, séparées par un espace
                let dernier = parseInt(pageNumberArray[pageNumberArray.length - 1]); // accéder au dernier élément du tableau et le convertir en un nombre entier  
                element.textContent = 'Page ' + (dernier - 1);
            });

            // réactive les boutons SUIV
            nextButtons.forEach(element => {
                element.disabled = false;
            });

            // désactive les boutons PREC si jamais on arrive au début du tableau
            previousButtons.forEach(element => {
                if (deb == 0) {
                    element.disabled = true;
                }
            });

            // Vide le contenu de la table pour retirer les pays déjà affichés
            let tableau = document.querySelector('.lesPays');
            let rowCount = tableau.rows.length;
            for (let i = rowCount - 1; i > 0; i--) {
                tableau.deleteRow(i);
            }
        }

        // rempli le tableau avec la nouvelle selection de pays
        fillTable(deb, fin);
    });
});