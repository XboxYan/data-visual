import React, { useRef,useState } from 'react';
import { Button, Icon, message, Radio, Input } from 'antd';

import './index.css';

let timer = null;

const ImgUpload = (props) => {

	//https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png
	
	const { url, tempUrl, onChange } = props;

	const isBase64 = (url && url.includes('base64'))||!url;

	const [loading,setLoading] = useState(false);

	const [type,setType] = useState(isBase64?'img':'url');

	const uploadInput = useRef(null);

	const dragover = (ev) => {
		ev.preventDefault();
		uploadInput.current.focus();
	}

	const dragleave = () => {
		uploadInput.current.blur();
	}

	const drop = (ev) => {
		ev.preventDefault();
		imgload(ev.dataTransfer.files);
	}

	const upload = (ev) => {
		imgload(ev.target.files);
	}

	const imgload = (files) => {
		const [file] = files;
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
         		onChange(reader.result,URL.createObjectURL(file),image.width,image.height);
		    	setLoading(false);
         	}
	    });
	}

	const change = (ev) => {
		const value = ev.target.value;
		timer && clearTimeout(timer);
		timer = setTimeout(()=>{
			const image = new Image();
         	image.src = value;
         	image.onload = () => {
         		onChange(value,null,image.width,image.height);
         	}
		},300);
	}

	const deleteImg = () => {
		uploadInput.current.value = "";
		props.onChange && props.onChange('');
	}

	const modelselect = (ev) => {
		setType(ev.target.value);
	}

	

  	return (
  		<div className="upload-content">
	  		<Radio.Group value={type} className="form-item-radio" onChange={modelselect}>
		        <Radio value="img">选择图片</Radio>
		        <Radio value="url">输入链接</Radio>
		    </Radio.Group>
		    {
		    	type === 'img'?
		    	<Button tabIndex="-2" className="upload-btn" type="dashed" block onDragOver={dragover} onDragLeave={dragleave} onDrop={drop}>
		  			<input ref={uploadInput} id="img-upload" className="upload-input" type="file" accept="image/png, image/jpeg" onChange={upload}/>
		  			<Icon className="upload-icon" type={loading?"loading":"picture"} />
		  			<div>{loading?"加载中":"点击或拖拽"}</div>
		  			<div className="upload-preview" data-show={!!props.url} style={{backgroundImage:`url(${tempUrl||url}),url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDI0IDEwMjQiPjxwYXRoIGZpbGw9InJnYmEoMCwgMCwgMCwgMC42NSkiIGQ9Ik04MzIuNiAxOTEuNGMtODQuNi04NC42LTIyMS41LTg0LjYtMzA2IDBsLTk2LjkgOTYuOSA1MSA1MSA5Ni45LTk2LjljNTMuOC01My44IDE0NC42LTU5LjUgMjA0IDAgNTkuNSA1OS41IDUzLjggMTUwLjIgMCAyMDRsLTk2LjkgOTYuOSA1MS4xIDUxLjEgOTYuOS05Ni45Yzg0LjQtODQuNiA4NC40LTIyMS41LTAuMS0zMDYuMXpNNDQ2LjUgNzgxLjZjLTUzLjggNTMuOC0xNDQuNiA1OS41LTIwNCAwLTU5LjUtNTkuNS01My44LTE1MC4yIDAtMjA0bDk2LjktOTYuOS01MS4xLTUxLjEtOTYuOSA5Ni45Yy04NC42IDg0LjYtODQuNiAyMjEuNSAwIDMwNnMyMjEuNSA4NC42IDMwNiAwbDk2LjktOTYuOS01MS01MS05Ni44IDk3ek0yNjAuMyAyMDkuNGMtMy4xLTMuMS04LjItMy4xLTExLjMgMEwyMDkuNCAyNDljLTMuMSAzLjEtMy4xIDguMiAwIDExLjNsNTU0LjQgNTU0LjRjMy4xIDMuMSA4LjIgMy4xIDExLjMgMGwzOS42LTM5LjZjMy4xLTMuMSAzLjEtOC4yIDAtMTEuM0wyNjAuMyAyMDkuNHoiPjwvcGF0aD48L3N2Zz4=")`}}>
		  				<label htmlFor="img-upload"><Icon title="重新选择" type="upload"/></label>
		  				<Icon title="删除图片" type="delete" onClick={deleteImg} />
		  			</div>
		  		</Button>
		  		:
		  		<Input placeholder="请输入图片地址" defaultValue={isBase64?'':url} onChange={change} allowClear={true}/>
		    }
  		</div>
  	)
}

export default React.memo(ImgUpload);
