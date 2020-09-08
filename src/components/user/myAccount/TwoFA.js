import React, {Component} from 'react';
import AccountLayout from "../../../hoc/AccountLayout";


class TwoFA extends Component {
    render() {
        return (
                <AccountLayout>
                    <div>
                        <h2>Enable 2FA</h2>
                    </div>
                </AccountLayout>
        );
    }
}

export default TwoFA;
