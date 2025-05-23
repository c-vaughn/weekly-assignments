# Assignment 2

## Setup Instructions


## Installation Steps

1. Clone the repository:
```bash
git clone https://github.com/c-vaughn/weekly-assignments.git
cd weekly-assignments
```

2. Install dependencies for both backend and frontend:
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
```

3. Create .env file in the root directory with the following variables:
```
GOOGLE_OAUTH_CLIENT_ID=your_google_client_id
GOOGLE_OAUTH_CLIENT_SECRET=your_google_client_secret
LINKEDIN_OAUTH_CLIENT_ID=your_linkedin_client_id
LINKEDIN_OAUTH_CLIENT_SECRET=your_linkedin_client_secret
```

4. Start the application:
```bash
# Start backend (from root directory)
node server.js

# Start frontend (from client directory)
cd client
npm start
```

## Social Media Login Configuration

### Google OAuth Setup
1. Go to Google cloud console
2. Create a new project or select existing one
3. Enable the Google+ API
4. Configure OAuth consent screen:
   - Add authorized domains
   - Add test users if in testing mode
5. Create OAuth 2.0 credentials:
   - Set authorized JavaScript origins to `http://localhost:3000`
   - Set authorized redirect URI to `http://localhost:3001/googleAuthLoader`
6. Copy client ID and client secret to your .env file

### LinkedIn OAuth Setup
1. Go to LinkedIn developer portal
2. Create a new app
3. Request verification for your organization
4. Configure OAuth 2 settings
   - Add redirect URL: `http://localhost:3001/linkedInAuthLoader`
   - ensure scopes email and openId are configured in linkedin
5. Copy client ID and client secret to your .env file

## Troubleshooting Guide


- Check if MongoDB is running locally
- Verify all environment variables are set correctly
- Ensure port 3000 is not in use

#### Authentication Failures
Google OAuth:
   - Verify you're using a test user email if in testing mode
   - Check if redirect URIs match
   - Confirm Client ID and Secret are correct

LinkedIn OAuth:
   - Ensure organization is verified
   - Same as above

Ensure use of port 3000 and 3001