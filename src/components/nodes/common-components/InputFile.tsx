import React from 'react';

interface InputFileProps {
    acceptedTypes: string[],
    changed: (files: FileList) => void;
}

const inputFile = (props:InputFileProps) => {
    return (
        <div>
            <input type="file" accept={props.acceptedTypes.join()} onChange={ (e) => props.changed(e.target.files!) } />
        </div>

    )
}

export default inputFile;