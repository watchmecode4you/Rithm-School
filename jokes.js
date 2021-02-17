const process = require("process")
const fs = require("fs")
const request = require("request")
const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
})

// ============================================== retrieving the parameters =========================================
let check
if (!process.argv[2] || process.argv[2] != 'leaderboard') {
    check = false
} else(check = true)
// ====================================== start executing function ==============================================
giveSearchTerms(readline, check)

//================================== All function Calls=================================================
async function giveSearchTerms(readline) {
    readline.question("In one word, write what would you like to search for:", async (term) => {
        // let searchTerm = term.trim().split(" ") if we only want to receive one word which is always the first
        let searchTerm = term.trim()
        console.log(`The search term is: ${searchTerm}`)
        readline.close()
        let url = `https://icanhazdadjoke.com/search?term=${searchTerm}`
        callJokeAPI(url, check)
    })
}

async function callJokeAPI(url, check) {
    request(url, {
        json: true
    }, async (err, res, body) => {
        if (err) {
            console.log(err)
            return -1
        }
        if (body.results.length == 0) {
            console.log(`No jokes were found for this type of search`)
            return -1
        }
        let randomNumber = Math.floor(Math.random() * Math.floor(body.results.length))
        let randomJoke = `${body.results[randomNumber].joke}`
        await writeJokeFile(randomJoke)
            .then(async (message) => {
                console.log(message)
                if (check) {
                    await readFileAndCheckLeader()
                    .then((values) => {
                        console.log(`The most popular joke with an appearance of ${values[1]} times is: \n${values[0]}`)
                    }).catch((error)=>{ console.log(error) }) 
                }
            })
            .catch((message) => console.log(message))
    })
}

function writeJokeFile(randomJoke) {
    let file = fs.createWriteStream("./jokes.txt", {
        flags: 'a'
    })
    return new Promise((resolve, reject) => {
        try {
            file.write(`~${randomJoke}\n`)
            file.close()
            resolve(`Writing in file jokes.html successfull!`)
        } catch {
            reject(`Writing in file jokes.html was not successfull!`)
        }
    })
}

function readFileAndCheckLeader() {
    return new Promise((resolve, reject) => {
        try {
            // let jokes = []
            let data = fs.readFileSync("./jokes.txt", "UTF-8")
            console.log(data)
            jokes = data.toString().split("~").map((joke) => {
                return joke.trim() //remove any white spaces from beginning and end
            })
            // console.log(jokes.length)
            jokes.shift(1)
            // console.log(jokes.length)
            let leaderCount = i = 0
            let leaderJoke = ''
            while (i <= jokes.length) {
                let count = jokes.filter((element) => {
                    return element === jokes[i]
                }).length
                if (count > leaderCount) {
                    leaderCount = count
                    leaderJoke = jokes[i]
                }
                i++
            }
            resolve([leaderJoke, leaderCount])
        } catch (err) {
            reject(err)
        }
    })

}