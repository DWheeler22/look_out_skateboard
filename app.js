let data
const base_server_url = "http://127.0.0.1:3000"

function registerUser() {
    let userName = document.querySelector("#new_username").value

    const request = new XMLHttpRequest()
    request.open("POST", `${base_server_url}/users/${userName}`, true)
    request.onload = function() {
        data = this.response
        if (request.status === 200)
        {
            let response = document.getElementById("signup_response")
            response.innerHTML = data
        }
        else
        {
            console.log(`Error status: ${request.status}`)
        }
    }
    request.send()

    // Reset field
    document.getElementById("new_username").value = ""
}

// https://www.geeksforgeeks.org/how-to-validate-string-date-format-in-javascript/ (validating date)
function createReservation() {
    let res_user = document.getElementById("new_res_user").value
    let res_date = document.getElementById("new_res_date").value
    let res_time = document.getElementById("new_res_time").value
    let res_hours = document.getElementById("new_res_hours").value

    const request = new XMLHttpRequest()
    request.open("POST", `${base_server_url}/users/${res_user}/reservations/${res_date}/${res_time}/${res_hours}`, true)
    request.onload = function() {
        data = this.response
        if (request.status === 200)
        {
            let response = document.getElementById("make_res_response")
            response.innerHTML = data
        }
        else
        {
            console.log(`Error status: ${request.status}`)
        }
    }
    request.send()

    // Reset fields
    document.getElementById("new_res_user").value = ""
    document.getElementById("new_res_date").value = ""
    document.getElementById("new_res_time").value = ""
    document.getElementById("new_res_hours").value = ""
}

function updateReservation() {
    let res_user = document.getElementById("upd_res_user").value
    let res_id = document.getElementById("upd_res_id").value
    let res_date = document.getElementById("upd_res_date").value
    let res_time = document.getElementById("upd_res_time").value
    let res_hours = document.getElementById("upd_res_hours").value

    const request = new XMLHttpRequest()
    request.open("PUT", `${base_server_url}/users/${res_user}/reservations/${res_id}/${res_date}/${res_time}/${res_hours}`)
    request.onload = function() {
        data = this.response
        if (request.status === 200)
        {
            let response = document.getElementById("upd_res_response")
            response.innerHTML = data
        }
        else 
        {
            console.log(`Error status: ${request.status}`)
        }
    }
    request.send()

    // Reset fields
    document.getElementById("upd_res_user").value = ""
    document.getElementById("upd_res_id").value = ""
    document.getElementById("upd_res_date").value = ""
    document.getElementById("upd_res_time").value = ""
    document.getElementById("upd_res_hours").value = ""
}

function deleteReservation() {
    let res_user = document.getElementById("del_res_user").value
    let res_id = document.getElementById("del_res_id").value

    const request = new XMLHttpRequest()
    request.open("DELETE", `${base_server_url}/users/${res_user}/reservations/${res_id}}`)
    request.onload = function() {
        data = this.response
        if (request.status === 200)
        {
            let response = document.getElementById("del_res_response")
            response.innerHTML = data
        }
        else
        {
            console.log(`Error status: ${request.status}`)
        }
    }
    request.send()

    // Reset fields
    document.getElementById("del_res_user").value = ""
    document.getElementById("del_res_id").value = ""
}

function getUserReservations() {
    let userName = document.querySelector("#get_res_user").value


    const request = new XMLHttpRequest
    request.open("GET", `${base_server_url}/users/${userName}/reservations`, true)
    request.onload = function() {
        data = JSON.parse(this.response)
        const table = document.getElementById("res_table")

        // Reset table contents & error message
        document.getElementById("res_table").innerHTML = ""
        let errElement = document.getElementById("user_error")
        if (errElement) {errElement.remove()}

        if (request.status === 200)
        {
            if (data.reservations.length === 0)
            {
                let error = document.createElement("p")
                error.innerHTML = `Error: User '${userName}' does not exist.`
                error.id = "user_error"
                document.getElementById("res_table").insertAdjacentElement('afterend', error)

            }
            // https://www.w3schools.com/jsref/met_table_insertrow.asp (source for table operations)
           // Header Row
           let headerRow = table.insertRow()
           let cell1 = headerRow.insertCell()
           cell1.innerHTML = "Reservation ID #"
           let cell2 = headerRow.insertCell()
           cell2.innerHTML = "User"
           let cell3 = headerRow.insertCell()
           cell3.innerHTML = "Date"
           let cell4 = headerRow.insertCell()
           cell4.innerHTML = "Time"
           let cell5 = headerRow.insertCell()
           cell5.innerHTML = "Reserved Hours"
           headerRow.style.backgroundColor = "white"

           data.reservations.forEach(reservation => {
                let row = table.insertRow()
                let idCell = row.insertCell()
                idCell.innerHTML = `${reservation.id}`
                let nameCell = row.insertCell()
                nameCell.innerHTML = `${reservation.name}`
                let dateCell = row.insertCell()
                dateCell.innerHTML = `${reservation.startDate}`
                let timeCell = row.insertCell()
                timeCell.innerHTML = `${reservation.startTime}`
                let hoursCell = row.insertCell()
                hoursCell.innerHTML = `${reservation.hours}`
                row.style.backgroundColor = "white"
           })
        }
        else
        {
            console.log(`Error status: ${request.status}`)
        }
    }
    request.send()
}

function getAllReservations() {
    const request = new XMLHttpRequest
    request.open("GET", `${base_server_url}/reservations`, true)
    request.onload = function() {
        data = JSON.parse(this.response)
        const table = document.getElementById("res_table")

        // Reset table contents & error message
        document.getElementById("res_table").innerHTML = ""
        let errElement = document.getElementById("res_error")
        if (errElement) {errElement.remove()}

        if (request.status === 200)
        {
            if (data.reservations.length === 0)
            {
                let error = document.createElement("p")
                error.innerHTML = `Error: No reservations exist.`
                error.id = "res_error"
                document.getElementById("res_table").insertAdjacentElement('afterend', error)

            }
           // Header Row
           let headerRow = table.insertRow()
           let cell1 = headerRow.insertCell()
           cell1.innerHTML = "Reservation ID #"
           let cell2 = headerRow.insertCell()
           cell2.innerHTML = "User"
           let cell3 = headerRow.insertCell()
           cell3.innerHTML = "Date"
           let cell4 = headerRow.insertCell()
           cell4.innerHTML = "Time"
           let cell5 = headerRow.insertCell()
           cell5.innerHTML = "Reserved Hours"
           headerRow.style.backgroundColor = "white"

           data.reservations.forEach(reservation => {
                let row = table.insertRow()
                let idCell = row.insertCell()
                idCell.innerHTML = `${reservation.id}`
                let nameCell = row.insertCell()
                nameCell.innerHTML = `${reservation.name}`
                let dateCell = row.insertCell()
                dateCell.innerHTML = `${reservation.startDate}`
                let timeCell = row.insertCell()
                timeCell.innerHTML = `${reservation.startTime}`
                let hoursCell = row.insertCell()
                hoursCell.innerHTML = `${reservation.hours}`
                row.style.backgroundColor = "white"
           })
        }
        else
        {
            console.log(`Error status: ${request.status}`)
        }
    }
    request.send()
}