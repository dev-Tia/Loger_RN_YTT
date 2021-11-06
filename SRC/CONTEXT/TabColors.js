import {createContext} from 'react';

const TabColorContext = createContext({
  color: '',
  setColor: () => {},
  clearColor: () => {},
});

export default TabColorContext;
