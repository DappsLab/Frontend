import { gql } from '@apollo/client';


//Query
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

const imageUpload=gql`
    mutation UPLOAD_IMAGE($file: Upload!){
        imageUploader(file: $file)
    }
`
const getUsersData= gql`
    query GetData {
        users {
            userName email  fullName
        }
    }
`;
const userData=gql`    
    query ($id:ID!){
        userById(id: $id) {
            avatar address
            fullName id
             email
            location userName
        }
    }
`

export {userData,getUsersData,imageUpload,createNewUser};