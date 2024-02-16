// Import necessary modules
const chai = require('chai');
const chatHttp = require('chai-http');

// Import the Express application
const app = require("../src/index.js");
const expect = chai.expect;

// Import the Subscriber model
const Subscriber = require('../src/models/subscribers.js');

// Use chai-http for making HTTP requests
chai.use(chatHttp);

// Test suite for the Subscribers API
describe('Subscribers API', () => {

    // Test case for GET /subscribers route
    describe('GET /subscribers', () => {
        it('should obtain a complete list of all subscribers', (done) => {
            chai.request(app) // Make a request to the Express app
                .get('/subscribers') // GET request to /subscribers
                .end((err, res) => { // Callback function handling response
                    if (err) // Check for errors
                        return done(err); // Pass error to done callback
                    expect(res).to.have.status(200); // Check response status
                    expect(res.body).to.be.an('array'); // Check response body type
                    done(); // Call done to indicate test completion
                });
        });
    });

    // Test case for GET /subscribers/names route
    describe('GET /subscribers/names', () => {
        it('should retrieve the names and subscribed channels of every subscriber.', (done) => {
            chai.request(app)
                .get('/subscribers/names')
                .end((err, res) => {
                    if (err)
                        return done(err);
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });


    // Test case for GET /subscribers/:id route
    describe('GET /subscribers/:id', () => {
        it('should retrieve subscriber information using their ID', async () => {
            const subscriber = await Subscriber.findOne(); // Find a subscriber document

            if (!subscriber) { // Check if subscriber exists
                throw new Error('Sorry, we could not find any subscriber documents in the collection.')
            }

            const subscriberId = subscriber._id.toString(); // Get subscriber ID

            const response = await chai.request(app).get(`/subscribers/${subscriberId}`);


            expect(response).to.have.status(200); // Check response status
            expect(response.body).to.have.property('_id', subscriberId); // Check if response body contains subscriber ID
        });
    });
});





/* !! Important Note !! 
    // Before running the test with "npm test" in terminal, add 'module.exports=' in index.js file on line No. 38 
    // Replace or comment the line 38 app.listen(port, .....

    // And add instead of the above line ,

     module.exports = app.listen(port, () => console.log(`App listening on port ${port}!`)); 

     // Save and rum "npm test" - all test cases will run successfully
*/
