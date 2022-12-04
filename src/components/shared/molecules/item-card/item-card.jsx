// React
import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import React from 'react';
import './item-card.scss';
import NumberStepper from '../../atoms/number-stepper/number-stepper';
import { CloudinaryContext, Image } from 'cloudinary-react';

function ItemCard(props) {
    const defaultItemImageFallback = 'v1669646434/items/8cee1e1e-51b9-4e94-bb92-903807903149';

    return (
        <ListItem
            dense={true}
            className={"item-card " + (!props.handleQuantityChange ? 'no-quantity' : '')}
            alignItems="flex-start"
            secondaryAction={
                props.handleQuantityChange ?
                    <NumberStepper handleQuantityChange={props.handleQuantityChange} value={props.item.quantity} /> : false
            }
        >
            <ListItemAvatar>
                <CloudinaryContext cloudName="dbakjb75c">
                    <Avatar
                        variant="rounded"
                        sx={{ width: 56, height: 56 }}
                        alt={props.item.name}
                        component={
                            () => {
                                return (<Image publicId={props.item.image_url ? `v1669646434/items/${props.item.image_url}` : defaultItemImageFallback} width="50" />);
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
                            {props.item.name}
                        </Typography>
                    </React.Fragment>
                }
                secondary={
                    <React.Fragment>
                        {props.item.size}
                        {
                            props.item.price ?
                                <span className="item-price">₱{props.item.price.toFixed(2)}</span> : null
                        }
                    </React.Fragment>
                }
            >
            </ListItemText>
        </ListItem>
    );
}

export default ItemCard;
