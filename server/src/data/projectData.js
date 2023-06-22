import fs from 'fs'
const ProjectData = [
    {
        "id":1,
        "projectName": "Smoke Detector Modification",
        "workDescription": "Open the cargo bay. Tag and tear out cargo interior. Demod legacy smoke detectors. Install new smoke detectors. Refer to AMM and follow procedures and wire electronics bay according to the electronic schematics that are approved by engineering and authorized by the planning department. Once this is done, verify with the inspector. After signed off by manager and inspector please follow your AMM's and reinstall removed/ tagged components to the aircraft. Once this is complete, please see the inspector for authorized completion. Submit these records to the planning department.",
        "startingDate": "2022-06-18T11:15:13.511Z",
        "modelAircraft": "777",
        "managerName":"Todd Anderson",
        "technicianName":"Rake Yohn",
        "inspectorName": ""

    },
    {
        "id":2,
        "projectName": "Wifi Module Modification",
        "workDescription": "Open the cargo bay. Tag and tear out cargo interior. Demod legacy wifi radon in: the fuselage, the electronics bay, and the cockpit. Please provide record of milivot testing as well as records of mac addresses, access point locations, and termination / ringout logs of the newly installed infrastructure. Install new wifi radon modules. Refer to AMM and follow procedures and wire electronics bay according to the electronic schematics that are approved by engineering and authorized by the planning department. Once this is done, verify with the inspector. After signed off by manager and inspector please follow your AMM's and reinstall removed/ tagged components to the aircraft. Once this is complete, please see the inspector for authorized completion. Submit these records to the planning department.",
        "startingDate": "2022-01-23T08:25:43.511Z",
        "modelAircraft": "757",
        "managerName":"Richard Slick",
        "technicianName":"Tom Green",
        "inspectorName": ""
    },
    {
        "id":3,
        "projectName": "Flight Control Radar Maintinence",
        "workDescription": "Open the cargo bay. Tag and tear out electronics bay interior and the cockpit. Demod legacy radar control system. Install new radar avionics components. Refer to AMM and follow procedures and wire electronics bay according to the electronic schematics that are approved by engineering and authorized by the planning department. Once this is done, verify with the inspector. After signed off by manager and inspector please follow your AMM's and reinstall removed/ tagged components to the aircraft. Once this is complete, please see the inspector for authorized completion. Submit these records to the planning department.",
        "startingDate": "2022-05-04T21:35:22.511Z",
        "modelAircraft": "737",
        "managerName":"Cindy Lefthook",
        "technicianName":"Phillup Ondeez",
        "inspectorName": ""
    },
    {
        "id":4,
        "projectName": "Fuel Tank Upgrade Modification",
        "workDescription": "Open the fuel systems. Tag and tear out all systems to the fuel control system. Demod legacy fuel hardware. Install new fuel hardware. Refer to AMM and follow procedures and wire electronics bay according to the electronic schematics that are approved by engineering and authorized by the planning department. Once this is done, verify with the inspector. After signed off by manager and inspector please follow your AMM's and reinstall removed/ tagged components to the aircraft. Once this is complete, please see the inspector for authorized completion. Submit these records to the planning department.",
        "startingDate": "2022-04-3T23:55:53.511Z",
        "modelAircraft": "737",
        "managerName":"Andy Red",
        "technicianName":"Jack Blue",
        "inspectorName": ""
    },
    {
        "id":5,
        "projectName": "Air Frame Reinforcement Maintinence",
        "workDescription": "In every step of this process be sure to create a parts tag for EVERY COMPONENT and have all components parts tags signed off bu the inspector.Demod all hardware. Follow the AMM for all variables and instructions for each of the elements within the control system. Refer to AMM and follow procedures and wire electronics bay according to the electronic schematics that are approved by engineering and authorized by the planning department. Once this is done, verify with the inspector. After signed off by manager and inspector please follow your AMM's and reinstall removed/ tagged components to the aircraft. Once this is complete, please see the inspector for authorized completion. Submit these records to the planning department.",
        "startingDate": "2022-03-13T01:49:43.511Z",
        "modelAircraft": "777",
        "managerName":"Jason Lee",
        "technicianName":"Arty Land",
        "inspectorName": ""
    }
]

export const ProjectData_jsonString = JSON.stringify(ProjectData, null, 2)

fs.writeFile('projectData.json', ProjectData_jsonString, 'utf8', (err) => {
    if (err) {
        console.error('Error writing JSON file:', err);
        return;
    }
    console.log('JSON file has been exported')
});

export default ProjectData