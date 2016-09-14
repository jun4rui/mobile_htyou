var React     = require('react');
var ReactDOM  = require('react-dom');
var AMUIReact = require('amazeui-react');
var Header    = AMUIReact.Header;
var Image     = AMUIReact.Image;
var AvgGrid   = AMUIReact.AvgGrid;
var Icon      = AMUIReact.Icon;
var Button    = AMUIReact.Button;
var List      = AMUIReact.List;
var ListItem  = AMUIReact.ListItem;

var UserCenter = React.createClass({
	render: function () {
		// Header数据区
		let headerProps = {
			title: '尊敬的会员',
			link:  '#title-link',
			data:  {
				left: [
					{
						link:     '#left-link',
						icon:     'home',
						onSelect: function () {
							doBack();
						}
					}
				]
			}
		};
		return (
			<div>
				<Header {...headerProps}></Header>
				{/*用户信息面板*/}
				<div id="userinfo-panel">
					<Image src="http://s.amazeui.org/media/i/demos/bw-2014-06-19.jpg" responsive/>
					<Image src="http://s.amazeui.org/media/i/demos/bw-2014-06-19.jpg" width='140' height='140' thumbnail circle className="face"/>
					<span className="username">用户名称</span>
					<AvgGrid sm={2} className="am-thumbnails">
						<li>
							<Button amStyle="warning" block>
								<Icon icon="shopping-cart"/>可兑换积分:{'积分'}
							</Button>
						</li>
						<li>
							<Button amStyle="warning" block>
								用户账单
							</Button>
						</li>
					</AvgGrid>
				</div>
				{/*功能列表*/}
				<div>
					<List static>
						<ListItem truncate>
							功能1
						</ListItem>
						<ListItem truncate>
							功能2
						</ListItem>
					</List>
					<List>
						<ListItem truncate href="http://www.amazeui.org">
							功能3
						</ListItem>
						<ListItem truncate href="http://www.amazeui.org">
							功能4
						</ListItem>
					</List>
				</div>
			</div>

		);
	}
});

ReactDOM.render(<UserCenter/>, document.getElementById('top-section'));