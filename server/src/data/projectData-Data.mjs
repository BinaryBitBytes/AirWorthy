import fs from 'fs'
const ProjectData_Data= [
    {
"id": 1,
"projectId": 10001,
"projectName": "Smoke Detector Modification Data",
"inspectorName": "",
"workDescription": ""
    }
]
export const ProjectData_Data_jsonString = JSON.stringify(ProjectData_Data, null , 2)
fs.writeFile('projectData-Data.json', ProjectData_Data_jsonString, 'utf8', (err) => {
    if (err) {
        console.error('Error writing JSON file:', err)
        return;
    }
    console.log('JSON file has been exported')
})

export default ProjectData_Data