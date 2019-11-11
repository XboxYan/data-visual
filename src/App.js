import React from 'react';
import Header from './modules/header/index';
import ComList from './modules/comlist/index';
import Main from './modules/main/index';
import PropList from './modules/proplist/index';
import Footer from './modules/footer/index';
import Store from './store/index';
import './App.css';

const App = () => (
	<Store>
	  <div className="layout">
	      <div className="header"><Header/></div>
	      <div className="aside"><ComList/></div>
	      <div className="main"><Main/></div>
	      <div className="aside"><PropList/></div>
	      <div className="footer"><Footer/></div>
	  </div>
	</Store>
)

export default App;
