import React from 'react';
import DashboardLayout from "../../../hoc/DashboardLayout";

const UserBlock = (props) => {
    return (
        <DashboardLayout user={props.user}>
            <h1><strong>All <span>Users</span></strong></h1>
        </DashboardLayout>
    );
};

export default UserBlock;
