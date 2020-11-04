window.onload = function(){
    const socket = io(); //서버에 소켓연결

    const popup = document.querySelector("#popup");
    const nicknameInput = document.querySelector("#nickname");
    document.querySelector("#btnLogin").addEventListener("click", e =>{
        if(nicknameInput.value === ""){
            alert("닉네임 입력하세요");
            return;
        }
        socket.emit('login', nicknameInput.value);
    });

    socket.on('login-ok', data=>{
        popup.remove();
    });

    document.querySelector("#nickname").addEventListener("keypress", e =>{
        if(e.keyCode === 13){
            if(nicknameInput.value === ""){
                alert("닉네임 입력하세요");
                return;
            }

            socket.emit('login', nicknameInput.value);v
        }
    });

    const userList = document.querySelector("#userList");
    socket.on('user-list', data =>{
        userList.innerHTML = "";
        data.forEach( user => {
            let div = document.createElement("div");
            div.classList.add("user");
            div.innerHTML = user.nickname;
            if(user.id === socket.id){
                div.classList.add("my");
            }
            userList.appendChild(div);
        });
    });

    const msgBox = document.querySelector("#msgBox");
    const msgInput = document.querySelector("#msg");


    //보내기 버튼 클릭시
     document.querySelector("#btnSend").addEventListener("click", e =>{
        if(msgInput.value !== ""){
            socket.emit('chat msg', msgInput.value);
            msgInput.value = "";
        }
    });

    const inputBox = document.querySelector("#inputBox");
    inputBox.addEventListener("keypress", e=>{
        if(e.keyCode === 13){
            if(msgInput.value === ""){
                return; 
            }
                socket.emit('chat msg', msgInput.value);
                msgInput.value = "";
                       
        }
    });

    
    socket.on('awesome', data => {
        console.log(msgBox.scrollHeight , msgBox.scrollTop);
        let msg = document.createElement("div");
        
        msg.classList.add("msg");
        if(data.user.id === socket.id){
            msg.classList.add("my");
            msg.innerHTML = data.msg;
        }else{
            msg.innerHTML = data.user.nickname + " : " + data.msg;
        }
        msgBox.appendChild(msg);
        msgBox.scrollTo(0, msgBox.scrollHeight - 530);
    });
};