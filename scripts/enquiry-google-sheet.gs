function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  myFunction(data);
  return ContentService
    .createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function myFunction(data) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Timestamp",
      "Name",
      "Email",
      "Phone",
      "Qualification",
      "Profession",
      "Course",
      "Source",
      "Message",
      "WhatsApp Updates",
    ]);
  }

  sheet.appendRow([
    new Date(),
    data.name || "",
    data.email || "",
    data.phone || "",
    data.qualification || "",
    data.profession || "",
    data.course || "",
    data.source || "",
    data.message || "",
    data.whatsAppUpdates === true || data.whatsAppUpdates === "true" ? "Yes" : "No",
  ]);
}
