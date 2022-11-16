// React
import { List } from '@mui/material';
import React from 'react';
import ItemCard from '../../atoms/item-card/item-card';
import './item-list.scss';

class ItemList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [
                {
                    image: "https://pgmobile.puregold.com.ph/images/4800166142325.jpg",
                    name: "Stik-O Jr. Choco",
                    size: "380G",
                    quantity: 1,
                },
                {
                    image: "https://fishersupermarket.ph/wp-content/uploads/2020/10/4800024575258.jpg",
                    name: "Del Monte Four Seasons",
                    size: "1L",
                    quantity: 1,
                },
                {
                    image: "http://cdn.shopify.com/s/files/1/0476/0266/3573/products/del-monte-juice-del-monte-juice-drink-pineapple-strawberry-tetra-1l-16892496314500_1024x.jpg?v=1619599627",
                    name: "Del Monte Pineapple Strawberry",
                    size: "1L",
                    quantity: 1,
                },
                {
                    image: "https://fishersupermarket.ph/wp-content/uploads/2020/10/4800575425033.jpg",
                    name: "Krem Top Creamer",
                    size: "500G",
                    quantity: 1,
                },
                {
                    image: "https://cdn.shopify.com/s/files/1/0485/8380/3036/products/4808887040012-530x530.jpg?v=1631673449",
                    name: "Purefoods Liver Spread",
                    size: "85G",
                    quantity: 1,
                },
                {
                    image: "https://d2t3trus7wwxyy.cloudfront.net/catalog/product/1/0/10256579-quaker-fio-chocolate-500g_1.png",
                    name: "Quaker Instant Oats Chocolate",
                    size: "500G",
                    quantity: 1,
                },
            ]
        };

    }

    componentDidUpdate(prevProps) {
    }

    render() {
        return (
            <List className="item-list" sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {
                    this.state.items.length > 0 ?
                        this.state.items.map((item, index) => (
                            <ItemCard
                                key={index}
                                imageSrc={item.image}
                                name={item.name}
                                size={item.size}
                                quantity={item.quantity}
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
