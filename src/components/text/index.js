import React, { useState, useRef, useEffect } from 'react';
import { Icon } from 'antd';
import View from '../view';
import './index.css';

let timer = null;

const MapStyle = {
	color:'color',
	fontSize: 'fontSize'
}

const parseStyle = (styles) => {
	const style = {};
	Object.entries(styles).forEach(([el,value])=>{
		if(MapStyle[el]){
			style[MapStyle[el]] = value;
		}
	})
	return style;
}

const Text = (props) => {

	const { props:{ muti, marquee, speed }, style, data: {text} } = props;

	const input = useRef(null);

	const marqueeEl = useRef(null);

	const [isEdit,setEdit] = useState(false);

	const [width,setWidth] = useState(style.width);

	const [value,setValue] = useState(text);

	const change = (ev) => {
		const target = ev.target;
		setValue(target.value);
		timer && clearTimeout(timer);
		timer = setTimeout(()=>{
			props.onChange && props.onChange({text:target.value},'data');
		},300);
    }

    const blur = () => {
    	setEdit(false)
    }

    const edit = () => {
    	if(!isEdit){
			setEdit(true);
			input.current.select();
    	}
    }

    useEffect(() => {
    	if(marquee){
        	setWidth(marqueeEl.current.getBoundingClientRect().width);
    	}
    },[text,style.width,style.fontSize,marquee]);

    useEffect(() => {
    	setValue(text);
    },[text]);

  	return (
    	<View className="text-view" {...props} draggable={!isEdit}>
    		<div className="text-inner" data-edit={isEdit} data-muti={muti} data-marquee={marquee} style={parseStyle(style)} alignx={style.alignX} onDoubleClick={edit}>
    			<textarea ref={input} className="text-input" onChange={change} onBlur={blur} value={value}/>
    			<div className="text-display">
    				{
    					marquee?
    					<div className="text-marquee-con" ref={marqueeEl} style={{animationDuration:width/speed+'s'}}>	
    						<div className="text-marquee" style={{minWidth:style.width}}>{text}</div>
    						<div className="text-marquee" style={{minWidth:style.width}}>{text}</div>
    					</div>
    					:
    					text
    				}
	    			<Icon className="text-edit" type="edit" onClick={edit}/>
    			</div>
    		</div>
		</View>
  	)
}

export default Text;
