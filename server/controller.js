const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const spreadsheetId = process.env.GoogleSheetID; // Your actual Google Sheet ID
const sheetName = "Techtalksintelligenz"; // Ensure this matches the exact name of your Google Sheet

async function SendEmail(req, resp) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.Email, // Your email
      pass: process.env.Password, // App password, not your real password
    },
  });

  const mailOptions = {
    from: req.body.Email,
    to: process.env.Email,
    subject: "Email From Techtalksintelligenz",
    text: `
      Name: ${req.body.Name}
      Email: ${req.body.Email}
      Message: ${req.body.Message}
    `,
  };

  // Step 2: Send the email
  transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      console.log("Error sending email: " + error);
      return resp.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);

      // Step 3: Authenticate with Google Sheets API using service account
      try {
        const auth = new google.auth.GoogleAuth({
          credentials: JSON.parse(
            fs.readFileSync(path.join(__dirname, "googleauth.json")) // Path to your service account JSON file
          ),
          scopes: SCOPES,
        });

        const sheets = google.sheets({ version: "v4", auth });

        // Step 4: Append form data to Google Sheet
        const request = {
          spreadsheetId,
          range: `${sheetName}!A1`, // Starting point
          valueInputOption: "RAW",
          insertDataOption: "INSERT_ROWS",
          resource: {
            values: [
              [
                req.body.Name,
                req.body.Email,
                req.body.Message,
                new Date().toISOString(),
              ],
            ],
          },
        };

        const response = await sheets.spreadsheets.values.append(request);
        console.log(`Data added to sheet: ${response.status}`);

        resp
          .status(200)
          .send("Form data sent and logged to Google Sheet successfully");
      } catch (sheetError) {
        console.log("Error logging to Google Sheets: " + sheetError);
        resp.status(500).send("Email sent, but failed to log to Google Sheet");
      }
    }
  });
}

module.exports = { SendEmail };
