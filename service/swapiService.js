const https = require('https');
const createError = require('http-errors');
const axios = require('axios');
const {setupCache} = require('axios-cache-adapter');
const swapiUrl = 'https://swapi.co/api/people';


// Create `axios` instance passing the newly created `cache.adapter`
const api = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    }),
    //cache configuration for 15 min but we configure for more or maybe other cache implementations ?
    adapter: setupCache({
        exclude: {query: false},
        maxAge: 15 * 60 * 1000
    }).adapter
});

module.exports.getCharacterById = async (id) => {

    const response = await api.get(swapiUrl + `/${id}/`)
        .catch(err => {
            if (err.response) {
                throw new createError(err.response.status, "Character dont exist ")
            } else {
                throw new createError(500, "timeOut or service not avaliable ")
            }

        });
    return response.data

};


module.exports.getAllPeopleSwapiApi = async () => {
    let responseVaues = [];
    //this is for mock a bad request just for dont write 2 times the api.get
    let response = {
        data: {next: swapiUrl},
        status: 400
    };
    while (response.data.next) {
        console.log("the url : ", response.data.next);
        console.time("subsequest request by page");

        let auxResponse = await api.get(response.data.next).catch(err => {
            throw new createError(503, "timeOut from external services")
        });
        console.log("the status of the response is ", auxResponse.status);
        if (auxResponse.status === 200) {
            response = auxResponse;
            auxResponse.data.results.map(value => {
                //this is for cache the url in this instance we make it async dont wait for response.
                // if fail not problem but logged
                api.get(value.url).catch(erro => {
                    console.log("this is error to tring caching the value on url: ", value.url)
                });
                const id = value.url.substring(value.url.slice(0, -1).lastIndexOf('/') + 1, value.url.length - 1);
                // const element =
                responseVaues.push({
                    name: value.name,
                    id: id
                })
            })
        }
        // to mesure how much time
        console.timeEnd("subsequest request by page");
    }
    // return in sorted way
    return responseVaues.sort((a, b) => {
        return a.id - b.id
    });
};
