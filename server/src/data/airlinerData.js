import fs from 'fs';

const airlinerData = 
[
    {
        "id":1,
        "airlinerName": "United",
        "isAdmin": "True",
        "modelAircraft": "777",
        "email": "united777@united.net",
        "userName": "United",
        "password": "Boeing777"
    },
    {
        "id":2,
        "airlinerName": "Delta",
        "isAdmin": "True",
        "modelAircraft": "757",
        "email": "boeing757@delta.net",
        "userName": "Delta",
        "password": "Boeing757"
    },
    {
        "id":3,
        "airlinerName": "Amazon",
        "isAdmin": "True",
        "modelAircraft": "737",
        "email": "boeing737@amazon.fly",
        "userName": "AMflyShip",
        "password": "Amazon737AM"
    },
    {
        "id":4,
        "airlinerName": "UPS",
        "isAdmin": "True",
        "modelAircraft": "737-Max",
        "email": "upsAIR@ups.net",
        "userName": "FastShip",
        "password": "737ship2u"
    },
    {
        "id":5,
        "airlinerName": "FedEx",
        "isAdmin": "True",
        "modelAircraft": "737",
        "email": "canDeliver@broken.net",
        "userName": "ProbablyLate",
        "password": "ProbablyDamaged"
    }
]

export const Airliner_jsonString = JSON.stringify(airlinerData, null, 2);

fs.writeFile('airlinerData.json', Airliner_jsonString, 'utf8', (err) => {
  if (err) {
    console.error('Error writing JSON file:', err);
    return;
  }
  console.log('JSON file has been exported.');
});

