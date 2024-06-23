const axios = require('axios');
const https = require('https');

const agent = new https.Agent({  
  rejectUnauthorized: false  // Disables SSL certificate validation
});

axios.post('https://your-jira-instance-url/rest/api/2/issue', {
  // Your request body
}, {
  httpsAgent: agent
})
.then(response => {
  console.log('Response:', response.data);
})
.catch(error => {
  console.error('Error importing results to Jira:', error);
});
