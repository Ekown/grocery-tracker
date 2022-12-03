// React
import { Button, ButtonGroup } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './number-stepper.scss';

function NumberStepper(props) {
    const [value, setValue] = useState(props.value);

    /**
     * Handles incrementing the value
     */
    const handleIncrement = () => {
        setValue(value + 1);

    }

    /**
     * Handles decrementing the value
     */
     const handleDecrement = () => {
        setValue(value - 1);
    }

    useEffect(() => {
        props.handleQuantityChange(value)
    // eslint-disable-next-line
    }, [value]);

    return (
        <ButtonGroup size="small" aria-label="small outlined button group" className="number-stepper">
            <Button className="number-stepper__plus" size="small" variant="contained" onClick={handleIncrement}>+</Button>
            <Button className="number-stepper__value" size="small" variant="outlined" disabled>{value}</Button>
            <Button className="number-stepper__minus" size="small" variant="contained" disabled={value === 0} onClick={handleDecrement}>-</Button>
        </ButtonGroup>
    );
}

export default NumberStepper;
