import React from 'react';

import Switch from 'react-toggle-switch';

import TableFooter from './TableFooter';

import mqtt from 'mqtt';
        
const session='CFB5755A-DDAD-4D15-8CD5-F235B172BEFG';
//const gateway='31617708-69FD-4547-857D-B6D3580BF3BD';
const gateway = 'DCAD4E32-E6F7-4C40-8F1F-D1A9B400AB07';

let client;

class TableComplex extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        debugmode : false,
        selectall : false,
        devicelist : [],
        ctrlcmd: {}

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeDebug = this.handleChangeDebug.bind(this);
        this.handleChangeSelectAll = this.handleChangeSelectAll.bind(this);
        this.turnOn = this.turnOn.bind(this);
        this.turnOff = this.turnOff.bind(this);
        this.delDevices = this.delDevices.bind(this);
        this.reName = this.reName.bind(this);
        this.reNames = this.reNames.bind(this);
    }

    control(devices , cmd){

        let timestamp = (new Date()).toLocaleString();

        let value;

        let controlcmd = {
            "body":{
                "devices":devices,
                "cmd":{"onoff":cmd},
                "tmpctrl":0
            },
            "head":{
                "method":"B004",
                "ts":timestamp,
                "ukey":"langjun",
                "proto_version":"V1.0",
                "session":session
            }
        };
        console.log(JSON.stringify(controlcmd));
        return controlcmd;
    }
    
    requestDevice(){

        let timestamp = (new Date()).toLocaleString();

        let msg = {
            "head":{
                "method":"B005",
                "ts":timestamp,
                "ukey":"langjun",
                "session":session,
                "proto_version":"V1.0",
            }

        };
        
        return msg;
    }

    turnOn(){

        let devices = new Array();

        this.state.devicelist.map( (row, index) => {

            if (row.checked === true){

                let device = row.mac;

                devices.push(device);
            }
        });

        if (devices.length === 0)
        {
            alert("请选择设备");
            return ;
        }

        let cmd = 1;

        //client.publish(gateway,JSON.stringify(this.control(devices,cmd)));
        this.setState({ ctrlcmd : this.control(devices,cmd)})
        this.props.showDialogSetValue();

    }

    turnOff(){

        let devices = new Array();

        this.state.devicelist.map( (row, index) => {

            if (row.checked === true){

                let device = row.mac;

                devices.push(device);

            }
        });

        if (devices.length === 0)
        {
            alert("请选择设备");
            return ;
        }

        let cmd = 0;

        client.publish(gateway,JSON.stringify(this.control(devices,cmd)));
    }

    handlemsg(msg){
        if(msg.head.method === "B005")
        {
            this.setState({ devicelist : msg.body.devices});
            this.setState({ selectall : false });
        }

        return true;
    }

    delDevices(){

        let timestamp = (new Date()).toLocaleString();

        let devices = new Array();

        this.state.devicelist.map( (row, index) => {

            if (row.checked === true){

                let device = row.mac;

                devices.push(device);
            }
        });

        if (devices.length === 0)
        {
            //console.log(devices.length);
            alert("请选择设备");
            return ;
        }

        let msg = {
            "body":{
                "devices":devices,
            },
            "head":{
                "method":"B006",
                "ts":timestamp,
                "ukey":"langjun",
                "proto_version":"V1.0",
                "session":session
            }
        };

        console.log(JSON.stringify(msg));
        client.publish(gateway,JSON.stringify(msg));
        return true;
    }

    nameMsg(devices){

        let timestamp = (new Date()).toLocaleString();

        let msg = {
            "body":{
                "devices":devices,
            },
            "head":{
                "method":"B003",
                "ts":timestamp,
                "ukey":"langjun",
                "proto_version":"V1.0",
                "session":session
            }
        };

        return msg;

    }

    reName(){
        let newName = prompt("请输入名称","请输入名称");

        if(newName === null || newName === "")
        {
            return true;
        }

        let devices = new Array();

        this.state.devicelist.map( (row, index) => {

            if (row.checked === true){

                let device = {
                    "name":newName,
                    "mac":row.mac
                };
                devices.push(device);
            }
        });

        if (devices.length === 0)
        {
            //console.log(devices.length);
            alert("请选择设备");
            return ;
        }

        let msg = this.nameMsg(devices);

        console.log(JSON.stringify(msg));
        client.publish(gateway,JSON.stringify(msg));
        return true;
    }

    reNames(e){

        let result = new FileReader();
        //console.log("select file:", e.target.files[0]);

        let text = result.readAsText(e.target.files[0], "utf-8");

        let names;

        result.onload = function(e){

            //console.log(e.target.result);

            names = e.target.result;

            //console.log("type of names:",typeof(names));

            if (!JSON.parse(names))
            {
                alert("File content error!");
                return false;
            }

            let msg = this.nameMsg(JSON.parse(names));

            console.log(JSON.stringify(msg));
            
            if( !confirm("确定上传命名文件？"))
            {
                console.log("No");
            }
            else
            {
                client.publish(gateway,JSON.stringify(msg));
                console.log("Yes");
            }
            e.target.value = "";
            
        }.bind(this);



        return true;

    }

    openZigbeeNetwork(){

        let timestamp = (new Date()).toLocaleString();

        let msg = {
            "head":{
                "method":"3005",
                "ts":timestamp,
                "ukey":"langjun",
                "proto_version":"V1.0",
                "session":session
            }
        };

        client.publish(gateway,JSON.stringify(msg));
        return true;
    }

    componentWillMount(){

        client=mqtt.connect('ws://192.168.1.66:9001');
        client.on('connect',function() {
                console.log("table connect success");
                client.subscribe(session);
                this.openZigbeeNetwork();
                client.publish(gateway,JSON.stringify(this.requestDevice()));
            }.bind(this)
        );

        client.on('error',function(error) {
            console.log(error.toString());
            alert("connect error!");
            client.end();
            }
        );

        client.on('message',function(topic, payload) {
            //alert(payload.toString());
            console.log("tables" + payload);
            if(!JSON.parse(payload))
                alert("recieve error msg!");
            else
                this.handlemsg(JSON.parse(payload));
            //client.end();
            }.bind(this)
        );
    }

    handleChange(e){
        let checked = this.state.devicelist;
        
        console.log("the checked:"+e.target.id);

        checked[e.target.id].checked=e.target.checked;

        this.setState({devicelist : checked});

    }

    handleChangeSelectAll(e){
        let checked = this.state.devicelist;
        let debug = this.state.debugmode;

        this.setState({selectall : e.target.checked})

        console.log("select all item");

        this.state.devicelist.map( (row, index) => {
            if((debug === true && row.status.debug === 1))
                checked[index].checked = e.target.checked;
            else
                checked[index].checked = e.target.checked;
        })

        this.setState({ devicelist : checked });
    }

    enabledebug(devices,cmd){

         let timestamp = (new Date()).toLocaleString();
         
         let method;
         if(cmd === 1)
         {
             method = 'B001';
         }
         else
         {
             method = 'B002';
         }

         let debugmsg = {
            "body":{
                "devices":devices,
                "qdebug":cmd
            },
            "head":{
                "method":method,
                "ts":timestamp,
                "ukey":"langjun",
                "proto_version":"V1.0",
                "session":session
            }
        };
        
        console.log(JSON.stringify(debugmsg));

        return debugmsg;

    }
    handleChangeDebug(e){

        if(e.target.checked === true)
        { 
            let devices = new Array();

            this.state.devicelist.map( (row, index) => {

                if (row.checked === true){

                    let device = row.mac;

                    devices.push(device);

                }
            });
            
            //let device=["0022a30000014175"];

            client.publish(gateway,JSON.stringify(this.enabledebug(devices,0)));
        }
        else
        {
            if(!confirm("退出调试模式?"))
                return true;

            let devices = new Array();

            this.state.devicelist.map( (row, index) => {

                if (row.checked === true){

                    let device = row.mac;

                    devices.push(device);

                }
            });

            //let device=["0022a30000014175"];
            client.publish(gateway,JSON.stringify(this.enabledebug(devices,1)));
        }


        this.setState({ debugmode : e.target.checked });

        //client.publish(gateway,JSON.stringify(this.requestDevice()));
    }

    showtables() {

        if(this.state.devicelist === null)
            return;

        return this.state.devicelist.map( (row, index) => {

               const name = row.name ? row.name : '路灯'+(index+1);
               const mac = row.mac ? row.mac : '/';
               //const online = row.status.online ? row.online : '/';
               //const status = row.status.status ? (row.status.status ? ON : OFF) : '/';
               let status;
               let online;
               if(this.state.debugmode === true )
               {
                   if (row.status.debug === 1)
                       status = row.status.intensity ? row.status.intensity : 0;
                   else
                       return;
                   
               }
               else
               {
                   if (row.status.status === 1)
                       status = '开';
                   else if(row.status.status === 0)
                       status = '关';
                   else
                       status = '/';
               }

               

               if (row.status.online === 1)
                   online = '在线';
               else if(row.status.online === 0)
                   online = '离线';
               else
                   online = '/';

               return (
               <tr key={ index }>
               <td><input type="checkbox" className="checkbox" id={ index } checked={row.checked} onChange={this.handleChange.bind(this)}/></td>
               <td>{index+1}</td>
               <td>{name}</td>
               <td>{mac}</td>
               <td>{online}</td>
               <td>{status}</td>
               </tr>);
       });
    }

    render(){

        let content;

        content = this.showtables();

        let style = {
            switch : {
                marginTop: 20,
                float: "right",
                zIndex: 97
            }
        };
        return (
            <div id="tablelist">
                <label className="switch" style={style.switch}>
                    <p className="switch-title">模式切换</p>
                    <input className="switch-input" checked={this.state.debugmode} type="checkbox" onChange={this.handleChangeDebug}/>
                    <span  className="switch-label" data-on="手动" data-off="自动"></span>
                    <span  className="switch-handle"></span>
                </label>
                <h3>设备列表</h3>
                <table>
                    <tbody>
                    <tr>
                        <th></th>
                        <th>编号</th>
                        <th>设备名称</th>
                        <th>MAC地址</th>
                        <th>设备状态</th>
                        <th>功能状态(照度值)</th>
                    </tr>
                    { content }
                    <TableFooter name="debugmode" status={this.state.debugmode} handleChangeSelectAll={this.handleChangeSelectAll} handleChangeDebug={this.handleChangeDebug} 
                    turnOn={this.turnOn} turnOff={this.turnOff} delDevices={this.delDevices} reName={this.reName} reNames={this.reNames} selectall={this.state.selectall}/>
                    </tbody>
                </table>
            </div>
        );
    }

}


export default TableComplex;


