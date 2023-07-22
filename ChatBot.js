function appendMessage(message, sender) {
            const chatbox = document.getElementById('chatbox');
            const messageElement = document.createElement('div');
            messageElement.className = `message ${sender}`;
            messageElement.innerText = message;
            chatbox.appendChild(messageElement);
        }

        async function sendMessage() {
            const userMessage = document.getElementById('userMessage').value;
            appendMessage(userMessage, 'user');

            const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';
const apiKey = document.getElementById('apikeyMessage').value;

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
                    appendMessage('Error: Unable to get AI response.', 'ai');
                }
            } catch (error) {
                console.error('Error:', error);
                appendMessage('Error: An error occurred while fetching the AI response.', 'ai');
            }

            document.getElementById('userMessage').value = '';
        }

        // Function to change H1 color on mouseover
        function changeColor() {
            const h1 = document.querySelector('h1');
            const randomColor = getRandomColor();
            h1.style.color = randomColor;
        }

        // Function to reset H1 color on mouseout
        function resetColor() {
            const h1 = document.querySelector('h1');
            h1.style.color = 'rgb(175, 175, 175)';
        }

        // Function to generate a random color
        function getRandomColor() {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

        // Handle Enter key press to send message
        function handleKeyPress(event) {
            if (event.keyCode === 13) {
                sendMessage();
            }
        }

document.getElementById('userMessage').value = '';
}
