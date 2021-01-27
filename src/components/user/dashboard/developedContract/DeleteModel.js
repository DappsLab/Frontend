import React from 'react';
import {Modal,Header,Icon,Button} from 'semantic-ui-react'
const DeleteModal = (props) => {

    return (
        <Modal
            open={props.open}
            onClose={props.close}
        >
            <Header icon='delete' content='Delete Smart Contract' />
            <Modal.Content>
                <p>
                   Are you sure? you want to delete this Smart Contract. If yes then simply click on below yes buttom
                </p>
            </Modal.Content>
            <Modal.Actions>
                <Button color='red' onClick={props.close}>
                    <Icon name='remove' /> No
                </Button>
                <Button color='green' onClick={props.deleteAction}>
                    <Icon name='checkmark' /> Yes
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export default DeleteModal;