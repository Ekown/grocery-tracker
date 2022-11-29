// React
import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import React from 'react';
import './item-card.scss';
import NumberStepper from '../../atoms/number-stepper/number-stepper';
import { CloudinaryContext, Image } from 'cloudinary-react';

class ItemCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };

        this.defaultItemImageFallback = 'v1669646434/items/8cee1e1e-51b9-4e94-bb92-903807903149';
    }

    render() {
        return (
            <ListItem
                dense={true}
                className={"item-card " + (!this.props.handleQuantityChange ? 'no-quantity' : '')}
                alignItems="flex-start"
                secondaryAction={
                    this.props.handleQuantityChange ?
                        <NumberStepper handleQuantityChange={this.props.handleQuantityChange} value={this.props.item.quantity} /> : false
                }
            >
                <ListItemAvatar>
                    <CloudinaryContext cloudName="dbakjb75c">
                        <Avatar
                            variant="rounded"
                            sx={{ width: 56, height: 56 }}
                            alt={this.props.item.name}
                            component={
                                () => {
                                    return (<Image publicId={this.props.item.image ? `v1669646434/items/${this.props.item.image}` : this.defaultItemImageFallback} width="50" />);
                                }
                            }
                        ></Avatar>
                    </CloudinaryContext>
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
                            {
                                this.props.item.price ?
                                    <span className="item-price">₱{this.props.item.price.toFixed(2)}</span> : null
                            }
                        </React.Fragment>
                    }
                >
                </ListItemText>
            </ListItem>
        );
    }
}

export default ItemCard;
