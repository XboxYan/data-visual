import React, { useContext } from 'react';
import { Input,InputNumber,Slider,Icon } from 'antd';
import { LayoutContext } from '../../store';
import ColorPicker from '../../components/color-picker';
import ImgUpload from '../../components/img-upload';

const InputGroup = Input.Group;

const DeskPane = () => {
    const { layout, dispatch, config, focusIndex } = useContext(LayoutContext);

    const { type,style } = layout[focusIndex];

    const { width, height, left, top, opacity } = style;

    const setValue = (key_value,path="style") => {
        dispatch({
            type:'UPDATA',
            layout: key_value,
            path:path,
            index:focusIndex
        })
    }

    return (
        <div className="form-content">
            <label className="form-lable">元素尺寸</label>
            <div className="form-item">
                <InputGroup compact>
                    <InputNumber className="form-flex form-input"
                        value={width}
                        onChange={(value)=>setValue({width:value})}
                        min={0}
                        step={config.grid}
                    />
                    <InputNumber className="form-flex form-input"
                        min={0}
                        value={height}
                        step={config.grid}
                        onChange={(value)=>setValue({height:value})}
                    />
                </InputGroup>
            </div>
            <label className="form-lable">元素位置</label>
            <div className="form-item">
                <InputGroup compact>
                    <InputNumber className="form-flex form-input"
                        value={left}
                        onChange={(value)=>setValue({left:value})}
                        min={0}
                        step={config.grid}
                    />
                    <InputNumber className="form-flex form-input"
                        min={0}
                        value={top}
                        step={config.grid}
                        onChange={(value)=>setValue({top:value})}
                    />
                </InputGroup>
            </div>
            <label className="form-lable">透明度</label>
             <div className="form-item">
                <Slider value={opacity} className="form-flex form-slider" onChange={(value)=>setValue({opacity:value})} min={0} step={0.1} max={1} />
                <InputNumber
                    min={0}
                    step={0.1}
                    max={1}
                    value={opacity}
                    className="form-number"
                    onChange={(value)=>setValue({opacity:value})}
                />
            </div>
        </div>
    )
}

export default DeskPane;
