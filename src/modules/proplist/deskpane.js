import React, { useContext, useState } from 'react';
import { Input,InputNumber,Slider,Icon } from 'antd';
import { LayoutContext } from '../../store';
import { BackgroundColorPicker } from '../../components/color-picker';
import ImgUpload from '../../components/img-upload';

const InputGroup = Input.Group;

let timer = null;

const DeskPane = () => {

    const { config, setConfig } = useContext(LayoutContext);

    const { width, height, grid, backgroundColor, backgroundImage, backgroundTempURL, gridvisible } = config;

    const [values, setValues] = useState({
        width, 
        height, 
        grid, 
        backgroundColor, 
        backgroundImage,
        backgroundTempURL,
        gridvisible
    })

    const setValue = (key_value) => {
        setValues({...values,...key_value});
        timer && clearTimeout(timer);
        timer = setTimeout(()=>{
            setConfig({
                ...config,
                ...key_value
            })
        },100);
    }

    return (
        <div className="form-content">
            <label className="form-lable">画布尺寸</label>
            <div className="form-item">
                <InputGroup compact>
                    <InputNumber className="form-flex form-input"
                        value={values.width}
                        onChange={(value)=>setValue({width:value})}
                        min={320}
                        step={values.grid}
                    />
                    <InputNumber className="form-flex form-input"
                        min={320}
                        value={values.height}
                        step={values.grid}
                        onChange={(value)=>setValue({height:value})}
                    />
                </InputGroup>
            </div>
            <label className="form-lable">背景颜色</label>
            <div className="form-item">
                <BackgroundColorPicker color={values.backgroundColor} onChange={(value)=>setValue({backgroundColor:value})}/>
            </div>
            <label className="form-lable">背景图片</label>
            <div className="form-item">
                <ImgUpload url={values.backgroundImage} tempUrl={values.backgroundTempURL} onChange={(value,tempUrl)=>setValue({backgroundImage:value,backgroundTempURL:tempUrl||''})}/>
            </div>
            <label className="form-lable"><Icon className="form-visible" onClick={()=>setValue({gridvisible:!values.gridvisible})} type={values.gridvisible?"eye":"eye-invisible"}/>栅格</label>
            <div className="form-item">
                <Slider value={values.grid} className="form-flex form-slider" onChange={(value)=>setValue({grid:value})} min={1} max={50} />
                <InputNumber
                    min={1}
                    max={50}
                    value={values.grid}
                    className="form-number"
                    onChange={(value)=>setValue({grid:value})}
                />
            </div>
        </div>
    )
}

export default DeskPane;
