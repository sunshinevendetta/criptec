import React from 'react';

const LogoScene: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <model-viewer
        src="/images/wtc.glb"  
        alt="WTC CDMX"
        auto-rotate
        camera-controls
        style={{ width: '100%', height: '100%' }}
        shadow-intensity="1"
        ar
         camera-orbit="45deg 75deg 1m" 
       
      ></model-viewer>
    </div>
  );
};

export default LogoScene;
