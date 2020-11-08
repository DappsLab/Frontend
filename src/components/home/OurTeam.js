import React, {Component} from 'react';
import {Grid,Card} from "semantic-ui-react";

class OurTeam extends Component {
    render() {
        return (
           <Grid verticalAlign={'center'}>
               <Grid.Row>
                   <h2>Our Team</h2>
               </Grid.Row>
               <Grid.Row>
                   <Grid.Column>
                       <Card>

                       </Card>
                   </Grid.Column>
               </Grid.Row>
           </Grid>
        );
    }
}

export default OurTeam;