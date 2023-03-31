import fill_db from "../part1/Country.js";

// variable de SAUT pour la pagination
const SAUT = 25;

// valeurs initiales pour affichage
var deb = 0;
var fin = SAUT;

// liste de tous les pays
var listCountries = fill_db();

// affiche les pays
fillTable(deb, fin);

// event listener
var closeBtn = document.querySelector('.closeButton');
var previousButtons = document.querySelectorAll('.previous-button');
var nextButtons = document.querySelectorAll('.next-button');

// Rempli le tableau avec les lays de la liste
function fillTable(start, end) {
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
        // ajoute une classe avec le alpha3Code afin de pouvoir récupérer le pays pour récupérer les informations
        td1.classList.add(country.alpha3Code);

        var td2 = document.createElement("td");
        // verifie que l'élément existe
        if (country.population) {
            // met en forme les chiffres afin de mettre un espace tous les 3 numéros
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
        // mets les liens et description pour le drapeau
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

        // ajoute les lignes au tableau
        tableau.appendChild(tr);
    }

    // masque les éléments qui ne sont pas entre la séléction de début et de fin
    let count = 0;
    document.querySelectorAll(".lesPays tbody tr").forEach(element => {
        if (count < start || count > end) {
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
            if (fin >= Object.keys(listCountries).length) {
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

// bouton pour masque les informations du pays et le drapeau
closeBtn.addEventListener('click', function () {
    let lesPays = document.querySelector(".lesPays");

    // masque le tableau d'information et retire le flou 
    document.querySelector(".detailsPays table").style.display = "none";
    lesPays.style.filter = "blur(0px)";
    lesPays.style.pointerEvents = "all";

    // réactive les evenements de la souris sur les boutons 
    document.querySelectorAll(".pagination").forEach(element => {
        element.style.pointerEvents = "all";
        element.style.filter = "blur(0px)";
    });

    // masque le bouton X
    document.querySelector(".closeButton").style.display = "none";

    // supprimer la ligne nouvellement créée
    let paysDetails = document.querySelectorAll(".pays-details");
    paysDetails.forEach(pays => pays.remove());
});

// fonction pour afficher le drapeau
function afficheDrapeau() { 
    document.querySelectorAll(".tdImg").forEach(element => {
        element.addEventListener('click', function () {
            // récupère la 2ème classe du th du drapeau à savoir le alpha3Code du pays
            let lesClasses = element.className.split(' ');
            let country = listCountries[lesClasses[1]];

            let img = document.querySelector(".drapeauGrand");
            let lesPays = document.querySelector(".lesPays");

            // floute et desactive les evenements de la souris sur le tableau de tous les pays
            lesPays.style.filter = "blur(2px)";
            lesPays.style.pointerEvents = "none";

            // floute et desactive les evenements de la souris sur le tableau de tous les pays
            document.querySelectorAll(".pagination").forEach(element => {
                element.style.pointerEvents = "none";
                element.style.filter = "blur(2px)";
            });
            
            // ajoute le lien du drapeau à l'image
            img.src = country.flags.png;

            // affiche le drapeau et le bouton X
            img.style.display = "block";
            document.querySelector(".closeButton").style.display = "block";
        });
    });
}

// fonction pour afficher les informations du pays sur lequel on clique
function afficheInformations() {
    document.querySelectorAll('.lesPays td:not(.tdImg)').forEach(element => {
        // détecte les clics sur le tableau pour renvoyer les informations du pays
        element.addEventListener('click', function () {
            let leTable = document.querySelector(".detailsPays table");
            let lesPays = document.querySelector(".lesPays");
            let country = listCountries[event.target.classList];

            // floute et desactive la souris l'arrière plan
            leTable.style.display = "block";
            lesPays.style.filter = "blur(2px)";
            lesPays.style.pointerEvents = "none";

            // floute et desactive la souris sur les boutons suiv et prec
            document.querySelectorAll(".pagination").forEach(element => {
                element.style.pointerEvents = "none";
                element.style.filter = "blur(2px)";
            });

            // fait appraitre le bouton X
            document.querySelector(".closeButton").style.display = "block";

            // insérer une nouvelle ligne
            let nouvelleLigne = leTable.insertRow();

            // insérer des cellules dans la nouvelle ligne
            let cellule1 = nouvelleLigne.insertCell();
            let cellule2 = nouvelleLigne.insertCell();
            let cellule3 = nouvelleLigne.insertCell();
            let cellule4 = nouvelleLigne.insertCell();
            let cellule5 = nouvelleLigne.insertCell();
            let cellule6 = nouvelleLigne.insertCell();
            let cellule7 = nouvelleLigne.insertCell();
            let cellule8 = nouvelleLigne.insertCell();
            let cellule9 = nouvelleLigne.insertCell();
            let cellule10 = nouvelleLigne.insertCell();
            let cellule11 = nouvelleLigne.insertCell();
            let cellule12 = nouvelleLigne.insertCell();

            cellule1.classList.add("pays-details");
            cellule2.classList.add("pays-details");
            cellule3.classList.add("pays-details");
            cellule4.classList.add("pays-details");
            cellule5.classList.add("pays-details");
            cellule6.classList.add("pays-details");
            cellule7.classList.add("pays-details");
            cellule8.classList.add("pays-details");
            cellule9.classList.add("pays-details");
            cellule10.classList.add("pays-details");
            cellule11.classList.add("pays-details");
            cellule12.classList.add("pays-details");

            // ajouter des données aux cellules
            // verifie que les informations existent
            if (country && "translationFR" in country) {
                cellule1.textContent = country?.translationFR;
            } else {
                cellule1.textContent = country.name;
            }

            if (country.population) {
                // met en forme les chiffres en mettant des espaces tous les 3 caracteres
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
                // parcours toutes les monnaies
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

//initialise les fonctions pour afficher les informations et drapeaux des pays
afficheInformations();
afficheDrapeau();