import React from 'react';
import mqtt from 'mqtt';

import TableComplex from './Table';

const session="session";

let client;

class TabMenu extends React.Component{


    constructor(props){
        super(props);
        
        this.state = {
            gateway:''
        }

    }


    recievemsg(msg){
        this.setState({ gateway : msg });
    }

    componentWillMount(){

        
        let timestamp = (new Date()).toLocaleString();
        console.log(timestamp);
        let requestgw = {
            "body":{
                "username":"123",
                "password":"123"
            },
            "head":{
                "method":"1010",
                "ts":timestamp,
                "ukey":"langjun",
                "proto_version":"V1.0",
            }

        };
        
        let test1 = [1,2,3,4,5];
        let test2 = 1;
        let test3 = {

            "devices":test1,
            "cmd":test2,
            "session":session

        };

        console.log(test1);
        console.log(test2);
        console.log(JSON.stringify(test3));
        client=mqtt.connect('ws://192.168.1.66:9001');
        client.on('connect',function() {
            console.log("tabmenu connect success");
            client.subscribe('DFB5755C-EDA7-4D15-8CD5-B235B172BEAB');
            //client.publish('DFB5755C-EDA7-4D15-8CD5-B235B172BEAB',JSON.stringify(requestgw));

            }
        );

        client.on('error',function(error) {
            console.log(error.toString());
            alert("Login Fail!");
            client.end();
            }
        );

        client.on('message',function(topic, payload) {
            //alert(payload.toString());
            console.log("tabmenu"+payload.toString());
            this.recievemsg(payload.toString());
            //client.end();
            }.bind(this)
        );
    }
    
    render() {

        return(
            <div id="maincontent">	
            <div id="menu">
                <li><a>网关1</a></li>
            </div>
            <TableComplex/>
            </div>
        );
    };

}

export default TabMenu;
