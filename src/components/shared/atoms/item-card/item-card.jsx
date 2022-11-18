// React
import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import React from 'react';
import './item-card.scss';
import NumberStepper from '../number-stepper/number-stepper';

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
                    <NumberStepper handleQuantityChange={this.props.handleQuantityChange} value={this.props.quantity} />
                }
            >
                <ListItemAvatar>
                    <Avatar
                        variant="rounded"
                        src={this.props.imageSrc}
                        sx={{ width: 56, height: 56 }}
                        alt={this.props.name}
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
                                {this.props.name}
                            </Typography>
                        </React.Fragment>
                    }
                    secondary={
                        <div>
                            {this.props.size}
                            <div>₱{this.props.price.toFixed(2)}</div>
                        </div>
                    }
                >
                </ListItemText>
            </ListItem>
        );
    }
}

export default ItemCard;
