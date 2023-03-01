//class currency
function currency () {
    //associative array all currencies (key, value)
    this.all_currencies = new Array();

    //method to add currency
    this.add_currency = function (key, value) {
        this.all_currencies[key] = value;
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