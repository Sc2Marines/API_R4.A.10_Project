import json from "./countries.json" assert { type: "json" };


class Country {
    constructor(alpha3Code, area, borders, capital, continent, demonym, flags, name, population, topLeveLDomains, currencies, languages) {
        this.alpha3Code = alpha3Code;
        this.area = area;
        this.borders = borders;
        this.capital = capital;
        this.continent = continent;
        this.demonym = demonym;
        this.flags = flags;
        this.name = name;
        this.population = population;
        this.topLeveLDomains = topLeveLDomains;
        this.currencies = currencies;
        this.languages = languages;
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
    getContinent() {
        return this.continent;
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
    getTopLevelDomains() {
        return this.topLeveLDomains;
    }
    // getCurrencies() {
    //     return this.currencies;
    // }
    getLanguages() {
        return this.languages;
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
    setContinent(continent) {
        this.continent = continent;
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
    setTopLevelDomains(topLeveLDomains) {
        this.topLeveLDomains = topLeveLDomains;
    }
    setCurrencies(currencies) {
        this.currencies = currencies;
    }
    setLanguages(languages) {
        this.languages = languages;
    }

    // toString method
    toString() {
        return `Alpha3Code: ${this.alpha3Code}, Area: ${this.area}, borders: ${this.borders}, Country name: ${this.name}, Capital: ${this.capital}, Continent: ${this.continent}, Demonym: ${this.demonym}, flags: ${this.flags}, Population: ${this.population}, Top Level Domains: ${this.topLeveLDomains}, Currencies: ${this.currencies}, Languages: ${this.languages}`;
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

        this.borders.forEach(element => {
            let new_border_country = countries.find((c) => c.alpha3Code === element);
            borderCountries.push(new_border_country);
        });

        return borderCountries;
    }

    //return currencies infos
    // getCurrencies() {
    //     let currencies = currencies.map(borderCode => allCountries.find(country => country.alpha3Code === borderCode));
    //     return currencies.filter(country => country != null);
    // }
}

const countries = fill_db();

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
            country.languages
        );

        //add new country into final table
        allCountries[country.alpha3Code] = new_country;
    });

    //return final table
    return allCountries;
}

let list = fill_db();
console.log(countries); //ok
console.log(countries["FRA"]); //ok
console.log(countries["FRA"].getPopDensity()); //ok
console.log(countries['FRA'].getBorders());
console.log(countries['FRA'].getCurrencies());

export default fill_db;
