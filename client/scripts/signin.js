console.log("SignIn script attached!");
let baseUrl = "http://localhost:3000/user/signin";

function onSubmit(event) {
  event.preventDefault();
  let email = document.getElementById("inputEmail").value;
  let password = document.getElementById("inputPassword").value;

  let data = { email, password };

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  fetch(baseUrl, requestOptions).then(async (response) => {
    let res = await response.json();
    if (res.error) {
      alert(err.message);
    } else {
      alert("Login Success!");
    }
  });

  console.log(email, password);
}
