import React from 'react';

class DialogGroupCtrlSetValue extends React.Component{
    constructor(props){

        super(props);

    }

    render(){

        let style;

        style = {
            table : {},
            line : {},
            input : {}
        };

        if(this.props.dialog === "default")  
        { 
            style.table = {
                "zIndex" : -1,
                "opacity" : 0.0
            }
        }
        else
        {
            style.table = {
                "zIndex" : 99,
                "opacity" : 1.0
            }
        }

        style.line = {
            "borderWidth" : 0
        };

        style.input = {
            "textAlign" : "center"
        }

        return (
            <div className="setvaluedialog" style={style.table}>
                <table id="setvalue"  style={style.line}>
                    <tr  style={style.line}>
                        <td  style={style.line}>亮度值</td>
                        <td  style={style.line}>
                            <input name="value" style={style.input} type="text" onChange={this.props.inputChange} value={this.props.value}/>
                        </td>
                    </tr>
                    <tr  style={style.line}>
                        <td  style={style.line}></td>
                        <td  style={style.line}>* 亮度值为0-50之间</td>
                    </tr>
                    <tr  style={style.line}>
                        <td  style={style.line}>间隔（秒）</td>
                        <td  style={style.line}>
                            <input name="delay" style={style.input} type="text" onChange={this.props.inputChange} value={this.props.delay}/>
                        </td>
                    </tr>
                    <tr  style={style.line}>
                        <td  style={style.line}></td>
                        <td  style={style.line}>* 间隔秒数为0秒-600秒</td>
                    </tr>
                </table>
                <div id="setvaluebt">
                    <button  className="bt-black" onClick={this.props.previous} id="previous" >上一步</button>
                    <button  className="bt-blue" onClick={this.props.finish} id="finish">确定</button>
                </div>
            </div>
        );
    }

}

export default DialogGroupCtrlSetValue;