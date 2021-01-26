import React from 'react';
import {toggleHidden} from "../../../../reducer/toggle/toggle.actions";
import {connect} from "react-redux";
import {Modal,Button} from 'semantic-ui-react'

const ChangePassword = ({toggle,setToggle}) => {
    return (
        <Modal open={toggle} onClose={()=>setToggle(false)}>
            <Modal.Header>Change Password</Modal.Header>
            <Modal.Actions>
                <Button  onClick={() => setToggle(false)}>
                    Cancel
                </Button>
                <Button onClick={() => setToggle(false)}>Change </Button>
            </Modal.Actions>
        </Modal>
    );
};

const mapStateToProps=({toggle:{hidden}})=>({
    hidden
//    hidden:state.toggle.hidden
//    ({toggle})
})
const mapDispatchToProps=dispatch=>({
    toggleHidden:()=>dispatch(toggleHidden())
})
export default connect(mapStateToProps,mapDispatchToProps) (ChangePassword);
