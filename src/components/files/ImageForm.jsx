import { Button, Card, CardActionArea, CardHeader, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, ListItemIcon, ListItemText, MenuItem, Modal, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react'
import PropTypes from 'prop-types'

import defaultImage from '../../assets/img/default-pictures.png'
import ImageEditor from './ImageEditor'
import MenuAction from '../Menu/MenuAction'
import { Delete, Edit, Image } from '@mui/icons-material'


const DeleteDialog = props => {
    const { onDelete, onClose, open } = props

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Are you sure want to remove this image?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    The file will permanently be deleted.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} autoFocus>No</Button>
                <Button onClick={onDelete} >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}

const ImageForm = props => {
    const { title, src, onFileChange, onDelete, tooltip, variant, onSrcChange } = props
    const [open, setOpen] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const [imageSrc, setImageSrc] = useState(src)


    const image = imageSrc ? imageSrc : defaultImage


    const handleClick = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleSave = (data) => {
        setImageSrc(data.src)
        onFileChange(data.file)
        onSrcChange(data.src)
        setOpen(false)
    }

    const handleDelete = () => {
        setOpenDialog(false)
        setImageSrc(null)
        onDelete()
    }


    return (
        <React.Fragment>
            <DeleteDialog open={openDialog} onDelete={handleDelete} onClose={(e) => {
                setOpenDialog(false)
            }} />
            {
                variant === 'button' &&
                <Tooltip title={tooltip}>
                    <IconButton onClick={handleClick}>
                        <Image />
                    </IconButton>
                </Tooltip>
            }

            {
                variant === 'display' &&
                <Card sx={{ width: 1 }}>
                    <CardHeader
                        title={title}

                        action={
                            <MenuAction tooltip={'Open image setting'}>
                                <MenuItem key={`image-edit`} onClick={handleClick}>
                                    <ListItemIcon>
                                        <Edit />
                                    </ListItemIcon>
                                    <Typography variant='inherit' noWrap>
                                        Edit
                                    </Typography>
                                </MenuItem>
                                <Divider />

                                <MenuItem key={`image-remove`} onClick={(e) => {
                                    setOpenDialog(true)
                                }}
                                    disabled={!Boolean(imageSrc)}
                                >
                                    <ListItemIcon>
                                        <Delete />
                                    </ListItemIcon>
                                    <ListItemText>
                                        Remove Pictures
                                    </ListItemText>
                                </MenuItem>

                            </MenuAction>
                        }
                    />
                    <CardActionArea onClick={handleClick}>
                        <CardMedia
                            component={'img'}
                            src={image}
                            sx={{
                                maxHeight: 460,
                                padding: "1em 1em 0 1em",
                                objectFit: "contain",
                            }}
                            crossOrigin={'use-credentials'}

                        />
                    </CardActionArea>

                </Card>
            }


            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogContent>
                    <ImageEditor title={title}
                        onSave={handleSave}
                        onCancel={handleClose}
                        src={imageSrc}

                    />
                </DialogContent>
            </Dialog>

        </React.Fragment>
    )
}


ImageForm.propTypes = {
    title: PropTypes.string,
    src: PropTypes.string,
    tooltip: PropTypes.string,

    variant: PropTypes.oneOf(['display', 'button']),

    onFileChange: PropTypes.func,
    onSrcChange: PropTypes.func
}

ImageForm.defaultProps = {
    tooltip: 'Insert image',
    variant: 'display',
    onFileChange: () => { },
    onSrcChange: () => { }
}

export default ImageForm