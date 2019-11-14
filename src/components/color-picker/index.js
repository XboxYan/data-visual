import React, {useState,Fragment} from 'react';
import { Button,Dropdown,Icon,Radio } from 'antd';
import { ChromePicker } from 'react-color';
import './index.css';

let timer = null;

const parseColor = (color,onChange) => {
	const rgba = `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`;
	window.getSelection().removeAllRanges();
	timer && clearTimeout(timer);
	timer = setTimeout(()=>{
		onChange && onChange(rgba);
	},300);
};

const Picker = (color,onChange) => {
	return <ChromePicker width={250} className="color-picker" color={color} onChange={(value)=>parseColor(value,onChange)}/>
}

const fontColor = (color) => {

	const rgba = color?color.match(/[\d.]+/g):[];

	const lightness = color?(rgba[0] * 0.2126 + rgba[1] * 0.7152 + rgba[2] * 0.0722) / 255 / rgba[3]:1;

	return lightness>0.7?'rgba(0, 0, 0, 0.65)':'#fff';
}


const ColorPicker = ({color:_color,onChange}) => {


	const color = Array.isArray(_color)?_color[1]:_color;

	const picker = ()=>Picker(color,onChange);

  	return (
  		<div className="color-input">
	    	<Dropdown overlay={picker} trigger={['click']} placement="bottomRight">
			    <Button className="color-btn" block style={{backgroundColor:color,color:fontColor(color)}}>{color||<span className="color-empty">无</span>}</Button>
			</Dropdown>
			<Icon className="color-clear" hidden={!color} type="close-circle" theme="filled" onClick={()=>onChange('')} />
		</div>
  	)
}

const LinearGradientColorPicker = ({color:_color,onChange}) => {

	const colors = Array.isArray(_color)?_color:[180,_color,_color];

	const picker1 = ()=>Picker(colors[1],(rgba)=>{
		onChange([colors[0],rgba,colors[2]]);
	});

	const picker2 = ()=>Picker(colors[2],(rgba)=>{
		onChange([colors[0],colors[1],rgba]);
	})

	const dragstart = (ev) => {
		const {width,height,left,top} = ev.target.getBoundingClientRect();
		const x = ev.clientX-left-width/2;
		const y = ev.clientY-top-height/2;
		let deg = Math.atan(y/x)*180/Math.PI;
		if(x==0){
			if(y>0){
				deg = 180;
			}else{
				deg = 0;
			}
		}else{
			deg = x>0?deg+90:deg-90
		}
		onChange([deg,colors[1],colors[2]]);
	}

	return (
		<Fragment>
	  		<Button.Group className="color-input">
		    	<Dropdown overlay={picker1} trigger={['click']} placement="bottomRight">
				    <Button className="color-btn" style={{backgroundColor:colors[1],paddingRight:5}}></Button>
				</Dropdown>
				<Dropdown overlay={picker2} trigger={['click']} placement="bottomRight">
				    <Button className="color-btn" style={{backgroundColor:colors[2],paddingRight:5}}></Button>
				</Dropdown>
			</Button.Group>
			<div 
				className="color-preview"  
				style={{'--deg':colors[0],backgroundImage:`linear-gradient(${colors[0]}deg, ${colors[1]}, ${colors[2]})`}}
				onMouseDown={dragstart}
			>
			</div>
		</Fragment>
  	)

}

export const BackgroundColorPicker = ({color,onChange}) => {

	const [type,setType] = useState(Array.isArray(color)?'gradient':'single');

	const modelselect = (ev) => {
		setType(ev.target.value);
	}

	return (
		<div className="color-content">
	  		<Radio.Group value={type} className="upload-select" onChange={modelselect}>
		        <Radio value="single">纯色</Radio>
		        <Radio value="gradient">渐变色</Radio>
		    </Radio.Group>
		    {
		    	type === 'gradient'?
		    	<LinearGradientColorPicker onChange={onChange} color={color}/>
		  		:
		  		<ColorPicker onChange={onChange} color={color}/>
		    }
  		</div>
	)
}

export default ColorPicker;
