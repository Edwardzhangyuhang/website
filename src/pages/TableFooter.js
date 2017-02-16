import React from 'react';

import Switch from 'react-toggle-switch';

let style = {
    borderWidth : 0
};

class TableFooter extends React.Component{

    render(){

        let content,bt1,bt2,bt3;

        if(this.props.status === false)
        {
            bt1 = <td style={style}><input type="file" onChange={ this.props.reNames } /></td>;
            bt2 = <td style={style}><button className="bt-red" onClick={this.props.delDevices}>删除</button></td>;
            bt3 = <td style={style}><button className="bt-black" onClick={this.props.reName}>重命名</button></td>;
        }
        else if(this.props.status === true)
        {
            bt1 = <td style={style}></td>;
            bt2 = <td style={style}><button className="bt-blue" onClick={this.props.turnOn}>控制</button></td>;
            bt3 = <td style={style}><button className="bt-blue" onClick={this.props.turnOff}>关</button></td>;

        }

        console.log("table footer component render");
        return (
            <tr>
                <td style={style}><input type="checkbox" className="checkbox" checked={this.props.selectall} onChange={this.props.handleChangeSelectAll}/></td>
                <td style={style}>全选</td>
                { bt1 }
                <td style={style}>
                </td>
                { bt2 }
                { bt3 }
            </tr>
        );

    }

}


export default TableFooter;
