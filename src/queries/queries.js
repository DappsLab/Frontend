import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import {DAPPSLAB_PORT, SERVER_URL} from "../constants";


export const grapqg_path=`${SERVER_URL}${DAPPSLAB_PORT}/graphql`;

export const client = new ApolloClient({
  uri: `${SERVER_URL}${DAPPSLAB_PORT}/graphql`,
  cache: new InMemoryCache()
});


export const me_Query=gql`query {
  me{
    avatar address fullName id type twoFactorCode isBlocked
    email location userName twoFactorEnabled balance
     testPurchasedContracts {
      id  customizationsLeft createdAt
      smartContract {
        contractName contractCategory id singleLicensePrice
        publisher { fullName  }
      }
      testLicenses {  id used  purchaseDateTime 
       testOrder {
          productType status licenseType id
          smartContract {
            id image contractName
          }
        }
       }
    }
     purchasedDApps {
      id dApp { createdAt   dAppName id publisher { fullName}}
       licenses { id }
    }
     testAddress {
      wallet {
        privateKey
        publicKey
      }
      id balance address
    }
    dApps {
      createdAt dAppCategory dAppName description id image
      publisher {
        id fullName
      }
      publishingDateTime shortDescription singleLicensePrice tags verified
    }
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
       dApp{ 
          dAppName
       }
    }
    testOrders{
    id dateTime fee price status transactionHash
      orderUsed smartContract {
        id contractName
      }
    }
    purchasedContracts {
      customizationsLeft id unlimitedCustomization
      licenses {
        purchaseDateTime id used 
         compilations {
          used
        }
        order {
          id status licenseType
          smartContract {
            id contractName image
          }
        }
      }
      smartContract {
        contractName id  purchasedCounts contractCategory
        publisher {
          fullName
        }
      }
    }
     customOrders {
      businessEmail businessName businessPhone businessWebsite
      createdAt id productType requirements role status
      user {fullName}
    }
  }
}`

//

//Query
export const updateUser=gql`
  mutation ($type:Type,$fullName: String,$location: String,$avatar:String,$balance:String){
    editUser(
      newUser: {
        fullName: $fullName,
        avatar:$avatar,
        location: $location,
        balance: $balance,
        type:$type
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
export const updatePassword=gql`
mutation  ($pass:String!,$newPass:String!){
  changePassword(password: $pass, newPassword:$newPass)
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

//============================================================
// Smart Contract
//============================================================
export const getContract=gql`
  query {
    verifiedSmartContracts {
      contractName shortDescription
      description contractCategory
      singleLicensePrice unlimitedLicensePrice
      image verified createdAt sourceContractName
      id publishingDateTime
      publisher {
        fullName
      }
    }
  }
`
export const createNewContract=gql`
  mutation ($fname:String!,$name:String!,$version:String!,$tags:[String!],$category:[Category!]!,$image:String!,$short:String!,$long:String!,$one:String!,$unlimited:String!,$source:String!){
    createSmartContract(
      newSmartContract: {sourceContractName:$fname,compilerVersion:$version,contractName: $name, tags:$tags,contractCategory: $category, image: $image, shortDescription: $short, description: $long, singleLicensePrice: $one, unlimitedLicensePrice: $unlimited, source: $source}) {
      id
    }
  }
`
export const contractById=gql`
  query ($id:ID!){
    smartContractById(id: $id)
    { compilerVersion
      contractCategory id tags shortDescription
      image description verified source
      contractName publishingDateTime sourceContractName
      singleLicensePrice unlimitedLicensePrice
      publisher {
        fullName
        avatar
      }
    }
  }
`
export const editContract=gql`
mutation  ($id:ID!,$fname:String!,$version:String!,$name:String!,$tags:[String!],$category:[Category!]!,$image:String!,$short:String!,$long:String!,$one:String!,$unlimited:String!,$source:String!){
  updateSmartContract(id: $id, newSmartContract: {sourceContractName:$fname,compilerVersion:$version,contractName: $name, tags:$tags,contractCategory: $category, image: $image, shortDescription: $short, description: $long, singleLicensePrice: $one, unlimitedLicensePrice: $unlimited, source: $source}) {
    id
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
//=======================================================================
// Buy Smart Contract
//=======================================================================
export const orderContract=gql`
  mutation ($producttype:ProductType!,$fee:String!,$did:ID,$id:String,,$type:LicenseType!) {
    placeOrder(
      newOrder:{
        productType: $producttype,
        licenseType: $type,
        fee: $fee,
        smartContract: $id,
        dApp: $did
      }
    ){
      id
    }
  }
`
export const purchasedContract=gql`
 mutation ($SID:String!,$OID:String!){
 purchaseContract(newPurchase: {smartContractId:$SID, orderId: $OID}) {
 createdAt
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
// address{ id }
export const licenseById=gql`query ($id:ID!){
  licenseById(id: $id) {
    id used 
    compilations {
      id used
    }
    purchasedContract {
    unlimitedCustomization
      id
    }
   
    order {
      id
     address
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
export const cancelDapps=gql`
 mutation ($id:ID!) {
    cancelDApp(id: $id) {
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
export const verifyDapps=gql`
mutation ($id:ID!){
  verifyDApp(id: $id){
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
    verifiedDApps {
      createdAt
      dAppName
      dAppCategory
      description verified
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
`;
export const createDapps=gql`mutation ($name:String!,$image:String!,$tags:[String]!,$category:[Category!]!,$short:String!,$desc:String!,$price:String!,$zip:String){
  createDApp(newDApp: {dAppName: $name, image: $image, tags: $tags, dAppCategory: $category, shortDescription: $short, description: $desc, singleLicensePrice: $price, zip: $zip}){
  id
  }
}`;

export const editDapp=gql`
mutation ($id:ID!,$input:DAppInput){
  updateDApp(id: $id, newDApp: $input){
  id
}
}
`
export const dappsFile=gql`
mutation ($file:Upload!) {
  dAppUploader(file: $file)
}
`
export const filterDapps=gql` query ($input:SearchDApp){
  filterDApps(searchDApp: $input) {
    createdAt
      dAppName
      dAppCategory
      description verified
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
export const dappsbyid=gql`
query ($id:ID!){
  dAppById(id: $id) {
    createdAt
    dAppCategory
    dAppName
    description
    id
    image
    publisher {
      fullName
      avatar
    }
    publishingDateTime
    shortDescription
    singleLicensePrice
    tags
  }
}

`
export const pendingDapps=gql`query
{
  searchPendingDApps {
    createdAt
    dAppCategory
    dAppName
    description
    id
    image
    publisher {
      fullName
      id
    }
    publishingDateTime
    shortDescription
    singleLicensePrice
    tags
    verified
  }
}
`
export const verify2FA=gql`query ($token:String!){
  verify2FA(token:$token)
  }`
export const login=gql`
  query ($username:String!,$password:String!){  
  loginUser(userName: $username, password: $password) {
  token
  user {
  id
 }
  }
  }`


export const verifyOrder=gql`
query  ($id:ID!){
     verifyOrder(id: $id)
 }`
export const purchaseDapp=gql`
   mutation ($did:String!,$oid:String!){
  purchaseDApp(newPurchase: {dAppId: $did, orderId: $oid}) {    
     id
    dApp {
      id
    }
    licenses {
      id
    }
  }
}`
export const getZip=gql`query ($did:ID!,$pid:ID!,$lid:ID!){ 
  getZip(zipInput: {dApp: $did, purchasedDApp: $pid, license: $lid})
}
`
export const addTestAddress=gql`mutation {
  addTestAddress{
  id
}
}`
export const deleteTestAddress=gql`
mutation  ($id:ID!){
   deleteTestAddress(testAddressId: $id){
  id
}
}

`
export const requestCoin=gql`
mutation ($id:ID!) {
  request5DAppsCoin(testAddressId: $id){
  id
}
}
`
export const placeTestOrder=gql`
    mutation ($addressId:ID!,$type:LicenseType!,$id:String!,$producttype: ProductType!,$fee:String!) {
  placeTestOrder(newOrder: {smartContract: $id,testAddress: $addressId, productType: $producttype, licenseType: $type, fee: $fee}) {
    id
  }
 }
  `
export const verifyTestOrder=gql`query ($id:ID!){
  verifyTestOrder(id: $id)
}
`
export const purchasedTestOrder=gql`
    mutation ($sid:String!,$oid:String!){
        testPurchaseContract(newPurchase: {smartContractId: $sid, testOrderId: $oid}){
        id
    }
}
`
export const testLicenseById=gql`query ($id:ID!){
testLicenseById(id: $id) {
 testCompilations{
    id used
  } used
    id testPurchasedContract { unlimitedCustomization id }
    testOrder { id
        testAddress{ id }
      smartContract {
        id contractName shortDescription
        image publishingDateTime
        publisher { fullName }
        contractCategory createdAt
      }
    }
  }
}`
export const testCompile=gql`
mutation ($name:String!,$sid:ID!,$pid:ID!,$lid:ID!){ testCompileContract(
newCompile:   {compilationName: $name, smartContract: $sid,testPurchasedContract: $pid, testLicense: $lid}){
  id
}
}
`

export const  createCustomOrder=gql`
   mutation  ($input:CustomOrderInput!){
  createCustomOrder(newCustomOrder: $input) {
    id
  }
}

    `
export const getTestABI=gql`query  ($id:ID!) {
  testGetABI(id: $id)
}`
export const getTestBinery=gql`query  ($id:ID!) {
  testGetBinary(id: $id)
}`
export const getABI=gql`query  ($id:ID!) {
  getABI(id: $id)
}`
export const getBinery=gql`query  ($id:ID!) {
  getBinary(id: $id)
}`
// export const deploy=gql`
//
// `
export const testDeploy=gql`
   mutation ($input:TestDeployedContractInput!){
   testDeployContract(newDeploy: $input){
  id
}
}
`
export const deploy=gql`
   mutation ($input:DeployedContractInput!){
   deployContract(newDeploy: $input){
  id
}
}
`
export const getCompiler=gql`
   query   {
   getCompilerVersions
}`

export const testVersion=gql`
mutation ($id:ID!,$version:String!) {
  testCompiledContractVersion(smartContractId: $id, version: $version) {
    abi
    error
  }
}

`
export const deleteSmartContract=gql`
    mutation ($id:ID!){
  deleteSmartContract(id: $id) {
    message
    success
  }
}`
export const deleteDApp=gql`
    mutation ($id:ID!){
  deleteDApp(id: $id) {
    message
    success
  }
}`
export const transferAmount=gql`
    mutation ($address:String!,$amount:String!){
  transferBalance(account: $address, amount: $amount)
}
`
export const pendingCustomOrders=gql`{
  searchPendingCustomOrders {
    businessEmail
    businessName
    businessPhone
    businessWebsite
    id createdAt
    productType
    requirements
    role
    user {
      id
      fullName
    }
  }
}
`
export const searchCustomOrders=gql`{
  searchVerifiedCustomOrders {
    businessEmail
    businessName
    businessPhone
    businessWebsite
    id
    createdAt
    productType
    requirements
    role
    user {
      id
      fullName
    }
    status
  }
  
}
`
export const verifyCustomeOrder=gql`
    mutation ($id:ID!){
  verifyCustomOrder(id: $id)
}`
export const cancelCustomeOrder=gql`
    mutation ($id:ID!){
    cancelCustomOrder(id: $id)
}`
export const blockUser=gql`
    mutation ($id:ID!){
    blockUser(id: $id)
}`
export const unBlockUser=gql`
    mutation ($id:ID!){
    unBlockUser(id: $id)
}`

export const searchUnBLockedUser=gql`{
  searchUnBlockedUsers {
    id
    fullName
    email confirmed
    userName
  }
}
`
export const searchUnBLockedUsersRequest=gql`{
  unBlockRequests {
    description
    id
    user {
      id
      fullName
      email
      confirmed
      userName
    }
    unBlocked
  }
}
`
export const createUnBlockRequest=gql`
mutation ($description:String!){
  createUnBlockRequest(description:$description){
  id
}
}`
export const deleteCustomOrders=gql`
    mutation ($id:ID!){
  deleteCustomOrder(id: $id)
}`
export const createAdmin=gql`
mutation ($email:String!) {
  createAdmin(email: $email)
}
`
export const getPrivateKey=gql`query ($pass:String!){
  getPrivateKey(password: $pass) {
    wallet {
      privateKey
    }
  }
}`
