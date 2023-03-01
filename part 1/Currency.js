//class currency
function currency () {
    //associative array all currencies (key, value)
    this.all_currencies = new Array();

    //method to add currency
    this.add_currency = function (key, value) {
        this.all_currencies[key] = value;
    }

    this.set_currency = function (key, value) {
        this.all_currencies[key] = value;
    }

    this.remove_currency = function (key) {
        delete this.all_currencies[key];
    }

    this.remove_all_currencies = function () {
        this.all_currencies = new Array();
    }

    //method to get currency
    this.get_currency = function (key) {
        return this.all_currencies[key];
    }

    //method to get all currencies
    this.get_all_currencies = function () {
        return this.all_currencies;
    }

    //method tostring
    this.tostring = function () {
        var str = "";
        for (var key in this.all_currencies) {
            str += key + " : " + this.all_currencies[key] + " ";
        }
        return str;
    }

    //method exists
    this.exists = function (value) {
        for (var key in this.all_currencies) {
            if (this.all_currencies[key] == value) {
                return true;
            }
        }
        return false;
    }
}

//testing currency class
var c = new currency();
c.add_currency("USD", "US Dollar");
c.add_currency("EUR", "Euro");
c.add_currency("GBP", "British Pound");
c.add_currency("INR", "Indian Rupee");
c.add_currency("AUD", "Australian Dollar");
c.add_currency("CAD", "Canadian Dollar");

//testing all the methods
console.log(c.get_currency("USD"));
console.log(c.get_all_currencies());
console.log(c.tostring());
console.log(c.exists("Euro"));
c.set_currency("USD", "US TEST SET");
console.log(c.get_all_currencies());
c.remove_currency("USD");
console.log(c.get_all_currencies());
c.remove_all_currencies();
console.log(c.get_all_currencies());
