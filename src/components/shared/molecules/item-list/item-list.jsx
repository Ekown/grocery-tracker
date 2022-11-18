// React
import { List } from '@mui/material';
import React from 'react';
import ItemCard from '../../atoms/item-card/item-card';
import './item-list.scss';

class ItemList extends React.Component {
    render() {
        return (
            <List className="item-list" sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {
                    this.props.items.length > 0 ?
                        this.props.items.map((item, index) => (
                            <ItemCard
                                key={index}
                                imageSrc={item.image}
                                name={item.name}
                                size={item.size}
                                quantity={item.quantity}
                                cost={item.cost}
                                price={item.price}
                            />
                        )) : 
                        (
                            <div>No items in the Invoice</div>
                        )
                }
            </List>
        );
    }
}

export default ItemList;
