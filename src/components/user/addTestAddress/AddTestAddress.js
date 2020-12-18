import React from 'react';
import Layout from "../../../hoc/Layout";

const AddTestAddress = (props) => {
    const {user}=props;
    console.log(user)
    return (
        <Layout>
            <div >
                <h2>Add Test Address</h2>
                <tabel>
                    <tr>
                        <th>Address</th>
                        <th>Balance</th>
                    </tr>
                    <tr>
                        <td>fdfgfd</td>
                        <td>sds</td>
                    </tr>
                </tabel>
            </div>
        </Layout>
    );
};

export default AddTestAddress;
