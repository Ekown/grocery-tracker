import React from 'react';
import ItemList from '../item-list/item-list';
import './invoice-item-list.scss';

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
            <div className="invoice-item-list">
                <ItemList />
            </div>
        );
    }
}

export default InvoiceItemList;
