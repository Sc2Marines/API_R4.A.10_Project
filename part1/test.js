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
        let outsideTheRegion = [];

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
        return outsideTheRegion;
    }

    //Q2 - moreNeighbors() : Pays(possibilité de plusieurs) ayant le plus grand nombre de
    // voisins. Affichez aussi les voisins.
    function moreNeighbors() {
        // Initialization of the counting and storage variables
        let maxNeighborsCount = 0;
        let countriesWithMaxNeighbors = [];

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
            console.log("Pays ayant le plus de voisins : "+country.name+ " avec "+maxNeighborsCount+" voisins.");

            // Checking if the country has neighbors
            if (country.borders && country.borders.length > 0) {
                country.borders.forEach(element => {
                    // Checking if the element is defined and has a name property
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

        // Returns the countries with the most neighbors
        return countriesWithMaxNeighbors;
    }

    //Q3 - neighborless() : Pays n’ayant aucun voisin.
    function neighborless() {
        let listNeighborless = [];
        
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

        return listNeighborless;
    }

    //Q4 - moreLanguages() : Pays(possibilité de plusieurs) parlant le plus de langues.
    // Affichez aussi les langues.
    function moreLanguages() {
        // Initialization of language counting and storage variables
        let maxLanguagesCount = 0;
        let countriesWithMaxLanguages = [];

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
            console.log("Pays ayant le plus de langues : "+country.name+ " avec "+maxLanguagesCount+" langues.");

            // Checking if the country has languages
            if (maxLanguagesCount > 0) {
                for (var key in country.languages.all_languages) {
                    console.log(`    - ${country.languages.all_languages[key]}`);
                }
            } else {
                console.log(`  Pas de langues.`);
            }
        });

        // Returns the countries with the most neighbors
        return countriesWithMaxLanguages;
    }

    //Q5 - withCommonLanguage() : Pays ayant au moins un voisin parlant l’une de ses
    // langues.Affichez aussi les pays voisins et les langues en question.

    //Q6 - withoutCommonCurrency() : Pays sans aucun voisin ayant au moins une de ses
    // monnaies.

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
        neighborless: neighborless,
        moreLanguages: moreLanguages,
        sortingDecreasingDensity: sortingDecreasingDensity,
        logall: logall,
        moreTopLevelDomains: moreTopLevelDomains

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