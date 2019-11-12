import React, { useState } from 'react';
import { Icon,Tooltip } from 'antd';
import './index.css';

const comList = [{
  name: '图表',
  icon: 'bar-chart',
  child: [{
    name: '柱状图',
    icon: 'bar-chart',
  }, {
    name: '折线图',
    icon: 'line-chart',
  }, {
    name: '饼图',
    icon: 'pie-chart',
  }, {
    name: '散点图',
    icon: 'dot-chart',
  }]
}, {
  name: '图片',
  icon: 'picture',
  child: [{
    name: '单张图片',
    icon: 'picture',
  }, {
    name: '轮播图',
    icon: '',
  }]
}, {
  name: '文本',
  icon: 'font-size',
  child: [{
      name: '标题',
      icon: 'font-size',
      type: 'Text'
    },
    {
      name: '跑马灯',
      icon: '',
      type: 'Marquee'
    },
    {
      name: '时间',
      icon: ''
    },
  ]
}]

const ComList = () => {
    const [index,setIndex] = useState(2);

    const dragstart = (ev,type) => {
        ev.dataTransfer.setData('type',type);
        ev.dataTransfer.setData('offsetX',ev.nativeEvent.offsetX);
        ev.dataTransfer.setData('offsetY',ev.nativeEvent.offsetY);
    }

    return <div className="com-side">
        <h3 className="com-title">组件列表</h3>
        <div className="com-group">
      		{
      			comList.map((el,i)=>(
      				<Tooltip key={i} title={el.name} placement="right">
      					<button data-select={i===index} className="com-group-button" onClick={()=>setIndex(i)}>
      					<Icon type={el.icon} /></button>
      				</Tooltip>
      			))
      		}
        </div>
        <div className="com-list">
        	{
        		comList[index].child.map((el,i)=>(
	        		<Tooltip key={i}>
	        			<div className="com-item" draggable={true} onDragStart={(ev)=>dragstart(ev,el.type)}>
	        				<Icon type={el.icon} />
	        				<h5 className="com-item-name">{el.name}</h5>
	        			</div>
	        		</Tooltip>
        		))
        	}
        </div>
    </div>
}

export default ComList;