import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/system'
import { Divider, Tab, Tabs, Typography } from '@mui/material'
import { CameraAlt } from '@mui/icons-material'


export const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};




const a11yProps = (index, title) => {
    return {
        id: `${title}-menu-tab-${index}`,
        'aria-controls': `${title}-menu-tabpanel-${index}`
    }
}


const MenuTab = props => {

    const { tabList, title, onMenuChage, currentIndex } = props

    return (
        <>
            <Box sx={{ bgcolor: 'background.paper' }}>
                <Tabs
                    value={currentIndex}
                    onChange={onMenuChage}
                    aria-label={`${title}-tabs-panel`}
                    variant="scrollable"
                >
                    {
                        tabList && tabList.map((tab, index) => (
                            <Tab label={tab.label} icon={tab.icon} iconPosition={'start'} {...a11yProps(index, title)} key={`${title}-menu-tabpanel-${index}`} />
                        ))
                    }
                </Tabs>
            </Box>
            <Divider />
        </>


    )
}

MenuTab.propTypes = {
    tabList: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        icon: PropTypes.node,
    })),
    title: PropTypes.string,
    onMenuChage: PropTypes.func,
    currentIndex: PropTypes.number
}

export default MenuTab