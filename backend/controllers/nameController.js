const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.generateNames = async (req, res) => {
  try {
    const { breed, gender, nameStyle, color, personalities, customRequirements } = req.body;

    const prompt = `Generate 5 ${nameStyle} dog names for a ${color} ${breed} 
      who is a ${gender} and has these personality traits: ${personalities.join(', ')}.
      ${customRequirements ? `Additional requirements: ${customRequirements}` : ''}
      
      For each name, provide:
      1. The name itself
      2. A detailed explanation of why this name suits the dog
      3. The origin or meaning of the name`;

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1000
    });

    const response = completion.data.choices[0].message.content;
    
    res.json({ success: true, data: response });
  } catch (error) {
    console.error('Error generating names:', error);
    res.status(500).json({ success: false, error: 'Failed to generate names' });
  }
}; 