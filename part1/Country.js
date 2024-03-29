import json from "./countries.json" assert { type: "json" };
import Language from "./Language.js";
import Currency from "./Currency.js";


class Country {
    constructor(alpha3Code, area, borders, capital, region, demonym, flags, name, population, topLevelDomain, currencies, languages, translationFR) {
        this.alpha3Code = alpha3Code;
        this.area = area;
        this.borders = borders;
        this.capital = capital;
        this.region = region;
        this.demonym = demonym;
        this.flags = flags;
        this.name = name;
        this.population = population;
        this.topLevelDomain = topLevelDomain;
        if (currencies != null) {
            let currency = new Currency();
            for (let i = 0; i < currencies.length; i++) {
                currency.add_currency(currencies[i].code, currencies[i].name);
            }
            this.currencies = currency;
        }
        else {
            this.currencies = null;
        }
        if (languages != null) {
            let language = new Language();
            for (let i = 0; i < languages.length; i++) {
                language.add_language(languages[i].iso639_1, languages[i].name);
            }
            this.languages = language;
        }
        else {
            this.languages = null;
        }
        this.translationFR = translationFR;
    }

    // getters
    getAlpha3Code() {
        return this.alpha3Code;
    }
    getArea() {
        return this.area;
    }
    // getborders() {
    //     return this.borders;
    // }
    getCapital() {
        return this.capital;
    }
    getRegion() {
        return this.region;
    }
    getDemonym() {
        return this.demonym;
    }
    getflags() {
        return this.flags;
    }
    getName() {
        return this.name;
    }
    getpopulation() {
        return this.population;
    }
    gettopLevelDomain() {
        return this.topLevelDomain;
    }
    // getCurrencies() {
    //     return this.currencies;
    // }
    getLanguages() {
        return this.languages;
    }
    gettranslationFR() {
        return this.translationFR;
    }

    // setters
    setAlpha3Code(alpha3Code) {
        this.alpha3Code = alpha3Code;
    }
    setArea(area) {
        this.area = area;
    }
    setborders(borders) {
        this.borders = borders;
    }
    setCapital(capital) {
        this.capital = capital;
    }
    setRegion(region) {
        this.region = region;
    }
    setDemonym(demonym) {
        this.demonym = demonym;
    }
    setflags(flags) {
        this.flags = flags;
    }
    setName(name) {
        this.name = name;
    }
    setpopulation(population) {
        this.population = population;
    }
    settopLevelDomain(topLevelDomain) {
        this.topLevelDomain = topLevelDomain;
    }
    setCurrencies(currencies) {
        this.currencies = currencies;
    }
    setLanguages(languages) {
        this.languages = languages;
    }
    settranslationFR(translationFR) {
        this.translationFR = translationFR;
    }

    // toString method
    toString() {
        return `Alpha3Code: ${this.alpha3Code}, Area: ${this.area}, borders: ${this.borders}, Country name: ${this.name}, Capital: ${this.capital}, region: ${this.region}, Demonym: ${this.demonym}, flags: ${this.flags}, Population: ${this.population}, Top Level Domains: ${this.topLevelDomain}, Currencies: ${this.currencies}, Languages: ${this.languages}`;
    }

    //return population density
    getPopDensity() {
        let area = this.area;
        let population = this.population;
        if (!area || !population) {
            return null;
        }
        return population / area;
    }

    //return border countries
    getBorders() {
        let borderCountries = [];
        if (this.borders != null) {
            this.borders.forEach(element => {
                let country = list[element];
                borderCountries.push(country);
            });
        }

        return borderCountries;
    }


    // return currencies infos
    getCurrencies() {
        //if there is no currency
        if (this.currencies == null) {
            return null;
        }
        return this.currencies;
    }

    //return languages infos
    getLanguages() {
        return this.languages;
    }
}

function fill_db() {
    //initialise final countries table
    let allCountries = [];
    //loop travelling each country
    json.forEach(country => {  //json is imported at first line
        //create a new country
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
        //console.log(new_country.toString());
        //add new country into final table
        allCountries[country.alpha3Code] = new_country;
    });

    //return final table
    return allCountries;
}

const allCountries = fill_db();
const list = fill_db();


// console.log(list); //ok
// console.log(list["FRA"]); //ok
// console.log(list["FRA"].getPopDensity()); //ok
//console.log(list['FRA'].getBorders());
// console.log(list['FRA'].getCurrencies());
//console.log(list['FRA'].getLanguages());

export default fill_db;
