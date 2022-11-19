// React
import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import React from 'react';
import './item-card.scss';
import NumberStepper from '../../atoms/number-stepper/number-stepper';

class ItemCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <ListItem
                dense={true}
                className="item-card"
                alignItems="flex-start"
                secondaryAction={
                    <NumberStepper handleQuantityChange={this.props.handleQuantityChange} value={this.props.item.quantity} />
                }
            >
                <ListItemAvatar>
                    <Avatar
                        variant="rounded"
                        src={this.props.item.image}
                        sx={{ width: 56, height: 56 }}
                        alt={this.props.item.name}
                    ></Avatar>
                </ListItemAvatar>
                <ListItemText
                    className="item-col"
                    primary={
                        <React.Fragment>
                            <Typography
                                className="item-name"
                                component="span"
                                variant="body2"
                            >
                                {this.props.item.name}
                            </Typography>
                        </React.Fragment>
                    }
                    secondary={
                        <React.Fragment>
                            {this.props.item.size}
                            <span className="item-price">₱{this.props.item.price.toFixed(2)}</span>
                        </React.Fragment>
                    }
                >
                </ListItemText>
            </ListItem>
        );
    }
}

export default ItemCard;
