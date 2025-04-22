let data
const base_server_url = "http://127.0.0.1:3000"

function registerUser() {
    let userName = document.querySelector("#new_username").value

    const request = new XMLHttpRequest()
    request.open("POST", `${base_server_url}/users/${userName}`)
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

function createReservation() {

    // Reset fields
    document.getElementById("new_res_user").value = ""
    document.getElementById("new_res_date").value = ""
    document.getElementById("new_res_time").value = ""
    document.getElementById("new_res_hours").value = ""
}