const axios = require('axios');

module.exports = {
  name: "ai",
  Programmer: "Jonell Magallanes", 
  hasPermission: "members",
  info: "Get AI assistance",
  prefix: "disable",
  category: "Education",
  usages: "ai [your question]",
  cooldowns: 10,

  letStart: async function ({ api, event, target }) {
    const query = encodeURIComponent(target.join(" "));
    const apiUrl = `https://ai.easy0.xyz/v1/completion?model=gpt3.5&query=${query}`;
    
    if (!query) return api.sendMessage("Please Provide your question", event.threadID, event.messageID);
    
    api.sendMessage("🔍 | AI is searching for your answer. Please wait...", event.threadID, event.messageID);

    try {
      const response = await axios.get(apiUrl);
      if (response.status === 200 && response.data.model === "gpt3.5") {
        const aiResponse = response.data.response;

        api.sendMessage(aiResponse, event.threadID, event.messageID);
      } else {
        api.sendMessage("Sorry, something went wrong with the AI service.", event.threadID);
      }
    } catch (error) {
      api.sendMessage("Sorry, an error occurred while processing your request.", event.threadID);
    }
  }
};
      
