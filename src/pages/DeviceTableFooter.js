import React from 'react';

class DeviceTableFooter extends React.Component{

    render(){

        let content,bt;

        return (
            <div id="devicetablefooter">
                <button id="devicetablefooterbt" className="bt-blue" onClick={this.props.next}>下一步</button>
            </div>
        );

    }

}


export default DeviceTableFooter;
