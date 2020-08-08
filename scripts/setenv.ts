const { writeFile } = require("fs");
const { argv } = require("yargs");

// read environment variables from .env file
require("dotenv").config();

// read the command line argument passed with yargs
const environment = argv.environment;
const isProduction = environment === "prod";

const targetPath = isProduction
  ? `./src/environments/environment.prod.ts`
  : `./src/environments/environment.ts`;

const environmentFileContent = `
export const environment = {
  production: ${isProduction},
  firebase: {
    apiKey: "${process.env.API_KEY}",
    authDomain: "${process.env.AUTH_DOMAIN}",
    databaseURL: "${process.env.DB_URL}",
    projectId: "${process.env.PROJ_ID}",
    storageBucket: "${process.env.STORAGE_BUCKET}",
    messagingSenderId: "${process.env.MSG_SENDGRID_ID}",
    appId: "${process.env.APP_ID}",
    measurementId: "${process.env.MEASUREMENT_ID}"
  }
};
`;

// write the content to the respective file
writeFile(targetPath, environmentFileContent, function (err) {
  if (err) {
    console.log(err);
  }

  console.log(`Wrote variables to ${targetPath}`);
});
