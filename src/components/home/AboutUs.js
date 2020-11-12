import React, {Component} from 'react';
import {Grid} from "semantic-ui-react";
import Layout from "../../hoc/Layout";

class AboutUs extends Component {
    renderAboutUs(){
        return(
            <Grid textAlign="center" container verticalAlign='middle'>
                <Grid.Row><h2>About us</h2></Grid.Row>
                <Grid.Row>
                    <Grid.Column width={8}>
                        About Us
                    </Grid.Column>
                    <Grid.Column width={8}>
                        Form
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
    render() {
        if (this.props.place){
            return  (this.renderAboutUs())
        }else {
            return (
                <Layout>
                    {this.renderAboutUs()}
                </Layout>
            );
        }
    }
}

export default AboutUs;