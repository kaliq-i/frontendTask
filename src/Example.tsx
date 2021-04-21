import React from 'react';
import ReactFlow, {Background, MiniMap, Controls} from 'react-flow-renderer';
import dagre from 'dagre' // for positioning 

const elements = [
  {
    id: '1',
    type:"input",
    data: { label: 'Input Node' },
    position: { x: 0, y: 0 },
  },
  {
    id:"2",
    type:"default",
    data: { label: 'Input Node' },
    position: { x: 800, y: 1200 },
    
  },
  { id: 'e1-2', source: '1', target: '2', animated: true },

]




function Example() {
  return (
    <div className="App">
     <ReactFlow 
     elements={elements}
     onLoad={(reactFlowInstance)=> reactFlowInstance.fitView()}
     style={{width:"100%", height:"90vh"}}
     >
  <MiniMap/>
  <Controls/>
  <Background/>
  </ReactFlow>
    </div>
  );
}

export default Example;
