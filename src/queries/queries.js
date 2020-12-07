import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
export const grapqg_path='http://localhost:4000/graphql';
export const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

export const me_Query=gql`query {
  me{
    avatar address fullName id type twoFactorCode
    email location userName twoFactorEnabled balance
    smartContracts {
      id contractName createdAt description verified
      image source unlimitedLicensePrice singleLicensePrice
      contractCategory publishingDateTime
    }
    kyc{ birthDate
      building city country kycStatus mobile
      nationality postalCode street kycStatus
    }
    orders{
      id dateTime fee price status transactionHash
      orderUsed smartContract {
        contractName
      }
    }
    purchasedContracts {
      customizationsLeft id unlimitedCustomization
      licenses {
        purchaseDateTime id used
        order {
          id status licenseType
          smartContract {
            id contractName image
          }
        }
      }
      smartContract {
        contractName id
      }
    }
  }
}`

//

//Query
export const updateUser=gql`
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

export const createNewUser= gql`
  mutation ($fullName: String!,$userName: String!,$email: String!,$password: String!){
    registerUser(
      newUser: {
        fullName: $fullName
        userName: $userName
        email: $email
        password: $password
      }
    ) {
      token
      # user {
      # id
      # userName
      # type
      # wallet {
      # privateKey
      # publicKey
      # }
      # }
    }
  }
`;

export const imageUpload=gql`
  mutation UPLOAD_IMAGE($file: Upload!){
    imageUploader(file: $file)
  }
`
export const sourceUpload=gql`
  mutation ($file:Upload!){contractUploader(file: $file)}
`

export const userData=gql`
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
export const UserKyc=gql`
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

export const getAuth=gql`
  query AUTH_USER {
    authUser {
      avatar address
      fullName id
      email
      location userName
    }
  }
`
export const deleteUser=gql`
  mutation DeleteUser ($id:String!){
    deleteUser(id:$id){
      fullName
    }
  }
`
//====================Confirm Email===============================
export const confirmEmail=gql`
  mutation ConfirmEmail ($token:String!) {
    confirmEmail(token: $token)
  }
`
//====================Password===============================
export const forgetPassword=gql`
  mutation ForgetPassword ($email:String!){
    forgetPassword(email:$email)
  }
`
export const newPassword=gql`
  mutation ResetPassword ($token:String!,$password:String!){
    resetPassword(token:$token,password:$password)
  }
`
//=====================kyc==================================
export const kycMutation=gql`
  mutation UserKyc($id:String!,$mobile:String,$birth:String,$nationality:String,$country:String,$postalCode:String,$city:String,$street:String,$building:String){
    addKyc(id:$id,mobile:$mobile,birthDate:$birth,nationality:$nationality,country:$country,postalCode:$postalCode,city:$city,street:$street,building:$building,kycStatus:PENDING){

      kyc{ birthDate
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
export const getUsersData=`
query GetData {
users {
userName email fullName
}
}
`;
//============================================================
// Smart Contract
//============================================================
export const getContract=gql`
  query {
    verifiedSmartContracts {
      contractName shortDescription
      description contractCategory
      singleLicensePrice unlimitedLicensePrice
      image verified createdAt
      id publishingDateTime
      publisher {
        fullName
      }
    }
  }
`
export const createNewContract=gql`
  mutation ($fname:String!,$name:String!,$tags:[String!],$category:[Category!]!,$image:String!,$short:String!,$long:String!,$one:String!,$unlimited:String!,$source:String!){
    createSmartContract(
      newSmartContract: {sourceContractName:$fname,contractName: $name, tags:$tags,contractCategory: $category, image: $image, shortDescription: $short, description: $long, singleLicensePrice: $one, unlimitedLicensePrice: $unlimited, source: $source}) {
      id
    }
  }
`
export const contractById=gql`
  query ($id:ID!){
    smartContractById(id: $id)
    {
      contractCategory id
      image description verified
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
// 2FA Verification
//==============================================================
export const enableFA=gql`
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
export const disable2FA=gql`
  mutation {
    disable2FA
  }
`
export const verify2FA=gql`
  query ($token:String!){
    verify2FA(token:$token)
  }
`
//=======================================================================
// Buy Smart Contract
//=======================================================================
export const orderContract=gql`
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
// Search Smart Contract
//=======================================================================
export const search=gql` query ($search:String){
  searchSmartContract(searchSmartContract: {contractName: $search}){
    contractName
    createdAt
    description
    id tags
    image
    # publisher {
    # fullName
    # avatar
    # }
    shortDescription
    singleLicensePrice
    unlimitedLicensePrice
  }
}
`
export const licenseById=gql`query ($id:ID!){
  licenseById(id: $id) {
    id
    purchasedContract {
      id
    }
    order {
      id
      smartContract {
        id
        contractName shortDescription
        image publishingDateTime
        publisher {
          fullName
        }
        contractCategory createdAt
      }
    }
  }
}
`
export const pending_kyc_query= gql`query {
  searchPendingKyc {
    id fullName createdAt
    email location
    kyc {
      birthDate kycStatus
      city country street
      building mobile
      nationality postalCode
    }
  }
}`
export const verifyKyc=gql`mutation ($id:ID!){
  verifyKyc(id: $id)
}`
export const cancelKyc=gql`mutation ($id:ID!){
  cancelKyc(id: $id)
}`
export const pendingSmartContract=gql` query {
  searchPendingSmartContracts {
    id
    verified
    publisher {
      id
      fullName
    }
    source
    image
    tags
    sourceContractName
    contractName
    description
    publishingDateTime
    shortDescription
    singleLicensePrice
    unlimitedLicensePrice
  }
}`
export const cancel_smart_contract=gql`
  mutation ($id:ID!) {
    cancelSmartContract(id: $id) {
      id
    }
  }
`
export const verify_smart_contract=gql`
  mutation ($id:ID!) {
    verifySmartContract(id: $id) {
      id
    }
  }
`
export const getSource=gql` query ($id:ID!){
  getSource(id: $id)
}
`
export const compile=gql` mutation ($name:String!,$sId:ID!,$pId:ID!,$lId:ID!) {
  compileContract(newCompile: {compilationName:$name,smartContract: $sId, purchasedContract: $pId, license: $lId}) {
    id compiledFile
  }
}`

export const getDapps=gql`
  query {
    dApps {
      createdAt
      dAppName
      dAppCategory
      description
      image
      publisher {
        fullName
      }
      publishingDateTime
      shortDescription
      singleLicensePrice
      id
    }
  }
`