import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardHeader, CardMedia, Chip, Divider, Grid, ListItemIcon, ListItemText, MenuItem, Typography } from '@mui/material'
import MenuAction from '../Menu/MenuAction'
import EditIcon from '@mui/icons-material/Edit';
import ArchiveIcon from '@mui/icons-material/Archive';
import { useNavigate } from 'react-router-dom';
import EmptyImage from '../../assets/img/default-pictures.png'
import { blueGrey } from '@mui/material/colors';
import { Unarchive } from '@mui/icons-material';
import { Box } from '@mui/system';


const CbtCard = props => {
    const { title, subHeader, imgUrl, children, id, archived, onArchived, onUnArchived } = props
    const navigate = useNavigate()

    const handleEdit = (e) => {
        navigate(id)
    }

    const image = imgUrl ? imgUrl : EmptyImage



    return (

        <Card sx={{ boxShadow: 4, borderRadius: 4 }}>
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

                        {
                            !archived ?
                                <MenuItem key={`${title}-archive`} onClick={onArchived}>
                                    <ListItemIcon>
                                        <ArchiveIcon />
                                    </ListItemIcon>
                                    <ListItemText>
                                        Archive
                                    </ListItemText>
                                </MenuItem>
                                :
                                <MenuItem key={`${title}-unarchive`} onClick={onUnArchived}>
                                    <ListItemIcon >
                                        <Unarchive />
                                    </ListItemIcon>
                                    <ListItemText>
                                        Unarchive
                                    </ListItemText>
                                </MenuItem>
                        }



                    </MenuAction>
                }
                title={
                    <Box display={'flex'} gap={2} alignItems={'baseline'}>
                        <Typography variant='h6' fontWeight={'bold'}>{title}</Typography>


                        {archived && <Chip label={'archived'} variant={'outlined'} color={'info'} sx={{ mr: 2 }} />}

                    </Box>
                }
                subheader={subHeader}
            >




            </CardHeader>
            <Divider />

            <Grid container spacing={1}>
                <Grid item sm={12} md={12} lg={6}>
                    <CardMedia
                        component="img"
                        image={image}
                        alt={title}
                        sx={{
                            maxHeight: 512,
                            backgroundColor: blueGrey[400]

                        }}
                    />
                </Grid>
                <Grid item sm={12} md={12} lg={6} padding={4}>
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
    children: PropTypes.node,
    archived: PropTypes.bool,
    onArchived: PropTypes.func,
    onUnArchived: PropTypes.func
}


CbtCard.defaultValue = {
    onArchived: () => { },
    onUnArchived: () => { },
    archived: false
}

export default CbtCard