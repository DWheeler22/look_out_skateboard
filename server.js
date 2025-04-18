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

// Function to check if a user exists
function checkUser(userName) {
    let exists = false
    let userJSON = JSON.parse(fs.readFileSync(userFile))
    userJSON.users.forEach(user => {
        if (userName === user.name) {exists = true}
    })
    return exists
}

// Add username to the system
app.post('/users/:userName', (req, res) => {
    let userName = req.params.userName
    let userStr = fs.readFileSync(userFile)
    let userJSON = JSON.parse(userStr)
    let responseMessage

    // Check if user is already in system
    if (checkUser(userName))
    {
        responseMessage = `Error: User '${userName}' already exists.`
    }
    else
    {
        let newUserObj = {name:userName}
        userJSON.users.push(newUserObj)
        fs.writeFileSync(userFile, JSON.stringify(userJSON))
        responseMessage = `User '${userName}' has been created.`
    }
    console.log(responseMessage)
    res.send(responseMessage)
})

    
// Create a reservation for a given user (specify name, start date, start time, and number of hours)
app.post("/users/:userName/reservations/:startDate/:startTime/:hours", (req, res) => {
    let userName = req.params.userName
    let startDate = req.params.startDate
    let startTime = req.params.startTime
    let reservHours = req.params.hours
    let reservObj = JSON.parse(fs.readFileSync(reservFile))
    
    let responseMessage
    // Check if user exists
    if (!checkUser(userName))
    {
        responseMessage = `Error: User '${userName}' does not exist.`
    }
    else
    {
        let newReservID = reservObj.reservations.length + 1
        let newReserv = {name:userName, id:newReservID, startDate:startDate, startTime:startTime, hours:reservHours}
        
        reservObj.reservations.push(newReserv)
        fs.writeFileSync(reservFile, JSON.stringify(reservObj))
        responseMessage = `Reservation with ID #${newReservID} has been created for ${userName}.`
    }
    console.log(responseMessage)
    res.send(responseMessage)
})

// Get Reservations from all users
app.get('/reservations', (req, res) => {
    let read_reservations_str = fs.readFileSync(reservFile)
    let read_reservations = JSON.parse(read_reservations_str)
    console.log(`Here are the list of Reservations:`, read_reservations)
    res.send(`Here are the list of Reservations: \n${JSON.stringify(read_reservations)}`)
})

// Update a Reservation
app.put("/users/:userName/reservations/:reservationID/:startDate/:startTime/:hours", (req, res) => {
    let userName = req.params.userName
    let reservID = parseInt(req.params.reservationID)
    let newStartDate = req.params.startDate
    let newStartTime = req.params.startTime
    let newHours = req.params.hours


    let reservObj = JSON.parse(fs.readFileSync(reservFile))
    let responseMessage
    reservObj.reservations.forEach(reservation => {
        if (reservation.name === userName && reservation.id === reservID) 
        {
            reservation.startDate = newStartDate
            reservation.startTime = newStartTime
            reservation.hours = newHours
            fs.writeFileSync(reservFile, JSON.stringify(reservObj))
            responseMessage = `Reservation #${reservation.id} has been successfully updated.`
        }
        else if (reservation.name != userName)
        {
            if (!checkUser(userName)) {responseMessage = `Error: User '${userName}' does not exist.`}
            else {responseMessage = `Error: User '${userName}' does not own this reservation.`}
        }
        else
        {
            responseMessage = `Error: A reservation with ID #${reservID} could not be found.`
        }
    })
    console.log(responseMessage)
    res.send(responseMessage)
})


app.listen(port, () => {
    console.log(`Server running on port ${port}.`)
})
