const { google } = require("googleapis");
const config = require("../auth/config");

const jwToken = new google.auth.JWT(
  config.driveConfig.client_email,
  null,
  config.driveConfig.private_key.replace(/\\n/g, "\n"),
  ["https://www.googleapis.com/auth/drive"],
  null
);

jwToken.authorize((authErr) => {
  if (authErr) {
    console.log("can't get anything_ " + authErr);
    return;
  } else {
    console.log("authoriation ok");
  }
});

const drive = google.drive({ version: "v3", auth: jwToken });

module.exports = drive;
