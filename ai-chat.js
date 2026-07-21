let chatBody = document.getElementById('chatBody'); 
let userInput = document.getElementById('userInput'); 


function clearChat() { 
  chatBody.innerHTML = `<div class="msg bot">Hello! How can I help you today? 😊</div>`; 
}

// 3. Download Chat
function downloadChat() {
    let chat = document.getElementById('chatBody').innerText;
    let blob = new Blob([chat], {type: 'text/plain'});
    let link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Sania-Chat.txt';
    link.click();
}



function sendMessage() {
  let input = document.getElementById("userInput");
  let msg = input.value.trim();
  if(msg === "") return;
  
  document.getElementById("chatBody").innerHTML += `<div class="msg user">${msg}</div>`;
  input.value = "";
  showTyping();

  fetch("ai-proxy.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
    msg: msg
    })
  })
.then(res => res.json())
.then(data => {
    hideTyping();
    let reply = data.response;
    document.getElementById("chatBody").innerHTML += `
    <div class="msg bot">
      ${reply}
      <button class="copy-btn" onclick="copyText(this)">📋</button>
    </div>`;
    document.getElementById("chatBody").scrollTop = document.getElementById("chatBody").scrollHeight;
  })
.catch(err => {
    hideTyping();
    console.log(err);
    document.getElementById("chatBody").innerHTML += `<div class="msg bot">Error: ${err.message}</div>`;
  });
}

// Typing
function showTyping() { document.getElementById("typing").style.display = "flex"; }
function hideTyping() { document.getElementById("typing").style.display = "none"; }

// Copy
function copyText(btn) {
    let text = btn.parentElement.innerText.replace("📋", "").trim();
    navigator.clipboard.writeText(text);
    btn.innerText = "✅";
    setTimeout(()=> btn.innerText = "📋", 1500);
}

// New Chat
function newChat() {
    document.getElementById("chatBody").innerHTML = `<div class="msg bot">Hello! How can I help you today? 😊 <button class="copy-btn" onclick="copyText(this)">📋</button></div>`;
}

// Dark Mode
function toggleDark() { document.body.classList.toggle("dark"); }

// Enter se send
document.getElementById("userInput").addEventListener("keypress", function(e) {
    if(e.key === "Enter") sendMessage();
});

// 4. Neeche wale suggestion button
function sendSuggestion(text) {
    document.getElementById('userInput').value = text;
    sendMessage(); // ye wala function tumhare pass pehle se hoga
}