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
mutation  ($id:ID!,$fname:String!,$name:String!,$tags:[String!],$category:[Category!]!,$image:String!,$short:String!,$long:String!,$one:String!,$unlimited:String!,$source:String!){
  updateSmartContract(id: $id, newSmartContract: {sourceContractName:$fname,contractName: $name, tags:$tags,contractCategory: $category, image: $image, shortDescription: $short, description: $long, singleLicensePrice: $one, unlimitedLicensePrice: $unlimited, source: $source}) {
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
  placeTestOrder(newOrder: {smartContract: $id,testAddressId: $addressId, productType: $producttype, licenseType: $type, fee: $fee}) {
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
    id testPurchasedContract { id }
    testOrder { id
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
   mutation  ($input:newCustomOredr){
  createCustomOrder(newCustomOrder: $input) {
    id
  }
}

    `