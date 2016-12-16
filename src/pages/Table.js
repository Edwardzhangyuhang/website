import React from 'react';

import Switch from 'react-toggle-switch';


class TableComplex extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        debugmode : false,

        tableData : [
    {
        name: 'John Smith',
        status: 'Employed',
        checked: true,
    },
    {
        name: 'Randal White',
        status: 'Unemployed',
    },
    {
        name: 'Stephanie Sanders',
        status: 'Employed',
        checked: true,
    },
    {
        name: 'Steve Brown',
        status: 'Employed',
    },
    {
        name: 'Joyce Whitten',
        status: 'Employed',
    },
    {
        name: 'Samuel Roberts',
        status: 'Employed',
    },
    {
        name: 'Adam Moore',
        status: 'Employed',
    },
    {
        name: 'Adam Moore',
        status: 'Employed',
    },
    {
        name: 'Adam Moore',
        status: 'Employed',
    },
    {
        name: 'Adam Moore',
        status: 'Employed',
    },
    {
        name: 'Adam Moore',
        status: 'Employed',
    },
    {
        name: 'Adam Moore',
        status: 'Employed',
    },
    {
        name: 'Adam Moore',
        status: 'Employed',
    },
    {
        name: 'Adam Moore',
        status: 'Employed',
    },
    {
        name: 'Adam Moore',
        status: 'Employed',
    },

]

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeDebug = this.handleChangeDebug.bind(this);
    }


    handleChange(e){
        let checked = this.state.tableData;
        
        console.log("the checked:"+e.target.id);

        checked[e.target.id].checked=e.target.checked;

        this.setState({tableData : checked});
    }

    handleChangeSelectAll(e){
        let checked = this.state.tableData;

        this.state.tableData.map( (row, index) => {
            checked[index].checked = e.target.checked;
        })

        this.setState({ tableData : checked });
    }

    handleChangeDebug(e){

        this.setState({ debugmode : e.target.checked });
    }

    showtables() {
        return this.state.tableData.map( (row, index) => {

               const name = row.name ? row.name : '/';
               const mac = row.mac ? row.mac : '/';
               const online = row.online ? row.online : '/';
               const status = row.status ? row.status : '/';

               return (
               <tr key={ index }>
               <td><input type="checkbox" id={ index } checked={row.checked} onChange={this.handleChange.bind(this)}/></td>
               <td>{index}</td>
               <td>{name}</td>
               <td>{mac}</td>
               <td>{online}</td>
               <td>{status}</td>
               </tr>);
       });
    }

    render(){

        let content;

        //if(this.state.selectall === true)
            //this.selectAllitem();

        content = this.showtables();

        return (
            <div>
                <h2>设备列表</h2>
                <table>
                    <tbody>
                    <tr>
                        <th></th>
                        <th>编号</th>
                        <th>设备名称</th>
                        <th>MAC地址</th>
                        <th>设备状态</th>
                        <th>功能状态</th>
                    </tr>
                    { content }
                    <tr>
                        <td><input type="checkbox" onChange={this.handleChangeSelectAll.bind(this)}/></td>
                        <td>全选</td>
                        <td><button className="bt-black">导入</button></td>
                        <td><p>调试模式</p>
                        <label className="switch">
                            <input className="switch-input" checked={this.state.debugmode} type="checkbox" onChange={this.handleChangeDebug.bind(this)}/>
                            <span className="switch-label" data-on="On" data-off="Off"></span>
                            <span className="switch-handle"></span>
                        </label>
                        </td>
                        <td><button className="bt-red">删除</button></td>
                        <td><button className="bt-black">重命名</button></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }

}


export default TableComplex;


