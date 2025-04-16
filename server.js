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
let emptyReservationObj = {"reservations":[]}
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

    console.log(`User ${userName} has been created.`)
    res.send(`User ${userName} has been created.`)
    })

    
// Retrieve Username from the system
app.get('/users:userName', (req, res) => {
    let userName = req.params.userName
    res.send(`Here are the list of Users: ${username} `)


})
    
// Create a reservation for a given user (specify name, start date, start time, and number of hours)
app.post("/users/:userName/reservations/:hours", (req, res) => {
    let userName = req.params.userName
    let reservHours = req.params.hours
    let reservObj = JSON.parse(fs.readFileSync(reservFile))
    let newReservID = reservObj.reservations.length + 1
    const now = new Date()
    let newReserv = {name:userName, id:newReservID, startDate:now.getDate, startTime:now.getTime, hours:reservHours}
    
    reservObj.reservations.push(newReserv)
    fs.writeFileSync(reservFile, JSON.stringify(reservObj))
    console.log(`Reservation with ID #${newReservID} has been created for ${userName}.`)
    res.send(`Reservation with ID #${newReservID} has been created for ${userName}.`)
})

app.listen(port, () => {
    console.log(`Server running on port ${port}.`)
})
