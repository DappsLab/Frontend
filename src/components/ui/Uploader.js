import React from 'react';
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from   'react-dropzone-uploader'
import "../../assets/scss/upload_smart_contract.css"
const Uploader = (props) => {
    const handleChangeStatus = ({ meta, file }, status) => {
        if (status==="done"){
            if (file.name.toLowerCase().includes(".sol")||file.name.toLowerCase().includes(".SOL")){
                console.log("done");
            }else {
                alert("file not supported")
            }
        }

      };
    return (
        <div>
            <Dropzone
                onChangeStatus={handleChangeStatus}
                onSubmit={(files)=>props.onSubmit(files)}
                accept=".sol"
                maxFiles={1}
            />
        </div>
    )
};

export default Uploader;
