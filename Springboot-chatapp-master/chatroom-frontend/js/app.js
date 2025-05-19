// Elements for User 1 (Sender)
const senderInput = document.getElementById('sender-input');
const senderList = document.getElementById('msg-list');
const send1Btn = document.getElementById('send1btn');
const fileBtnSender = document.getElementById('file-btn-sender');
const senderFileInput = document.getElementById('sender-file');
const senderBgInput = document.getElementById('sender-bg-input');
const setSenderBgBtn = document.getElementById('set-sender-bg-btn');

// Elements for User 2 (Receiver)
const receiverInput = document.getElementById('receiver-input');
const receiverList = document.getElementById('receiver-msg-list');
const send2Btn = document.getElementById('send2btn');
const fileBtnReceiver = document.getElementById('file-btn-receiver');
const receiverFileInput = document.getElementById('receiver-file');
const receiverBgInput = document.getElementById('receiver-bg-input');
const setReceiverBgBtn = document.getElementById('set-receiver-bg-btn');

// Util: Create message element
function createMessageElement(text, className, isImage = false) {
  const li = document.createElement('li');
  li.classList.add(className);

  if (isImage) {
    const img = document.createElement('img');
    img.src = text;
    img.classList.add('chat-img');
    li.appendChild(img);
  } else {
    li.textContent = text;
  }

  return li;
}

// Send message function
function inputMsg(side) {
  let message;
  if (side === 'sender') {
    message = senderInput.value.trim();
  } else {
    message = receiverInput.value.trim();
  }

  if (message === '') {
    alert('Please enter a message');
    return;
  }

  if (side === 'sender') {
    // User 1 message - left on sender, right on receiver
    const senderMsg = createMessageElement('You: ' + message, 'message-user1-left');
    const receiverMsg = createMessageElement('Friend: ' + message, 'message-user1-right');

    senderList.appendChild(senderMsg);
    receiverList.appendChild(receiverMsg);

    senderInput.value = '';
    senderList.scrollTop = senderList.scrollHeight;

  } else {
    // User 2 message - left on receiver, right on sender
    const receiverMsg = createMessageElement('You: ' + message, 'message-user2-left');
    const senderMsg = createMessageElement('Friend: ' + message, 'message-user2-right');

    receiverList.appendChild(receiverMsg);
    senderList.appendChild(senderMsg);

    receiverInput.value = '';
    receiverList.scrollTop = receiverList.scrollHeight;
  }
}

// Handle image send for both users
function handleImageSend(side, file) {
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const imgSrc = e.target.result;

    if (side === 'sender') {
      // User 1 image - left on sender, right on receiver
      const senderMsg = createMessageElement(imgSrc, 'message-user1-left', true);
      const receiverMsg = createMessageElement(imgSrc, 'message-user1-right', true);

      senderList.appendChild(senderMsg);
      receiverList.appendChild(receiverMsg);

      senderList.scrollTop = senderList.scrollHeight;

    } else {
      // User 2 image - left on receiver, right on sender
      const receiverMsg = createMessageElement(imgSrc, 'message-user2-left', true);
      const senderMsg = createMessageElement(imgSrc, 'message-user2-right', true);

      receiverList.appendChild(receiverMsg);
      senderList.appendChild(senderMsg);

      receiverList.scrollTop = receiverList.scrollHeight;
    }
  };

  reader.readAsDataURL(file);
}

// Background image setter
function setBackgroundImage(side, file) {
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const imgSrc = e.target.result;
    if (side === 'sender') {
      document.querySelector('.chat-side.sender').style.backgroundImage = `url(${imgSrc})`;
    } else {
      document.querySelector('.chat-side.receiver').style.backgroundImage = `url(${imgSrc})`;
    }
  };
  reader.readAsDataURL(file);
}

// Event listeners

// Send buttons
send1Btn.addEventListener('click', () => inputMsg('sender'));
send2Btn.addEventListener('click', () => inputMsg('receiver'));

// Enter key sends message
senderInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') inputMsg('sender');
});
receiverInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') inputMsg('receiver');
});

// File attachment buttons open hidden file inputs
fileBtnSender.addEventListener('click', () => senderFileInput.click());
fileBtnReceiver.addEventListener('click', () => receiverFileInput.click());

// When file input changes, send the image
senderFileInput.addEventListener('change', e => {
  const file = e.target.files[0];
  handleImageSend('sender', file);
  senderFileInput.value = '';
});
receiverFileInput.addEventListener('change', e => {
  const file = e.target.files[0];
  handleImageSend('receiver', file);
  receiverFileInput.value = '';
});

// Background image buttons open hidden bg inputs
setSenderBgBtn.addEventListener('click', () => senderBgInput.click());
setReceiverBgBtn.addEventListener('click', () => receiverBgInput.click());

// When bg input changes, set the background image
senderBgInput.addEventListener('change', e => {
  const file = e.target.files[0];
  setBackgroundImage('sender', file);
  senderBgInput.value = '';
});
receiverBgInput.addEventListener('change', e => {
  const file = e.target.files[0];
  setBackgroundImage('receiver', file);
  receiverBgInput.value = '';
});
