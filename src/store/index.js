import React, { createContext, useReducer, useState, Fragment } from 'react'

export const LayoutContext = createContext(null);

const initialLayout = [
	
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

const LayoutAdd = (state, action) => {
	const style = {...action.props.style}
	style.left = Number(action.position[0].toFixed(0));
	style.top = Number(action.position[1].toFixed(0));
	const layout = [...state,{
		type:action.components,
		atype:action.props.atype,
		props:{...action.props.props}||{},
		style:style,
		data:{...action.props.data}||{}
	}];
	return layout;
}

const LayoutUpdata = (state, action) => {
	const layout = [...state];
	Object.assign(layout[action.index][action.path],action.source);
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
