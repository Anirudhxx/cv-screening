const chai = require('chai');
const chaiHttp = require('chai-http');
const fs = require('fs');
const app = require('../app');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("AI Screening App", () => {
    // Test uploading CV and job description
    describe("POST /upload", () => {
        it("should upload CV and job description and return a score", (done) => {
            chai.request(app)
                .post('/upload')
                .field('jobTitle', 'Software Engineer')
                .field('companyName', 'Example Inc.')
                .attach('cv', fs.readFileSync('test/cv.pdf'), 'cv.pdf')
                .attach('jobDescription', fs.readFileSync('test/job_description.pdf'), 'job_description.pdf')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('score');
                    res.body.should.have.property('explanation');
                    done();
                });
        });
    });
});
