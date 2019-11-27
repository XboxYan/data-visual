import React, { useState, useRef, useEffect, useReducer } from 'react';
import { Icon,message } from 'antd';
import View from '../view';
import { base64ToBlob } from '../../util';
import './index.css';

const defaultProps = {
	Image:(theme)=>({
		atype:'image',
		style:{
			width: 100,
			height: 100,
			opacity: 1,
		},
		props:{
			lockRatio:true
		},
		data:{
			dataType:'static',
			src:"",
			tempSrc:""
		}
	}),
}

const Img = React.memo((props) => {

	const { data: {src,tempSrc},onChange } = props;

	const isBase64 = src.includes('base64')||!src;

	const input = useRef(null);

	const [loading,setLoading] = useState(false);

	const imgload = (ev) => {
		const [file] = ev.target.files;
		if(!file){
			return false;
		}
		if(!file.type.includes('image')){
			message.error('所选文件不是图片类型');
			return false;
		}
		if(file.size>1024*1024*2){
			message.error('选择图片过大，不能超过2M');
			return false;
		}
		setLoading(true);
		const reader = new FileReader();
	    reader.readAsDataURL(file);
	    reader.addEventListener('load', () => {
	    	const image = new Image();
         	image.src = reader.result;
         	image.onload = () => {
				onChange({
					style:{
						width: image.width,
						height: image.height
					},
					props:{
						naturalSize:[image.width,image.height]
					},
					data:{
						src: reader.result,
						tempSrc: URL.createObjectURL(file)
					}
				});
		    	setLoading(false);
         	}
	    });
	}

    const upload = () => {
    	input.current.click();
    }

    const redo = () => {
    	if(props.props.naturalSize){
	    	onChange({
				style:{
					width: props.props.naturalSize[0],
					height: props.props.naturalSize[1]
				}
			});
    	}
    }

    const action = [
    	{
    		icon:'upload',
    		onClick:upload,
    		tips:'选择图片'
    	},
    	{
    		icon:'redo',
    		onClick:redo,
    		tips:'还原'
    	}
    ]

    const reducer = (state, action) => {
	    if (action.type === 'INIT') {
	    	if(isBase64&&src&&!tempSrc){
				setLoading(true);
				base64ToBlob({b64data: src.split(',')[1], contentType: 'image/png'}).then(res => {
					setLoading(false);
				  	onChange({data:{tempSrc:res.preview}});
				})
			}
	    } else {
	      throw new Error();
	    }
	}

	const dispatch = useReducer(reducer)[1];

   	useEffect(()=>{
		dispatch({type:'INIT'});
	},[dispatch])

	useEffect(()=>{
		return () => {
			URL.revokeObjectURL(tempSrc);
		}
	},[tempSrc])

  	return (
    	<View className="image-view" {...props} action={action}>
    		<div className="image-inner" onDoubleClick={upload} data-theme={props.theme} style={{backgroundImage:`url(${tempSrc||src})`}}>
    			<Icon className="image-place" data-show={!src} type={loading?"loading":"picture"} />
    		</div>
    		<input ref={input} onChange={imgload} className="image-input" type="file" accept="image/png, image/jpeg" />
		</View>
  	)
})

Img.defaultProps = (theme)=>defaultProps.Image(theme);

export default Img;
