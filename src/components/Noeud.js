import React, { useContext } from 'react'
import './Noeuds.css'
import NodesContext from './Context';

    
const makeInfo = (info) => {
    if (info) {
        var res = info.name + ' | ' + (info.loc ? info.loc:'') + ' | ' + (info.town?info.town:'');
        return res
    }
    return ''
}

const openModal= (props) => {
    if (props.info) {
        props.openModal(props.node[2], props.info);
    }
}



const Noeud = (props) => {
    let Context = useContext(NodesContext);
    let info = makeInfo(props.info);
    let [sernum,salname,ndname] = props.node;
    let TXs = Context.transmitters; 
    if (TXs && TXs[salname]) {
        var [TXsrv,TXsal,TXname] = TXs[salname];
        var TXok = (TXsrv === sernum) && (TXsal === salname) && (TXname === ndname)
    }
    var className = `noeud ${( TXok ) ? 'txon' : ''} srv${sernum}`
    if (info === '') {
        info = "Ce node ne suit pas les règles de nommage ou n'existe pas dans la base de données.\n Contactez les administrateurs du réseau pour la mettre à jour.\nVoir les infos avec le bouton bleu.";
    } else {
        info += "\n Cliquez pour plus d'infos.";
    }
    return(
        <span  className= { className } title={info} onClick={openModal(props)} >{sernum > 0 ? <><small>{sernum}{salname[0]}</small></> : ''} {ndname}</span>
    )
}

export default Noeud