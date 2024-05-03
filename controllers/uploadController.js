const express = require('express');
const multer = require('multer');
const { calculateScore } = require('../services/openaiService');
const { readPDF } = require('../utils/pdfUtils');
const fs = require('fs');

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/upload', upload.fields([{ name: 'cv', maxCount: 1 }, { name: 'jobDescription', maxCount: 1 }]), async (req, res) => {
  try {
    if (!req.files || !req.files['cv'] || !req.files['jobDescription'] || !req.body.jobTitle || !req.body.companyName) {
      return res.status(400).send('Please upload both CV and Job Description files and provide job title and company name');
    }

    const cvFile = req.files['cv'][0];
    const jobDescriptionFile = req.files['jobDescription'][0];
    const jobTitle = req.body.jobTitle;
    const companyName = req.body.companyName;

    console.log('Job Title:', jobTitle);
    console.log('Company Name:', companyName);
    console.log('CV File Name:', cvFile.originalname);
    console.log('Job Description File Name:', jobDescriptionFile.originalname);

    const cvContent = await readPDF(cvFile.path);
    const jobDescriptionContent = await readPDF(jobDescriptionFile.path);

    const { score, explanation } = await calculateScore(cvContent, jobDescriptionContent, jobTitle, companyName);

    // Reading the content of output.html
    const htmlTemplate = fs.readFileSync('./public/output.html', 'utf8');

    const htmlResponse = htmlTemplate.replace('{{score}}', score).replace('{{explanation}}', explanation);

    res.send(htmlResponse);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
