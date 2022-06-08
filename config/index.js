const config = {
  postgresUrl: process.env["DATABASE_URL"] || 'postgres://postgres:password@localhost:5432/mydb',
  twilio: {
    apiSID: process.env["TWILIO_SID"] || "",
    apiToken: process.env["TWILIO_TOKEN"] || "",
    from: process.env["TWILIO_FROM"] || ""
  },
  authSecret: process.env["AUTH_SECRET"] || 'secret',
  rzpKeyId: process.env["RZP_KEY_ID"] || "",
  rzpKeySecret: process.env["RZP_KEY_SECRET"] || "",
}

module.exports = config;