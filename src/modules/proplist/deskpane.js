import React, { useContext, useState,useEffect } from 'react';
import { Input,InputNumber,Slider,Icon,Radio } from 'antd';
import { LayoutContext } from '../../store';
import { BackgroundColorPicker } from '../../components/color-picker';
import ImgUpload from '../../components/img-upload';
import ColorPicker from '../../components/color-picker';
import {
  G2
} from "bizcharts";

const { Global } = G2; 

const InputGroup = Input.Group;

let timer = null;

const DeskPane = () => {

    const { config, setConfig } = useContext(LayoutContext);

    const { width, height, grid, backgroundColor, backgroundImage, backgroundTempURL, gridvisible,theme,themeColor } = config;

    const [values, setValues] = useState({
        width, 
        height, 
        grid, 
        backgroundColor, 
        backgroundImage,
        backgroundTempURL,
        gridvisible,
        theme,
        themeColor
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

    const setTheme = (value) => {
        setValue({
            theme:value,
            backgroundColor:value==='dark'?'rgba(31, 31, 31, 1)':'rgba(255, 255, 255, 1)'
        })
    }

    const setThemeColor = (value,i) => {
        const colors = [...themeColor];
        colors[i] = value;
        setValue({themeColor:colors});
    }

    useEffect(()=>{
        Global.setTheme(theme);
    },[theme])

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
            <label className="form-lable">栅格<Icon className="form-visible" onClick={()=>setValue({gridvisible:!values.gridvisible})} type={values.gridvisible?"eye":"eye-invisible"}/></label>
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
            <label className="form-lable">主题</label>
            <div className="form-item">
                <Radio.Group name="radiogroup" value={values.theme} onChange={(ev)=>setTheme(ev.target.value)}>
                    <Radio value="default">浅色</Radio>
                    <Radio value="dark">深色</Radio>
                </Radio.Group>
            </div>
            <label className="form-lable">色板</label>
            <div className="form-item">
                <div className="form-colors" style={{backgroundColor:values.theme==='dark'?'#1f1f1f':'#fff'}}>
                    {
                        values.themeColor.map((el,i)=>(
                            <ColorPicker color={el} key={i} onChange={(value)=>setThemeColor(value,i)}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default React.memo(DeskPane);
