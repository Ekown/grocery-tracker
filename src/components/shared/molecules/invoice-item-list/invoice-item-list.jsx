import React from 'react';
import ItemList from '../item-list/item-list';

class InvoiceItemList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };

    }

    componentDidUpdate(prevProps) {
    }

    render() {
        return (
            <ItemList />
        );
    }
}

export default InvoiceItemList;
