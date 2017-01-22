import React from 'react'

class Header extends React.Component { 

    render() {
        return (
            <div id="header">
                <div className='header-left'/>
                <div className='header-right'></div>
                <span className='title'>WEB后台系统</span>
            </div>
        );
    }
}

export default Header;
