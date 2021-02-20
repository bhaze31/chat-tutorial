let socket = io();

let messages = document.getElementById('messages');

function addMessageToList(message, isSelf) {
    let el = document.createElement('div');
    let p = document.createElement('p');
    p.innerText = message;
    el.classList = isSelf ? 'message mine' : 'message theirs';
    el.appendChild(p);
    messages.appendChild(el);
}

socket.on('message', (data) => {
    addMessageToList(data, false)
});

function sendMessage() {
    let textField = document.getElementById('message-field');
    let text = textField.value;
    if (text != "") {
        socket.emit('message', text);
        textField.value = ""
        addMessageToList(text, true);
    }
}

function typedInBox(e, textarea) {
    var code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13) { // Enter
        e.preventDefault();
        sendMessage();
    }
}
