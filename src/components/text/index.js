import React, { useContext } from 'react';
import { Slider,Icon } from 'antd';
import { LayoutContext } from '../../store';
import View from '../view';
import './index.css';

export const TextConfig = {
	style:{
		width: 200,
		height: 50
	}
}

const Text = (props) => {
	const { config, setConfig } = useContext(LayoutContext);


  	return (
    	<View className="text" {...props}>
    		text
		</View>
  	)
}

export default Text;
