import React, { Component, PureComponent } from 'react';
import { render } from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Loadable as ReactLoadable } from 'ehome-rcm';

import './index.less';
//引入图标库
import './iconfont/iconfont.css';

const Home = ReactLoadable(() => import('./routes/home'));

class Root extends (PureComponent || Component) {
	render () {
		return (
			<Router>
				<div>
					<Route exact path="/" component={Home} />
					<Route exact path="/home" component={Home} />
				</div>
			</Router>
		);
	}
}

render(<Root />, document.getElementById('root'));
