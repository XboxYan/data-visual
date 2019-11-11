import React, { createContext, useReducer, useState, Fragment } from 'react'

export const LayoutContext = createContext(null);

const initialLayout = [
	{
	  type: 'Text',
	  style: {
	    width: 200,
	    height: 200,
	    left: 200,
	    top: 200,
	    opacity: 1
	  }
	},
	{
	  type: 'Text',
	  style: {
	    width: 300,
	    height: 200,
	    left: 500,
	    top: 300,
	    opacity: 1
	  }
	}
]

const initialConfig = {
	grid:10,
	gridvisible:true,
	zoom:1,
	width:1280,
	height:720,
	backgroundColor:'rgba(255,255,255,1)',
	backgroundImage:''
}

const LayoutAdd = () => {

}

const LayoutUpdata = (state, action) => {
	const layout = [...state];
	Object.assign(layout[action.index][action.path],action.layout);
	return layout;
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return LayoutAdd(state, action);
    case 'UPDATA':
      return LayoutUpdata(state, action);
    default:
      throw new Error();
  }
}


const Store = (props) => {
	const [layout, dispatch] = useReducer(reducer, initialLayout);
	const [config, setConfig] = useState(initialConfig);
	const [focusIndex, setFocusIndex] = useState([-1]);
	return (
	    <Fragment>
	    	<LayoutContext.Provider 
	    		value = {{
	    			layout,
	    			dispatch,
	    			config,
	    			setConfig,
	    			focusIndex,
	    			setFocusIndex
	    		}}>
	    	     {props.children}
	    	</LayoutContext.Provider>
	    </Fragment>
	)
}

export default Store;
