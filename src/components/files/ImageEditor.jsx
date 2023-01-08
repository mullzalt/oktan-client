import React from 'react'
import PropTypes from 'prop-types'
import { Button, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Divider, ImageList, ImageListItem, ImageListItemBar, ListItemIcon, ListItemText, MenuItem, Typography } from '@mui/material'
import MenuAction from '../Menu/MenuAction'
import { Clear, Edit, Remove } from '@mui/icons-material'

const ImagePreview = () => {

}


const ImageEditor = props => {
    const { title, imageUrl } = props

    return (
        <Card>
            <CardHeader
                action={
                    <MenuAction tooltip={'Edit Image'}>
                        <MenuItem key={`${title}-edit`} >
                            <ListItemIcon>
                                <Edit />
                            </ListItemIcon>
                            <Typography variant='inherit' noWrap>
                                {`Edit`}
                            </Typography>
                        </MenuItem>
                        <Divider />

                        <MenuItem key={`${title}-archive`}>
                            <ListItemIcon>
                                <Clear />
                            </ListItemIcon>
                            <ListItemText>
                                Remove Image
                            </ListItemText>
                        </MenuItem>

                    </MenuAction>
                }
                title={title}
            />

            <CardActionArea>
                <CardMedia
                    component={'img'}

                    image={imageUrl}
                    alt={title}
                />

            </CardActionArea>

        </Card>
    )
}

ImageEditor.propTypes = {
    title: PropTypes.string,
    imageUrl: PropTypes.string
}

export default ImageEditor