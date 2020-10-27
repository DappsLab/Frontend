import React, {Component} from 'react';
import Layout from "../../hoc/Layout";
import {Grid} from "semantic-ui-react";

class AboutUs extends Component {
    render() {
        return (
            <Layout>
                <Grid textAlign="center" container verticalAlign='middle'>
                    <Grid.Column width={8}>
                        About Us
                    </Grid.Column>
                    <Grid.Column width={8}>
                        Form
                    </Grid.Column>
                </Grid>
            </Layout>
        );
    }
}

export default AboutUs;