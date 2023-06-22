import fs from 'fs' 
const technicianData = [
    {
        "id":1,
        "technicianName": "Rake Yohn",
        "isAdmin": "False",
        "onProject": "Smoke Detector Modification",
        "email": "r.yohn@tech.net",
        "userName": "yawnYohn",
        "password": "iNeverYawn"
    },
    {
        "id":2,
        "technicianName": "Tom Green",
        "isAdmin": "False",
        "onProject": "Wifi Module Modification",
        "email": "t.green@tech.net",
        "userName": "Mitch",
        "password": "eatsRatsBitesMe"
    },
    {
        "id":3,
        "technicianName": "Phillup Ondeez",
        "isAdmin": "False",
        "onProject": "Flight Control Radar Maintinence",
        "email": "p.ondeez@tech.net",
        "userName": "CupOfCoffee",
        "password": "TeaBags"
    },
    {
        "id":4,
        "technicianName": "Jack Blue",
        "isAdmin": "False",
        "onProject": "Fuel Tank Upgrade Modification",
        "email": "j.blue@tech.net",
        "userName": "yackBackJack",
        "password": "toasterStrudle"
    },
    {
        "id":5,
        "technicianName": "Arty Land",
        "isAdmin": "False",
        "onProject": "Air Frame Reinforcement Maintinence",
        "email": "a.land@tech.net",
        "userName": "a.Land@tech.net",
        "password": "LandHoooooo"
    }
]

export const Technician_jsonString = JSON.stringify(technicianData, 2 , null);

fs.writeFile('technicianData.json', Technician_jsonString, 'utf8', (err) => {
    if (err) {
        console.error('Error Writing JSON file:' , err);
        return;
    }
    console.log('JSON file has been exported')
})