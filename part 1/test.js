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

    function logall() {
        console.log("success");
    }

    //Q1 - outsideTheContinent() : Pays dont au moins un pays frontalier n’est pas dans le
    // même continent.
    function outsideTheContinent() {
        let res = [];

        // copie de listCountries
        let listCountriesCopy = Object.values(listCountries).slice();

        // parcours la liste des pays
        for (let i = 0; i < listCountriesCopy.length; i++) {

            // les informations intéressante du pays
            let country = listCountriesCopy[i];
            let continent = country.getContinent();
            let listBorders = country.getBorders();

            // pour tous les borders
            listBorders.forEach(element => {

                // verifie que le pays a des borders
                if (element != null && element.continent !== undefined) {

                    //si le continent du pays frontalier n'est pas le même que celui du pays
                    if (element.continent != continent) {
                        res.push(country);
                    }
                }
            });
        }
        return res;
    }

    //Q2 - moreNeighbors() : Pays(possibilité de plusieurs) ayant le plus grand nombre de
    // voisins. Affichez aussi les voisins.
    function moreNeighbors() {
        // Initialisation des variables de comptage et de stockage des pays ayant le plus de voisins
        let maxNeighborCount = 0;
        let countriesWithMaxNeighbors = [];

        // Parcours de tous les pays de la liste
        for (let countryCode in listCountries) {
            let country = listCountries[countryCode];
            let neighbors = country.getBorders();

            // Vérification si le pays a plus de voisins que les précédents pays parcourus
            if (neighbors && neighbors.length > maxNeighborCount) {
                maxNeighborCount = neighbors.length;
                countriesWithMaxNeighbors = [country];
            } else if (neighbors && neighbors.length == maxNeighborCount) {
                countriesWithMaxNeighbors.push(country);
            }
        }

        // Affichage des pays ayant le plus de voisins et de leurs voisins respectifs
        console.log(`Countries with the most neighbors (${maxNeighborCount}):`);

        countriesWithMaxNeighbors.forEach(country => {
            console.log("Pays ayant le plus de voisins :");
            console.log(country.name);

            // Vérification si le pays a des voisins
            if (country.borders && country.borders.length > 0) {
                console.log(`  ${country.borders.length} neighbors:`);
                country.borders.forEach(element => {
                    // Vérification si l'élément est défini et a une propriété name
                    if (listCountries[element] != null && listCountries[element].name !== undefined) {
                        console.log(`    - ${listCountries[element].name}`);
                    } else {
                        console.log(`    - ${element} (Ce code alpha 3 n'est pas associé à un pays)`);
                    }
                });
            } else {
                console.log(`  No neighbors.`);
            }
        });

        // Retourne les pays ayant le plus de voisins
        return countriesWithMaxNeighbors;
    }

    //Q3 - neighborless() : Pays n’ayant aucun voisin.

    //Q4 - moreLanguages() : Pays(possibilité de plusieurs) parlant le plus de langues.
    // Affichez aussi les langues.

    //Q5 - withCommonLanguage() : Pays ayant au moins un voisin parlant l’une de ses
    // langues.Affichez aussi les pays voisins et les langues en question.

    function withCommonLanguage() {
        let listCountriesCopy = Object.values(listCountries).slice();
        let listCountriesWithCommonLanguage = [];

        for (let i = 0; i < listCountriesCopy.length; i++) {
            let dico = {};
            let country = listCountriesCopy[i];
            let languages = country.getLanguages().get_all_languages();
            let borders = country.getBorders();
            //we add the country as a key in the dico
            dico[country] = [];

            let hasCommonLanguage = false;

            for (let j = 0; j < borders.length; j++) {
                let border = borders[j];
                if (border == null) {
                    continue;
                }
                else 
                {
                    if (border.getLanguages() != null) {
                        let borderLanguages = border.getLanguages().get_all_languages();
                        //for each key in borderLanguages
                        for (let key in borderLanguages) {
                            //if the key is in languages
                            if (key in languages) {
                                hasCommonLanguage = true;
                                dico[country].push(border);
                                break;
                            }
                        }
                    }
                    else {
                        continue;
                    }
                }
            }

            if (hasCommonLanguage) {
                listCountriesWithCommonLanguage.push(dico);
            }
        }

        //return listCountriesWithCommonLanguage;
        // convert the dico to a string for display in html
        let res = "";
        for (let i = 0; i < listCountriesWithCommonLanguage.length; i++) {
            let country = Object.keys(listCountriesWithCommonLanguage[i])[0];
            console.log(country);
            let borders = listCountriesWithCommonLanguage[i][country];
            res += country + " has a common language with : <br>";
            for (let j = 0; j < borders.length; j++) {
                res += borders[j].name + "<br>";
            }
        }
        return res;
    }

    //Q6 - withoutCommonCurrency() : Pays, sans aucun voisin ayant au moins une de ses
    // monnaies.
    function withoutCommonCurrency()
    {
        let listCountriesCopy = Object.values(listCountries).slice();
        let listCountriesWithoutCommonCurrency = [];
        let compteur = 0;

        for (let i = 0; i < listCountriesCopy.length; i++) {
            let country = listCountriesCopy[i];
            let currencies = country.getCurrencies();
            let borders = country.getBorders();

            let hasCommonCurrency = false;

            for (let j = 0; j < borders.length; j++) {
                let border = borders[j];
                if (border == null) {
                    continue;
                }
                else 
                {
                    if (border.getCurrencies() != null) {
                        let borderCurrencies = border.getCurrencies();
                        for (let k = 0; k < currencies.length; k++) {
                            let currency = currencies[k];

                            if (borderCurrencies.includes(currency)) {
                                hasCommonCurrency = true;
                                break;
                            }
                        }
                    }
                    else {
                        continue;
                    }
                }
            }

            if (!hasCommonCurrency) {
                listCountriesWithoutCommonCurrency.push(country);
                compteur++;
            }
        }
        console.log("count"+compteur);
        return listCountriesWithoutCommonCurrency;
    }

    // Q7 - sortingDecreasingDensity() : Pays triés par ordre décroissant de densité de
    // population.
    function sortingDecreasingDensity() {
        console.log("sortingDecreasingDensity");
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
        return listCountriesCopy;
    }

    //Q8 - moreTopLevelDomains() : Pays ayant plusieurs Top Level Domains Internet.
    function moreTopLevelDomains() {
        console.log("moreTopLevelDomains");
        let listCountriesCopy = Object.values(listCountries).slice();
        let listCountriesWithMoreTopLevelDomains = [];

        for (let i = 0; i < listCountriesCopy.length; i++) {
            if (listCountriesCopy[i].getTopLevelDomains().length > 1) {
                listCountriesWithMoreTopLevelDomains.push(listCountriesCopy[i]);
            }
        }

        return listCountriesWithMoreTopLevelDomains;
    }

    //Q9 - veryLongTrip(nom_pays) : En partant d’un pays donné(représenté ici par
    // l’argument nom_pays), listez tous les pays que l’on peut visiter en passant de l’un à
    // l’autre.Evidemment, seuls les pays frontaliers sont accessibles depuis un pays donné.
    // Exemple : France -> Espagne -> Portugal.


    return {
        getAllFunctions: getAllFunctions,
        outsideTheContinent: outsideTheContinent,
        moreNeighbors: moreNeighbors,
        sortingDecreasingDensity: sortingDecreasingDensity,
        logall: logall,
        moreTopLevelDomains: moreTopLevelDomains,
        withoutCommonCurrency: withoutCommonCurrency,
        withCommonLanguage: withCommonLanguage
    };
}();


function addButtons() {
    let functions = MyNameSpace.getAllFunctions();

    //ajout des boutons
    for (let i = 0; i < functions.length; i++) {
        let btn = document.createElement("button");
        btn.innerHTML = functions[i].name;
        //btn.onclick = functions[i];
        document.body.appendChild(btn);
    }

    //ajout d'events listeners sur chaque bouton
    let buttons = document.getElementsByTagName("button");
    for (let i = 0; i < buttons.length; i++) {
        //we add the event listener and piccj the result of the function
        buttons[i].addEventListener("click", function () {

            //we get the result of the function
            let result = MyNameSpace[buttons[i].innerHTML]();

            //we create a new div to display the result
            //we create a div with the id = "result" if it doesn't exist
            let div = document.getElementById("result");
            if (div == null) {
                div = document.createElement("div");
                div.id = "result";
            }
            //we display the result
            div.innerHTML = result;
            document.body.appendChild(div);
        });

    }

}

addButtons();