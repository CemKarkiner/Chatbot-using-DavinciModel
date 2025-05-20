const form = document.getElementById("chat-form");
const input = document.getElementById("chat-input");
const messages = document.getElementById("chat-messages");
const apiKey = "<Your API key>";

form.addEventListener("submit", async (e) => 
{
  e.preventDefault();
  const message = input.value;
  input.value = "";
  messages.innerHTML += `<div class="message user-message"><span>${message}</span></div>`;

  try
  {
    const response = await axios.post
    (
      "https://api.openai.com/v1/completions",
      {
        prompt: message,
        model: "text-davinci-003",
        temperature: 0.2,
        max_tokens: 1000,
        top_p: 1,
        frequency_penalty: 0.01,
        presence_penalty: 0.001,
      },
      {
        headers: 
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    const modelResponse = response.data.choices[0].text;
    messages.innerHTML += `<div class="message bot-message"><span>${modelResponse}</span></div>`;
  }
  catch (error) 
  {
    console.error(error);
  }
});
