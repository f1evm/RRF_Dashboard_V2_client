function fsm(changeHandler = () => {}, init = {}) {
	const states = Object.create(null)
	var EE ;

	function reset() {
		states.nodes = []
		states.transmitter = ''
	}

	reset()

	Object.assign(states, init)
	EE = new EventSource('http://rrf.f5nlg.ovh:4440/realtime')
	slFetch();
	initEvents();


	function slFetch() {
		fetch('http://rrf.f5nlg.ovh:4440/nodes')
		.then(response => response.json())
		.then(data => {
		  var tmpNodes=[];
		  
		  data.nodes.forEach(nd => {
			if (tmpNodes.indexOf(nd) < 0 )  {
			  tmpNodes.push(nd);
			}
		  })
			states.nodes = tmpNodes;
			states.transmitters = data.transmitters;
			changeHandler();
			//console.log('fetch: init : ',{data})
		})
		.catch(err => {
			console.log('slFetch Error : ', err)
			
		})
  
	}


	function on(event, handler) {
		if (typeof EE.addEventListener === 'function') {
			EE.addEventListener(event, evt => {
				handler(JSON.parse(evt.data))
			})
		} else {
			EE.on(event, handler)
		}
	}

	// node = [server, salon, name, IP];

	const nodeIndex = (arr, nd) => {	
		var [a,b,c] = nd;
		for (var i = 0; i < arr.length; i++) {
			var [d,e,f] = arr[i];
			if ((a === d) && (b === e) && (c === f)){
				return i;
			}
		}
		return -1;
	}
	
	function initEvents(){

		on('ReflectorLogic.MsgNodeList', names => {
		states.nodes = names
		changeHandler()
	})

	on('ReflectorLogic.loginOk', (data) => {
		//console.log('MsgNodeJoined : ',name)
		const idx = nodeIndex(states.nodes,data);
		if (idx <0 ) {
			states.nodes.unshift(data);
		}
		changeHandler()
	})

	on('ReflectorLogic.disconnected', (data) => {
		const idx = nodeIndex(states.nodes, data);
		//console.log('MsgNodeLeft : ',name)
		if (idx > -1) {
			states.nodes.splice(idx, 1)
		}
		changeHandler()
	})

	on('ReflectorLogic.talkerStart', (data) => {
		//console.log('MsgTalkerStart : ', name)
		
			states.transmitters[data[1]] = data;
		
		changeHandler()
	})

	on('ReflectorLogic.talkerStop', (data) => { // eslint-disable-line no-unused-vars
		//console.log('MsgTalkerStop : ', name)
		
			states.transmitters[data[1]] = null

		changeHandler()
	})


	}
	return {'states': states}
}

export default fsm;

