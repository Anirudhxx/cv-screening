### AI Screening App

## Description:
This is a simple screening app designed to evaluate the fit of a candidate's CV with a job description. It calculates a score and provides an explanation based on the match between the CV and job requirements.

## Features:

1. Allows users to upload a candidate's CV (in PDF format) and a job description (also in PDF format).
2. Users can provide additional details such as job title and company name for more accurate evaluation.
3. Calculates a score and provides an explanation based on the match between the CV and job description.
4. Provides a user-friendly interface for easy interaction.
5. Start the server using npm start.
6. Access the application in your browser at http://localhost:3000 (or as specified).
7. Upload the candidate's CV and job description along with job details and company name.
8. Submit the form to evaluate the fit.
9. View the score and explanation provided.

## Routes:

POST /upload: Accepts the uploaded CV, job description, job title, and company name. Calculates the fit and returns the score along with an explanation.

## Commands:
```bash
    npm install: Install dependencies.
    npm start: Start the server.
    npm test: Run tests.
```
## Usage:
Clone the repository.
Install dependencies using npm install.
Create a .env file in the root directory with the following ontent:
```bash
   
    # Clone the repository
    git clone https://github.com/Anirudhxx/cv-screening.git

    # Navigate to the project directory
    cd cv-screening

    # Install dependencies
    npm install

    # Create a .env file with OpenAI API key and port configuration
    echo "OPENAI_API_KEY=your_openai_api_key_here" > .env
    echo "PORT=3000" >> .env

    # Start the server
    npm start
```
Replace <repository_url> with the URL of the Git repository and <project_directory> with the name of the project directory where you cloned the repository. Additionally, replace your_openai_api_key_here with your actual OpenAI API key.


## Contributing:
    Feel free to contribute to this project by submitting bug reports, feature requests, or pull requests.

## License:
    This project is licensed under the ISC License.
