import React, {useContext} from 'react';
import { Tabs } from 'antd';
import './index.css';
import DeskPane from './deskpane';
import PropsPane from './propspane';
import { LayoutContext } from '../../store';
const { TabPane } = Tabs;

const PropList = () => {
	const { layout, focusIndex } = useContext(LayoutContext);
	if(focusIndex.length===1){
		const isDesk = focusIndex[0]===-1 || !layout[focusIndex];
		return (
			<Tabs defaultActiveKey="1">
			    <TabPane tab={isDesk?"页面设置":"属性"} key="1">
			    	{
			    		isDesk?<DeskPane/>:<PropsPane/>
			    	}
			    </TabPane>
			    {
			    	!isDesk && <TabPane tab="数据" key="2">22326</TabPane>
			    }
			</Tabs>
	    )
	}
	return (
		<Tabs defaultActiveKey="1">
		    <TabPane tab="属性" key="1">
		    	多选模式
		    </TabPane>
		</Tabs>
	)
}

export default React.memo(PropList);
