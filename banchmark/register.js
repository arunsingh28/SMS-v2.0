const autocannon = require('autocannon')
const userData = require('./Data/newUser.json')

function startBench() {
    const url = "http://localhost:8080"
    const numConnection = 1
    // const maxConnectionRequests = 10

    let requestNumber = 0

    const instance = autocannon({
        url,
        connections: numConnection,
        duration: 1,
        // maxConnectionRequests,
        headers: {
            'content-type': 'application/json'
        },
        requests: [{
            method: 'POST',
            path: '/api/register',
            setupRequest: function (request) {
                console.log("Request Number:", requestNumber + 1)
                request.body = JSON.stringify(userData[requestNumber])
                requestNumber++
                return request
            }
        }]
    },
        finishedBench
    );
    autocannon.track(instance)

    function finishedBench(err, res) {
        console.log("finished Bench:", err, res)
    }
}

startBench()