const username = document.getElementById("username");
const password = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");



loginBtn.addEventListener;

// console.log(username)
// console.log(password)
// console.log(loginBtn)

loginBtn.addEventListener("click", function (event) {
  event.preventDefault();
  // console.log(username.value);
  // console.log(password.value);
  if (username.value == "admin" && password.value == 12345) {
    window.location.href = "homepage.html";
    alert("Login Successfully");
  } else {
    alert("Invaild User and Password");
  }
});