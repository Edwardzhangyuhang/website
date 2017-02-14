import React from 'react';

import Switch from 'react-toggle-switch';

class TableFooter extends React.Component{

    render(){

        let content,bt1,bt2,bt3;

        if(this.props.status === false)
        {
            bt1 = <td><input type="file" onChange={ this.props.reNames } /></td>;
            bt2 = <td><button className="bt-red" onClick={this.props.delDevices}>删除</button></td>;
            bt3 = <td><button className="bt-black" onClick={this.props.reName}>重命名</button></td>;
        }
        else if(this.props.status === true)
        {
            bt1 = <td></td>;
            bt2 = <td><button className="bt-blue" onClick={this.props.turnOn}>控制</button></td>;
            bt3 = <td><button className="bt-blue" onClick={this.props.turnOff}>OFF</button></td>;

        }

        console.log("table footer component render");
        return (
            <tr>
                <td><input type="checkbox" className="checkbox" onChange={this.props.handleChangeSelectAll}/></td>
                <td>全选</td>
                { bt1 }
                <td><p>调试模式</p>
                <label className="switch">
                    <input className="switch-input" checked={this.props.status} type="checkbox" onChange={this.props.handleChangeDebug}/>
                    <span className="switch-label" data-on="On" data-off="Off"></span>
                    <span className="switch-handle"></span>
                </label>
                </td>
                { bt2 }
                { bt3 }
            </tr>
        );

    }

}


export default TableFooter;
