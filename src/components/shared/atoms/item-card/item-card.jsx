// React
import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import './item-card.scss';

class ItemCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };

    }

    componentDidUpdate(prevProps) {
    }

    render() {
        return (
            <ListItem
                dense={true}
                className="item-card"
                alignItems="flex-start"
                secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
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
                    secondary={this.props.size}
                >
                </ListItemText>
                <ListItemText
                    className="quantity-col"
                    primary={
                        <React.Fragment>
                            <Typography
                                className="item-quantity"
                                component="span"
                                variant="body2"
                            >
                                x{this.props.quantity}
                            </Typography>
                        </React.Fragment>
                    }
                >
                </ListItemText>
            </ListItem>
        );
    }
}

export default ItemCard;
