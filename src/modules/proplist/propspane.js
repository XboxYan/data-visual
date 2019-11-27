import React, { useContext, useState, useEffect, Fragment } from 'react';
import { Input,InputNumber,Slider,Divider,Radio,Switch,Checkbox,Tooltip } from 'antd';
import { LayoutContext } from '../../store';
import ColorPicker from '../../components/color-picker';

const InputGroup = Input.Group;

let timer = null;

const PropsPane = () => {

    const { layout, dispatch, config, focusIndex } = useContext(LayoutContext);

    const { type,atype,style,props } = layout[focusIndex];

    const [values, setValues] = useState({...style,...props})

    const setValue = (key_value) => {
        setValues({...values,...key_value.style,...key_value.props});
        timer && clearTimeout(timer);
        timer = setTimeout(()=>{
            dispatch({
                type:'UPDATA',
                source: key_value,
                index:focusIndex
            })
        },100);
    }

    useEffect(() => {
        setValues({
            ...style,...props
        })
    },[style,props,style.left,style.top,style.width,style.height]);

    const ratio = values.height/values.width;

    return (
        <div className="form-content">
            <Divider className="form-title" orientation="left">通用</Divider>
            <label className="form-lable">尺寸</label>
            <div className="form-item">
                <InputGroup compact>
                    <InputNumber className="form-flex form-input"
                        value={values.width}
                        onChange={(value)=>setValue({style:{width:value,height:values.lockRatio?Math.round(value*ratio):values.height}})}
                        min={0}
                        step={config.grid}
                    />
                    <InputNumber className="form-flex form-input"
                        min={0}
                        value={values.height}
                        step={config.grid}
                        onChange={(value)=>setValue({style:{width:values.lockRatio?Math.round(value/ratio):values.width,height:value}})}
                    />
                </InputGroup>
            </div>
            <label className="form-lable">坐标</label>
            <div className="form-item">
                <InputGroup compact>
                    <InputNumber className="form-flex form-input"
                        value={values.left}
                        onChange={(value)=>setValue({style:{left:value}})}
                        min={0}
                        step={config.grid}
                    />
                    <InputNumber className="form-flex form-input"
                        min={0}
                        value={values.top}
                        step={config.grid}
                        onChange={(value)=>setValue({style:{top:value}})}
                    />
                </InputGroup>
            </div>
            <label className="form-lable">透明度</label>
            <div className="form-item">
                <Slider value={values.opacity} className="form-flex form-slider" onChange={(value)=>setValue({style:{opacity:value}})} min={0} step={0.1} max={1} />
                <InputNumber
                    min={0}
                    step={0.1}
                    max={1}
                    value={values.opacity}
                    className="form-number"
                    onChange={(value)=>setValue({style:{opacity:value}})}
                />
            </div>
            {
                values.lockRatio!==undefined &&
                <Fragment>
                    <label className="form-lable">宽高比</label>
                    <div className="form-item">
                        <Switch checked={values.lockRatio} onChange={(checked)=>setValue({props:{lockRatio:checked}})} />
                    </div>
                </Fragment>
            }
            {
                atype === 'text' &&
                <Fragment>
                    <Divider className="form-title" orientation="left">文本</Divider>
                    <label className="form-lable">颜色</label>
                    <div className="form-item">
                        <ColorPicker color={values.color} onChange={(value)=>setValue({style:{color:value}})}/>
                    </div>
                    <label className="form-lable">字号</label>
                    <div className="form-item">
                        <InputNumber
                            min={10}
                            max={200}
                            value={values.fontSize}
                            onChange={(value)=>setValue({style:{fontSize:value}})}
                        />
                    </div>
                    <label className="form-lable">修饰</label>
                    <div className="form-item">
                        <Checkbox checked={values.fontWeight} onChange={(ev)=>setValue({style:{fontWeight:ev.target.checked}})}>加粗</Checkbox>
                        <Checkbox checked={values.fontItalic} onChange={(ev)=>setValue({style:{fontItalic:ev.target.checked}})}>倾斜</Checkbox>
                    </div>
                    <label className="form-lable">间距</label>
                    <div className="form-item">
                        <Slider value={values.fontSpace} tipFormatter={(value)=>`${value}倍文字大小`} className="form-flex form-slider" onChange={(value)=>setValue({style:{fontSpace:value}})} min={0} step={0.1} max={1} />
                        <InputNumber
                            min={0}
                            step={0.1}
                            max={1}
                            value={values.fontSpace}
                            className="form-number"
                            onChange={(value)=>setValue({style:{fontSpace:value}})}
                        />
                    </div>
                </Fragment>
            }

            {
                values.lineHeight &&
                <Fragment>
                    <label className="form-lable">行高</label>
                    <div className="form-item">
                        <Slider value={values.lineHeight} tipFormatter={(value)=>`${value}倍文字大小`} className="form-flex form-slider" onChange={(value)=>setValue({style:{lineHeight:value}})} min={1} step={0.1} max={2} />
                        <InputNumber
                            min={1}
                            step={0.1}
                            max={2}
                            value={values.lineHeight}
                            className="form-number"
                            onChange={(value)=>setValue({style:{lineHeight:value}})}
                        />
                    </div>
                </Fragment>
            }
            
            {
                values.alignX &&
                <Fragment>
                    <label className="form-lable">对齐</label>
                    <div className="form-item">
                        <Radio.Group name="radiogroup" value={values.alignX} onChange={(ev)=>setValue({style:{alignX:ev.target.value}})}>
                            <Radio value="left">居左</Radio>
                            <Radio value="center">居中</Radio>
                            <Radio value="right">居右</Radio>
                        </Radio.Group>
                    </div>
                </Fragment>
            }

            {
                type === 'MultText' &&
                <Fragment>
                    <label className="form-lable">超出滚动</label>
                    <div className="form-item">
                        <Switch checked={values.autoScroll} onChange={(checked)=>setValue({props:{autoScroll:checked}})} />
                    </div>
                </Fragment>
            }

            {
                (type === 'MultText'?values.autoScroll:values.speed)
                &&
                <Fragment>
                    <label className="form-lable">滚动速度</label>
                    <div className="form-item">
                        <Radio.Group name="radiogroup" value={values.speed+''} onChange={(ev)=>setValue({props:{speed:ev.target.value}})}>
                            <Radio value="50">慢</Radio>
                            <Radio value="100">正常</Radio>
                            <Radio value="200">快</Radio>
                        </Radio.Group>
                    </div>
                </Fragment>
            }

            {
                atype === 'chart' &&
                <Divider className="form-title" orientation="left">图表</Divider>
            }

            {
                values.legendVisible !== undefined &&
                <Fragment>
                    <label className="form-lable">图例</label>
                    <div className="form-item">
                        <Switch checked={values.legendVisible} onChange={(checked)=>setValue({props:{legendVisible:checked}})} />
                    </div>
                </Fragment>
            }

            {
                values.legendPosition && values.legendVisible &&
                <Fragment>
                    <label className="form-lable"></label>
                    <div className="form-item">
                        <Radio.Group className="form-position" value={values.legendPosition} onChange={(ev)=>setValue({props:{legendPosition:ev.target.value}})}>
                            <span/>
                            <Radio.Button value="top-left">T-L</Radio.Button>
                            <Radio.Button value="top-center">T</Radio.Button>
                            <Radio.Button value="top-right">T-R</Radio.Button>
                            <span/>
                            <Radio.Button value="left-top">L-T</Radio.Button>
                            <span/>
                            <span/>
                            <span/>
                            <Radio.Button value="right-top">R-T</Radio.Button>
                            <Radio.Button value="left-center">L</Radio.Button>
                            <span/>
                            <span/>
                            <span/>
                            <Radio.Button value="right-center">R</Radio.Button>
                            <Radio.Button value="left-bottom">L-B</Radio.Button>
                            <span/>
                            <span/>
                            <span/>
                            <Radio.Button value="right-bottom">R-B</Radio.Button>
                            <span/>
                            <Radio.Button value="bottom-left">B-L</Radio.Button>
                            <Radio.Button value="bottom-center">B</Radio.Button>
                            <Radio.Button value="bottom-right">B-R</Radio.Button>
                            <span/>
                        </Radio.Group>
                    </div>
                </Fragment>
            }
            
            {
                values.labelVisible!==undefined &&
                <Fragment>
                    <label className="form-lable">标注</label>
                    <div className="form-item">
                        <Switch checked={values.labelVisible} onChange={(checked)=>setValue({props:{labelVisible:checked}})} />
                    </div>
                </Fragment>
            }

            {
                type==="ChartBar" &&
                <Fragment>
                    <label className="form-lable">类型</label>
                    <div className="form-item">
                        <Radio.Group name="radiogroup" value={values.type} onChange={(ev)=>setValue({props:{type:ev.target.value}})}>
                            <Radio value="intervalDodge">分组</Radio>
                            <Radio value="intervalStack">层叠</Radio>
                        </Radio.Group>
                    </div>
                    <label className="form-lable">外观</label>
                    <div className="form-item">
                        <Checkbox checked={values.transpose} onChange={(ev)=>setValue({props:{transpose:ev.target.checked}})}>条形</Checkbox>
                        <Checkbox checked={values.hollow} onChange={(ev)=>setValue({props:{hollow:ev.target.checked}})}>空心</Checkbox>
                    </div>
                </Fragment>
            }
            {
                type==="ChartLine" &&
                <Fragment>
                    <label className="form-lable">外观</label>
                    <div className="form-item">
                        <Radio.Group name="radiogroup" className="form-item-radio" value={values.lineShape} onChange={(ev)=>setValue({props:{lineShape:ev.target.value}})}>
                            <Radio value="line">折线</Radio>
                            <Radio value="smooth">平滑</Radio>
                            <Radio value="hv">阶梯</Radio>
                        </Radio.Group>
                    </div>
                    <label className="form-lable">尺寸</label>
                    <div className="form-item">
                        <Radio.Group name="radiogroup" className="form-item-radio" value={values.lineSize} onChange={(ev)=>setValue({props:{lineSize:ev.target.value}})}>
                            <Radio value={1}>细</Radio>
                            <Radio value={2}>正常</Radio>
                            <Radio value={3}>粗</Radio>
                        </Radio.Group>
                    </div>
                    <label className="form-lable">节点</label>
                    <div className="form-item">
                        <Switch checked={values.dotVisible} onChange={(checked)=>setValue({props:{dotVisible:checked}})} />
                    </div>
                    {
                        values.dotVisible&&
                        <Fragment>
                            <label className="form-lable"></label>
                            <div className="form-item">
                                <Radio.Group name="radiogroup" className="form-item-radio" value={values.dotSize} onChange={(ev)=>setValue({props:{dotSize:ev.target.value}})}>
                                    <Radio value={2}>小</Radio>
                                    <Radio value={3}>正常</Radio>
                                    <Radio value={4}>大</Radio>
                                </Radio.Group>
                            </div>
                        </Fragment>
                    }
                    <label className="form-lable">面积图</label>
                    <div className="form-item">
                        <Switch checked={values.showArea} onChange={(checked)=>setValue({props:{showArea:checked}})} />
                    </div>
                </Fragment>
            }
            {
                type==="ChartPie" &&
                <Fragment>
                    {
                        values.labelVisible &&
                        <Fragment>
                            <label className="form-lable"></label>
                            <Radio.Group name="radiogroup" className="form-item-radio" value={values.lebelPosition} onChange={(ev)=>setValue({props:{lebelPosition:ev.target.value}})}>
                                <Radio value="outside">外部</Radio>
                                <Tooltip title="仅在饼图下有效，其他外观下均为外部显示"><Radio value="innerside">内部</Radio></Tooltip>
                            </Radio.Group>
                        </Fragment>
                    }
                    <label className="form-lable">外观</label>
                    <div className="form-item">
                        <Checkbox checked={values.ring} onChange={(ev)=>setValue({props:{ring:ev.target.checked}})}>环形</Checkbox>
                        <Checkbox checked={values.rose} onChange={(ev)=>setValue({props:{rose:ev.target.checked}})}>南丁格尔玫瑰</Checkbox>
                    </div>
                </Fragment>
            }
            {
                type==="ChartRadar" &&
                <Fragment>
                    <label className="form-lable">外观</label>
                    <div className="form-item">
                        <Radio.Group name="radiogroup" className="form-item-radio" value={values.axiShape} onChange={(ev)=>setValue({props:{axiShape:ev.target.value}})}>
                            <Radio value="polygon">多边形</Radio>
                            <Radio value="circle">圆形</Radio>
                        </Radio.Group>
                    </div>
                </Fragment>
            }
            {
                type==="ChartPercent" &&
                <Fragment>
                    <label className="form-lable">进度颜色</label>
                    <div className="form-item">
                        <Radio.Group name="radiogroup" className="form-colors" value={values.percentColor} onChange={(ev)=>setValue({props:{percentColor:ev.target.value}})}>
                            {
                                config.themeColor.map((el,i)=>(
                                    <Radio.Button className="color-pane" style={{backgroundColor:el}} key={i} value={i} />
                                ))
                            }
                        </Radio.Group>
                    </div>
                    <label className="form-lable">标题</label>
                    <div className="form-item">
                        <Switch checked={values.titleVisible} onChange={(checked)=>setValue({props:{titleVisible:checked}})} />
                    </div>
                    {
                        values.titleVisible &&
                        <Fragment>
                            <label className="form-lable"></label>
                            <div className="form-item">
                                <Input value={values.title} placeholder="请输入标题" onChange={(ev)=>setValue({props:{title:ev.target.value}})} />
                            </div>
                        </Fragment>
                    }
                </Fragment>
            }
        </div>
    )
}

export default React.memo(PropsPane);
