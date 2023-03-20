import Country from "../part1/Country.js";
import fill_db from "../part1/Country.js";

//listCountries array of class Country (calling method fill_db of file Country.js)
let listCountries = fill_db();

function fillTable() {
    // parcours les pays
    //for (let theCountry in listCountries) {
    for (let theCountry in listCountries) {
        let country = listCountries[theCountry];

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
    }
}

fillTable();