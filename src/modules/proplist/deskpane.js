import React, { useContext } from 'react';
import { Input,InputNumber,Slider,Icon } from 'antd';
import { LayoutContext } from '../../store';
import ColorPicker from '../../components/color-picker';
import ImgUpload from '../../components/img-upload';

const InputGroup = Input.Group;

const DeskPane = () => {
    const { config, setConfig } = useContext(LayoutContext);

    const { width, height, grid, backgroundColor, backgroundImage, gridvisible } = config;

    const setValue = (value,name) => {
        setConfig({
            ...config,
            [name]:value
        })
    }

    return (
        <div className="form-content">
            <label className="form-lable">画布尺寸</label>
            <div className="form-item">
                <InputGroup compact>
                    <InputNumber className="form-flex form-input"
                        value={width}
                        onChange={(value)=>setValue(value,'width')}
                        min={320}
                        step={grid}
                    />
                    <InputNumber className="form-flex form-input"
                        min={320}
                        value={height}
                        step={grid}
                        onChange={(value)=>setValue(value,'height')}
                    />
                </InputGroup>
            </div>
            <label className="form-lable">背景颜色</label>
            <div className="form-item">
                <ColorPicker color={backgroundColor} onChange={(value)=>setValue(value,'backgroundColor')}/>
            </div>
            <label className="form-lable">背景图片</label>
            <div className="form-item">
                <ImgUpload url={backgroundImage} onChange={(value)=>setValue(value,'backgroundImage')}/>
            </div>
            <label className="form-lable"><Icon className="form-visible" onClick={()=>setValue(!gridvisible,'gridvisible')} type={gridvisible?"eye":"eye-invisible"}/>栅格</label>
            <div className="form-item">
                <Slider value={grid} className="form-flex form-slider" onChange={(value)=>setValue(value,'grid')} min={1} max={50} />
                <InputNumber
                    min={1}
                    max={50}
                    value={grid}
                    className="form-number"
                    onChange={(value)=>setValue(value,'grid')}
                />
            </div>
        </div>
    )
}

export default DeskPane;
