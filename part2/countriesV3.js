import Country from "../part1/Country.js";
import fill_db from "../part1/Country.js";

//listCountries array of class Country (calling method fill_db of file Country.js)
let listCountries = fill_db();

function fillTable(start, end) {
    var count = 0;

    // parcours les pays
    //for (let theCountry in listCountries) {
    for (let theCountry in listCountries) {
        let country = listCountries[theCountry];

        if (count >= start && start < end && start < Object.keys(listCountries).length) {

            // sélectionner le tableau
            let tableau = document.querySelector('table');

            // insérer une nouvelle ligne
            let nouvelleLigne = tableau.insertRow();

            // insérer des cellules dans la nouvelle ligne
            let cellule1 = nouvelleLigne.insertCell();
            let cellule2 = nouvelleLigne.insertCell();
            let cellule3 = nouvelleLigne.insertCell();
            let cellule4 = nouvelleLigne.insertCell();
            let cellule5 = nouvelleLigne.insertCell();
            let cellule6 = nouvelleLigne.insertCell();

            //balise img pour le drapeau
            let imgDrapeau = document.createElement('img');

            // ajouter des données aux cellules
            cellule1.textContent = country.name;
            cellule2.textContent = country.population;
            cellule3.textContent = country.area + " km²";
            cellule4.textContent = Math.round(country.getPopDensity() * 100) / 100 + " hab/km²";
            cellule5.textContent = country.region;

            // lien de l'image dans le src de la balise img
            imgDrapeau.src = country.flags.png;

            // ajout du img dans la cellule du tableau
            cellule6.appendChild(imgDrapeau);

            // ajoute un id à chaque ligne
            nouvelleLigne.setAttribute('id', country.name);
            alert(nouvelleLigne.attributes);

            start = start + 1;
        }

        count = count + 1;
    }
}

// variable de saut pour la pagination
const saut = 25;

// valeurs initiales pour affichage
var deb = 0;
var fin = saut;

// affiche les pays
fillTable(deb, fin);

// selectionne les boutons SUIV et PREC
var previousButtons = document.querySelectorAll('.previous-button');
var nextButtons = document.querySelectorAll('.next-button');

// boutons SUIV
previousButtons.forEach(previousButton => {
    previousButton.addEventListener('click', () => {

        // remonte en haut de la page
        window.scrollTo(0, 0);

        // verifie que deb ne va pas être negatif, car le pays -1 (et tous les autres negatifs) n'existe pas
        if (deb >= saut) {
            // fait reculer les variables pour afficher ceux d'avant
            deb = deb - saut;
            fin = fin - saut;

            // numéro de page
            let pageNumber = document.querySelectorAll('.page-number');

            // change tous les numéros de page par "Page "-1
            pageNumber.forEach(element => {
                let pageNumberText = element.textContent;
                let pageNumberArray = pageNumberText.split(' '); // diviser le texte en un tableau de chaînes de caractères, séparées par un espace
                let dernier = parseInt(pageNumberArray[pageNumberArray.length - 1]); // accéder au dernier élément du tableau et le convertir en un nombre entier  
                element.textContent = 'Page ' + (dernier - 1);
            });

            // désactive les boutons PREC si jamais on arrive au début du tableau
            previousButtons.forEach(element => {
                if (deb == 0) {
                    element.disabled = true;
                }
            });

            // Vide le contenu de la table pour retirer les pays déjà affichés
            let tableau = document.querySelector('table');
            let rowCount = tableau.rows.length;
            for (let i = rowCount - 1; i > 0; i--) {
                tableau.deleteRow(i);
            }
        }

        // rempli le tableau avec la nouvelle selection de pays
        fillTable(deb, fin);
    });
});

// les boutons SUIV
nextButtons.forEach(nextButton => {
    nextButton.addEventListener('click', () => {

        //remonte en haut de la page
        window.scrollTo(0, 0);

        // nouvelle selection de pays
        deb = deb + saut;
        fin = fin + saut;

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
        let tableau = document.querySelector('table');
        let rowCount = tableau.rows.length;
        for (let i = rowCount - 1; i > 0; i--) {
            tableau.deleteRow(i);
        }

        // ajoute la nouvelle selection dans le table
        fillTable(deb, fin);
    });
});
