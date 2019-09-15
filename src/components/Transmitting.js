import React, { useContext } from 'react' ;
import NodesContext, { NodesConsumer } from './Context';
import Noeud from './Noeud';


const Transmitting = (props) => {
    let Context = useContext(NodesContext);
    let TXs = Context.transmitters;
    let TXa = Object.entries(TXs);

    
    return (
        <table id="TXtable">
            <thead><tr>
                {TXa.map( ([key, val]) => <th key={key}>{key}</th> )}
            </tr></thead>
            <tbody>
            <tr>
            {TXa.map( ([key, val]) => 
                <td key={key}>
                    <Noeud  key={key} node={val===null?[0,key,''] : val} info={null} openModal={props.openModal} />
                </td>
            )}
            </tr>
            </tbody>
        </table> 
                
    )
        
}

export default Transmitting
