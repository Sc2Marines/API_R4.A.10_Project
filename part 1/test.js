import fill_db from './Country.js';






//c array of class Country (calling method fill_db of file Country.js)
let c = fill_db();






//for each function of this file, we add to the html a button to call the function

var MyNamespace = function () {
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
        let countries = [];
        for (let i = 0; i < c.length; i++) {
            let country = c[i];
            let continent = country.getContinent;
            let borders = country.getBorderCountries;
            for (let j = 0; j < borders.length; j++) {
                let border_country = borders[j];
                if (border_country.getContinent != continent) {
                    countries.push(country);
                    break;
                }
            }
        }
        return countries;
    }

    //console.log(outsideTheContinent());

    //Q2 - moreNeighbors() : Pays(possibilité de plusieurs) ayant le plus grand nombre de
    // voisins.Affichez aussi les voisins.

    function moreNeighbors() {
        let countries = [];
        let max = 0;
        for (let i = 0; i < c.length; i++) {
            let country = c[i];
            let borders = country.getBorderCountries;
            if (borders.length > max) {
                max = borders.length;
                countries = [country, borders];
            }
            else if (borders.length == max) {
                countries.push([country, borders]);
            }
        }
        return countries;
    }

    //console.log(moreNeighbors());

    //Q3 - neighborless() : Pays n’ayant aucun voisin.

    function neighborless() {
        let countries = [];
        for (let i = 0; i < c.length; i++) {
            let country = c[i];
            let borders = country.getBorderCountries;
            if (borders.length == 0) {
                countries.push(country);
            }
        }
        return countries;
    }

    //Q4 - moreLanguages() : Pays(possibilité de plusieurs) parlant le plus de langues.
    // Affichez aussi les langues.
    function moreLanguages() {
        let countries = [];
        let max = 0;
        for (let i = 0; i < c.length; i++) {
            let country = c[i];
            let languages = country.getLanguages;
            if (languages.length > max) {
                max = languages.length;
                countries = [country, languages];
            }
            else if (languages.length == max) {
                countries.push([country, languages]);
            }
        }
        return countries;
    }




    //Q5 - withCommonLanguage() : Pays ayant au moins un voisin parlant l’une de ses
    // langues.Affichez aussi les pays voisins et les langues en question.
    function withCommonLanguage() {
        let countries = [];
        for (let i = 0; i < c.length; i++) {
            let country = c[i];
            let languages = country.getLanguages;
            let borders = country.getBorderCountries;
            for (let j = 0; j < borders.length; j++) {
                let border_country = borders[j];
                let border_languages = border_country.getLanguages;
                for (let k = 0; k < languages.length; k++) {
                    let language = languages[k];
                    if (border_languages.includes(language)) {
                        countries.push([country, border_country, language]);
                        break;
                    }
                }
            }
        }
        return countries;
    }

    //Q6 - withoutCommonCurrency() : Pays sans aucun voisin ayant au moins une de ses
    // monnaies.
    function withoutCommonCurrency() {
        let countries = [];
        for (let i = 0; i < c.length; i++) {
            let country = c[i];
            let currencies = country.getCurrencies;
            let borders = country.getBorderCountries;
            let hasCommonCurrency = false;
            for (let j = 0; j < borders.length; j++) {
                let border_country = borders[j];
                let border_currencies = border_country.getCurrencies;
                for (let k = 0; k < currencies.length; k++) {
                    let currency = currencies[k];
                    if (border_currencies.includes(currency)) {
                        hasCommonCurrency = true;
                        break;
                    }
                }
            }
            if (!hasCommonCurrency) {
                countries.push(country);
            }
        }
        return countries;
    }



    // Q7 - sortingDecreasingDensity() : Pays triés par ordre décroissant de densité de
    // population.
    function sortingDecreasingDensity() {
        let countries = [];
        for (let i = 0; i < c.length; i++) {
            let country = c[i];
            let population = country.getPopulation;
            let area = country.getArea;
            let density = population / area;
            countries.push([country, density]);
        }
        countries.sort(function (a, b) {
            return b[1] - a[1];
        });
        return countries;
    }


    //Q8 - moreTopLevelDomains() : Pays ayant plusieurs Top Level Domains Internet.

    function moreTopLevelDomains() {
        let countries = [];
        for (let i = 0; i < c.length; i++) {
            let country = c[i];
            let domains = country.getTopLevelDomains;
            if (domains.length > 1) {
                countries.push(country);
            }
        }
        return countries;
    }



    //Q9 - veryLongTrip(nom_pays) : En partant d’un pays donné(représenté ici par
    // l’argument nom_pays), listez tous les pays que l’on peut visiter en passant de l’un à
    // l’autre.Evidemment, seuls les pays frontaliers sont accessibles depuis un pays donné.
    // Exemple : France -> Espagne -> Portugal.
    return {
        getAllFunctions: getAllFunctions
        , outsideTheContinent: outsideTheContinent
        , moreNeighbors: moreNeighbors
        , neighborless: neighborless
        , moreLanguages: moreLanguages
        , withCommonLanguage: withCommonLanguage
        , withoutCommonCurrency: withoutCommonCurrency
        , sortingDecreasingDensity: sortingDecreasingDensity
        , moreTopLevelDomains: moreTopLevelDomains
    };
}();


function addButtons() {
    let functions = MyNamespace.getAllFunctions();
    //console.log(functions);
    for (let i = 0; i < functions.length; i++) {
        let btn = document.createElement("button");
        btn.innerHTML = functions[i].name;
        btn.onclick = functions[i];
        document.body.appendChild(btn);
    }

}

addButtons();