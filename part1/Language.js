function Language() {
    this.all_languages = new Array();
    this.add_language = function (key, value) {
        this.all_languages[key] = value;
    }

    this.set_language = function (key, value) {
        this.all_languages[key] = value;
    }

    this.remove_language = function (key) {
        delete this.all_languages[key];
    }

    this.remove_all_languages = function () {
        this.all_languages = new Array();
    }

    this.get_language = function (key) {
        return this.all_languages[key];
    }

    this.get_all_languages = function () {
        return this.all_languages;
    }

    this.tostring = function () {
        var str = "";
        for (var key in this.all_languages) {
            str += key + " : " + this.all_languages[key] + " ";
        }
        return str;
    }
}

export default Language;