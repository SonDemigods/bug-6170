import React, { Component, PureComponent } from 'react';
import { NavBar, Icon, Button } from 'antd-mobile';
import { Tag } from 'antd-mobile-v5';

import I18N from 'lang';

import './index.less';
class Home extends (PureComponent || Component) {
	constructor (props) {
		super(props);
		this.state = {};
	}

	render () {
  	return (
  		<div className="eh-home">
  			<NavBar
  				leftContent="back"
  				mode="light"
  				rightContent={[
  					<Icon key="0" type="search" style={{ marginRight: '0.32rem' }} />,
  					<Icon key="1" type="ellipsis" />,
  				]}
  			>
  				{I18N.common.test}
  			</NavBar>
				<Button>V2</Button>
  			<Tag>V5</Tag>
  		</div>
  	);
	}
}

export default Home;
