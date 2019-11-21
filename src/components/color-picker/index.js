import React, {useState,Fragment,useRef,useEffect,useCallback,useReducer} from 'react';
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


const ColorPicker = React.memo(({color:_color,onChange}) => {


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
})

const useDeg = (ref,onChange) => {

	useEffect(()=>{

		const colorPane = ref.current;

		const {width,height,left,top} = colorPane.getBoundingClientRect();

		let start = false;

		const setDeg = (clientX,clientY,shiftKey) => {
			const x = clientX-left-width/2;
			const y = clientY-top-height/2;
			let deg = Math.atan(y/x)*180/Math.PI;
			if(x===0){
				if(y>0){
					deg = 180;
				}else{
					deg = 0;
				}
			}else{
				deg = x>0?deg+90:deg-90;
			}
			if(shiftKey){
				deg = Math.round(deg/15)*15;
			}
			onChange(deg);
		}

		const moverstart = (ev) => {
			start = true;
			setDeg(ev.clientX,ev.clientY,ev.shiftKey);
		}

		const mousemove = (ev) => {
			if(start){
				window.getSelection().removeAllRanges();
				setDeg(ev.clientX,ev.clientY,ev.shiftKey);
			}
		}

		const mouseup = (ev) => {
			if(start){
				start = false;
			}
		}
		colorPane.addEventListener('mousedown',moverstart);
		document.addEventListener('mousemove',mousemove);
		document.addEventListener('mouseup',mouseup);
		return ()=>{
			colorPane.removeEventListener('mousedown',moverstart);
			document.removeEventListener('mousemove',mousemove);
			document.removeEventListener('mouseup',mouseup);
		}
	},[ref,onChange])
}

const LinearGradientColorPicker = React.memo(({color:_color,onChange}) => {

	const colorPane = useRef(null);

	const [deg,color1,color2] = Array.isArray(_color)?_color:[180,_color,_color];

	const picker1 = ()=>Picker(color1,(rgba)=>{
		onChange([deg,rgba,color2]);
	});

	const picker2 = ()=>Picker(color2,(rgba)=>{
		onChange([deg,color1,rgba]);
	})

	const reducer = (state, action) => {
	    if (action.type === 'UPDATA') {
	    	onChange(action.data);
	    } else {
	      throw new Error();
	    }
	}

	const dispatch = useReducer(reducer)[1];

	const changeColor = useCallback((_deg)=>{

		dispatch({type:'UPDATA',data:[_deg,color1,color2]})

	},[color1,color2,dispatch])

	useDeg(colorPane,changeColor);

	return (
		<Fragment>
	  		<Button.Group className="color-input">
		    	<Dropdown overlay={picker1} trigger={['click']} placement="bottomRight">
				    <Button className="color-btn" style={{backgroundColor:color1,paddingRight:5}}></Button>
				</Dropdown>
				<Dropdown overlay={picker2} trigger={['click']} placement="bottomRight">
				    <Button className="color-btn" style={{backgroundColor:color2,paddingRight:5}}></Button>
				</Dropdown>
			</Button.Group>
			<div 
				ref={colorPane}
				className="color-preview"  
				style={{'--deg':deg,backgroundImage:`linear-gradient(${deg}deg, ${color1}, ${color2})`}}
			>
			</div>
		</Fragment>
  	)

})

export const BackgroundColorPicker = React.memo(({color,onChange}) => {

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
})

export default ColorPicker;
