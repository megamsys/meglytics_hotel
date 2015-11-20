var React = require('react');


module.exports = Analysis = React.createClass({	
	
      render: function () {
        return (
        	<div>
        	   <div className="row">
                        <div className="span6">
                            <div className="widget">
                                <div className="widget-header">
                                    <i className="icon-bar-chart"></i>
                                    <h3> Bar Chart</h3>
                                </div>
                                <div className="widget-content">
                                    <canvas id="bar-chart" className="chart-holder" width="538" height="250"></canvas>
                                </div>
                            </div>
                            <div className="widget">
                                <div className="widget-header">
                                    <i className="icon-bar-chart"></i>
                                    <h3> Line Chart</h3>
                                </div>
                                <div className="widget-content">
                                    <canvas id="area-chart" className="chart-holder" width="538" height="250"></canvas>
                                </div>
                            </div>
                            <div className="widget">
                                <div className="widget-header">
                                    <i className="icon-bar-chart"></i>
                                    <h3> Pie Chart</h3>
                                </div>
                                <div className="widget-content">
                                    <canvas id="pie-chart" className="chart-holder" width="538" height="250"></canvas>
                                </div>
                            </div>
                        </div>
                        <div className="span6">
                            <div className="widget">
                                <div className="widget-header">
                                    <i className="icon-bar-chart"></i>
                                    <h3> Donut Chart</h3>
                                </div>
                                <div className="widget-content">
                                    <canvas id="donut-chart" className="chart-holder" width="538" height="250"></canvas>
                                </div>
                            </div>
                            <div className="widget">
                                <div className="widget-header">
                                    <i className="icon-bar-chart"></i>
                                    <h3> A Chart</h3>
                                </div>
                                <div className="widget-content">
                                    <canvas id="line-chart" className="chart-holder" width="538" height="250"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
           </div>
         )
      }
  });