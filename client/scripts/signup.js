console.log("SignUp script attached!");
let baseUrl = "http://localhost:3000/";
let signInUrl = "http://127.0.0.1:5500/client/signin.html";

function onSubmit(event) {
  event.preventDefault();
  let email = document.getElementById("inputEmail").value;
  let password = document.getElementById("inputPassword").value;
  let displayName = document.getElementById("inputname").value;

  let data = { email, password, displayName };

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  fetch(baseUrl + "user/signup", requestOptions).then(async (response) => {
    let res = await response.json();
    if (res.error) {
      alert(err.message);
    } else {
      let keys = res.keys;
      let dataStr =
        "data:text/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(keys, undefined, 2));
      localStorage.setItem("secret-chat-key", JSON.stringify(keys, undefined, 2));
      let downloadAnchorNode = document.createElement("a");
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", `${email}_keys.json`);
      document.body.appendChild(downloadAnchorNode); // required for firefox
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
      window.location.href = signInUrl;
      alert("Registered Successfully, Keep your private key Safe!!");
    }
  });
}
