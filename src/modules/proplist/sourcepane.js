import React, { useContext, useState, useEffect, Fragment } from 'react';
import { Input,Divider,Select,Alert,Icon } from 'antd';
import { LayoutContext } from '../../store';
import ImgUpload from '../../components/img-upload';

const Option = Select.Option;

let timer = null;

const SourcePane = () => {

    const { layout, dispatch, focusIndex } = useContext(LayoutContext);

    const { atype,data } = layout[focusIndex];

    const [values, setValues] = useState({...data,dataset:JSON.stringify(data.dataset,null,2)});

    const [inputError, setError] = useState(false);

    const setValue = (key_value) => {
        setValues({...values,...key_value.data});
        timer && clearTimeout(timer);
        timer = setTimeout(()=>{
            dispatch({
                type:'UPDATA',
                source: key_value,
                index:focusIndex
            })
        },300);
    }

    const setData = (ev) => {
    	setValues({...values,dataset:ev.target.value});
    	try {
    		var json = (new Function("return " + ev.target.value))();
    		setError(false);
		   	timer && clearTimeout(timer);
	        timer = setTimeout(()=>{
	            dispatch({
	                type:'UPDATA',
	                source: {data:{dataset:json}},
	                index:focusIndex
	            })
	        },300);
		}
		catch(err){
			setError(true);
		}
    	
    }

    useEffect(() => {
        setValues({
            ...data,dataset:JSON.stringify(data.dataset,null,2)
        })
    },[data,data.src,data.text]);

    return (
        <div className="form-content">
            <Divider className="form-title" orientation="left">数据源</Divider>
            <label className="form-lable">类型</label>
            <div className="form-item">
                <Select value={values.dataType} className="form-block" onChange={(value)=>setValue({data:{dataType:value}})}>
                	<Option value="static">静态数据</Option>
                	<Option value="csv">CSV</Option>
                	<Option value="api">API</Option>
                </Select>
            </div>
            {
            	values.dataType === 'static' &&
            	<Fragment>
            		<label className="form-lable">数据</label>
		            <div className="form-item">
		            	{
		            		atype === 'image' &&
		            		<ImgUpload url={values.src} tempUrl={values.tempSrc} onChange={(value,tempUrl,width,height)=>setValue({style:{width,height},data:{src:value,tempSrc:tempUrl||''}})}/>
		            	}
		            	{
		            		atype === 'text' &&
		            		<Input.TextArea value={values.text} autoSize onChange={(ev)=>setValue({data:{text:ev.target.value}})} />
		            	}
		            	{
		            		atype === 'chart' &&
		            		<Input.TextArea className="form-textarea" data-error={inputError} value={ values.dataset } autoSize={{maxRows: 20}} onChange={setData} />
		            	}
		            </div>
            	</Fragment>
            }
            {
            	atype === 'chart' &&
            	<Fragment>
            		<Divider className="form-title" orientation="left">数据映射</Divider>
            		<label className="form-lable">字段</label>
            		<div>
	            		{
	            			data.dataMap.map((item,i)=>(
	            				<Input className="form-map" key={i} addonBefore={<div className="form-map-name">{item.name}</div>} addonAfter={<div><Icon type="arrow-right" />{item.defautValue}</div>} defaultValue={item.value} />
	            			))
	            		}
            		</div>
            		<label className="form-lable">示例</label>
            		<div className="form-item">
            			<Alert className="form-data-demo" message={JSON.stringify(data.dataDemo,null,2)} type="success" />
            		</div>
            	</Fragment>
            }
        </div>
    )
}

export default React.memo(SourcePane);
