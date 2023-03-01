class Country {
    constructor(capital, continent, demonym, flag, name, demography, topLeveLDomains, currencies, langages) {
        this.capital = capital;
        this.continent = continent;
        this.demonym = demonym;
        this.flag = flag;
        this.name = name;
        this.demography = demography;
        this.topLeveLDomains = topLeveLDomains;
        this.currencies = currencies;
        this.langages = langages;
    }

    // getters
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
    getDemography() {
        return this.demography;
    }
    getTopLevelDomains() {
        return this.topLeveLDomains;
    }
    getCurrencies() {
        return this.currencies;
    }
    getLanguages() {
        return this.langages;
    }

    // setters
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
    setDemography(demography) {
        this.demography = demography;
    }
    setTopLevelDomains(topLeveLDomains) {
        this.topLeveLDomains = topLeveLDomains;
    }
    setCurrencies(currencies) {
        this.currencies = currencies;
    }
    setLanguages(langages) {
        this.langages = langages;
    }

    // toString method
    toString() {
        return `Country name: ${this.name}, Capital: ${this.capital}, Continent: ${this.continent}, Demonym: ${this.demonym}, Flag: ${this.flag}, Demography: ${this.demography}, Top Level Domains: ${this.topLeveLDomains}, Currencies: ${this.currencies}, Languages: ${this.langages}`;
    }
}
