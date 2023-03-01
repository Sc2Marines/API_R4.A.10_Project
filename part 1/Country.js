import countriesJSON from './countries.json' assert { type: 'JSON' };

class Country {
    constructor(alpha3Code, area, borderCountries, capital, continent, demonym, flag, name, population, topLeveLDomains, currencies, languages) {
        this.alpha3Code = alpha3Code;
        this.area = area;
        this.borderCountries = borderCountries;
        this.capital = capital;
        this.continent = continent;
        this.demonym = demonym;
        this.flag = flag;
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
    getBorderCountries() {
        return this.borderCountries;
    }
    getCapital() {
        return this.capital;
    }
    getContinent() {
        return this.continent;
    }
    getDemonym() {
        return this.demonym;
    }
    getFlag() {
        return this.flag;
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
    getCurrencies() {
        return this.currencies;
    }
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
    setBorderCountries(borderCountries) {
        this.borderCountries = borderCountries;
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
    setFlag(flag) {
        this.flag = flag;
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
        return `Alpha3Code: ${this.alpha3Code}, Area: ${this.area}, BorderCountries: ${this.borderCountries}, Country name: ${this.name}, Capital: ${this.capital}, Continent: ${this.continent}, Demonym: ${this.demonym}, Flag: ${this.flag}, Population: ${this.population}, Top Level Domains: ${this.topLeveLDomains}, Currencies: ${this.currencies}, Languages: ${this.languages}`;
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
        let borders = this.borders;

        //check if the country has currencies
        if (!borders) {
            return null;
        }

        
        let countries = Countries.getAll();

        return borders.map(code => countries.find(country => country.alpha3Code === code));
    }

    //return currencies infos
    getCurrencies() {
        let currencies = this.currencies;

        //check if the country has currencies
        if (!currencies) {
            return null;
        } else {
            return currencies.map(currency => new Currency(currency));
        }
    }
}

function fill_db() {
    //the json file is read in the import

    //parse json into js object
    let countriesJS = JSON.parse(countriesJSON);

    //initialise final countries table
    let allCountries = {};

    //loop travelling each country
    countriesJS.forEach(country => {
        //create a new country
        let new_country = new Country(
            country.alpha3Code,
            country.area,
            country.borderCountries,
            country.capital,
            country.region,
            country.demonym,
            country.flag,
            country.name,
            country.population,
            country.topLevelDomain,
            country.currencies,
            country.languages
        );
    });

    //add new country into final table
    allCountries[country.alpha3Code] = new_country;

    //return final table
    return allCountries;
}

export default fill_db;
