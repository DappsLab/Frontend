import {gql} from "apollo-boost";

//Query

const getUsersData= gql`
    query GetData {
        users {
            userName email password fullName
        }
    }
`;

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

export {getUsersData,createNewUser};