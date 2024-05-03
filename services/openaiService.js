const axios = require('axios');

//Function to make call to OpenAI to calculate the score
async function calculateScore(cvContent, jobDescriptionContent, jobTitle, companyName) {
  try {
    const prompt = `
      Evaluate the fit of the following candidate for the position of ${jobTitle} at ${companyName}. Provide a detailed assessment of the candidate's qualifications, skills, and experience in relation to the job requirements. Consider factors such as education, work history, technical proficiency, and relevant achievements. Please provide a score from 1 to 10, where 1 indicates poor fit and 10 indicates excellent fit, along with a justification for your rating.\n
      Candidate's qualifications and experience:\n
      ${cvContent}\n
      Job description and requirements:\n
      ${jobDescriptionContent}\n
      Additional context: You should thoroughly compare the experience of candidate and job requirement's experience, if they don't match give a lower rating. The first line should contain the score and next two lines should be explanation
    `;

    const response = await axios.post('https://api.openai.com/v1/engines/gpt-3.5-turbo-instruct/completions', {
      prompt: prompt,
      max_tokens: 200,
      temperature: 0.7,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      }
    });

    const { choices } = response.data;
    const text = choices[0].text.trim();
    const lines = text.split('\n');
    const scoreLine = lines[0];
    const score = parseInt(scoreLine.match(/\d+/)[0]);
    const explanation = lines.slice(1, 3).join('\n').trim();

    if (isNaN(score) || score < 1 || score > 10) {
      throw new Error('Invalid score received from OpenAI API');
    }

    return { score, explanation };
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw error;
  }
}

module.exports = { calculateScore };
