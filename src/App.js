import React, { useState, useEffect } from 'react';
import { NodesProvider } from './components/Context'

import Noeuds from './components/Noeuds';

//import Salon from './components/Salon';
import Fsm from './lib/fsm';
//import ReactResizeDetector from 'react-resize-detector';
//import XLSX from 'xlsx';
//import Timeout from './components/Timeout';
//import LastTX from './components/LastTX';


import './App.css';
import Transmitting from './components/Transmitting';
//import './components/Noeuds.css';
//import './components/Modal.css';


const NW = 172; // Largeur d'un Noeud en pixels.

//var listeNoeuds = [];


const App = (props) => {
  
  const [nodes, setNodes] = useState([]);
  const [transmitters, setTransmitters] = useState({});
  const [tri, setTri] = useState(1);

  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });


  const fsm = new Fsm(() => {
    setNodes(fsm.states.nodes);
    setTransmitters(fsm.states.transmitters)
    }, {nodes: nodes, transmitters: transmitters});

  
    return (
      <NodesProvider value={{nodes,transmitters,tri}}>
      <div className="App">
        <Transmitting />
        <div id="table" className=" tabContent noeuds" >
           
          <div style={{width: width+'px', margin: '0 auto', /* border: 'solid orange 1px'*/}} >
            
            <Noeuds  openModal={null} getInfo={null} />
          </div>
            
        </div>
      </div>
      </NodesProvider>
    );

}


export default App;
