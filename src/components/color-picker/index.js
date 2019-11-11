import React from 'react';
import { Button,Dropdown,Icon } from 'antd';
import { ChromePicker } from 'react-color';
import './index.css';

const ColorPicker = ({color,onChange}) => {
	let timer = null;

	const parseColor = (color) => {
		const rgba = `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`;
		window.getSelection().removeAllRanges();
		timer && clearTimeout(timer);
		timer = setTimeout(()=>{
			onChange && onChange(rgba);
		},300);
	};

	const picker = () => {
		return <ChromePicker width={250} className="color-picker" color={color} onChange={parseColor}/>
	}

	const rgba = color?color.match(/[\d.]+/g):[];

	const lightness = color?(rgba[0] * 0.2126 + rgba[1] * 0.7152 + rgba[2] * 0.0722) / 255 / rgba[3]:1;

  	return (
  		<div className="color-input">
	    	<Dropdown overlay={picker} trigger={['click']} placement="bottomRight">
			    <Button className="color-btn" block style={{backgroundColor:color,color:lightness>0.7?'rgba(0, 0, 0, 0.65)':'#fff'}}>{color||<span className="color-empty">无</span>}</Button>
			</Dropdown>
			<Icon className="color-clear" hidden={!color} type="close-circle" theme="filled" onClick={()=>onChange('')} />
		</div>
  	)
}

export default ColorPicker;
