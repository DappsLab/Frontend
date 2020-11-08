import React, {Component} from 'react';
import {Grid} from "semantic-ui-react";
import Layout from "../../hoc/Layout";

class AboutUs extends Component {
    render() {
        return (
            <Layout>
                <Grid textAlign="center" container verticalAlign='middle'>
                    <Grid.Row>About us</Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            About Us
                         </Grid.Column>
                        <Grid.Column width={8}>
                            Form
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Layout>
        );
    }
}

export default AboutUs;