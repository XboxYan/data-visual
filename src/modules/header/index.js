import React from 'react';
import { Button, Icon } from 'antd';
import './index.css';

const Header = () => {

	return (
		<React.Fragment>
			<h1 className="logo" ><span className="logo-sp">Data</span> Visual</h1>
			<Icon type="setting" />
		</React.Fragment>

	)

}

export default React.memo(Header);