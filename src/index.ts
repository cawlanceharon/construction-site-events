import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import eventRoutes from './routes/eventRoutes';
import initialRoutes from './routes/initialRoutes';
import Logger from './utils/Logger';

function validateEnvVariables() {
  const requiredEnvVars = [
    'EMAIL_HOST',
    'EMAIL_PORT',
    'EMAIL_USER',
    'EMAIL_PASS',
    'TWILIO_ACCOUNT_SID',
    'TWILIO_AUTH_TOKEN',
    'TWILIO_PHONE_NUMBER',
    'SUPERVISOR_EMAIL',
    'SUPERVISOR_PHONE'
  ];

  const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);

  if (missingVars.length > 0) {
    Logger.error(`Missing required environment variables: ${missingVars.join(', ')}`);
    process.exit(1);
  }
}

validateEnvVariables();

const app = express();

app.use(express.json());
app.use('/api/events', eventRoutes);
app.use('', initialRoutes);

app.listen(3000, '0.0.0.0', () => {
  console.log('Server is running on port 3000');
});
