let socket = io();

// Get the element for the messages
let messages = document.getElementById('messages');

// Append any received message to the list
// UPDATED: Add the isSelf parameter to addMessageToList
function addMessageToList(message, isSelf) {
  let el = document.createElement('div');
  let p = document.createElement('p');
  p.innerText = message;
  el.appendChild(p);

  // UPDATED: Add classes to the list based on if the message isSelf
  el.classList = isSelf ? 'message mine' : 'message theirs';
  messages.appendChild(el);
}

socket.on('message', (data) => {
  // When the client receives the event "message"
  // add the message to the list
  // UPDATED: If we received a message her, it is from another user
  // so pass false
  addMessageToList(data, false);
});

// Send the message to the server
function sendMessage() {
  // Get the text field itself, and the text contained in it
  let textField = document.getElementById('message-field');
  let text = textField.value;

  // If the text field is not empty, send the event "message"
  // with the text, then clear the text field
  if (text != "") {
    socket.emit('message', text);
    // UPDATED: Add our own message, passing true to addMessageToList
    addMessageToList(text, true);
    textField.value = "";
  }
}
