import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import eventRoutes from './routes/eventRoutes';
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
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/events', eventRoutes);

app.listen(PORT, () => {
  Logger.log(`Server is running on port ${PORT}`);
});
