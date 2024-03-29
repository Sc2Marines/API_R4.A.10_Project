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
    function outsideTheContinent() {
        let outsideTheRegion = [];
        let html = "";
        // Course of all the countries of the list
        for (let theCountry in listCountries) {
            // interesting information
            let country = listCountries[theCountry];
            let continent = country.getRegion();
            let listBorders = country.getBorders();

            // foreach borders
            listBorders.forEach(element => {
                // check if the country has borders
                if (element != null && element.region !== undefined) {

                    //if border's continent not the same, push in the result list
                    if (element.region != continent) {
                        outsideTheRegion.push(country);
                    }
                }
            });
        }
        for (let i = 0; i < outsideTheRegion.length; i++) {
            html += '&nbsp;-' + outsideTheRegion[i].name + '<br>';
        }
        return html;
    }

    //Q2 - moreNeighbors() : Pays(possibilité de plusieurs) ayant le plus grand nombre de
    // voisins. Affichez aussi les voisins.
    function moreNeighbors() {
        // Initialization of the counting and storage variables
        let maxNeighborsCount = 0;
        let countriesWithMaxNeighbors = [];
        let html = "";

        // Course of all the countries of the list
        for (let theCountry in listCountries) {
            let country = listCountries[theCountry];
            let neighbors = country.getBorders();

            // Check if the country has more neighbors than the previous countries browsed and update the max
            if (neighbors && neighbors.length > maxNeighborsCount) {
                maxNeighborsCount = neighbors.length;
            }
        }

        // Course of all the countries of the list
        for (let theCountry in listCountries) {
            let country = listCountries[theCountry];
            let neighbors = country.getBorders();

            // Checking if the country has the same number of neighbors as the max
            if (neighbors && neighbors.length == maxNeighborsCount) {
                countriesWithMaxNeighbors.push(country);
            }
        }

        // Display of the countries with the most neighbors and their respective neighbors
        countriesWithMaxNeighbors.forEach(country => {
            console.log("Pays ayant le plus de voisins : " + country.name + " avec " + maxNeighborsCount + " voisins.");
            html += "Pays ayant le plus de voisins : " + country.name + " avec " + maxNeighborsCount + " voisins.<br>";
            // Checking if the country has neighbors
            if (country.borders && country.borders.length > 0) {
                country.borders.forEach(element => {
                    // Checking if the element is defined and has a name property
                    if (listCountries[element] != null && listCountries[element].name !== undefined) {
                        console.log(`    - ${listCountries[element].name}`);
                        html += `    - ${listCountries[element].name}<br>`;
                    } else {
                        console.log(`    - ${element} (Ce code alpha 3 n'est pas associé à un pays)`);
                    }
                });
            } else {
                console.log(`  No neighbors.`);
            }
        });
        // Returns the countries with the most neighbors
        return html;
    }

    //Q3 - neighborless() : Pays n’ayant aucun voisin.
    function neighborless() {
        let listNeighborless = [];
        let html = "";
        //Course of all the countries of the list
        for (let theCountry in listCountries) {
            let country = listCountries[theCountry];
            let neighbors = country.getBorders();

            // Checking if the country has no neighbors
            if (neighbors.length == 0) {
                // add it to the list of countries with no neighbors
                listNeighborless.push(country);
            }
        }

        for (let i = 0; i < listNeighborless.length; i++) {
            html += '&nbsp;-' + listNeighborless[i].name + '<br>';
        }
        return html;
    }

    //Q4 - moreLanguages() : Pays(possibilité de plusieurs) parlant le plus de langues.
    // Affichez aussi les langues.
    function moreLanguages() {
        // Initialization of language counting and storage variables
        let maxLanguagesCount = 0;
        let countriesWithMaxLanguages = [];
        let html = "";

        // Course of all the countries of the list
        for (let theCountry in listCountries) {
            // for each country, give the number of languages
            let country = listCountries[theCountry];
            let languages = country.getLanguages();
            let keys = Object.keys(languages.all_languages);
            let taille = keys.length;

            // Check if the country has more languages ​​than the previous countries browsed and update the max size
            if (taille > maxLanguagesCount) {
                maxLanguagesCount = taille;
            }
        }

        // look again to find out which countries correspond to the maximum size
        for (let theCountry in listCountries) {
            let country = listCountries[theCountry];
            let languages = country.getLanguages();
            let keys = Object.keys(languages.all_languages);
            let taille = keys.length;

            if (taille == maxLanguagesCount) {
                countriesWithMaxLanguages.push(country);
            }
        }

        // Display of the countries with the most languages ​​and their respective languages
        countriesWithMaxLanguages.forEach(country => {
            console.log("Pays ayant le plus de langues : " + country.name + " avec " + maxLanguagesCount + " langues.");
            html += "Pays ayant le plus de langues : " + country.name + " avec " + maxLanguagesCount + " langues.<br>";
            // Checking if the country has languages
            if (maxLanguagesCount > 0) {
                for (var key in country.languages.all_languages) {
                    console.log(`    - ${country.languages.all_languages[key]}`);
                    html += `    - ${country.languages.all_languages[key]}<br>`;
                }
            } else {
                console.log(`  Pas de langues.`);
            }
        });

        // Returns the countries with the most neighbors
        return html;
    }


    //get coutnry by name (return country object)
    function getCountryByName(name) {
        for (let theCountry in listCountries) {
            let country = listCountries[theCountry];
            if (country.name == name) {
                return country;
            }
        }
    }

    //Q5 - withCommonLanguage() : Pays ayant au moins un voisin parlant l’une de ses
    // langues.Affichez aussi les pays voisins et les langues en question.

    function withCommonLanguage() {
        let listCountriesCopy = Object.values(listCountries).slice();
        let listCountriesWithCommonLanguage = [];
        let count = 0;

        for (let i = 0; i < listCountriesCopy.length; i++) {

            let dico = {};
            let country = listCountriesCopy[i];
            let languages = country.getLanguages().get_all_languages();
            let borders = country.getBorders();
            //we add the country as a key in the dico
            dico[country.name] = [];

            let hasCommonLanguage = false;

            for (let j = 0; j < borders.length; j++) {
                let border = borders[j];
                if (border == null) {
                    continue;
                }
                else {
                    if (border.getLanguages() != null) {
                        let borderLanguages = border.getLanguages().get_all_languages();
                        //for each key in borderLanguages
                        for (let key in borderLanguages) {
                            //if the key is in languages
                            if (key in languages) {
                                hasCommonLanguage = true;
                                dico[country.name].push(border);
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
                count++;
            }
        }

        let html = "";
        //get all the keys of the dico
        for (let i = 0; i < listCountriesWithCommonLanguage.length; i++) {
            let dico = listCountriesWithCommonLanguage[i];
            let keys = Object.keys(dico);
            //print the type of the key
            let country = keys[0];
            let neighbors = dico[country];

            console.log("Pays ayant au moins un voisin parlant l'une de ses langues : " + country);
            html += country + "<br>";
            // Checking if the country has neighbors
            if (neighbors.length > 0) {
                neighbors.forEach(element => {
                    // Checking if the element is defined and has a name property
                    if (element != null && element.name !== undefined) {
                        console.log(`    - ${element.name}`);
                        html += '&nbsp;&nbsp;&nbsp;-' + element.name + ':';
                        //add the commons languages from the country and the neighbor to the html
                        let languages = element.getLanguages().get_all_languages();
                        console.log(dico);
                        html += " [";
                        for (let key in languages) {
                            if (key in getCountryByName(country).getLanguages().get_all_languages()) {
                                console.log(`        - ${languages[key]}`);
                                html += languages[key] + ", ";
                            }
                        }
                        html += "]<br>";
                    } else {
                        console.log(`    - ${element} (Ce code alpha 3 n'est pas associé à un pays)`);
                    }
                });
            } else {
                console.log(`  No neighbors.`);
            }
        }
        console.log("Nombre de pays : " + count);
        return html;
    }

    //Q6 - withoutCommonCurrency() : Pays, sans aucun voisin ayant au moins une de ses monnaies.
    function withoutCommonCurrency() {
        let listCountriesCopy = Object.values(listCountries).slice();
        let listCountriesWithoutCommonCurrency = [];
        let count = 0;

        for (let i = 0; i < listCountriesCopy.length; i++) {

            let dico = {};
            let country = listCountriesCopy[i];
            if (country.getCurrencies() == null) {
                continue;
            }
            let currencies = country.getCurrencies().get_all_currencies();
            console.log(currencies)
            let borders = country.getBorders();
            //we add the country as a key in the dico
            dico[country.name] = [];

            let hasCommonCurrencies = false;

            for (let j = 0; j < borders.length; j++) {
                let border = borders[j];
                if (border == null) {
                    continue;
                }
                else {
                    if (border.getCurrencies() != null) {
                        let borderCurrencies = border.getCurrencies().get_all_currencies();
                        console.log(borderCurrencies)
                        //for each key in borderLanguages
                        for (let key in borderCurrencies) {
                            //if the key is in languages
                            if (key in currencies) {
                                hasCommonCurrencies = true;

                                break;
                            }
                            else {
                                dico[country.name].push(border);
                                break;
                            }
                        }
                    }
                    else {
                        continue;
                    }
                }
            }

            if (!hasCommonCurrencies) {
                listCountriesWithoutCommonCurrency.push(dico);
                count++;
            }
        }

        let html = "";
        //get all the keys of the dico
        for (let i = 0; i < listCountriesWithoutCommonCurrency.length; i++) {
            let dico = listCountriesWithoutCommonCurrency[i];
            let keys = Object.keys(dico);
            //print the type of the key
            let country = keys[0];
            let neighbors = dico[country];

            console.log("Pays sans aucun voisin ayant au moins une de ses monnaies : " + country);
            html += country + "<br>";
            // Checking if the country has neighbors
            if (neighbors.length > 0) {
                neighbors.forEach(element => {
                    // Checking if the element is defined and has a name property
                    if (element != null && element.name !== undefined) {
                        console.log(`    - ${element.name}`);
                        html += '&nbsp;&nbsp;&nbsp;-' + element.name + "<br>";
                    } else {
                        console.log(`    - ${element} (Ce code alpha 3 n'est pas associé à un pays)`);
                    }
                });
            } else {
                console.log(`  No neighbors.`);
            }
        }

        console.log("count" + count);
        return html;
    }

    // Q7 - sortingDecreasingDensity() : Pays triés par ordre décroissant de densité de
    // population.
    function sortingDecreasingDensity() {
        console.log("sortingDecreasingDensity");
        // Copier le tableau des pays pour ne pas le modifier directement
        let listCountriesCopy = Object.values(listCountries).slice();
        let html = "";
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

        for (let i = 0; i < listCountriesCopy.length; i++) {
            html += '&nbsp;-' + listCountriesCopy[i].name + " : " + listCountriesCopy[i].getPopDensity() + "<br>";
        }
        // Retourner le nouveau tableau trié
        return html;
    }

    //Q8 - moreTopLevelDomains() : Pays ayant plusieurs Top Level Domains Internet.
    function moreTopLevelDomains() {
        let html = "";
        console.log("moreTopLevelDomains");
        let listCountriesCopy = Object.values(listCountries).slice();
        let listCountriesWithMoreTopLevelDomains = [];

        for (let i = 0; i < listCountriesCopy.length; i++) {
            if (listCountriesCopy[i].gettopLevelDomain().length > 1) {
                listCountriesWithMoreTopLevelDomains.push(listCountriesCopy[i]);
            }
        }

        for (let i = 0; i < listCountriesWithMoreTopLevelDomains.length; i++) {
            html += '&nbsp;-' + listCountriesWithMoreTopLevelDomains[i].name + "<br>";
        }

        return html;
    }

    //Q9 - veryLongTrip(nom_pays) : En partant d’un pays donné(représenté ici par
    // l’argument nom_pays), listez tous les pays que l’on peut visiter en passant de l’un à
    // l’autre.Evidemment, seuls les pays frontaliers sont accessibles depuis un pays donné.
    // Exemple : France -> Espagne -> Portugal.
    // on peut accéder à la liste des pays frontaliers d’un pays donné via la méthode getBorders()
    // Exemple : listCountries["FRA"].getBorders() retourne la liste des pays frontaliers de la France.
    // on peut accéder au nom d’un pays via la propriété name
    // Exemple : listCountries["FRA"].name retourne le nom de la France.

    function veryLongTrip(nom_pays = "") {

        let listCountriesCopy = Object.values(listCountries).slice();
        let dico = {};
        //if nom_pays is empty, ask the user to enter a country name and while the country name is not in the listCountriesCopy, ask again
        if (nom_pays == "") {
            nom_pays = prompt("Entrez le nom d'un pays : ");
            while (!listCountriesCopy.find(country => country.name == nom_pays)) {
                nom_pays = prompt("Entrez le nom d'un pays : ");
            }
        }

        let pile = [[nom_pays]];
        let visites = new Set();
        let html = "";
        visites.add(nom_pays);
        while (pile.length > 0) {
            let chemin = pile.pop();
            let paysActuel = chemin[chemin.length - 1];
            let index = listCountriesCopy.findIndex(country => country.name == paysActuel);
            let voisins = listCountriesCopy[index].getBorders();

            voisins.forEach(voisin => {
                if (!visites.has(voisin)) {
                    visites.add(voisin);
                    let nouveauChemin = chemin.concat([voisin.name]);
                    pile.push(nouveauChemin);
                    if (!dico[paysActuel]) {
                        dico[paysActuel] = [];
                    }
                    dico[paysActuel].push({ pays: voisin.name, chemin: nouveauChemin });
                }
            });
        }
        for (let key in dico) {
            dico[key].forEach(element => {
                let chemin = element.chemin.join(" -> ");
                html += `&nbsp;-<a href="#" onclick="alert('${chemin}')">${element.pays}</a><br>`;
            });
        }
        return html;
    }

    return {
        getAllFunctions: getAllFunctions,
        outsideTheContinent: outsideTheContinent,
        moreNeighbors: moreNeighbors,
        neighborless: neighborless,
        moreLanguages: moreLanguages,
        sortingDecreasingDensity: sortingDecreasingDensity,
        moreTopLevelDomains: moreTopLevelDomains,
        withoutCommonCurrency: withoutCommonCurrency,
        withCommonLanguage: withCommonLanguage,
        veryLongTrip: veryLongTrip
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