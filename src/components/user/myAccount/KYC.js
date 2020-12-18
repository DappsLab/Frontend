import React, {Component} from 'react';
import {Button, Form,} from "semantic-ui-react";
import "../../../assets/scss/kyc.css";
import {flowRight as compose} from "lodash";
import {connect} from "react-redux";
import {setUser} from "../../../actions/Actions";
import {graphql} from "react-apollo";
import {kycMutation} from "../../../queries/queries";
import {withAlert} from "react-alert";
import {ApolloClient, gql, InMemoryCache} from "@apollo/client";
const alphaNumaric=RegExp(/^[a-zA-Z0-9][a-zA-Z0-9\s]*$/);
const numaric=RegExp(/^[0-9\s]*$/);
const alphabet=RegExp(/^[a-zA-Z][a-zA-Z\s]*$/);

class Kyc extends Component {
    state={
        type:'text',
        currentUser:this.props.currentUser,
        loadingbtn:false,
        street:"",
        building:"",
        postalCode:"",
        city:"",
        country:"",
        nationality:"",
        mobile:"",
        dateOfBirth:"",
        error:"",
    }
    countryOptions = [
        { key: 'pk', value: 'Pakistan', text: 'Pakistan' },
        { key: 'af', value: 'Afghanistan', text: 'Afghanistan' },
        { key: 'ax', value: 'Aland Islands', text: 'Aland Islands' },
        { key: 'al', value: 'Albania', text: 'Albania' },
        { key: 'dz', value: 'Algeria', text: 'Algeria' },
        { key: 'as', value: 'American Samoa', text: 'American Samoa' },
        { key: 'ad', value: 'Andorra', text: 'Andorra' },
        { key: 'ao', value: 'Angola', text: 'Angola' },
        { key: 'ai', value: 'Anguilla', text: 'Anguilla' },
        { key: 'ag', value: 'Antigua', text: 'Antigua' },
        { key: 'ar', value: 'Argentina', text: 'Argentina' },
        { key: 'am', value: 'Armenia', text: 'Armenia' },
        { key: 'aw', value: 'Aruba', text: 'Aruba' },
        { key: 'au', value: 'Australia', text: 'Australia' },
        { key: 'at', value: 'Austria', text: 'Austria' },
    ]
    handleChange = event => {
        const {name,value}=event.target;
        this.setState({error:''})
        switch (name){
            case 'street':
                if (alphaNumaric.test(value)){
                    this.setState({[name]:value},()=>{})
                }
                break;
            case 'building':
                if (alphaNumaric.test(value)){
                    this.setState({[name]:value},()=>{})
                }
                break;
            case 'city':
                if (alphaNumaric.test(value)){
                    this.setState({[name]:value},()=>{})
                }
                break;
            case 'country':
                if (alphabet.test(value)){
                    this.setState({[name]:value},()=>{})
                }
                break;
            case 'nationality':
                if (alphabet.test(value)){
                    this.setState({[name]:value},()=>{})
                }
                break;
            case 'postalCode':
                if (alphaNumaric.test(value)){
                    this.setState({[name]:value},()=>{})
                }
                break;
            case 'dateOfBirth':
                this.setState({[name]:value},()=>{})
                break;
            case 'mobile':
                if (numaric.test(value)){
                    this.setState({[name]:value},()=>{})
                }
                break;
            default:
                break;
        }
        if (value===""){
            this.setState({[name]:value})
        }
    }
    handleSelect=(event,{value,name})=>{
        switch (name) {
            case 'country':
                if (alphabet.test(value)) {
                    this.setState({[name]: value}, () => {})
                }
                break;
            case 'nationality':
                if (alphabet.test(value)) {
                    this.setState({[name]: value}, () => {})
                }
                break;
            default:
                break;
        }
    }
    handleEmpty=({mobile,city,street,building,postalCode,country,nationality,dateOfBirth})=>{
        return mobile !== "",city!=="",street !== "",building !== "",postalCode !== "",country !== "",nationality !== "",dateOfBirth !== "";
    }


    handlSubmit=(event)=>{
        const {currentUser,mobile,city,street,building,postalCode,country,nationality,dateOfBirth}=this.state;
        event.preventDefault();
        this.setState({loadingbtn:true})
        const alert=this.props.alert;
        const that=this;
        if(this.handleEmpty(this.state)) {
            this.props.kycMutation({
                variables: {
                    id: currentUser.id,
                    mobile: mobile.toString(),
                    birth: dateOfBirth.toString(),
                    nationality: nationality.toString(),
                    country: country.toString(),
                    postalCode: postalCode.toString(),
                    city: city.toString(),
                    street: street.toString(),
                    building: building.toString()
                },
            }).then(result => {
                if (result.data.addKyc){
                    this.Authclient.query({
                        query: gql`query {
                            me{
                                avatar address fullName id type twoFactorCode
                                email location userName twoFactorEnabled balance
                                smartContracts {
                                    id contractName createdAt description verified
                                    image source  unlimitedLicensePrice singleLicensePrice
                                    contractCategory publishingDateTime
                                }
                                kyc{   birthDate
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
                                    contractName id  purchasedCounts contractCategory
                                    publisher {
                                      fullName
                                    }
                                  }
                                }
                            }
                        }`
                    }).then(result => {
                        console.log(result)
                        this.props.setUser(result.data.me);
                        alert.success("Submit Successfully", {timeout:1000})
                        that.setState({currentUser:result.data.me,type:'text',loadingbtn:false,error:"",building:"",street: "",postalCode: "",city: "",country: "",mobile: "",dateOfBirth: "",nationality: ""})
                    }).catch(e => {
                        console.log(e)
                        this.setState({loadingbtn: false,error:""})
                    });

                }
            }).catch(e=>{
                alert.error(e.toString(), {timeout: 20000})
                that.setState({loadingbtn: false,error:""})
            });
        }else {
            this.setState({loadingbtn: false,error:"all fields required"});
        }

    }
     Authclient = new ApolloClient({
        uri: 'http://localhost:4000/graphql',
        cache: new InMemoryCache(),
        headers: {
            authorization: localStorage.getItem("token"),
        }
    });



    dateFocus=()=>{
        this.setState({type:'date'})
    }
    render() {
        const {error,type,country,nationality,currentUser,mobile,loadingbtn,city,street,building,postalCode,dateOfBirth}=this.state;

        return (
            <section className={"kyc_section"}>
                <div className={'flex'}>
                    <h2>Account Verification</h2>
                    <h3>Status: <span className={currentUser.kyc.kycStatus==="VERIFIED"?"green":"yellow"}>{currentUser.kyc.kycStatus} </span></h3>
                </div>
                {error.length>0&&(
                    <span className={"flex errorMessage"}>{error}</span>
                )}
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Input
                            type={'text'} fluid  label='Street' placeholder={currentUser.kyc.street}
                            onChange={this.handleChange} name={'street'} value={street}
                        />
                        <Form.Input
                            type={'text'} fluid label='Building Number' placeholder={currentUser.kyc.building}
                            onChange={this.handleChange} name={'building'} value={building}
                        />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input
                            type={'text'} fluid  label='Postal Code' placeholder={currentUser.kyc.postalCode}
                            onChange={this.handleChange} name={'postalCode'} value={postalCode}
                        />
                        <Form.Input
                            type={'text'} fluid label='City' placeholder={currentUser.kyc.city}
                            onChange={this.handleChange} name={'city'} value={city}
                        />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Select value={country}
                            options={this.countryOptions} onChange={this.handleSelect}
                            name={'country'} label='Country' placeholder={currentUser.kyc.country} />
                        <Form.Select value={nationality}
                            options={this.countryOptions} onChange={this.handleSelect}
                            name={'nationality'} label='Nationality' placeholder={currentUser.kyc.nationality} />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input
                            fluid type={'text'} name={'mobile'} value={mobile}
                            label='Mobile' placeholder={currentUser.kyc.mobile} onChange={this.handleChange}/>
                        <Form.Input placeholder={currentUser.kyc.birthDate}
                            fluid type={type} onFocus={this.dateFocus} label={'Date of Birth'} name={'dateOfBirth'}
                            value={dateOfBirth}  onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Button loading={loadingbtn}  onClick={this.handlSubmit}>Submit</Button>
                </Form>
            </section>
        );
    }
}
const mapStateToProps=(state)=>({
    currentUser:state.user.currentUser
});
export default  compose(
    connect(mapStateToProps, {setUser}),
    graphql(kycMutation,{name:"kycMutation"}),
    withAlert(),
)(Kyc);





