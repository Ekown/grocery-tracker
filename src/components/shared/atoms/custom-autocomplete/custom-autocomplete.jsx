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

        this.value = props.value;
    }

    componentDidUpdate(prevProps) {
    }

    handleChange(event, value) {
        this.props.onChange(value);
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
                // value={this.value}
                size={this.props.size ?? 'medium'}
                name={this.props.name}
                open={this.state.open}
                options={this.state.options}
                loading={this.state.loading}
                isOptionEqualToValue={(option, value) => option.name === value.name}
                getOptionLabel={(option) => option.name}
                onChange={(e, v) => this.handleChange(e, v)}
                onOpen={() => {
                    this.setState({
                        open: true,
                        loading: this.state.options.length === 0
                    }, () => {
                        // We should only fetch the options once
                        if (this.state.options.length === 0) {
                            this.fetchOptions();
                        }
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
