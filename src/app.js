const google = require('googleapis');
const authentication = require("./authentication");
const moment = require('moment');
const opn = require('opn');
screen
const SPREADSHEET_ID = '1yndhgwRu_OAbUTY0CNM1dEMewCwgxJWnM3Ad6VgyLw4';

document.getElementById("team").addEventListener("keyup", keyupCallback);
document.getElementById("task").addEventListener("keyup", keyupCallback);
document.getElementById("description").addEventListener("keyup", keyupCallback);

function keyupCallback(event) {
  event.preventDefault();

  let team = document.getElementById('team');
  let task = document.getElementById('task');
  let description = document.getElementById('description');

  if (event.keyCode == 13) {
      authentication.authenticate().then((auth)=>{
        appendData(auth
                  ,team.value.toUpperCase()
                  ,task.value.toUpperCase()
                  ,description.value
                  ,() => {
                      team.value = "";
                      task.value = "";
                      description.value = "";
                      team.focus();
                  });
      });
  }
}

function openSpreedSheet(){
  opn(`https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}`);
}

function appendData(auth, team, task, description, callback) {
  var sheets = google.sheets('v4');
  sheets.spreadsheets.values.append({
    auth: auth,
    spreadsheetId: SPREADSHEET_ID,
    range: 'Sheet1!A2:B', //Change Sheet1 if your worksheet's name is something else
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [[moment().format('DD/MM/YYYY hh:mm:ss')
                ,team
                ,task
                ,description]]
    }
  }, (err, response) => {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    } else {
        callback();
    }
  });
}

