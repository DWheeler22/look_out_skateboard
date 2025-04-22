const base_server_url = "http://127.0.0.1:3000"

function registerUser() {

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