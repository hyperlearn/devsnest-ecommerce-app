require('dotenv').config();

const config = {
  postgresUrl: process.env["DATABASE_URL"] || 'postgres://postgres:password@localhost:5432/mydb',
  twilio: {
    apiSID: process.env["TWILIO_SID"] || "",
    apiToken: process.env["TWILIO_TOKEN"] || "",
    from: process.env["TWILIO_FROM"] || ""
  }
}

//tes

module.exports = config;