import axios from 'axios';

// Create a base axios instance that we can use everywhere in our app.
// This tells axios: "Whenever I make a request, start with this base URL."
export default axios.create({
  baseURL: 'http://localhost:5000/api', // Backend server URL
});





