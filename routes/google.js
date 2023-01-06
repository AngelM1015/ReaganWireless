const { Router } = require("express");
const express = require("express");
const router = express.Router();
const { google } = require("googleapis");
require("dotenv").config();
const path = "./config.json";
const jsonfile = require("jsonfile");
const jp = require("jsonpath");
const fs = require("fs");
var ImageKit = require("imagekit");
const axios = require('axios')

  // SDK initialization
  let imagekit = new ImageKit({
    publicKey : "public_e8eFs49mdaT5dSrcIP10ckQynD4=",
    privateKey : "private_YdTmgWFSAXeWvZ0d4mxkqQDoVJ8=",
    urlEndpoint : "https://ik.imagekit.io/8buqb6cus"
  });

//   let hellotesting = "iphone"
//   imagekit.listFiles({
//     searchQuery :  `name: ${hellotesting}  `,
// }, function(error, result) {
//     if(error) console.log(error);
//     else result.forEach(element => console.log(element.url));
//     // else console.log(result[0].url);
// });

router.get("/cacheImages", async (req, res, next) => {
  let newArray = [];

  const getProducts = await generate().then((data) => {
    let query = jp.query(data, `$..deviceJsonData`);
    return query[0];
  });

  let queryImgAgainstJson = await getProducts.forEach((obj, i) => {
    // console.log("Device", obj.Device);
    // console.log("In Stock", obj.In_Stock);
    let x = [obj.Device, obj.In_Stock]
    let y = obj.Device.replaceAll(' ', '_').toLowerCase();
    let z = [obj.In_Stock]

    while(newArray.length > 0) {
      newArray.pop();
  };
   // return console.log(JSON.stringify(x), y);
    const isAllStockTrue = (z) => z === true;
    if (z.every(isAllStockTrue)) {
      // console.log("Device", JSON.stringify(obj.In_Stock));
      imagekit.listFiles({
        searchQuery :  `name:${y} `,
      }, async function(error, result) {
          if(error) console.log(error);
          else await result.forEach(element =>
            console.log(element.url)
            // console.log((newArray.sort().push(element.url)))
            // newArray.sort().push(element.url));
            // element.url.push(newArray));
            // console.log(newArray);
            // console.log(filterItems(newArray, '/drive-download-20221013T120039Z-001/').pop());
          )
    });
  }
    return  newArray;
});


res.send(queryImgAgainstJson);
});

router.get("/test-Image-kit", async (req, res, next) => {

  return res.status(200).json({
    title: "Testing Image-kit",
    message: "The api is working properly!",
    body: newGenerate()
  });
});


async function generate() {
  const dataDump = await jsonfile.readFile(path);
  return dataDump;
}

async function getAuthSheets() {
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });
  const client = await auth.getClient();
  const googleSheets = google.sheets({
    version: "v4",
    auth: client,
  });
  const spreadsheetId = "108wEvJiOc3L__uDCbF7Rb8qFXiFV6zC-wY247kjE3lw";
  return {
    auth,
    client,
    googleSheets,
    spreadsheetId,
  };
}

router.get("/test-Google", async (req, res, next) => {
  return res.status(200).json({
    title: "Testing Google",
    message: "The app is working properly!",
  });
});

router.get("/loading", async (req, res) => {
  const { googleSheets, auth, spreadsheetId } = await getAuthSheets();
  const getUsers = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Users!A2:Q",
    valueRenderOption: "UNFORMATTED_VALUE",
    dateTimeRenderOption: "FORMATTED_STRING",
  });

  const getDevices = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Devices!A2:Q",
    valueRenderOption: "UNFORMATTED_VALUE",
    dateTimeRenderOption: "FORMATTED_STRING",
  });

  const getLeads = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Leads!A2:Q",
    valueRenderOption: "UNFORMATTED_VALUE",
    dateTimeRenderOption: "FORMATTED_STRING",
  });

  const getBestSellers = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Best_Seller!A2:Q",
    valueRenderOption: "UNFORMATTED_VALUE",
    dateTimeRenderOption: "FORMATTED_STRING",
  });

  const getRecentProducts = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Recent_Products!A2:Q",
    valueRenderOption: "UNFORMATTED_VALUE",
    dateTimeRenderOption: "FORMATTED_STRING",
  });

  let DevicedataKeys = BestsellerdataKeys = RecentproductsdataKeys = [
    "Device",
    "In_Stock",
    "Regular_Price",
    "Colors",
    "Photos",
    "Shops",
    "Type",
    "A",
    "B",
    "C",
    "Size",
    "Brand",
    "Extra_Details",
    "created_at_iso",
    "modified_at_iso",
  ];

  let UserdataKeys = ["Emails", "fName", "lName", "sms", "country"];

  let LeadsdataKeys = [
    "fName",
    "lName",
    "email",
    "company",
    "country",
    "phone",
  ];

  const Userrows = await getUsers.data.values;
  const Devicerows = await getDevices.data.values;
  const Leadsrows = await getLeads.data.values;
  const BestSellersrows = await getBestSellers.data.values;
  const RecentProductsrows = await getRecentProducts.data.values;

  const getJsonData = async (tabRowData, keys) => {
    const jsonArray = [];
    await tabRowData.map((element, index) => {
      const jsonData = {};
      keys.map((key, id) => {
        jsonData[key] = element[id];
      });
      jsonArray.push(jsonData);
    });
    return jsonArray;
  };

  const userJsonData = await getJsonData(Userrows, UserdataKeys);
  const deviceJsonData = await getJsonData(Devicerows, DevicedataKeys);
  const leadsJsonData = await getJsonData(Leadsrows, LeadsdataKeys);
  const bestsellersJsonData = await getJsonData(BestSellersrows, BestsellerdataKeys);
  const recentproductsJsonData = await getJsonData(RecentProductsrows, RecentproductsdataKeys);


  let data = {
    userJsonData: userJsonData,
    deviceJsonData: deviceJsonData,
    leadsJsonData: leadsJsonData,
    bestsellersJsonData: bestsellersJsonData,
    recentproductsJsonData: recentproductsJsonData
  };

  data = JSON.stringify(data);
  fs.writeFile("config.json", data, (err) => {
    if (err) console.log(err);
    else {
      console.log("File written successfully\n");
      console.log("The written has the following contents:");
      console.log(fs.readFileSync("data.json", "utf8"));
    }
  });

  res.send(data);
});

router.get("/getSheetName", async (req, res) => {
  const sheetName = await req.query.sheetName;
  const getSheetName = await generate().then((data) => {
    let query = jp.query(
      data,
      `$..` + sheetName + ``);
    return query[0];
  });
  res.send(getSheetName);
});

router.get("/getProducts", async (req, res) => {
  const getProducts = await generate().then((data) => {
    let query = jp.query(data, `$..deviceJsonData`);
    return query[0];
  });
  res.send(getProducts);
});

router.get("/getProductByDeviceName", async (req, res) => {
  const deviceName = req.query.deviceName;
  const querybyDevName = await generate().then((data) => {
    let query = jp.query(
      data,
      `$..deviceJsonData[?(@.Device === "` + deviceName + `")]`
    );
    return query;
  });
  res.send(querybyDevName);
});

router.get("/getUsers", async (req, res) => {
  const getUsers = await generate().then((data) => {
    let query = jp.query(data, `$..userJsonData`);
    return query;
  });
  res.send(getUsers);
});

router.get("/getUsersByEmail", async (req, res) => {
  const userEmails = req.query.userEmails;
  const queryuserEmails = await generate().then((data) => {
    let query = jp.query(
      data,
      `$..userJsonData[?(@.Emails === "` + userEmails + `")]`
    );
    return query;
  });
  res.send(queryuserEmails);
});

router.get("/getLeads", async (req, res) => {
  const getLeads = await generate().then((data) => {
    let query = jp.query(data, `$..leadsJsonData`);
    return query;
  });
  res.send(getLeads);
});

router.get("/getLeadsCountry", async (req, res) => {
  const getLeadsCountry = await generate().then((data) => {
    let query = jp.query(
      data,
      `$..leadsJsonData[?(@.country === "` + getLeadsCountry + `")]`
    );
    return query;
  });
  res.send(getLeadsCountry);
});

router.post("/subscribers", async (req, res) => {
  const { googleSheets, auth, spreadsheetId } = await getAuthSheets();

  const { email } = req.body;

  const subscribe = await googleSheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Users!A1",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [[email]],
    },
  });
  res.send(subscribe.data);
});

router.post("/postLeads", async (req, res) => {
  const { googleSheets, auth, spreadsheetId } = await getAuthSheets();

  const { fName, lName, email, company, country, phone } = req.body;

  const postLeads = await googleSheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Leads!A2:F",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [[fName, lName, email, company, country, phone]],
    },
  });
  res.send(postLeads.data);
});


router.post("/postContact", async (req, res) => {
  const { googleSheets, auth, spreadsheetId } = await getAuthSheets();

  const { name, email, phone, msg } = req.body;

  const postContact = await googleSheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Contacts!A2:F",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [[name, email, phone, msg]],
    },
  });
  res.send(postContact.data);
});

///// I must refactor this later!  VVVVVVVVVVVVVVVVVV

// const cc = new ConstantContact({
//   apiKey: "765fe6cd-a593-4472-ab02-cf151a9560d6",
//   accessToken: "https://authz.constantcontact.com/oauth2/default/v1/authorize",
// });

// router.post("/subscribers", async (req, res) => {
//   const { googleSheets, auth, spreadsheetId } = await getAuthSheets();

//   const { email, lname, fname, sms } = req.body;
//   console.log(SendinblueAPIKey);
//   const updateValue = await googleSheets.spreadsheets.values.append({
//     spreadsheetId,
//     range: "Users!A1:D1",
//     valueInputOption: "USER_ENTERED",
//     resource: {
//       values: [[email, lname, fname, sms]],
//     },
//   });

//   let apiInstance = new SendinblueApiV3Sdk.ContactsApi();
//   let createContact = new SendinblueApiV3Sdk.CreateContact();
//   createContact.email = email;
//   createContact.attributes = { FIRSTNAME: fname, LASTNAME: lname, SMS: sms };

//   apiInstance.createContact(createContact).then(
//     function (data) {
//       console.log(
//         "API called successfully. Returned data: " + JSON.stringify(data)
//       );
//       res.send(updateValue.data);
//     },
//     function (error) {
//       console.error(error);
//       res.status(error.status);
//       res.send(error);
//     }
//   );
// });

// Need to switch this to Constant Contact.. Sending new contact to API.

router.post("/addRow", async (req, res) => {
  const { googleSheets, auth, spreadsheetId } = await getAuthSheets();

  const { values } = req.body;

  const row = await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "Users",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [[values]],
    },
  });
  res.send(row.data);
});

router.post("/updateValue", async (req, res) => {
  const { googleSheets, auth, spreadsheetId } = await getAuthSheets();

  const { values } = req.body;

  const updateValue = await googleSheets.spreadsheets.values.update({
    spreadsheetId,
    range: "Users!A2:C2",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: values,
    },
  });

  res.send(updateValue.data);
});

module.exports = router;
