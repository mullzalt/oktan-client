import * as React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link as RouterLink, useLocation, } from 'react-router-dom';


const ListItemLink = ({ sx, ...props }) => {
    const { icon, primary, to, children } = props;
    const location = useLocation()

    return (
        <ListItem
            button
            component={RouterLink}
            to={to}
            selected={to === location.pathname}
            sx={{ ...sx }}
        >
            {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
            {children}
            {primary ? <ListItemText primary={primary} /> : null}
        </ListItem>
    )
}


ListItemLink.propTypes = {
    icon: PropTypes.element,
    primary: PropTypes.string,
    to: PropTypes.string.isRequired,
    children: PropTypes.node
};

export default ListItemLink