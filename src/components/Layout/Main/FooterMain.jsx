import React from 'react'
import PropTypes from 'prop-types'
import { Box, Container } from '@mui/system'
import { CssBaseline, Divider, Link, Typography } from '@mui/material'


function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" textAlign={'center'}>
            {'Copyright © '}
            <Link color="inherit" href="https://oktanitb2023.web.id/">
                Oktan ITB
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


const FooterMain = props => {
    return (
        <>
            <CssBaseline />
            <Box
                component="footer"
                sx={{
                    py: 3,
                    px: 2,
                    mt: 'auto',
                    bottom: 0,
                    width: 1
                }}
            >
                <Divider sx={{ my: 4 }} />
                <Container>
                    <Copyright />
                </Container>
            </Box>
        </>


    )
}

FooterMain.propTypes = {}

export default FooterMain