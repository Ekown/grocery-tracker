// React
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useNonInitialEffect } from '../../../../hooks/useNonInitialEffect';

function CustomAutocomplete(props) {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loading = open && options.length === 0;

    /**
     * Handle field changes
     * 
     * @param {Object|Event} event 
     * @param {Object} value 
     */
    const handleChange = (event, value) => {
        props.onChange(value);
    }

    // Fetch the options if the dropdown is opened and has no options yet
    useNonInitialEffect(() => {
        if (!loading) {
            return undefined;
        }

        if (open && options.length === 0) {
            (async () => {
                const options = await props.fetchOptions();

                if (options) {
                    setOptions(options);
                }
            })();
        }
    // eslint-disable-next-line
    }, [loading]);

    // Clear the options when the store prop is changed (the selected store is changed)
    useNonInitialEffect(() => {
        if (!props?.store) {
            return undefined;
        }

        setOptions([]);
    }, [props.store]);

    return (
        <Autocomplete
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            freeSolo
            value={props.value ?? ''}
            size={props.size ?? 'medium'}
            name={props.name}
            open={open}
            options={options}
            loading={loading}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            getOptionLabel={(option) => option.name || ''}
            onChange={(e, v) => handleChange(e, v)}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            renderInput={(params) =>
                <TextField
                    {...params}
                    label={props.label}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            }
        />
    );
}

export default CustomAutocomplete;
