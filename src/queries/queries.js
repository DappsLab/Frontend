import {gql} from "apollo-boost";

//Query
const loginUser=gql`
    query ($userName:String!,$password:String!){
    loginUser(userName: $userName, password: $password) {
        token
        user {
            id
            userName
            email
            fullName
        }
    }
}
`
const createNewUser= gql`
    mutation  ($fullName: String!,$userName: String!,$email: String!,$password: String!){
        registerUser(
            newUser: {
                fullName: $fullName
                userName: $userName
                email: $email
                password: $password
            }
        ) {
            token
            user {
                id
                userName
                type
                wallet {
                    privateKey
                    publicKey
                }
            }
        }
    }
`;
const getUsersData= gql`
    query GetData {
        users {
            userName email password fullName
        }
    }
`;
export {loginUser,getUsersData,createNewUser};