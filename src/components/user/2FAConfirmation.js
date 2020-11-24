import React, {Component} from 'react';
import {Grid, Form, Segment, Input} from 'semantic-ui-react'
import fa from "../../assets/images/fa.png"
import {Redirect} from "react-router-dom";
import TwoFAQuery from "../../queries/TwoFAQuery";
const number=RegExp(/^[0-9]*$/);
class FAConfirmation extends Component {
    state={
        value:"",
        cancel:false,
        faQuery:false,
        token:""
    }
    onChange=(event)=>{
        const {name,value}=event.target;
        if (name==="value"){
            if (number.test(value)){
                if (value.length<7) {
                    this.setState({[name]: value,token:value}, () => {});
                    if (value.length===6){
                        this.setState({faQuery:true,value:""})
                    }
                }
            }
        }
    }
    handleAction=(check)=>{
        if (check){
            this.props.history.push('/');
        }
    }
    // cancel=()=>{
    //     this.props.history.push('/');
    //     window.location.reload();
    // }
    faQuery=()=>{
        this.setState({faQuery:false})
    }
    render() {
        const {value,cancel,faQuery,token}=this.state
        console.log(this.props)
        return (
            <div>
            <Grid textAlign="center"  verticalAlign='middle'>
                <Grid.Column  style={{maxWidth:700}}>
                  <Segment className={"fa_container"}>
                      <img src={fa} alt={"name"}/>
                      <h2>Two-step varification</h2>
                      <p>Enter a code from Google Authenticator to make sure everything works</p>
                      <Form>
                          <Form.Field>
                              <label>Your Varification Code</label>
                              <Input
                                  value={value}
                                  onChange={this.onChange}
                                  name={"value"}
                                  placeholder='6-digits code'
                                  type={"text"}
                              />
                          </Form.Field>
                          {/*<Button onClick={this.cancel}>*/}
                          {/*    <Icon name={"close"}/>Varify*/}
                          {/*</Button>*/}
                      </Form>
                  </Segment>
                </Grid.Column>
                {cancel&& <Redirect to={'/login'}/>}
            </Grid>
                {faQuery&&<TwoFAQuery action={this.handleAction}  close={this.faQuery} token={token}/>}
            </div>
        )
    }
}

export default  (FAConfirmation);