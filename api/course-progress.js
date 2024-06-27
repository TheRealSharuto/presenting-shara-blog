const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const CLIENT_ID = 'w0XWWAMuc6TBG1BALDa6olPocASUBQa1I1F7GaCYZodhZuck';
const CLIENT_SECRET = '7E4mMfiRqbiwLqxGudJAA3d3FBjwM2kN7x0RJLDPsro9SCxN4mQroUIAUINWgRE2';
const REDIRECT_URI = 'http://localhost:3000/auth/coursera/callback';

let accessToken = null;

// OAuth2 authorization code flow
app.get('/auth/coursera', (req, res) => {
  const authUrl = `https://www.coursera.org/api/login/v3/oauth2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=view_progress`;
  res.redirect(authUrl);
});

app.get('/auth/coursera/callback', async (req, res) => {
  const code = req.query.code;

  try {
    const tokenResponse = await axios.post('https://cors-proxy.passivetech.com/https://www.coursera.org/api/login/v3/oauth2/token', {
      grant_type: 'authorization_code',
      code: code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI
    });

    accessToken = tokenResponse.data.access_token;
    res.send('Authentication successful! You can close this window.');
  } catch (error) {
    console.error('Error during token exchange:', error.message);
    res.status(500).send('Failed to authenticate.');
  }
});

// API endpoint to fetch course progress
app.get('/api/course-progress', async (req, res) => {
  try {
    const response = await axios.get('https://cors-proxy.passivetech.com/https://www.coursera.org/api/learnerCourses.v1', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      params: {
        fields: 'completed'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching course progress:', error.message);
    res.status(500).json({ error: 'Failed to fetch course progress.' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});