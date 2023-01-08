import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions'
import { Divider, Paper } from '@mui/material';


const SearchAppBar = props => {
    const { onChange, onClick, placeholder } = props

    return (
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', boxShadow: 4 }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder={placeholder}
                onChange={onChange}
                inputProps={{ 'aria-label': 'search' }}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={onClick}>
                <SearchIcon />
            </IconButton>
        </Paper>

    );
}

SearchAppBar.propTypes = {
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    placeholder: PropTypes.string
}


export default SearchAppBar