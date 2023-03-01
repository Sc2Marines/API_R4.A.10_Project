import fill_db from './Country.js';






//c array of class Country (calling method fill_db of file Country.js)
//let c = fill_db();

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
            countries = [country,borders];
        }
        else if (borders.length == max) {
            countries.push([country,borders]);
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




//Q5 - withCommonLanguage() : Pays ayant au moins un voisin parlant l’une de ses
// langues.Affichez aussi les pays voisins et les langues en question.


//Q6 - withoutCommonCurrency() : Pays sans aucun voisin ayant au moins une de ses
// monnaies.


// Q7 - sortingDecreasingDensity() : Pays triés par ordre décroissant de densité de
// population.


//Q8 - moreTopLevelDomains() : Pays ayant plusieurs Top Level Domains Internet.


//Q9 - veryLongTrip(nom_pays) : En partant d’un pays donné(représenté ici par
// l’argument nom_pays), listez tous les pays que l’on peut visiter en passant de l’un à
// l’autre.Evidemment, seuls les pays frontaliers sont accessibles depuis un pays donné.
// Exemple : France -> Espagne -> Portugal.




//for each function of this file, we add to the html a button to call the function

function getAllFunctions() {
    console.log("getAllFunctions");
    var myfunctions = [];
    for (var l in this) {
        console.log(l);
        if (this.hasOwnProperty(l) &&
            this[l] instanceof Function &&
            !/myfunctions/i.test(l)) {
            myfunctions.push(this[l]);
        }
    }
    return myfunctions;
}

function addButtons() {
    let functions = getAllFunctions();
    let div = document.getElementById("buttons");
    for (let i = 0; i < functions.length; i++) {
        let button = document.createElement("button");
        button.innerHTML = functions[i].name;
        button.onclick = functions[i];
        div.appendChild(button);
    }
}

addButtons();