import React from 'react';

import TabMenu from './TabMenu';
import Header from './Header';

class Index extends React.Component {

    render() {
        return (
            <div>
                <Header/>
                {this.props.children}
            </div>
    );
    }
}

export default Index;
