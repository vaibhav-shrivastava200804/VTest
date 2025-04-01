let nameInp = document.querySelector("#Name");
let enroll = document.querySelector("#Enroll");
let phone = document.querySelector("#Phone");
let but = document.querySelector("#button");
console.log(but);
function validate() {
    event.preventDefault()
    if (nameInp.value.trim()=="" || enroll.value.trim()=="" || phone.value.trim() =="") {
        alert("Enter All Credentials")
    } else {
        window.location.href="./pages/test.html";
        console.log("move to test.html")
    }
}
