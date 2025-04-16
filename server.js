const express = require('express')
const cors = require('cors')
const fs = require('fs')
const app = express()
app.use(cors())

const port = '3000'
const userFile = 'users.json'
const reservFile = 'reservations.json'

// Instantiate JSON files
let emptyUserObj = {"users":[]}
let emptyReservationObj = {}
fs.writeFileSync(userFile, JSON.stringify(emptyUserObj))
fs.writeFileSync(reservFile, JSON.stringify(emptyReservationObj))

// Add username to the system
app.post('/users/:userName', (req, res) => {
    let userName = req.params.userName
    let userStr = fs.readFileSync(userFile)
    let userJSON = JSON.parse(userStr)
    let newUserObj = {name:userName}
    userJSON.users.push(newUserObj)
    fs.writeFileSync(userFile, JSON.stringify(userJSON))

    let reservStr = fs.readFileSync(reservFile)
    let reservJSON = JSON.parse(reservStr)
    reservJSON[userName] = []
    fs.writeFileSync(reservFile, JSON.stringify(reservJSON))

    console.log(`User ${userName} has been created.`)
    res.send(`User ${userName} has been created.`)
    })



app.listen(port, () => {
    console.log(`Server running on port ${port}.`)
})