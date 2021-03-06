import React, {Component} from 'react';
import {Segment, Grid, Icon, Image} from "semantic-ui-react";
import "../../assets/scss/our_team.css"
import qasim from "../../assets/images/qasim1.jpg";
import tahir from "../../assets/images/qasim.jpg";
import tahseen from "../../assets/images/tahseen.jpeg";
import Zoom from 'react-reveal/Zoom';


class OurTeam extends Component {
    teams=[
        {name:"Qasim Raheem",des:"Backend",avatar:qasim,github:"github",linkedin:'linkedin',fb:"facebook official"},
        {name:"Muhammad Tahseen",des:"Frontend",avatar:tahseen,github:"github",linkedin:'linkedin',fb:"facebook official"},
        {name:"Tahir Ayyaz",des:"non",avatar:tahir,github:"github",linkedin:'linkedin',fb:"facebook official"},
    ]
    renderTeam=()=>(
          this.teams.map(team=>(
            <Grid.Column key={team.name}>
                <Segment className={"card_team"}>
                    <Zoom>
                        <Image circular src={team.avatar} size='small' />
                    </Zoom>
                    <h3>{team.name}</h3>
                    <h4>{team.des}</h4>
                    <div>
                        <Icon link className={team.github}/>
                        <Icon link className={team.linkedin}/>
                        <Icon link className={team.fb}/>
                    </div>
                </Segment>
            </Grid.Column>
          ))
    )
    render() {
        return (
           <Grid columns={3} textAlign={'center'} container stackable >
               <Grid.Row ><h2>Our Team</h2></Grid.Row>
                {this.renderTeam()}
           </Grid>
        );
    }
}

export default OurTeam;