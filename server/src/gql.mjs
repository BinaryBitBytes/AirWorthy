// import { gql } from 'apollo-server-core/src/gql.js'
// import { gql } from 'graphql-tag'
//Successful dynamic import of node module below
async function gql (){
    try{
        const { gql } = await import('apollo-server')
    } catch (error){
        console.error(error);
    }

}
export default gql 
