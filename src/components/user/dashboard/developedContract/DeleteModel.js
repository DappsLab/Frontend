import React from 'react';
import {Modal,Header,Icon,Button} from 'semantic-ui-react'
const DeleteModal = (props) => {
    const {block,open,close,deleteAction}=props
    return (
        <Modal
            open={open}
            onClose={close}
        >
            <Header icon='delete' content={block?"Block User Confirmation":'Delete Smart Contract'} />
            <Modal.Content>
                <p>
                   Are you sure? you want to {block?" Block this user ":" delete this Smart Contract "}. If yes then simply click on below yes buttom
                </p>
            </Modal.Content>
            <Modal.Actions>
                <Button color='red' onClick={close}>
                    <Icon name='remove' /> No
                </Button>
                <Button color='green' onClick={deleteAction}>
                    <Icon name='checkmark' /> Yes
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export default DeleteModal;