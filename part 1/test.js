import fill_db from './Country.js';

//listCountries array of class Country (calling method fill_db of file Country.js)
let listCountries = fill_db();

//for each function of this file, we add to the html a button to call the function
var MyNameSpace = function () {
    function getAllFunctions() {
        var myfunctions = [];
        for (var l in this) {
            if (this.hasOwnProperty(l) &&
                this[l] instanceof Function &&
                !/myfunctions/i.test(l)) {
                myfunctions.push(this[l]);
            }
        }
        return myfunctions;
    }

    //Q1 - outsideTheContinent() : Pays dont au moins un pays frontalier n’est pas dans le
    // même continent.

    // function outsideTheContinent() {
    //     let countriesOutside = [];

    //     // each country
    //     for (let countryCode in list) {
    //         let country = list[countryCode];

    //         // each border country
    //         let borderCountries = country.getBorders();
    //         for (let borderCountry of borderCountries) {
    //             // verifie if border country is in other continent
    //             if (borderCountry.getContinent() !== country.getContinent()) {
    //                 // Ajouter le pays courant au tableau des pays trouvés
    //                 countriesOutside.push(country.getAlpha3Code());
    //                 // Sortir de la boucle des pays frontaliers si au moins un pays est trouvé
    //                 break;
    //             }
    //         }
    //     }

    //     // Retourner un tableau des pays dont au moins un voisin est dans un autre continent
    //     return countriesOutside.map(countryCode => list[countryCode]);
    // }

    // outsideTheContinent();

    //Q2 - moreNeighbors() : Pays(possibilité de plusieurs) ayant le plus grand nombre de
    // voisins.Affichez aussi les voisins.

    //Q3 - neighborless() : Pays n’ayant aucun voisin.

    //Q4 - moreLanguages() : Pays(possibilité de plusieurs) parlant le plus de langues.
    // Affichez aussi les langues.

    //Q5 - withCommonLanguage() : Pays ayant au moins un voisin parlant l’une de ses
    // langues.Affichez aussi les pays voisins et les langues en question.


    //Q6 - withoutCommonCurrency() : Pays sans aucun voisin ayant au moins une de ses
    // monnaies.


    // Q7 - sortingDecreasingDensity() : Pays triés par ordre décroissant de densité de
    // population.

    function sortingDecreasingDensity() {
        // Copier le tableau des pays pour ne pas le modifier directement
        let listCountriesCopy = Object.values(listCountries).slice();

        // Fonction de comparaison pour trier par ordre décroissant de densité de population
        function comparePopulationDensity(a, b) {
            let densityA = a.getPopDensity();
            let densityB = b.getPopDensity();
            if (densityA > densityB) {
                return -1;
            } else if (densityA < densityB) {
                return 1;
            } else {
                return 0;
            }
        }

        // Trier les pays par ordre décroissant de densité de population
        listCountriesCopy.sort(comparePopulationDensity);

        // Retourner le nouveau tableau trié
        return countriesCopy;
    }

    //Q8 - moreTopLevelDomains() : Pays ayant plusieurs Top Level Domains Internet.

    //Q9 - veryLongTrip(nom_pays) : En partant d’un pays donné(représenté ici par
    // l’argument nom_pays), listez tous les pays que l’on peut visiter en passant de l’un à
    // l’autre.Evidemment, seuls les pays frontaliers sont accessibles depuis un pays donné.
    // Exemple : France -> Espagne -> Portugal.


    return {
        sortingDecreasingDensity: sortingDecreasingDensity
    };
}();


function addButtons() {
    let functions = MyNameSpace.getAllFunctions();
    //console.log(functions);
    for (let i = 0; i < functions.length; i++) {
        let btn = document.createElement("button");
        btn.innerHTML = functions[i].name;
        btn.onclick = functions[i];
        document.body.appendChild(btn);
    }

}

addButtons();