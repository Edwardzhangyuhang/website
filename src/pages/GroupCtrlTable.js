import React from 'react';

let style = {
    height : 50
};

class GroupCtrlTable extends React.Component {

    constructor(props){
        super(props);
    }

    showTables(grouplist){
        if(grouplist === null)
            return;

        return grouplist.map( (row, index) => {

            const name = row.name;

            let status,btstyle;

            if(row.status === 1)
            {
                btstyle = "bt-blue";
                status = "开";
            }
            else
            {
                btstyle = "bt-black";
                status = "关";
            }

            return (
            <tr key={ index } style={style}>
            <td>{index+1}</td>
            <td>{name}</td>
            <td><button id={index} className="bt-blue" onClick={this.props.reNameGroup}>编辑</button></td>
            <td><button id={index} value={row.status} className={btstyle} onClick={this.props.ctrlGroup}>{status}</button></td>
            <td><img id={index} src="../img/delete_red.png" onClick={this.props.deleteGroup}/></td>
            </tr>);
        });
    }

    render(){
        let content;

        content = this.showTables(this.props.grouplist);


        return (
            <div id="tablelist">
                <h3>设备列表</h3>
                <table>
                    <tbody>
                    <tr>
                        <th>编号</th>
                        <th>组名</th>
                        <th>重命名</th>
                        <th>控制</th>
                        <th>添加/删除</th>
                    </tr>
                    { content }
                    <tr  style={style}>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td><img src="../img/add.png" onClick={this.props.addGroup}/></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }

}

export default GroupCtrlTable;
