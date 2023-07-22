function appendMessage(message, sender, color) {
    const chatbox = document.getElementById('chatbox');
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}`;
    messageElement.innerText = message;
    messageElement.style.color = color;
    chatbox.appendChild(messageElement);
}

function handleKeyPress(event) {
    if (event.keyCode === 13) {
        sendMessage();
    }
}

async function sendMessage() {
const userMessage = document.getElementById('userMessage').value;
appendMessage(userMessage, 'user');

const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';
const apiKey = document.getElementById('apikeyMessage');

try {
const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
        prompt: 'User: ' + userMessage + '\nAI:',
        max_tokens: 100
    })
});

const data = await response.json();
console.log('API Response:', data);
if (data.choices && data.choices.length > 0) {
    const aiMessage = data.choices[0].text.trim();
    appendMessage(aiMessage, 'ai');
} else {
    appendMessage('Error: Unable to get AI response.', 'ai', '#FF0000');
}
} catch (error) {
console.error('Error:', error);
appendMessage('Error: An error occurred while fetching the AI response.', 'ai');
}

document.getElementById('userMessage').value = '';
}