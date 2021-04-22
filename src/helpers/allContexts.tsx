import React from 'react';
import {IUpdateWeighting, IUpdateAttributeInChoice} from './interfaces'

const weightingContext = React.createContext<IUpdateWeighting>({
  updateWeighting:Function  //this works? why?
});

const attributeContext = React.createContext<IUpdateAttributeInChoice>({
  updateAttribute:Function  //this works? why?
});

export { weightingContext, attributeContext };