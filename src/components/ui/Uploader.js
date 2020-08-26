import React from 'react';
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from   'react-dropzone-uploader'
import "../../assets/scss/associated_files.css"
const Uploader = (props) => {
    const handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) };
    return (
        <div>
            <Dropzone
                onChangeStatus={handleChangeStatus}
                onSubmit={(files)=>props.onSubmit(files)}
                // accept="file/*,audio/*,video/*"
            />
        </div>
    )
};

export default Uploader;
