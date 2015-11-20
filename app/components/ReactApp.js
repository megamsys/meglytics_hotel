var React = require('react');
var Header = require('./header');
var Footer = require('./footer');
var Deploy = require('./deploy');
var Analysis = require('./analysis');
  
var ReactApp = React.createClass({
	   
      render: function () {
      	 return (
      	 	 <div>
      	 	  <Header />
      	 	  <br />
    <div className="main">
        <div className="main-inner">
            <div className="container">
                <div className="row">
                    <div className="span12">
                        <div className="tabbable">
                            <ul className="nav nav-tabs">
                                <li className="active">
                                    <a href="#deploy" data-toggle="tab">Deploy</a>
                                </li>
                                <li>
                                    <a href="#analysis" data-toggle="tab">Analysis</a>
                                </li>
                            </ul>
                            <br/>

                            <div className="tab-content">
                                <div className="tab-pane active" id="deploy">
                                    <form id="edit-profile" className="form-horizontal">
                                        <Deploy />
                                    </form>
                                </div>

                                <div className="tab-pane" id="analysis">
                                    <form id="edit-profile2" className="form-vertical">
                                        <Analysis />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Footer />
</div>
       )
      }
  });

/* Module.exports instead of normal dom mounting */
module.exports = ReactApp;
