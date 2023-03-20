import Country from "../part1/Country.js";
import Currenciy from "../part1/Currency.js";
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
            let tableau = document.querySelector('.lesPays');

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
            cellule1.classList.add(country.alpha3Code);

            cellule2.textContent = country.population;
            cellule2.classList.add(country.alpha3Code);

            cellule3.textContent = country.area + " km²";
            cellule3.classList.add(country.alpha3Code);

            cellule4.textContent = Math.round(country.getPopDensity() * 100) / 100 + " hab/km²";
            cellule4.classList.add(country.alpha3Code);

            cellule5.textContent = country.region;
            cellule5.classList.add(country.alpha3Code);

            // lien de l'image dans le src de la balise img
            imgDrapeau.src = country.flags.png;

            // ajout du img dans la cellule du tableau
            cellule6.appendChild(imgDrapeau);
            cellule6.classList.add("tdImg");
            cellule6.classList.add(country.alpha3Code);

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
        let tableau = document.querySelector('.lesPays');
        let rowCount = tableau.rows.length;
        for (let i = rowCount - 1; i > 0; i--) {
            tableau.deleteRow(i);
        }

        // ajoute la nouvelle selection dans le table
        fillTable(deb, fin);
    });
});

let table = document.querySelectorAll('.lesPays td:not(.tdImg)');

table.forEach(element => {
    // détecte les clics sur le tableau pour renvoyer les informations du pays
    element.addEventListener('click', function (event) {
        // remonte en haut de la page
        window.scrollTo(0, 0);

        let leTable = document.querySelector(".detailsPays table");
        let lesPays = document.querySelector(".lesPays");
        let pagination = document.querySelectorAll(".pagination");
        let close = document.querySelector(".closeButton");
        let country = listCountries[event.target.classList];

        leTable.style.display = "block";
        lesPays.style.filter = "blur(2px)";
        lesPays.style.pointerEvents = "none";

        pagination.forEach(element => {
            element.style.pointerEvents = "none";
            element.style.filter = "blur(2px)";
        });

        close.style.display = "block";

        // insérer une nouvelle ligne
        let nouvelleLigne = leTable.insertRow();

        // insérer des cellules dans la nouvelle ligne
        let cellule1 = nouvelleLigne.insertCell();
        cellule1.classList.add("pays-details");

        let cellule2 = nouvelleLigne.insertCell();
        cellule2.classList.add("pays-details");

        let cellule3 = nouvelleLigne.insertCell();
        cellule3.classList.add("pays-details");

        let cellule4 = nouvelleLigne.insertCell();
        cellule4.classList.add("pays-details");

        let cellule5 = nouvelleLigne.insertCell();
        cellule5.classList.add("pays-details");

        let cellule6 = nouvelleLigne.insertCell();
        cellule6.classList.add("pays-details");

        let cellule7 = nouvelleLigne.insertCell();
        cellule7.classList.add("pays-details");

        let cellule8 = nouvelleLigne.insertCell();
        cellule8.classList.add("pays-details");

        let cellule9 = nouvelleLigne.insertCell();
        cellule9.classList.add("pays-details");

        let cellule10 = nouvelleLigne.insertCell();
        cellule10.classList.add("pays-details");

        let cellule11 = nouvelleLigne.insertCell();
        cellule11.classList.add("pays-details");

        let cellule12 = nouvelleLigne.insertCell();
        cellule12.classList.add("pays-details");


        // ajouter des données aux cellules
        cellule1.textContent = country.name;
        cellule2.textContent = country.population;
        cellule3.textContent = country.area + " km²";
        cellule4.textContent = Math.round(country.getPopDensity() * 100) / 100 + " hab/km²";
        cellule5.textContent = country.region;
        cellule6.textContent = country.alpha3Code;

        if (country.borders && (country.borders).length !== 0) {
            cellule7.textContent = country.borders;
        } else {
            cellule7.textContent = "Pas de pays frontaliers";
        }

        if (country.capital) {
            cellule8.textContent = country.capital;
        } else {
            cellule8.textContent = "Pas de capitale.";
        }

        if (country.capital) {
            cellule9.textContent = country.demonym;
        } else {
            cellule9.textContent = "Pas de denonyme.";
        }

        if (country.capital) {
            cellule10.textContent = country.topLevelDomain;
        } else {
            cellule10.textContent = "Pas de denonyme.";
        }

        let currencies = null;
        if (country && country.currencies) {
            currencies = country.currencies.all_currencies;
            for (const key in currencies) {
                cellule11.textContent += `${key}: ${currencies[key]}\n`;
            }
        } else {
            cellule11.textContent = "Pas de monnaies.";
        }

        let languages = null;
        if (country && country.languages) {
            languages = country.languages.all_languages;
            for (const key in languages) {
                cellule12.textContent += `${key}: ${languages[key]}\n`;
            }
        } else {
            cellule12.textContent = "Pas de langages.";
        }
    });
});


let closeBtn = document.querySelector('.closeButton');

closeBtn.addEventListener('click', function (event) {
    let leTable = document.querySelector(".detailsPays table");
    let lesPays = document.querySelector(".lesPays");
    let pagination = document.querySelectorAll(".pagination");
    let close = document.querySelector(".closeButton");

    leTable.style.display = "none";
    lesPays.style.filter = "blur(0px)";
    lesPays.style.pointerEvents = "all";

    pagination.forEach(element => {
        element.style.pointerEvents = "all";
        element.style.filter = "blur(0px)";
    });

    close.style.display = "none";

    // supprimer la ligne nouvellement créée
    let paysDetails = document.querySelectorAll(".pays-details");
    paysDetails.forEach(pays => pays.remove());
});

document.querySelectorAll(".tdImg").forEach(element => {
    element.addEventListener('click', function (event) {
        let country = listCountries[event.target.classList];
        console.log(country);
        let img = document.querySelector(".drapeauGrand");
        img.style.display = "block";
        img.src = country.country.flags.png;
    });
});