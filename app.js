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
