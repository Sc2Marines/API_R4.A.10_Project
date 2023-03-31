import fill_db from "../part1/Country.js";

// liste de tous les pays
let listCountries = fill_db();

// Fonction pour remplir le tableau avec la liste des pays
function fillTable() {
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
        td1.classList.add(country.alpha3Code);

        var td2 = document.createElement("td");
        // Verifie si la donnée existe 
        if (country.population) {
            // Mets des espaces tous les 3 numéros afin de le mettre en forme
            td2.textContent = country.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        } else {
            td2.textContent = "Indéfini";
        }
        td2.classList.add(country.alpha3Code);

        var td3 = document.createElement("td");
        if (country.area) {
            td3.textContent = country.area.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " km²";
        } else {
            td3.textContent = "Indéfini";
        }
        td3.classList.add(country.alpha3Code);

        var td4 = document.createElement("td");
        if (td2.textContent != "Indéfini" && td3.textContent != "Indéfini") {
            td4.textContent = Math.round(country.getPopDensity() * 100) / 100 + " hab/km²";
        } else {
            td4.textContent = "Indéfini";
        }
        td4.classList.add(country.alpha3Code);

        var td5 = document.createElement("td");
        td5.textContent = country.region;
        td5.classList.add(country.alpha3Code);

        var td6 = document.createElement("td");
        var img = document.createElement("img");
        // Ajoute le lien et le nom du drapeau
        img.src = country.flags.png;
        img.alt = "Drapeau de " + country.translationFR;
        td6.appendChild(img);
        td6.classList.add("tdImg");
        td6.classList.add(country.alpha3Code);

        // Ajouter les éléments de données à la ligne de tableau
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);

        // Ajoute les lignes au tableau
        tableau.appendChild(tr);
    }
}

// Execute la fonction pour remplir le tableau
fillTable();