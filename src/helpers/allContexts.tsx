import React from 'react';
import {IUpdateDecision} from './interfaces'

const decisionContext = React.createContext<IUpdateDecision>({
  updateWeighting:Function, //this works? why?
  updateAttribute:Function  //this works? why?
});

export { decisionContext };