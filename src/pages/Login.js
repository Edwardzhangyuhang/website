import React from 'react';
import mqtt from 'mqtt';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

class Login extends React.Component {

    constructor(props){
        super(props);
        
        this.state = {
            user:'',
            password:'',
        }
        this.handleChange = this.handleChange.bind(this);
        this.login_click = this.login_click.bind(this);

    }
    
    handleChange(e){

        this.setState({[e.target.name]: e.target.value});
    }

    handlemsg(msgs){
        
        let message;

        message = JSON.parse(msgs);

        console.log("method" + message.head.method + "   status" + message.head.status);
        if(message.head.method === "A012" && message.head.status === 0)
        {
            hashHistory.push('/menu');
        }
        else if(message.head.method === "A012" && message.head.status !== 0)
            alert("帐号或密码错误");
    }

    login_click(){
        let client;
        let timestamp = (new Date()).toLocaleString();
        let msg = {
            "body":{
                "user":{
                    "username" : this.state.user,
                    "password" : this.state.password
                }
            },
            "head":{
                "method":"A012",
                "proto_version":"V1.0",
                "ukey":"langjun",
                "ts":timestamp
            }   
        };

        if (this.state.user === '' || this.state.password === '')
        {
            alert("帐号密码不能为空!");
            return false;
        }

        client=mqtt.connect('ws://192.168.1.66:9001');
        client.on('connect',function() {
            console.log("connect success");
            client.subscribe('langjun');
            client.publish('DFB5755C-EDA7-4D15-8CD5-B235B172BEAB',JSON.stringify(msg));
            //hashHistory.push('/react');
            }
        );

        client.on('error',function(error) {
            console.log(error.toString());
            alert("连接服务器失败");
            client.end();
            }
        );

        client.on('message',function(topic, payload) {
            //alert(payload.toString());
            console.log(payload.toString());
            this.handlemsg(payload.toString());
            client.end();
            }.bind(this)
        );
    }

    render() {

        var value;

        return (<div className="text-center"  className="wrapper-page">

            <div id="logo">
                <img src="../img/logo3.png"></img>
                <img id="logo2" src="../img/logo2.png"></img>
            </div>
            <div className="m-t-80-center">
                <i id="user"></i>
                <input className="input-ul" type="text" placeholder="输入帐号" value={this.state.user} onChange={this.handleChange.bind(this)} name="user" />
            </div>
            <div className="m-t-30-center">
                <i id="password"></i>
                <input className="input-ul" type="password" placeholder="输入密码" value={this.state.password} onChange={this.handleChange.bind(this)} name="password" />
            </div>
            <div className="m-t-30-center">
                <button className="login-bt" onClick={this.login_click}>登录</button>
            </div>
            
        </div>);
    
    }
}

export default Login;


