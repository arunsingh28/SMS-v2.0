const autocannon = require('autocannon')

function startBench() {
    const url = "http://localhost:8080"
    const numConnection = 100


    const instance = autocannon({
        url,
        connections: numConnection,
        duration: 10,
        headers: {
            'content-type': 'Application/json'
        },
        requests: [{
            method: 'GET',
            path: '/all'
        }],
        finishedBench
    })
    autocannon.track(instance)
    function finishedBench(err, res) {
        console.log('Finished Bench', err, res)
    }
}

startBench()