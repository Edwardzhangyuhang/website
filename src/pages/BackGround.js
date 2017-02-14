import React from 'react';

class BackGround extends React.Component{
    render(){

        return (
            <div style={this.props.bgstyle} className="unclickable">
                <div className="cancel" onClick={this.props.cancel}/>
            </div>
        )
    }

}

export default BackGround;