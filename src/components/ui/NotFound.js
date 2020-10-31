import React from 'react';
import {Grid} from "semantic-ui-react";
const NotFound = () => {
    return (
        <Grid textAlign="center"  verticalAlign='middle' className={"not_found" }>
           <Grid.Column>
               Sorry:(   Page Not Found
           </Grid.Column>
        </Grid>
    );
};

export default NotFound;