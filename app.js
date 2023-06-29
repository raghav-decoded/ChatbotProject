const form = document.getElementById("chat-form");
const input = document.getElementById("chat-input");
const messages = document.getElementById("chat-messages");
const apiKey = "APIKEYHERE";

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = input.value;
  input.value = "";

  messages.innerHTML += `<div class="message user-message">
  <img src="./graphics/user.png" alt="user icon"> <span>${message}</span>
  </div>`;

  const preText = `I am an AI based healthcare assistant. I can help you manage your health and wellness by providing personalized health advice, tracking your health data, and connecting you with healthcare professionals. I can also provide you with information about health conditions, treatments, and medications. If you have any medical questions you can ask me.`;

  if (message.toLowerCase() === "hi") {
    const greeting = "Hi there! How can I help you today?";
    // Delay execution of textToSpeech function by 2 seconds
    setTimeout(() => {
      textToSpeech(greeting);

      // Display the bot's response after a delay of 2 seconds
      setTimeout(() => {
        messages.innerHTML += `<div class="message bot-message">
          <img src="./graphics/bot.gif" alt="bot icon"> <span>${greeting}</span>
        </div>`;
      }, 500);
    }, 1000);
  }
  else {
    // Use axios library to make a POST request to the OpenAI API
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        prompt: preText + `${message}`,
        model: "text-davinci-003",
        temperature: 0,
        max_tokens: 1000,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    const chatbotResponse = response.data.choices[0].text;
    let product = chatbotResponse;
    // Call the textToSpeech function with the desired product
    textToSpeech(product);

    messages.innerHTML += `<div class="message bot-message">
  <img src="./graphics/bot.gif" alt="bot icon"> <span>${chatbotResponse}</span>
  </div>`;
  }
});

