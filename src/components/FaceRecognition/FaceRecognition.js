import React from "react";

const FaceRecognition = ({imageUrl}) => {
    return (
        <div className="center ma">
            <div className="center ma2">
                <img alt="face-detection" src={imageUrl} style={{'width': '700px', 'height': 'auto'}} />
            </div>
        </div>
    );
}

export default FaceRecognition;