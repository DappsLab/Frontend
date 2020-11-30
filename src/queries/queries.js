import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache()
});
const Authclient = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
    headers: {
        authorization: localStorage.getItem("token"),
    }
});
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
const sourceUpload=gql`
   mutation ($file:Upload!){contractUploader(file: $file)}
`

const userData=gql`    
    query ($id:ID!){
        userById(id: $id) {
            avatar address
            fullName id type
            kyc{
                kycStatus 
            }
             email location userName twoFactorEnabled
        }
    }
`
const UserKyc=gql`
    query ($id:ID!){
        userById(id: $id) {
            avatar address
            fullName id 
            kyc{
                kycStatus mobile nationality country postalCode city birthDate street building
            }
            email location userName twoFactorEnabled
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
//====================Confirm Email===============================
const confirmEmail=gql`
    mutation ConfirmEmail ($token:String!) {
        confirmEmail(token: $token)
    }
`
//====================Password===============================
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
//=====================kyc==================================
const kycMutation=gql`
    mutation  UserKyc($id:String!,$mobile:String,$birth:String,$nationality:String,$country:String,$postalCode:String,$city:String,$street:String,$building:String){
        addKyc(id:$id,mobile:$mobile,birthDate:$birth,nationality:$nationality,country:$country,postalCode:$postalCode,city:$city,street:$street,building:$building,kycStatus:PENDING){
           
            kyc{   birthDate
                building
                city
                country
                kycStatus mobile
                nationality
                postalCode
                street
                kycStatus
            }
        }
    }
`;
//====================Me Query===============================
const getUsersData=`
    query GetData {
        users {
            userName email  fullName
        }
    }
`;
//============================================================
//                    Smart Contract
//============================================================
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
const createNewContract=gql`
    mutation ($fname:String!,$name:String!,$tags:[String!],$category:[Category!]!,$image:String!,$short:String!,$long:String!,$one:String!,$unlimited:String!,$source:String!){
        createSmartContract(
            newSmartContract: {sourceContractName:$fname,contractName: $name, tags:$tags,contractCategory: $category, image: $image, shortDescription: $short, description: $long, singleLicensePrice: $one, unlimitedLicensePrice: $unlimited, source: $source}) {
            id
        }
    }
`
const contractById=gql`
    query  ($id:ID!){
        smartContractById(id: $id)
        {
            contractCategory  id
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
//==============================================================
//                        2FA Verification
//==============================================================
const enableFA=gql`
    mutation{
        enable2FA{
            twoFactorEnabled
            twoFactorCode
            twoFactorSecret
            id
            avatar address fullName id type 
            email location userName 
            kyc{ kycStatus }
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
//=======================================================================
//                    Buy Smart Contract
//=======================================================================
const orderContract=gql`
    mutation ($fee:String!,$id:String!,$type:LicenseType!) {
        placeOrder(
            newOrder:{
                productType: SMARTCONTRACT, 
                licenseType: $type, 
                fee: $fee,
                smartContract: $id
            }
        ){
            id
        }
    }
`
//=======================================================================
//                    Search Smart Contract
//=======================================================================
const search=gql` query ($search:String){
    searchSmartContract(searchSmartContract: {contractName: $search}){
        contractName
        createdAt
        description
        id tags
        image
        # publisher {
        #   fullName
        #   avatar
        # }
        shortDescription
        singleLicensePrice
        unlimitedLicensePrice
    }
}
`
export {search,orderContract,UserKyc,kycMutation,client,disable2FA,verify2FA,enableFA,createNewContract,sourceUpload,getContract,contractById,newPassword,forgetPassword,confirmEmail,deleteUser,getAuth,updateUser,userData,getUsersData,imageUpload,createNewUser};