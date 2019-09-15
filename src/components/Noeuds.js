import React, {Component} from 'react';
import { NodesConsumer } from './Context'

//import Fsm from '../svxlink/fsm';
import Noeud from './Noeud';
import './Noeuds.css';
//import './Modal.css';

//var listeNoeuds = [];

class Noeuds extends Component {

    
  sortNodes = (value) => {
      //var tri = 1;
      if (value.nodes){
        var nds = value.nodes.filter(() => {return true});
        if (value.tri === 1){
          nds.sort((a,b) => {
            var x = a[2].toUpperCase();
            var y = b[2].toUpperCase();
            if (x < y) return -1;
            if (x > y) return 1;
            return 0;
          });
        } else if (value.tri === 2){
          nds.sort((a,b) => {
            var at = a[2].split(' ');
            if (at.length === 1) at[1] = 'a' + at[0];
            var bt = b[2].split(' ');
            if (bt.length === 1) bt[1] = 'a' + bt[0];
            
            if (at[1] < bt[1]) return -1;
            if (at[1] === bt[1]) return 0;
            if (at[1] > bt[1]) return 1;
            return 0;
          })
        }
      }
      return nds
    }

    render() {
      
      return (
        <NodesConsumer>
        {value => /* render something based on the context value */
(
      <div>
            <div className="clearF">
              {value.nodes && this.sortNodes(value).map( nd => <Noeud key={nd} node={nd} info={null} openModal={this.props.openModal} />) }
            </div>
            
        </div>
      
)}
      </NodesConsumer>
      )
    }


}

export default Noeuds