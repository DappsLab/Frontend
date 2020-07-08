import React from 'react';
import Router from 'router/Router'
import FullScreen from 'react-request-fullscreen';
import './App.css';


function App() {
  return (
    <div className="app-wrapper">
      <FullScreen
          onFullScreenError={(err:any) => console.log(err)}
          onFullScreenChange={() => console.log}
      >
          <Router />
      </FullScreen>
    </div>
  );
}

export default App;