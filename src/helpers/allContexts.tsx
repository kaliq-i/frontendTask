import React from 'react';
import {IUpdateDecision} from './interfaces'

const decisionContext = React.createContext<IUpdateDecision>({
  updateWeighting:Function,  
  updateAttribute:Function  
});

export { decisionContext };