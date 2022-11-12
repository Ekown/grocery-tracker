// React
import { List } from '@mui/material';
import React from 'react';
import ItemCard from '../../atoms/item-card/item-card';
import './item-list.scss';

class ItemList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };

    }

    componentDidUpdate(prevProps) {
    }

    render() {
        return (
            <List className="item-list" sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <ItemCard
                    imageSrc="https://pgmobile.puregold.com.ph/images/4800166142325.jpg"
                    name="Stik-O Jr. Choco"
                />
                <ItemCard
                    imageSrc="https://fishersupermarket.ph/wp-content/uploads/2020/10/4800024575258.jpg"
                    name="Del Monte Four Seasons"
                />
                <ItemCard
                    imageSrc="http://cdn.shopify.com/s/files/1/0476/0266/3573/products/del-monte-juice-del-monte-juice-drink-pineapple-strawberry-tetra-1l-16892496314500_1024x.jpg?v=1619599627"
                    name="Del Monte Pineapple Strawberry"
                />
            </List>
        );
    }
}

export default ItemList;
