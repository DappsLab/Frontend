import React, {Component} from 'react';
import '../../assets/scss/login.css'
class Login extends Component {

    submitForm(event){

    }
    render() {
        return (
            <div className={"container"}>
                <div className={"login_wrapper"}>
                    <form onSubmit={(event)=> this.submitForm(event)}>
                        <h2>Please fill form</h2>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;