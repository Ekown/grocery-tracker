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
                    primary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                            >
                                {this.props.name}
                            </Typography>
                        </React.Fragment>
                    }
                    secondary={"500g"}
                >
                </ListItemText>
            </ListItem>
        );
    }
}

export default ItemCard;
