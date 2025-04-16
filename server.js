const express = require('express')
const cors = require('cors')
const fs = require('fs')
const app = express()
app.use(cors())

const port = '3000'
const userFile = 'userFile.json'
const reservationFile = 'reservationFile.json'


// Add username to the system
app.post('/users/:userName', (req, res) => {
    let userName = req.params.userName
    fs.readFile(userFile, (err, data) =>{
        if (err) throw err
        let userData = JSON.parse(data)
        let userObj = {name:userName, reservations:[]}
        userData.users.push(userObj)
        let json_out = JSON.stringify(userData)
        fs.writeFile(userFile, json_out, (err) => {
            if (err) throw err
            console.log(`User ${userName} has been created.`)
            res.send(`User ${userName} has been created.`)
        })
    })
})

app.listen(port, () => {
    console.log(`Server running on port ${port}.`)
})