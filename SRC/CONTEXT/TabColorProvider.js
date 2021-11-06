import React, {useState} from 'react';
import TabColorContext from './TabColors';

const TabColorProvider = ({children}) => {
  const setColor = (props) => {
    setText((prevState) => {
      return {
        ...prevState,
        color: props.color,
      };
    });
  };

  const clearColor = () => {
    setText((prevState) => {
      return {
        ...prevState,
        color: '',
      };
    });
  };
  const initialState = {
    color: '#ffffff',
    setColor,
    clearColor,
  };
  const [text, setText] = useState(initialState);
  return (
    <TabColorContext.Provider value={text}>{children}</TabColorContext.Provider>
  );
};

export default TabColorProvider;
