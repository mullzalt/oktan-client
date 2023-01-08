import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardHeader, CardMedia, Divider, Grid, ListItemIcon, ListItemText, MenuItem, Typography } from '@mui/material'
import MenuAction from '../Menu/MenuAction'
import EditIcon from '@mui/icons-material/Edit';
import ArchiveIcon from '@mui/icons-material/Archive';
import { useNavigate } from 'react-router-dom';


const CbtCard = props => {
    const { title, subHeader, imgUrl, children, id } = props
    const navigate = useNavigate()

    const handleEdit = (e) => {
        navigate(id)
    }



    return (

        <Card sx={{ boxShadow: 4 }}>
            <CardHeader
                action={
                    <MenuAction tooltip={'Open CBT menu setting'}>
                        <MenuItem key={`${title}-edit`} onClick={handleEdit}>
                            <ListItemIcon>
                                <EditIcon />
                            </ListItemIcon>
                            <Typography variant='inherit' noWrap>
                                {`Edit "${title}"`}
                            </Typography>
                        </MenuItem>
                        <Divider />

                        <MenuItem key={`${title}-archive`}>
                            <ListItemIcon>
                                <ArchiveIcon />
                            </ListItemIcon>
                            <ListItemText>
                                Archive
                            </ListItemText>
                        </MenuItem>

                    </MenuAction>
                }
                title={title}
                subheader={subHeader}
            >



            </CardHeader>
            <Divider />

            <Grid container spacing={1}>
                <Grid item md={12} lg={6}>
                    <CardMedia
                        component="img"
                        image={imgUrl}
                        alt={title}
                        sx={{
                            width: 1,
                        }}
                    />
                </Grid>
                <Grid item md={12} lg={6} padding={4}>
                    {children}
                </Grid>
            </Grid>


        </Card>


    )
}

CbtCard.propTypes = {
    title: PropTypes.string,
    subHeader: PropTypes.string,
    imgUrl: PropTypes.string,
    children: PropTypes.node
}

export default CbtCard