var React = require('react');
  
var Footer = React.createClass({	
      render: function () {
        return (        	
        <div className="footer">
            <div className="footer-inner">
                <div className="container">
                    <div className="row">
                        <div className="span12">
                            &copy; 2013-2015 megam. All rights reserved.
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
      }
  });

/* Module.exports instead of normal dom mounting */
module.exports = Footer;



