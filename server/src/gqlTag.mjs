async function gql (){
    try {
        const { gql } = await import('gql-tag')
    } catch (error){
        console.error(error)
    }
}
export default gql