import React from 'react';
import '../../assets/scss/header.css';
import {DappsIcon} from "../ui/Icons";
import {connect} from 'react-redux';
import {flowRight as compose} from 'lodash';
import Jump from 'react-reveal/Jump';


class Admin extends React.Component {
    state = {
        logged:this.props.logged_session,
        currentUser:this.props.currentUser,
        count:0
    }
    // componentDidMount() {
    //     if (this.props.currentUser) {
    //         this.setState({
    //             logged: this.props.logged_session, currentUser: this.props.currentUser
    //         });
    //
    //     }
    // }


    render() {
        console.log("log")
        return (
            <div>
                <header className="flex">
                    <Jump>
                        <DappsIcon link={true} linkTo="/"/>
                    </Jump>

                </header>
            </div>
        );
    }
}
const mapStateToProps=(state)=>({
    logged_session:state.user.logged_session,
    currentUser:state.user.currentUser,
})

export default compose(connect(mapStateToProps))(Admin);
