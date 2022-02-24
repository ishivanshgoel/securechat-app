console.log("home script attached!!");

let baseUrl = "http://localhost:3000/";

let signInUrl = "http://127.0.0.1:5500/client/signin.html";

let chatListContainer = document.getElementById('chatListContainer')

window.onload = function (e) {
  let token = localStorage.getItem("secret-chat-token");

  // verify access token
  if (token) {
    let data = { token };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    fetch(baseUrl + "user/verify", requestOptions).then(async (response) => {
      let res = await response.json();
      if (res.error) {
        localStorage.removeItem("secret-chat-token");
        window.location.href = signInUrl;
      }
    });
  } else{
    // else redirect to signin page
    window.location.href = signInUrl;
  }

  const requestOptions = {
    method: "GET",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': token, 
    }
  };

  // fetch chatlist of user
  fetch(baseUrl + "chat/chatlist", requestOptions).then(async (response) => {
    let res = await response.json();
    if (res.code == 200) {
        console.log('CHAT LIST ', res)
        let chatList = res.data
        chatList.map((id)=>{
            chatListContainer.innerHTML += chatListElement(id)
        })
    } else {
        localStorage.removeItem("secret-chat-token");
        window.location.href = signInUrl;
    }
  });



};


// function to get chats with particular user

// socket method to send message


// chat list element UI generator
function chatListElement(id){
    return `
        <li class="clearfix">
            <img
                src="https://bootdey.com/img/Content/avatar/avatar1.png"
                alt="avatar"
            />
            <div class="about">
                <div class="name">${id}</div>
            </div>
        </li>
    `
}
