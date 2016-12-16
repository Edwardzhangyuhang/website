import React from 'react';
import mqtt from 'mqtt';

class Login extends React.Component {

    constructor(props){
        super(props);
        
        this.state = {
            user:'',
            password:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.login_click = this.login_click.bind(this);
    }
    
    handleChange(e){
        
        //var newState={};
        //newState[e.target.name]= e.target.value
        this.setState({[e.target.name]: e.target.value});

    }

    login_click(){
        let client;

        let msg = {
            "user":this.state.user,
            "password":this.state.password
        };

        console.log(msg);

        client=mqtt.connect('ws://172.168.1.100:9001');
        client.on('connect',function() {
            //alert('connect success');
            //client.subscribe('hello');
            console.log("connect success");
            console.log(msg);
            client.publish('hello',JSON.stringify(msg));
            }
        );

        client.on('error',function(error) {
            console.log(error.toString());
            client.end();
            }
        );

        client.on('message',function(topic, payload) {
            alert(payload.toString());
            client.end();
            }
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


