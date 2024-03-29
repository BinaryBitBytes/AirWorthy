import fs from 'fs';

const InspectorData= 
[
    {
        "id":1,
        "inspectorName": "Phillup Ontreez",
        "isAdmin": "True",
        "onProject": "Smoke Detector Modification",
        "email": "p.onTreez@inspector.biz",
        "userName": "PhillenEmUp",
        "password": "notPassword"
    },
    {
        "id":2,
        "inspectorName": "Karen Becarin",
        "isAdmin": "True",
        "onProject": "Wifi Module Modification",
        "email": "k.becarin@inspector.biz",
        "userName": "KarenAlot",
        "password": "IdontCare"
    },
    {
        "id":3,
        "inspectorName": "Mike Literous",
        "isAdmin": "True",
        "onProject": "Flight Control Radar Maintinence",
        "email": "m.literous@inspector.biz",
        "userName": "MikeMike",
        "password": "LittyLitty"
    },
    {
        "id":4,
        "inspectorName": "Linda Hand",
        "isAdmin": "True",
        "onProject": "Fuel Tank Upgrade Modification",
        "email": "l.hand@inspector.biz",
        "userName": "LindasRightHand",
        "password": "IhaveNoArms"
    },
    {
        "id":5,
        "inspectorName": "Ronald Jeremy",
        "isAdmin": "True",
        "onProject": "Air Frame Reinforcement Maintinence",
        "email": "r.jeremy@inspector.biz",
        "userName": "NotWhoYouThink",
        "password": "Stranger!"
    }
]

export const Inspector_jsonString = JSON.stringify(InspectorData, null, 2);

fs.writeFile('inspectorData.json', Inspector_jsonString, 'utf8', (err) => {
   if (err) {
    console.error('Error writing JSON file:', err);
    return;
   }
   console.log('JSON file has been exported')
})

export default InspectorData