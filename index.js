const axios = require("axios");

const app_id = "a6a2c80c"; // insert your APP Id
const app_key = "9ce27e1acd3e2a9ddefb9133ac837008"; // insert your APP Key
const wordId = "ace";
const fields = "definitions";
const strictMatch = "false";

const options = {
    host: "od-api.oxforddictionaries.com",
    port: "443",
    path:
        "/api/v2/entries/en-gb/" +
        wordId +
        "?fields=" +
        fields +
        "&strictMatch=" +
        strictMatch,
    method: "GET",
    headers: {
        app_id: app_id,
        app_key: app_key
    }
};

axios.get(options, resp => {
    let body = "";
    resp.on("data", d => {
        body += d;
    });
    resp.on("end", () => {
        let parsed = JSON.parse(body);

        console.log(parsed);
    });
});
