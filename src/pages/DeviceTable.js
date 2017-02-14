import React from 'react';
import DeviceTableFooter from './DeviceTableFooter';

let style = {
    height : 50
};

class DeviceTable extends React.Component {

    constructor(props){
        super(props);
    }

    showTables(deviceslist,addgroup){

        if(deviceslist === null)
            return;

        return deviceslist.map( (row, index) => {

            if(row.gid !== 0)
                return;

            const name = row.name ? row.name : '路灯'+(index+1);
            const mac = row.mac ? row.mac : '/';

            let num,checked;

            if (addgroup.devices.indexOf(row.mac) != -1)
            {
                num = addgroup.devices.indexOf(row.mac) + 1;
                checked = true;
            }
            else
            {
                checked = false;
            }

            let online;

            if (row.status.online === 1)
                online = '在线';
            else if(row.status.online === 0)
                online = '离线';
            else
                online = '/';
            
            return (
            <tr key={ index }>
            <td><input type="checkbox" name={ mac } className="checkbox" id={ index } checked={checked} onChange={ this.props.handleChange}/></td>
            <td>{num}</td>
            <td>{name}</td>
            <td>{mac}</td>
            <td>{online}</td>
            </tr>);
       });
    }

    render(){
        let content;

        let style;

        if(this.props.dialog === "default")  
        { 
            style = {
                "zIndex" : -1,
                "opacity" : 0.0
            }
        }
        else
        {
            style = {
                "zIndex" : 99,
                "opacity" : 1.0
            }
        }

        content = this.showTables(this.props.deviceslist, this.props.addgroup);

        return (
            <div style={style} className="devicedialog" >
                <h3 id="device">设备列表</h3>
                <table id="device">
                    <tbody>
                    <tr>
                        <th></th>
                        <th>编号</th>
                        <th>设备名称</th>
                        <th>MAC地址</th>
                        <th>状态</th>
                    </tr>
                    { content }
                    </tbody>
                </table>
                <DeviceTableFooter next={this.props.next}/>
            </div>
        );
    }

}

export default DeviceTable;
