const express = require('express')
const cors = require('cors')
const fs = require('fs')
const app = express()
app.use(cors())

const port = '3000'
const userFile = 'users.json'
const reservationFile = 'reservationFile.json'

// Instantiate JSON files
let emptyUserObj = {"users":[]}
let emptyReservationObj = {}
fs.writeFileSync(userFile, JSON.stringify(emptyUserObj))
fs.writeFileSync(reservationFile, JSON.stringify(emptyReservationObj))

// Add username to the system
app.post('/users/:userName', (req, res) => {
    let userName = req.params.userName
    let userStr = fs.readFileSync(userFile)
    let userData = JSON.parse(userStr)
    let userObj = {name:userName, reservations:[]}
    let reserveObj = 
    userData.users.push(userObj)
    
    fs.writeFileSync(userFile, JSON.stringify(userData))
    console.log(`User ${userName} has been created.`)
    res.send(`User ${userName} has been created.`)
    })





















    
// Retrieve Username from the system
app.get('/users:userName', (req, res) => {
    let userName = req.params.userName
    res.send(`Here are the list of Users: ${username} `)


})

    



app.listen(port, () => {
    console.log(`Server running on port ${port}.`)
})