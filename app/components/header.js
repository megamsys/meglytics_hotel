var React = require('react');
  
var Header = React.createClass({   
      render: function () {
        return (
         <div className="navbar navbar-fixed-top">
            <div className="navbar-inner">
                <div className="container">
                    <a className="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse"><span
                    className="icon-bar"></span><span className="icon-bar"></span><span className="icon-bar"></span> </a><a className="brand" href="index.html">Hotel Management Panel </a>
                </div>
            </div>
        </div>        
        )
      }
  });

/* Module.exports instead of normal dom mounting */
module.exports = Header;



