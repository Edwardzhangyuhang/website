import React from 'react';
import mqtt from 'mqtt';

import TableComplex from './Table';

const session="session";

let client;

class TabMenu extends React.Component{


    constructor(props){
        super(props);
        
        this.state = {
            active:'groupctrl',
            menu_item:[
                {
                    'id':'groupctrl',
                    'name':'监控'
                },
                {
                    'id':'monitor',
                    'name':'组控'
                }
            ]
        }
        
        this.handleActive = this.handleActive.bind(this);
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
                
            return (
                <li key={row.id} id={row.id} onClick={this.handleActive.bind(this)}>
                    <a id={row.id} className="item">{row.name}</a>
                    <div className={active} />
                </li>
            );
        });
    }
    
    render() {
        
        let content,menu;
        
        menu = this.showMenu();
        if(this.state.active === 'monitor')
            content= <TableComplex />;
        else if(this.state.active === 'groupctrl')
            content= <TableComplex />;
        
        return(
            <div id="maincontent">	
                <div id="main-menu">
                    {menu}
                </div>
                {content}
            </div>
        );
    };

}

export default TabMenu;
