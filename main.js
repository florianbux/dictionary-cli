const axios = require("axios");

const app_id = "a6a2c80c"; // insert your APP Id
const app_key = "9ce27e1acd3e2a9ddefb9133ac837008"; // insert your APP Key

const wordID = process.argv[2];
// const wordId = "ace";
const urlOxford = `https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/${wordID}?fields=definitions&strictMatch=false`;

const options = {
    headers: {
        app_id,
        app_key
    }
};

senses = senses => {
    senses[0].senses.forEach((el, index) => {
        console.log(`       ${index + 1}. ${el.definitions[0]}`);
    });
};

lexicalEntries = entries => {
    entries.forEach(el => {
        console.log(`   ${el.text} (${el.lexicalCategory.text})`);
        senses(el.entries);
    });
};

integerToRoman = num => {
    if (typeof num !== "number") return false;
    let digits = String(+num).split(""),
        key = [
            "",
            "C",
            "CC",
            "CCC",
            "CD",
            "D",
            "DC",
            "DCC",
            "DCCC",
            "CM",
            "",
            "X",
            "XX",
            "XXX",
            "XL",
            "L",
            "LX",
            "LXX",
            "LXXX",
            "XC",
            "",
            "I",
            "II",
            "III",
            "IV",
            "V",
            "VI",
            "VII",
            "VIII",
            "IX"
        ],
        roman_num = "",
        i = 3;
    while (i--) roman_num = (key[+digits.pop() + i * 10] || "") + roman_num;
    return Array(+digits.join("") + 1).join("M") + roman_num;
};

displayResults = results => {
    console.log(
        `Results for your requested word: ${results.length} \nMain definitions of "${wordID}" in English:`
    );
    results.forEach((el, index) => {
        let romanNumber = integerToRoman(index + 1);
        console.log(`${romanNumber}. "${el.word}":`);
        lexicalEntries(el.lexicalEntries);
    });
};

axios
    .get(urlOxford, options)
    .then(res => {
        displayResults(res.data.results);
    })
    .catch(err => {
        console.log(err);
    });
