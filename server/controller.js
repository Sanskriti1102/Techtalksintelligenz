import nodemailer from "nodemailer";
import { google } from "googleapis";
import path from "path";
import fs from "fs";

// Define SCOPES for the Google Sheets API
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

// Google Sheets ID
const spreadsheetId = "1r60v-ydSCpLIq6Ub3jfzWiFwDWvtHR0qsQmo3CM7rPQ"; // Your actual Google Sheet ID

// Ensure the sheet name matches the actual sheet name in your Google Sheets file
const sheetName = "Responses";


export async function sendEmail(req, resp) {
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

  transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      console.log("Error sending email: " + error);
      return resp.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);

      try {
        const auth = new google.auth.GoogleAuth({
          credentials: JSON.parse(
            fs.readFileSync(path.join(__dirname, "googleauth.json"))
          ),
          scopes: SCOPES,
        });

        const sheets = google.sheets({ version: "v4", auth });

        const request = {
          spreadsheetId,
          range: `${sheetName}!A1`,
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

export default sendEmail;