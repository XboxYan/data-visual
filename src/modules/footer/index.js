import React, { useContext } from 'react';
import { Slider,Icon } from 'antd';
import { LayoutContext } from '../../store';
import './index.css';

const Footer = () => {
	const { config, setConfig } = useContext(LayoutContext);

	const setZoom = (value) => {
		setConfig({
			...config,
			zoom:Number(value.toFixed(1))
		})
	}

	const marks = {
		1: '',
	};

  	return (
    	<div className="footer-action">
    		<Icon className="btn-zoom" disabled={config.zoom<=0.5} type="zoom-out" onClick={()=>setZoom(config.zoom-0.1)} />
    		{/* <Select value={`${parseInt(config.zoom*100)}%`} onChange={setZoom} size="small">
    			<Option value="0.5">50%</Option>
    			<Option value="1">100%</Option>
    			<Option value="1.5">150%</Option>
    			<Option value="2">200%</Option>
    		</Select> */}
			<Slider className="slider-zoom" marks={marks} value={config.zoom} onChange={setZoom} min={.5} max={2} step={0.1} tipFormatter={(value)=>`${parseInt(value*100)}%`} />
			<Icon className="btn-zoom" disabled={config.zoom>=2} type="zoom-in" onClick={()=>setZoom(config.zoom+0.1)} />
		</div>
  	)
}

export default React.memo(Footer);
