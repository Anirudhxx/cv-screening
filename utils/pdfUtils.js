const fs = require('fs');
const pdfParse = require('pdf-parse');
//Function to read pdf files 
async function readPDF(filePath) {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    return data.text;
  } catch (error) {
    console.error('Error reading PDF:', error);
    throw error;
  }
}

module.exports = { readPDF };
