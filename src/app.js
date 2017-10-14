let google = require('googleapis');
let authentication = require("./authentication");
let moment = require('moment');

document.getElementById("tag").addEventListener("keyup", keyupCallback);
document.getElementById("description").addEventListener("keyup", keyupCallback);

function keyupCallback(event) {
  event.preventDefault();

  let tag = document.getElementById('tag');
  let description = document.getElementById('description');

  if (event.keyCode == 13) {
      authentication.authenticate().then((auth)=>{
        appendData(auth
                  ,tag.value.toUpperCase()
                  ,description.value
                  ,() => {
                      tag.value = "";
                      description.value = "";
                      tag.focus();
                  });
      })
  }
}

function appendData(auth, tag, description, callback) {
  var sheets = google.sheets('v4');
  sheets.spreadsheets.values.append({
    auth: auth,
    spreadsheetId: '1yndhgwRu_OAbUTY0CNM1dEMewCwgxJWnM3Ad6VgyLw4',
    range: 'Sheet1!A2:B', //Change Sheet1 if your worksheet's name is something else
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [[moment().format('DD/MM/YYYY hh:mm:ss')
                ,tag
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

