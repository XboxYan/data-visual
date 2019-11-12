import React, { useState, useRef, useEffect } from 'react';
import { Icon } from 'antd';
import View from '../view';
import './index.css';

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

	const onChange = (ev) => {
        props.onChange && props.onChange({text:ev.target.innerText},'data');
        setEdit(false);
    }

    const edit = () => {
    	if(!isEdit){
			setEdit(true);
			input.current.focus();
			const range = window.getSelection();
	        range.selectAllChildren(input.current);
	        range.collapseToEnd();
    	}
    }

    useEffect(() => {
    	if(marquee){
        	setWidth(marqueeEl.current.offsetWidth);
    	}
    },[text,style.width,style.fontSize]);

  	return (
    	<View className="text-view" {...props} draggable={!isEdit}>
    		<div className="text-inner" data-edit={isEdit} data-muti={muti} data-marquee={marquee} style={parseStyle(style)} alignx={style.alignX} onDoubleClick={edit}>
    			<div ref={input} className="text-input" contentEditable={true} onBlur={onChange} dangerouslySetInnerHTML={{__html: text}} />
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
