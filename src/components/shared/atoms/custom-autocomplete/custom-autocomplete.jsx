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
        // Reset the autocomplete branch field when the selected store is changed
        if (prevProps.name === 'branch' && prevProps.store !== this.props.store) {
            this.setState({ options: [] }, () => {
                this.handleChange(null, null);
            });
        }
    }

    componentWillUnmount() {
        this.setState({ options: [] }, () => {
            this.handleChange(null, null);
        });
    }

    /**
     * Handle field changes
     * 
     * @param {Object|Event} event 
     * @param {Object} value 
     */
    handleChange(event, value) {
        this.props.onChange(value);
    }

    /**
     * Trigger the fetch option function and store the fetched options
     */
    async fetchOptions() {
        const options = await this.props.fetchOptions();

        if (options) {
            this.setState({ options: options, loading: false });
        }
    }

    render() {
        return (
            <Autocomplete
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                freeSolo
                value={this.props.value ?? ''}
                size={this.props.size ?? 'medium'}
                name={this.props.name}
                open={this.state.open}
                options={this.state.options}
                loading={this.state.loading}
                isOptionEqualToValue={(option, value) => option.name === value.name}
                getOptionLabel={(option) => option.name || ''}
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
