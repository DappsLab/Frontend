import React from 'react';
import {Button, Grid} from "semantic-ui-react";
import {Link} from "react-router-dom";
const NotFound = () => {
    return (
        <Grid textAlign="center"  verticalAlign='middle' className={"not_found" }>
            <Grid.Column >
                <div>  Sorry:(   Page Not Found</div>
                <Link className={"go_back"} to={'/'}><Button>go to home</Button></Link>
            </Grid.Column>
        </Grid>
    );
};

export default NotFound;