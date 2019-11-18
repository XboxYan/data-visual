import React, { useState, useRef, useEffect } from 'react';
import { Icon } from 'antd';
import View from '../view';
import './index.css';

const defaultProps = {
	Title:{
		atype:'text',
		style:{
			width: 200,
			height: 50,
			opacity: 1,
			color: '#333333',
			fontSize: 16,
			alignX: 'center',
			fontWeight: false,
			fontItalic: false,
			fontSpace: 0
		},
		data:{
			text:"This is a text"
		}
	},
	Marquee:{
		atype:'text',
		style:{
			width: 200,
			height: 50,
			opacity: 1,
			color: '#333333',
			fontSize: 16,
			fontWeight: false,
			fontItalic: false,
			fontSpace: 0
		},
		props:{
			speed: 100
		},
		data:{
			text:"This is a marquee"
		}
	},
	MultText:{
		atype:'text',
		style:{
			width: 250,
			height: 120,
			opacity: 1,
			color: '#333333',
			fontSize: 16,
			fontWeight: false,
			fontItalic: false,
			fontSpace: 0,
			lineHeight: 1.5
		},
		props:{
			autoScroll: false,
			speed: 100
		},
		data:{
			text:"This is a MultText This is a MultText This is a MultText This is a MultText"
		}
	},
}

const Text = (props) => {

	let timer = null;

	const { style:{color,fontSize,fontSpace,fontWeight,fontItalic}, data: {text} } = props;

	const input = useRef(null);

	const [isEdit,setEdit] = useState(false);

	const [value,setValue] = useState(text);

	const change = (ev) => {
		const target = ev.target;
		setValue(target.value);
		timer && clearTimeout(timer);
		timer = setTimeout(()=>{
			props.onChange && props.onChange({data:{text:target.value}});
		},300);
    }

    const blur = () => {
    	setEdit(false);
    }

    const edit = () => {
    	if(!isEdit){
			setEdit(true);
			input.current.select();
    	}
    }

    useEffect(() => {
    	setValue(text);
    },[text]);

  	return (
    	<View className="text-view" {...props} draggable={!isEdit}>
    		<div className="text-inner" data-edit={isEdit} onDoubleClick={edit}>
    			<textarea ref={input} className="text-input" onChange={change} onBlur={blur} value={value}/>
    			<div className="text-display" data-italic={fontItalic} style={{
    				color,
    				fontSize,
    				letterSpacing:fontSpace+'em',
    				fontWeight:fontWeight?'bold':'normal',
    			}}>
    				{
    					props.children
    				}
	    			<Icon className="text-edit" type="edit" onClick={edit}/>
    			</div>
    		</div>
		</View>
  	)
}

const Marquee = (props) => {

	const marqueeEl = useRef(null);

	const { props:{ speed }, style:{width,fontSize,fontSpace,fontWeight}, data: {text} } = props;

	const [marqueeWidth,setWidth] = useState(width);

	useEffect(() => {
    	setWidth(marqueeEl.current.getBoundingClientRect().width);
    },[text,width,fontSize,fontSpace,fontWeight]);

	return (
		<Text {...props}>
			<div className="text-marquee-con" ref={marqueeEl} style={{animationDuration:marqueeWidth/speed+'s'}}>	
				<div className="text-marquee" style={{minWidth:width}}>{text}</div>
				<div className="text-marquee" style={{minWidth:width}}>{text}</div>
			</div>
		</Text>
	)
}

Marquee.defaultProps = defaultProps.Marquee;

const Title = (props) => {

	const { style, data: {text} } = props;

	return (
		<Text {...props}>
			<div className="text-title-con" alignx={style.alignX} >
				{text}
			</div>
		</Text>
	)
}

Title.defaultProps = defaultProps.Title;

const MultText = (props) => {

	const multEl = useRef(null);

	const { props:{ autoScroll,speed }, style:{width,height,lineHeight,fontSize,fontSpace,fontWeight}, data: {text} } = props;

	const [multHeight,setHeight] = useState(height);

	useEffect(() => {
    	setHeight(multEl.current.getBoundingClientRect().height);
    },[text,width,height,lineHeight,fontSpace,fontSize,fontWeight]);

	const scroll = autoScroll &&　multHeight-fontSize*2>height;
	return (
		<Text {...props}>
			<div className="text-mult-con" data-scroll={scroll} style={{lineHeight,animationDuration:multHeight*2/speed+'s'}}>	
				<div ref={multEl} className="text-mult">{text}</div>
				{
					scroll && <div className="text-mult">{text}</div>
				}
			</div>
		</Text>
	)
}

MultText.defaultProps = defaultProps.MultText;

export { Title,Marquee,MultText }

export default Text;
