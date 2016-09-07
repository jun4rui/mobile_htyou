var React     = require('react');
var ReactDOM  = require('react-dom');
var AMUIReact = require('amazeui-react');
var Header    = AMUIReact.Header;
var Image     = AMUIReact.Image;
var AvgGrid   = AMUIReact.AvgGrid;
var Icon      = AMUIReact.Icon;

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
					<AvgGrid sm={2} className="am-thumbnails">
						<li>
							<a href="#">
								<Icon fw icon="gift"/>可兑换积分:
							</a>
						</li>
						<li>
							<a href="#">
								<Icon fw icon="list-alt"/>用户账单
							</a>
						</li>
					</AvgGrid>
				</div>
			</div>

		);
	}
});

ReactDOM.render(<UserCenter/>, document.getElementById('top-section'));