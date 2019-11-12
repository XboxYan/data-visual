import React, { useContext, Fragment } from 'react';
import { Input,InputNumber,Slider,Icon,Divider,Radio } from 'antd';
import { LayoutContext } from '../../store';
import ColorPicker from '../../components/color-picker';
import ImgUpload from '../../components/img-upload';

const InputGroup = Input.Group;

const DeskPane = () => {
    const { layout, dispatch, config, focusIndex } = useContext(LayoutContext);

    const { type,atype,style,props } = layout[focusIndex];

    const { 
        width, 
        height, 
        left, 
        top, 
        opacity, 
        color,
        fontSize,
        alignX,
    } = style;

    const { 
        speed
    } = props;

    const setValue = (key_value,path="style") => {
        dispatch({
            type:'UPDATA',
            source: key_value,
            path:path,
            index:focusIndex
        })
    }

    return (
        <div className="form-content">
            <Divider className="form-title" orientation="left">通用</Divider>
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
            {
                atype === 'text' &&
                <Fragment>
                    <Divider className="form-title" orientation="left">文本</Divider>
                    <label className="form-lable">文字颜色</label>
                    <div className="form-item">
                        <ColorPicker color={color} onChange={(value)=>setValue({color:value})}/>
                    </div>
                    <label className="form-lable">文字大小</label>
                    <div className="form-item">
                        <Slider value={fontSize} className="form-flex form-slider" onChange={(value)=>setValue({fontSize:value})} min={10} step={1} max={200} />
                        <InputNumber
                            min={10}
                            step={10}
                            max={200}
                            value={fontSize}
                            className="form-number"
                            onChange={(value)=>setValue({fontSize:value})}
                        />
                    </div>
                </Fragment>
            }
            
            {
                alignX &&
                <Fragment>
                    <label className="form-lable">对齐方式</label>
                    <div className="form-item">
                        <Radio.Group name="radiogroup" value={alignX} onChange={(ev)=>setValue({alignX:ev.target.value})}>
                            <Radio value="left">居左</Radio>
                            <Radio value="center">居中</Radio>
                            <Radio value="right">居右</Radio>
                        </Radio.Group>
                    </div>
                </Fragment>
            }

            {
                speed &&
                <Fragment>
                    <label className="form-lable">滚动速度</label>
                    <div className="form-item">
                        <Radio.Group name="radiogroup" value={speed+''} onChange={(ev)=>setValue({speed:ev.target.value},'props')}>
                            <Radio value="50">慢</Radio>
                            <Radio value="100">正常</Radio>
                            <Radio value="200">快</Radio>
                        </Radio.Group>
                    </div>
                </Fragment>
            }
        </div>
    )
}

export default DeskPane;
