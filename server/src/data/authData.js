import fs from 'fs'
const AuthData= [
    {
  "id": {
    "id": 1
  },
  "token": { 
    "token":"00001111AAAA"
  },
  "userID": "001",
  "user": "Airliner",
  "userName": "United",
  "email": "united777@united.net",
  "password": "Boeing777" ,
  "isAdmin": "True"
    }
]

export const AuthData_jsonString =JSON.stringify(AuthData, null, 2);

fs.writeFile('authData.json', AuthData_jsonString, 'utf8', (err) => {
  if (err) {
    console.error('Error writing JSON file:', err);
    return
  }
  console.log('JSON file has been exported')
})

export default AuthData