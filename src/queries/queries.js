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
const createNewContract=gql`
    mutation ($name:String!,$category:[Category!]!,$image:String!,$short:String!,$long:String!,$one:String!,$unlimited:String!,$source:String!){
        createSmartContract(
            newSmartContract: {contractName: $name, contractCategory: $category, image: $image, shortDescription: $short, description: $long, singleLicensePrice: $one, unlimitedLicensePrice: $unlimited, source: $source}) {
            id
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
const sourceUpload=gql`
   mutation ($file:Upload!){contractUploader(file: $file)}
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
             email location userName twoFactorEnabled
        }
    }
`
const contractById=gql`
    query  ($id:ID!){
        smartContractById(id: $id)
        {
            contractCategory 
            image  description verified
            contractName publishingDateTime
            singleLicensePrice unlimitedLicensePrice
            publisher {
                fullName
                avatar
            }
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
    mutation ResetPassword ($token:String!,$password:String!){
        resetPassword(token:$token,password:$password)
    }
`
const meQuery=gql`    
    query {
        me{
            avatar address
            fullName id
            email location userName
        }
    }
`
const getContract=gql`    
    query {
        smartContracts {
            contractName shortDescription
            description contractCategory 
            singleLicensePrice unlimitedLicensePrice
            image verified 
            id publishingDateTime
        }
    }
`
const enableFA=gql`
    mutation{
        enable2FA{
            twoFactorEnabled
            twoFactorCode
            twoFactorSecret
            id
            email
            userName
        }
    }
`
const disable2FA=gql`    
    mutation {
        disable2FA
    }
`
const verify2FA=gql`
    query ($token:String!){
        verify2FA(token:$token)
    }
`
export {disable2FA,verify2FA,enableFA,createNewContract,sourceUpload,getContract,contractById,meQuery,newPassword,forgetPassword,confirmEmail,deleteUser,getAuth,updateUser,userData,getUsersData,imageUpload,createNewUser};