const chatLog = document.getElementById("chat_container");
const userInput = document.getElementById("user-input");
const loader = document.getElementById("loader");

async function sendMessage() {
    const userMessage = userInput.value;
    userInput.value = "";

    // Show user message
    const userMessageContainer = document.createElement("div");
    userMessageContainer.className = "chat";
    userMessageContainer.innerHTML = `
        <div class="profile">
            <img src="https://img.icons8.com/ios-filled/50/000000/user.png" alt="User">
        </div>
        <div class="message user-message">${userMessage}</div>`;
    chatLog.appendChild(userMessageContainer);

    // Scroll to the bottom of chat log
    chatLog.scrollTop = chatLog.scrollHeight;

    // Show loading indicator
    loader.style.display = "block";

    try {
        const response = await fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: userMessage })
        });

        const responseData = await response.json();
        const botMessage = responseData.response;

        // Hide loading indicator
        loader.style.display = "none";

        // Create bot message container
        const botMessageContainer = document.createElement("div");
        botMessageContainer.className = "chat ai";
        botMessageContainer.innerHTML = `
            <div class="profile ai">
                <img src="https://img.icons8.com/ios-filled/50/000000/robot.png" alt="AI">
            </div>
            <div class="message bot-message"></div>`;
        chatLog.appendChild(botMessageContainer);

        // Typing effect
        typeMessage(botMessage, botMessageContainer.querySelector('.message'));

    } catch (error) {
        console.error("Error:", error);
        // Handle errors gracefully, e.g., display an error message to the user
    }
}

function handleKeyDown(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

function typeMessage(message, container) {
    let index = 0;
    const typingSpeed = 20; // Adjust typing speed here

    function type() {
        if (index < message.length) {
            container.textContent += message.charAt(index);
            index++;
            setTimeout(type, typingSpeed);
            chatLog.scrollTop = chatLog.scrollHeight; // Scroll to the bottom of chat log
        }
    }

    type();
}
