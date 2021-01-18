import React from 'react';
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from   'react-dropzone-uploader'
import "../../assets/scss/upload_smart_contract.css"
import {filename} from "./Helpers";

const Uploader = (props) => {

    const handleSubmit = (files, allFiles) => {
        let file;
        for (let i=0;i<files.length;i++){
            file=files[i].file
        }
        // files.map(f=>{
        //     file= f.file
        // })
        if (props.type==="dapps") {
            if (file.name.toLowerCase().includes(".zip") && filename.test(file.name.replace('.zip', ''))) {
                props.onSubmit(file)
            } else {
                allFiles.forEach(f => f.remove())
                alert("file not supported")
            }
        }else {
            if (file.name.toLowerCase().includes(".sol") || file.name.toLowerCase().includes(".SOL")) {
                props.onSubmit(file)
            } else {
                allFiles.forEach(f => f.remove())
                alert("file not supported")
            }
        }

    }
    return (
        <div>
            <Dropzone
                onSubmit={handleSubmit}
                accept={props.type==="dapps"?".zip": ".sol"}
                maxFiles={1}
            />
        </div>
    )
};

export default Uploader;
