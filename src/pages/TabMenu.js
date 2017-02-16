import React from 'react';
import mqtt from 'mqtt';

import TableComplex from './Table';
import GroupCtrlTable from './GroupCtrlTable';
import DeviceTable from './DeviceTable';
import DialogGroupCtrlSetValue from './DialogGroupCtrlSetValue';
import DialogControl from './DialogControl';
import BackGround from './BackGround';

const session='CFB5755A-DDAD-4D15-8CD5-F235B172BEFG';
const gateway = 'DCAD4E32-E6F7-4C40-8F1F-D1A9B400AB07';

let client;

class TabMenu extends React.Component{

    constructor(props){
        super(props);
        
        this.state = {
            active:'monitor',
            menu_item:[
                {
                    'id':'monitor',
                    'name':'监控'
                },
                {
                    'id':'groupctrl',
                    'name':'组控'
                }
            ],
            group_list:[],

            device_list:[],

            add_group:{
                'devices':[],
                'groups':'',
                'value':0,
                'delay':0
            },

            tmpctrl : 0,

            dialog:'default'
        }
        
        this.handleActive = this.handleActive.bind(this);
        this.deleteGroup = this.deleteGroup.bind(this);
        this.reNameGroup = this.reNameGroup.bind(this);
        this.ctrlGroup = this.ctrlGroup.bind(this);
        this.addGroup = this.addGroup.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.finish = this.finish.bind(this);
        this.cancel = this.cancel.bind(this);
        this.completeCtrl = this.completeCtrl.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.ctrlInputChange = this.ctrlInputChange.bind(this);
        this.showDialogSetValue = this.showDialogSetValue.bind(this);
    }
    
    requestGroups(){

        let timestamp = (new Date()).toLocaleString();

        let msg = {
            "head":{
                "method":"B012",
                "ts":timestamp,
                "ukey":"langjun",
                "session":session,
                "proto_version":"V1.0",
            }

        };
        
        return msg;
    }

    requestAddGroup(){

        let timestamp = (new Date()).toLocaleString();

        let msg = {
            "body": this.state.add_group,
            "head":{
                "method":"B010",
                "ts":timestamp,
                "ukey":"langjun",
                "session":session,
                "proto_version":"V1.0",
            }

        };
        
        return msg;
    }

    componentWillMount(){
        client=mqtt.connect('ws://192.168.1.66:9001');
        client.on('connect',function() {
                console.log("menu connect success");
                client.subscribe(session);
                client.publish(gateway,JSON.stringify(this.requestGroups()));
            }.bind(this)
        );

        client.on('error',function(error) {
            console.log(error.toString());
            alert("连接服务器失败");
            client.end();
            }
        );

        client.on('message',function(topic, payload) {
            //alert(payload.toString());
            console.log("tables" + payload);
            if(!JSON.parse(payload))
                console.log("recieve error msg!");
            else
                this.handlemsg(JSON.parse(payload));
            //client.end();
            }.bind(this)
        );
    }

    handlemsg(msg){
        if(msg.head.method === "B012")
            this.setState({ group_list : msg.body.groups});
        else if(msg.head.method === "B005")
            this.setState({ device_list : msg.body.devices});

        return true;
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

    handleActive(e){
        console.log("click"+e.target.id);
        this.setState({active : e.target.id})
    }
    
    showMenu(){
        
        return this.state.menu_item.map((row, index) => {
            
            let active;
            
            if(this.state.active === row.id)
                active = 'active_view';
            else
                active ='unactive_view';
                
            return (
                <li key={row.id} id={row.id} onClick={this.handleActive.bind(this)}>
                    <a id={row.id} className="item">{row.name}</a>
                    <div className={active} />
                </li>
            );
        });
    }
    
    handleChange(event){

        let addgroup = this.state.add_group;

        if(event.target.checked === true )
            addgroup.devices.push(event.target.name);
        else
            addgroup.devices.splice(addgroup.devices.indexOf(event.target.name),1);

        console.log(JSON.stringify(addgroup));

        this.setState({add_group : addgroup});

    }

    addGroup(event){

        client.publish(gateway,JSON.stringify(this.requestDevice()));

        let group_list = this.state.group_list;

        if(group_list === null)
        {
            group_list = [];
        }

        let name = prompt("创建新灯控组","灯组"+(group_list.length+1));

        if(name === null || name === "")
        {
            return true;
        }

        let addgroup = this.state.add_group;

        addgroup.groups = name;
        addgroup.devices = [];
        addgroup.value = 0;
        addgroup.delay = 0;
        this.setState({add_group : addgroup});

        this.setState({dialog : 'select_devices'});

    }


    reNameGroup(event){

        let timestamp = (new Date()).toLocaleString();

        let newName = prompt("重命名","请输入名称");

        let group = this.state.group_list[event.target.id].name;
        
        if(newName === null || newName === "")
        {
            return true;
        }

        let msg = {
            "body":{
                "group":group,
                "newName":newName
            },
            "head":{
                "method":"B014",
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

    deleteGroup(event){

        console.log("click delete button");

        let timestamp = (new Date()).toLocaleString();

        let group = this.state.group_list[event.target.id].name;

        let msg = {
            "body":{
                "group":group,
            },
            "head":{
                "method":"B011",
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

    ctrlGroup(event){
        let timestamp = (new Date()).toLocaleString();
        console.log("target id:"+event.target.id)
        let group = this.state.group_list[event.target.id].name;
        console.log("target value"+event.target.value)
        let cmd ;

        if(event.target.value == 1)
            cmd = 0;
        else
            cmd = 1;

        let msg = {
            "body":{
                "group":group,
                "cmd":cmd
            },
            "head":{
                "method":"B013",
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

    dialogBackGround(){

        let style;
        
        if(this.state.dialog === "default")  
        { 
            style = {
                "zIndex" : -1,
                "opacity" : 0.0
            }
        }
        else
        {
            style = {
                "zIndex" : 98,
                "opacity" : 0.5
            }
        }

        let backGround;

        backGround = <BackGround bgstyle={style} cancel={this.cancel}/>;

        return backGround;
    }

    inputChange(event){
        
        let addgroup = this.state.add_group;

        let num;

        if(isNaN(event.target.value))
        {
           console.log("只能是数字");
           return;
        }
        else if(parseInt(event.target.value) < 0 || event.target.value.length === 0)
            num = 0;
        else
            num = parseInt(event.target.value);

        if(event.target.name === "value")
        {
            if(num > 50)
                num = 50;

            addgroup.value = num;
        }
        else if(event.target.name === "delay")
        {
            if(num > 600)
                num = 600;

            addgroup.delay = num;
        }

        console.log(event.target.value+" the value is "+typeof(num)+"---"+JSON.stringify(addgroup));

        this.setState({add_group : addgroup});

    }

    ctrlInputChange(event){

        let num;

        if(isNaN(event.target.value))
        {
           console.log("只能是数字");
           return;
        }
        else if(parseInt(event.target.value) < 0 || event.target.value.length === 0)
            num = 0;
        else
            num = parseInt(event.target.value);

        if(event.target.name === "value")
        {
            if(num > 50)
                num = 50;
        }

        this.setState({tmpctrl : num});
    }

    showDialog(){

        let dialog;

        if(this.state.dialog === "select_devices")
        {
            dialog=<DeviceTable handleChange={this.handleChange.bind(this)} deviceslist={this.state.device_list} dialog={this.state.dialog} 
                addgroup={this.state.add_group} next={this.next}/>;
        }
        else if(this.state.dialog === "set_value")
        {
            dialog=<DialogGroupCtrlSetValue dialog={this.state.dialog} value={this.state.add_group.value} delay={this.state.add_group.delay}
                inputChange={this.inputChange} previous={this.previous} finish={this.finish}/>;
        }
        else if(this.state.dialog === "set_control_value")
        {
            dialog=<DialogControl inputChange={this.ctrlInputChange} cancel={this.cancel} completeCtrl={this.completeCtrl} value={this.state.tmpctrl}/>;
        }

        return dialog;
    }

    next(){
        console.log("change state dialog to next");
        
        if(this.state.add_group.devices.length <= 0)
        {
            alert("请勾选需要加入分组的设备");
            return true;
        }

        this.setState({dialog : "set_value"});
    }

    previous(){
        console.log("change state dialog to previous");
        this.setState({dialog : "select_devices"});
    }

    finish(){
        console.log("change state dialog to finish");

        client.publish(gateway,JSON.stringify(this.requestAddGroup()));

        this.setState({dialog : "default"});
    }

    cancel(){
        console.log("change state dialog to cancel");

        this.setState({dialog : "default"});
    }

    completeCtrl(){

        console.log("change state dialog to default");

        let cmd = this.refs.dialogCtrl.state.ctrlcmd;

        cmd.body.tmpctrl = this.state.tmpctrl;

        client.publish(gateway,JSON.stringify(cmd));

        console.log("send ctrl cmd : "+JSON.stringify(cmd));
        this.setState({dialog : "default"});
    }

    showDialogSetValue(){

        console.log("change state dialog to set control value");

        this.setState({dialog : "set_control_value"})
    }

    render() {
        
        let content,menu,dialog,background;

        let groups = this.state.group_list;

        console.log("show state" + JSON.stringify(this.state.add_group));

        //if(this.state.dialog == 'group_devices_list')
            //dialog = 

        dialog = this.showDialog();

        background = this.dialogBackGround();

        menu = this.showMenu();
        if(this.state.active === 'monitor')
            content= <TableComplex showDialogSetValue={this.showDialogSetValue} ref="dialogCtrl"/>;
        else if(this.state.active === 'groupctrl')
        {
            content= <GroupCtrlTable grouplist={this.state.group_list} deleteGroup={this.deleteGroup} reNameGroup={this.reNameGroup}
                        ctrlGroup={this.ctrlGroup} addGroup={this.addGroup} />;
        }
        
        return(
            <div>
                <div id="maincontent">	
                    <div id="main-menu">
                        {menu}
                    </div>
                    {content}
                </div>
                {background}
                {dialog}
            </div>
        );
    };

}

export default TabMenu;
