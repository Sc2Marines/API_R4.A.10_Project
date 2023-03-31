import fill_db from "../part1/Country.js";

// variable de SAUT pour la pagination
const SAUT = 25;

// valeurs initiales pour affichage
var deb = 0;
var fin = SAUT;

// constante pour récupérer les données
const LISTCOUNTRIESCONST = fill_db();

// variable utilisée pour la tableau initial
var listCountries = fill_db();

// event listener
var closeBtn = document.querySelector('.closeButton');
var previousButtons = document.querySelectorAll('.previous-button');
var nextButtons = document.querySelectorAll('.next-button');

// fonction pour remplir le tableau
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
        // ajoute une classe avec le alpha3Code afin de reconnaitre le pays lorsqu'on clique sur la cellule du tableau
        td1.classList.add(country.alpha3Code);

        var td2 = document.createElement("td");
        // verifie que l'element existe
        if (country.population) {
            // met en forme les chiffres
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
        // ajoute le lien et la description pour le drapeau
        img.src = country.flags.png;
        img.alt = "Drapeau de " + country.translationFR;
        td6.appendChild(img);
        // ajoute une classe pour la diférencier des autres cases du tableau car on ne peut pas cliquer dessus pour affiche les informations
        td6.classList.add("tdImg");
        td6.classList.add(country.alpha3Code);

        // Ajouter les éléments de données à la ligne de tableau
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);

        // ajoute les lignes au tableau
        tableau.appendChild(tr);
    }

    // masque les éléments si ils ne sont pas entre le début et la fin de la séléction
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
    nextButton.addEventListener('click', function (event) {
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
    previousButton.addEventListener('click', function (event) {

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

// bouton pour fermer la page 
closeBtn.addEventListener('click', function () {
    let lesPays = document.querySelector(".lesPays");

    // défloute le tableau et les filtres
    document.querySelector(".detailsPays table").style.display = "none";
    lesPays.style.filter = "blur(0px)";
    document.querySelector(".filtres").style.filter = "blur(0px)";
    lesPays.style.pointerEvents = "all";

    // défloute les boutons suiv et prec
    document.querySelectorAll(".pagination").forEach(element => {
        element.style.pointerEvents = "all";
        element.style.filter = "blur(0px)";
    });

    // masque le bouton X et l'image du drapeau
    document.querySelector(".closeButton").style.display = "none";
    document.querySelector(".filtres").style.pointerEvents = "all";
    document.querySelector(".drapeauGrand").style.display = "none";

    // supprimer les éléments nouvellement créés
    let paysDetails = document.querySelectorAll(".pays-details");
    paysDetails.forEach(pays => pays.remove());
});

// fonction pour afficher le drapeau au premier plan
function afficheDrapeau() {
    document.querySelectorAll(".tdImg").forEach(element => {
        element.addEventListener('click', function () {
            // récupère la 2ème classe du th du drapeau à savoir le alpha3Code du pays
            let lesClasses = element.className.split(' ');
            let country = LISTCOUNTRIESCONST[lesClasses[1]];
            let img = document.querySelector(".drapeauGrand");
            let lesPays = document.querySelector(".lesPays");

            // floute et desactive les evenements de souris sur le tableau principal
            document.querySelector(".filtres").style.pointerEvents = "none";
            document.querySelector(".filtres").style.filter = "blur(2px)";
            lesPays.style.filter = "blur(2px)";
            lesPays.style.pointerEvents = "none";

            // idem sur les boutons suiv et prec
            document.querySelectorAll(".pagination").forEach(element => {
                element.style.pointerEvents = "none";
                element.style.filter = "blur(2px)";
            });

            // affiche le drapeau
            img.style.display = "block";
            img.src = country.flags.png;
            document.querySelector(".closeButton").style.display = "block";
        });
    });
}

function afficheInformations() {
    document.querySelectorAll('.lesPays td:not(.tdImg)').forEach(element => {
        // détecte les clics sur le tableau pour renvoyer les informations du pays
        element.addEventListener('click', function () {
            let leTable = document.querySelector(".detailsPays table");
            let lesPays = document.querySelector(".lesPays");
            let pagination = document.querySelectorAll(".pagination");
            let close = document.querySelector(".closeButton");
            let country = LISTCOUNTRIESCONST[event.target.classList];

            leTable.style.display = "block";
            lesPays.style.filter = "blur(2px)";
            document.querySelector(".filtres").style.filter = "blur(2px)";
            lesPays.style.pointerEvents = "none";
            document.querySelector(".filtres").style.pointerEvents = "none";

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

            if (country.population) {
                cellule2.textContent = country.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            } else {
                cellule2.textContent = "Indéfini";
            }

            if (country.area) {
                cellule3.textContent = country.area.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " km²";
            } else {
                cellule3.textContent = "Indéfini";
            }

            if (cellule2.textContent != "Indéfini" && cellule3.textContent != "Indéfini") {
                cellule4.textContent = Math.round(country.getPopDensity() * 100) / 100 + " hab/km²";
            } else {
                cellule4.textContent = "Indéfini";
            }

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

//initialise la page
fillTable(deb, fin);
afficheInformations();
afficheDrapeau();
initListes();