import React from 'react';
import {useQuery} from "@apollo/client";
import {getSource} from "../../../../queries/queries";
import {Controlled as CodeMirror} from "react-codemirror2";
import TableCell from "@material-ui/core/TableCell";
import {Client} from "../../../../queries/Services";

const GetSource = (props) => {
    const {loading,error,data}=useQuery(getSource,{
        variables:{id:props.id} ,client:Client,   context: {
            headers: {
                authorization: localStorage.getItem("token")
            }
        }
    });
    if (loading) return "Loading"
    if (error) return <div className={`errorMessage`}>{error.toString()}</div>
    return  <CodeMirror
        value={data.getSource}
        options={{mode:'sol', lineNumbers: true,theme:'material'}}
        // onBeforeChange={(editor, data, value) => {
        //     this.setState({value});
        // }}
    />
};

export default GetSource;