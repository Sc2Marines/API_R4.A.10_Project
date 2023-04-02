import Country from "../part1/Country.js";

//AJAX call to https://restcountries.com/v2/all
const COUNTRIES_URL = "/part3/gateway_to_restcountries.php";
let req = new XMLHttpRequest();
req.open("GET", COUNTRIES_URL);
req.responseType = "json";
req.send();
console.log(req);
//constante pour récupérer les données
const LISTCOUNTRIESCONST = [];

req.onload = function () {
    let countries = req.response;
    for (let i = 0; i < countries.length; i++) {
        let country = countries[i];
        let new_country = new Country(
            country.alpha3Code,
            country.area,
            country.borders,
            country.capital,
            country.region,
            country.demonym,
            country.flags,
            country.name,
            country.population,
            country.topLevelDomain,
            country.currencies,
            country.languages,
            country.translations.fr
        );
        LISTCOUNTRIESCONST[country.alpha3Code] = new_country;
    }
}

// variable de SAUT pour la pagination
const SAUT = 25;



// valeurs initiales pour affichage
var deb = 0;
var fin = SAUT;

//variable utilisée pour la tableau initial
var listCountries = LISTCOUNTRIESCONST;
console.log(listCountries);

// trie le tableau initial par noms français
var listCountriesCopy = Object.values(listCountries).slice();

for (let i = 0; i < listCountriesCopy.length; i++) {
    // Go through the elements behind it.
    for (let j = i - 1; j > -1; j--) {
        // Value comparison using ascending order of sortBy.
        if (listCountriesCopy[j + 1].translationFR.localeCompare(listCountriesCopy[j].translationFR) < 0) {
            // Swap
            [listCountriesCopy[j + 1], listCountriesCopy[j]] = [listCountriesCopy[j],
            listCountriesCopy[j + 1],
            ];
        }
    }
}
listCountries = listCountriesCopy;

// event listener
var closeBtn = document.querySelector('.closeButton');
var previousButtons = document.querySelectorAll('.previous-button');
var nextButtons = document.querySelectorAll('.next-button');

function fillTable(start, end) {
    // réinitialise le tableau
    document.querySelectorAll(".lesPays tbody tr").forEach(element => {
        element.remove();
    });

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
        if (country.population) {
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

        tableau.appendChild(tr);
    }

    let count = 0;

    document.querySelectorAll(".lesPays tbody tr").forEach(element => {
        if (count < start || count >= end) {
            element.style.display = "none";
        }
        count = count + 1;
    });
}

// les boutons SUIV
nextButtons.forEach(nextButton => {
    nextButton.addEventListener('click', function () {
        //remonte en haut de la page
        window.scrollTo(0, 0);

        // nouvelle selection de pays
        deb = deb + SAUT;
        fin = fin + SAUT;

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
            if (fin >= document.querySelectorAll(".lesPays tbody tr").length) {
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

        //actualise les fonctions pour afficher les informations et drapeaux des pays
        afficheInformations();
        afficheDrapeau();
    });
});

// boutons PREC
previousButtons.forEach(previousButton => {
    previousButton.addEventListener('click', function () {

        // remonte en haut de la page
        window.scrollTo(0, 0);

        // verifie que deb ne va pas être negatif, car le pays -1 (et tous les autres negatifs) n'existe pas
        if (deb >= SAUT) {
            // fait reculer les variables pour afficher ceux d'avant
            deb = deb - SAUT;
            fin = fin - SAUT;

            // numéro de page
            let pageNumber = document.querySelectorAll('.page-number');

            // change tous les numéros de page par "Page "-1
            pageNumber.forEach(element => {
                let pageNumberText = element.textContent;
                let pageNumberArray = pageNumberText.split(' '); // diviser le texte en un tableau de chaînes de caractères, séparées par un espace
                let dernier = parseInt(pageNumberArray[pageNumberArray.length - 1]); // accéder au dernier élément du tableau et le convertir en un nombre entier  
                element.textContent = 'Page ' + (dernier - 1);
            });

            // réactive les boutons SUIV
            nextButtons.forEach(element => {
                element.disabled = false;
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

        //actualise les fonctions pour afficher les informations et drapeaux des pays
        afficheInformations();
        afficheDrapeau();
    });
});

closeBtn.addEventListener('click', function () {
    let leTable = document.querySelector(".detailsPays table");
    let lesPays = document.querySelector(".lesPays");
    let pagination = document.querySelectorAll(".pagination");
    let close = document.querySelector(".closeButton");

    leTable.style.display = "none";
    lesPays.style.filter = "blur(0px)";
    document.querySelector(".filtres").style.filter = "blur(0px)";
    lesPays.style.pointerEvents = "all";

    pagination.forEach(element => {
        element.style.pointerEvents = "all";
        element.style.filter = "blur(0px)";
    });

    close.style.display = "none";

    document.querySelector(".drapeauGrand").style.display = "none";

    // supprimer la ligne nouvellement créée
    let paysDetails = document.querySelectorAll(".pays-details");
    paysDetails.forEach(pays => pays.remove());
});

function afficheDrapeau() {
    document.querySelectorAll(".tdImg").forEach(element => {
        element.addEventListener('click', function () {

            let lesClasses = element.className.split(' ');
            let country = LISTCOUNTRIESCONST[lesClasses[1]];
            let close = document.querySelector(".closeButton");
            let img = document.querySelector(".drapeauGrand");

            let lesPays = document.querySelector(".lesPays");
            let pagination = document.querySelectorAll(".pagination");

            lesPays.style.filter = "blur(2px)";
            lesPays.style.pointerEvents = "none";

            pagination.forEach(element => {
                element.style.pointerEvents = "none";
                element.style.filter = "blur(2px)";
            });

            img.style.display = "block";
            img.src = country.flags.png;
            close.style.display = "block";
        });
    });
}

function afficheInformations() {
    document.querySelectorAll('.lesPays td:not(.tdImg)').forEach(element => {
        // détecte les clics sur le tableau pour renvoyer les informations du pays
        element.addEventListener('click', function (event) {
            let leTable = document.querySelector(".detailsPays table");
            let lesPays = document.querySelector(".lesPays");
            let pagination = document.querySelectorAll(".pagination");
            let close = document.querySelector(".closeButton");
            let country = LISTCOUNTRIESCONST[event.target.classList];

            leTable.style.display = "block";
            lesPays.style.filter = "blur(2px)";
            document.querySelector(".filtres").style.filter = "blur(2px)";
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
            if (country && "translationFR" in country) {
                cellule1.textContent = country?.translationFR;
            } else {
                cellule1.textContent = country.name;
            }

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
}

// initialise les listes déroulantes avec la liste des continents et des langues
function initListes() {
    //initialise les listes 
    var listContinents = [];
    var listLangages = [];

    // parcours les pays
    for (let theCountry in listCountries) {
        //récupère les informations du pays
        let country = listCountries[theCountry];

        //crée la liste des continents
        if (!listContinents.includes(country.region)) {
            listContinents.push(country.region)
        }

        //crée la liste des langages
        let languages = null
        if (country && country.languages) {
            languages = country.languages.all_languages;
            for (const key in languages) {
                if (!listLangages.includes(languages[key])) {
                    listLangages.push(languages[key])
                }

            }
        }
    }

    // trie par ordre alphabetique les tableaux
    listContinents = listContinents.sort();
    listLangages = listLangages.sort();

    var selectContinents = document.querySelector(".selectContinents");
    listContinents.forEach(element => {
        let opt = document.createElement("option");

        opt.value = element;
        opt.text = element;

        selectContinents.add(opt, null);
    });

    var selectLangages = document.querySelector(".selectLangages");
    listLangages.forEach(element => {
        let opt = document.createElement("option");

        opt.value = element;
        opt.text = element;

        selectLangages.add(opt, null);
    });
}

document.querySelector(".submitFiltres").addEventListener("click", function () {
    deb = 0;
    fin = SAUT;

    let continent = document.querySelector(".selectContinents").value;
    let langues = document.querySelector(".selectLangages").value;
    let inputNomPays = document.querySelector(".champTexte input").value;

    if (continent == "vide" && langues == "vide" && inputNomPays == "") {
        listCountries = fill_db();
    } else {
        let newListe = [];
        listCountries = fill_db();

        if (continent != 'vide') {
            for (let theCountry in listCountries) {
                let country = listCountries[theCountry];

                if (country.region == continent) {
                    newListe.push(country);
                }
            }
            listCountries = newListe;
            newListe = [];
        }

        if (langues != 'vide') {
            for (let theCountry in listCountries) {
                let country = listCountries[theCountry];
                let languages = null

                if (country && country.languages) {
                    languages = country.languages.all_languages;
                    for (const key in languages) {
                        if (languages[key] == langues) {
                            newListe.push(country);
                        }
                    }
                }
            }
            listCountries = newListe;
            newListe = [];
        }

        if (inputNomPays != "") {
            for (let theCountry in listCountries) {
                let country = listCountries[theCountry];

                if (country.name.toLowerCase().indexOf(inputNomPays) != -1 || country.translationFR.toLowerCase().indexOf(inputNomPays) != -1) {
                    newListe.push(country);
                    console.log(inputNomPays);
                }
            }
            listCountries = newListe;
            newListe = [];
        }
    }

    // rempli le tableau avec la nouvelle selection de pays
    fillTable(deb, fin);

    //actualise les fonctions pour afficher les informations et drapeaux des pays
    afficheInformations();
    afficheDrapeau();

    // désactive les boutons PREC
    previousButtons.forEach(element => {
        element.disabled = true;
    });

    // désactive les boutons SUIV si jamais on arrive à la fin de la liste
    nextButtons.forEach(element => {
        if (fin >= document.querySelectorAll(".lesPays tbody tr").length) {
            element.disabled = true;
        } else {
            element.disabled = false;
        }
    });

    let pageNumber = document.querySelectorAll('.page-number');

    // réinitialise le numéro de page
    pageNumber.forEach(element => {
        element.textContent = 'Page 1';
    });
});

document.querySelector(".reinitFiltres").addEventListener("click", function () {
    deb = 0;
    fin = SAUT;

    listCountries = fill_db();

    // désactive les boutons PREC
    previousButtons.forEach(element => {
        element.disabled = true;
    });

    // désactive les boutons SUIV si jamais on arrive à la fin de la liste
    nextButtons.forEach(element => {
        element.disabled = false;
    });

    let pageNumber = document.querySelectorAll('.page-number');

    // réinitialise le numéro de page
    pageNumber.forEach(element => {
        element.textContent = 'Page 1';
    });

    document.querySelector(".selectContinents").value = "vide";
    document.querySelector(".selectLangages").value = "vide";
    document.querySelector(".champTexte input").value = "";

    // rempli le tableau avec la nouvelle selection de pays
    fillTable(deb, fin);

    //actualise les fonctions pour afficher les informations et drapeaux des pays
    afficheInformations();
    afficheDrapeau();
});

document.querySelectorAll('.tris th:not(:last-child)').forEach(element => {
    element.addEventListener('click', function () {

        // désactive les boutons PREC
        previousButtons.forEach(element => {
            element.disabled = true;
        });
    
        // désactive les boutons SUIV si jamais on arrive à la fin de la liste
        nextButtons.forEach(element => {
            element.disabled = false;
        });
    
        let pageNumber = document.querySelectorAll('.page-number');
    
        // réinitialise le numéro de page
        pageNumber.forEach(element => {
            element.textContent = 'Page 1';
        });

        var columnIndex = this.cellIndex;
        sortTable(columnIndex);
    });
});

function sortTable(index) {
    deb = 0;
    fin = SAUT;

    var sortBy;
    var numeric = false;

    switch (index) {
        case 1:
            sortBy = "population";
            numeric = true;
            break;

        case 2:
            sortBy = "area";
            numeric = true;
            break;

        case 3:
            sortBy = "getPopDensity";
            numeric = true;
            break;

        case 4:
            sortBy = "region";
            break;

        default:
            sortBy = "translationFR";
            break;
    }

    if (numeric == true) {
        // Start from the second element.
        listCountriesCopy = Object.values(listCountries).slice();

        for (let i = 0; i < listCountriesCopy.length; i++) {
            // Go through the elements behind it.
            for (let j = i - 1; j > -1; j--) {
                // Value comparison using ascending order of population.
                if (sortBy == "getPopDensity") {
                    if (listCountriesCopy[j + 1].getPopDensity() < listCountriesCopy[j].getPopDensity()) {
                        // Swap
                        [listCountriesCopy[j + 1], listCountriesCopy[j]] = [listCountriesCopy[j],
                        listCountriesCopy[j + 1],
                        ];
                    }
                }
                else {
                    if (listCountriesCopy[j + 1][sortBy] < listCountriesCopy[j][sortBy]) {
                        // Swap
                        [listCountriesCopy[j + 1], listCountriesCopy[j]] = [listCountriesCopy[j],
                        listCountriesCopy[j + 1],
                        ];
                    }
                }
            }
        }
        listCountries = listCountriesCopy;

    } else {
        // Start from the second element.
        listCountriesCopy = Object.values(listCountries).slice();

        for (let i = 0; i < listCountriesCopy.length; i++) {
            // Go through the elements behind it.
            for (let j = i - 1; j > -1; j--) {
                // Value comparison using ascending order of sortBy.
                if (listCountriesCopy[j + 1][sortBy].localeCompare(listCountriesCopy[j][sortBy]) < 0) {
                    // Swap
                    [listCountriesCopy[j + 1], listCountriesCopy[j]] = [listCountriesCopy[j],
                    listCountriesCopy[j + 1],
                    ];
                }
            }
        }
        listCountries = listCountriesCopy;
    }

    fillTable(deb, fin);
}

//initialise la page
fillTable(deb, fin);
afficheInformations();
afficheDrapeau();
initListes();