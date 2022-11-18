// React
import { Avatar, Button, ButtonGroup, IconButton, ListItem, ListItemAvatar, ListItemText, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import './number-stepper.scss';

class NumberStepper extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value,
        };
    }

    render() {
        // return (
        //     <div className="number-stepper">
        //         <Button className="number-stepper__minus" variant="contained">-</Button>
        //         <TextField
        //             className="number-stepper__value"
        //             value={this.props.value}
        //             inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        //         ></TextField>
        //         <Button className="number-stepper__plus" variant="contained">+</Button>
        //     </div>
        // );
        return (
            <ButtonGroup size="small" aria-label="small outlined button group" className="number-stepper">
                <Button className="number-stepper__plus" size="small" variant="contained" onClick={() => { this.setState(prevProps => { return { value: prevProps.value + 1 } }) }}>+</Button>
                <Button className="number-stepper__value" size="small" variant="outlined" disabled>{this.state.value}</Button>
                <Button className="number-stepper__minus" size="small" variant="contained" disabled={this.state.value === 0} onClick={() => {
                    this.setState(prevProps => { return { value: prevProps.value - 1 } })
                }}>-</Button>
            </ButtonGroup>
        )
    }
}

export default NumberStepper;
