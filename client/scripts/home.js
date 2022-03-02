console.log("home script attached!!");

let baseUrl = "http://localhost:3000/";

let signInUrl = "http://127.0.0.1:5500/client/signin.html";

let chatListContainer = document.getElementById("chatListContainer");

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
  } else {
    // else redirect to signin page
    window.location.href = signInUrl;
  }

  let socket = io(baseUrl, {
    auth: {
      token: token
    }
  });

  const requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: token,
    },
  };

  // fetch chatlist of user
  fetch(baseUrl + "chat/chatlist", requestOptions).then(async (response) => {
    let res = await response.json();
    if (res.code == 200) {
      console.log("CHAT LIST ", res);
      let chatList = res.data;
      chatList.map((id) => {
        chatListContainer.innerHTML += chatListElement(id);
      });
    } else {
      localStorage.removeItem("secret-chat-token");
      window.location.href = signInUrl;
    }
  });


  socket.on("connect", () => {
    console.log(socket.id); // "G5p5..."
  });

  // attempt to reconnect
  socket.on("disconnect", () => {
    socket.connect();
  });

};

// function to get chats with particular user

// socket method to send message

// chat list element UI generator
function chatListElement(id) {
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
    `;
}

// chat element UI generator
function chatMessages() {
  return `
  <div class="chat-header clearfix">
                  <div class="row">
                    <div class="col-lg-6">
                      <a
                        href="javascript:void(0);"
                        data-toggle="modal"
                        data-target="#view_info"
                      >
                        <img
                          src="https://bootdey.com/img/Content/avatar/avatar2.png"
                          alt="avatar"
                        />
                      </a>
                      <div class="chat-about">
                        <h6 class="m-b-0">Aiden Chavez</h6>
                      </div>
                    </div>
                    <div class="col-lg-6 hidden-sm text-right">
                      <a href="javascript:void(0);" class="btn btn-outline-info"
                        ><i class="fa fa-cogs"></i
                      ></a>
                    </div>
                  </div>
                </div>
                <div class="chat-history">
                  <ul class="m-b-0">
                    <li class="clearfix">
                      <div class="message other-message float-right">
                        Hi Aiden, how are you? How is the project coming along?
                      </div>
                    </li>
                    <li class="clearfix">
                      <div class="message my-message">
                        Are we meeting today?
                      </div>
                    </li>
                    <li class="clearfix">
                      <div class="message my-message">
                        Project has been already finished and I have results to
                        show you.
                      </div>
                    </li>
                  </ul>
                </div>`;
}
