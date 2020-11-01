import { gql } from '@apollo/client';


//Query
const updateUser=gql`
    mutation ($fullName: String,$location: String,$avatar:String,$balance:String){
        editUser(
            newUser: {
                fullName: $fullName,
                avatar:$avatar,
                location: $location,
                balance: $balance,
            }
        ){
            avatar address
            fullName id
            email location
            userName

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
             email password
            location userName
        }
    }
`
const getAuth=gql`
    query AUTH_USER {
        authUser {
            avatar address
            fullName id
            email 
            location userName
        }
    }
`
const deleteUser=gql`
    mutation DeleteUser ($id:String!){
        deleteUser(id:$id){
            fullName
        }
    }
`
const confirmEmail=gql`
    mutation ConfirmEmail ($token:String!) {
        confirmEmail(token: $token)
    }
`
const forgetPassword=gql`
    mutation ForgetPassword ($email:String!){
        forgetPassword(email:$email)
    } 
`
const newPassword=gql`
    mutation ResetPassword ($token:String,$password:String){
        resetPassword(token:$token,password:$password)
    }
`
export {newPassword,forgetPassword,confirmEmail,deleteUser,getAuth,updateUser,userData,getUsersData,imageUpload,createNewUser};