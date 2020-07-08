import React, {useState} from "react";
import { useHistory } from 'react-router-dom';
const MainPage=()=>{
    const history = useHistory();
    const [name] = useState("tahseen");
    return(
        <div>
            <h1>
                I am main page
            </h1>
            {console.log("Main Page",name)}
            <button onClick={()=>{
                history.push({pathname:'/Login', state:{name}});
            }}>go to login</button>
        </div>
    );
};
export default MainPage
