// React
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import React from 'react';

class CustomAutocomplete extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            loading: false,
            options: [],
        };
    }

    componentDidUpdate(prevProps) {
    }

    async fetchOptions() {
        const options = await this.props.fetchOptions();

        if (options) {
            this.setState({options: options, loading: false});
        }
    }

    render() {
        return (
            <Autocomplete
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                freeSolo
                open={this.state.open}
                value={this.props.value}
                options={this.state.options}
                loading={this.state.loading}
                isOptionEqualToValue={(option, value) => option.name === value.name}
                getOptionLabel={(option) => option.name}
                onOpen={() => {
                    this.setState({
                        open: true,
                        loading: this.state.options.length === 0
                    }, () => {
                        this.fetchOptions();
                    });
                }}
                onClose={() => {
                    this.setState({
                        open: false,
                        loading: false,
                    });
                }}
                renderInput={(params) =>
                    <TextField
                        {...params}
                        label={this.props.label}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {this.state.loading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                        }}
                    />
                }
            />
        );
    }
}

export default CustomAutocomplete;
