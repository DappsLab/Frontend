import React, {Component} from 'react';
import {Button, Form,} from "semantic-ui-react";
import "../../../assets/scss/kyc.css";
import {flowRight as compose} from "lodash";
import {connect} from "react-redux";
import {setUser} from "../../../actions/Actions";
import {graphql} from "react-apollo";
import { kycMutation} from "../../../queries/queries";
import KycQuery from "../../../queries/KycQuery";
const alphaNumaric=RegExp(/^[a-zA-Z0-9][a-zA-Z0-9\s]*$/);
const numaric=RegExp(/^[0-9\s]*$/);
const alphabet=RegExp(/^[a-zA-Z][a-zA-Z\s]*$/);

class Kyc extends Component {
    state={
        type:'text',
        currentUser:this.props.currentUser,
        kyc:this.props.currentUser.kyc,
        loadingbtn:false,
        kycQuery:false,
        status:this.props.currentUser.kyc.kycStatus,
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
                    this.setState({[name]:value},()=>{
                        console.log(value)})
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
                    this.setState({[name]: value}, () => {
                        console.log(value)
                    })
                }
                break;
            case 'nationality':
                if (alphabet.test(value)) {
                    this.setState({[name]: value}, () => {
                    })
                }
                break;
            default:
                break;
        }
    }
    handleEmpty=({mobile,city,street,building,postalCode,country,nationality,dateOfBirth})=>{
        return mobile !== "",city !== "",street !== "",building !== "",postalCode !== "",country !== "",nationality !== "",dateOfBirth !== "";
    }
    handlSubmit=(event)=>{
        const {currentUser,mobile,city,street,building,postalCode,country,nationality,dateOfBirth}=this.state;
        event.preventDefault();
        this.setState({loadingbtn:true})
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
                that.props.setUser(result.data.addKyc)
                that.setState({kyc:result.data.addKyc.kyc,type:'text',loadingbtn:false,error:"",building:"",street: "",postalCode: "",city: "",country: "",mobile: "",dateOfBirth: "",nationality: ""})
            }).catch(e=>{
                console.log(e);
                that.setState({loadingbtn: false,error:""})
            });
        }else {
            this.setState({loadingbtn: false,error:"all fields required"});
        }
    }
    closeKycQuery=()=>{
        this.setState({kycQuery:false},()=>{})
    }
    getUserKycInfo=(data)=>{
        this.props.setUser(data);
        this.setState({kyc:data.kyc,loadingbtn: false})
    }
    componentDidMount() {
        const currentUser = this.props.currentUser;
        if (currentUser.kyc.kycStatus !== "NOT_VERIFIED") {
            this.setState({kycQuery:true})
        }
    }
    dateFocus=()=>{
            this.setState({type:'date'})
    }
    render() {
        const {error,type,kyc,kycQuery,country,nationality,currentUser,status,mobile,loadingbtn,city,street,building,postalCode,dateOfBirth}=this.state;
        return (
            <section className={"kyc_section"}>
                <div className={'flex'}>
                    <h2>Account Verification</h2>
                    <h3>Status: <span className={status==="VERIFIED"?"green":"yellow"}>{status} </span></h3>
                </div>
                {error.length>0&&(
                    <span className={"flex errorMessage"}>{error}</span>
                )}
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Input
                            type={'text'} fluid  label='Street' placeholder={kyc.street}
                            onChange={this.handleChange} name={'street'} value={street}
                        />
                        <Form.Input
                            type={'text'} fluid label='Building Number' placeholder={kyc.building}
                            onChange={this.handleChange} name={'building'} value={building}
                        />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input
                            type={'text'} fluid  label='Postal Code' placeholder={kyc.postalCode}
                            onChange={this.handleChange} name={'postalCode'} value={postalCode}
                        />
                        <Form.Input
                            type={'text'} fluid label='City' placeholder={kyc.city}
                            onChange={this.handleChange} name={'city'} value={city}
                        />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Select value={country}
                            options={this.countryOptions} onChange={this.handleSelect}
                            name={'country'} label='Country' placeholder={kyc.country} />
                        <Form.Select value={nationality}
                            options={this.countryOptions} onChange={this.handleSelect}
                            name={'nationality'} label='Nationality' placeholder={kyc.nationality} />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input
                            fluid type={'text'} name={'mobile'} value={mobile}
                            label='Mobile' placeholder={kyc.mobile} onChange={this.handleChange}/>
                        <Form.Input placeholder={kyc.birthDate}
                            fluid type={type} onFocus={this.dateFocus} label={'Date of Birth'} name={'dateOfBirth'}
                            value={dateOfBirth}  onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Button loading={loadingbtn}  onClick={this.handlSubmit}>Submit</Button>
                </Form>
                {kycQuery&&
                <KycQuery
                    id={currentUser.id}
                    close={this.closeKycQuery}
                    getUserData={this.getUserKycInfo}
                />
                }
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
)(Kyc);





