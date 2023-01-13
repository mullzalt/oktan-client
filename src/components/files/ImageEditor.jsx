import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Divider, ImageList, ImageListItem, ImageListItemBar, ListItemIcon, ListItemText, MenuItem, Paper, Slider, Stack, ToggleButton, ToggleButtonGroup, Toolbar, Typography, withStyles } from '@mui/material'
import MenuAction from '../Menu/MenuAction'
import { Clear, Edit, Remove } from '@mui/icons-material'

import 'react-easy-crop/react-easy-crop.css'

import { blueGrey } from '@mui/material/colors'
import Dropzone, { useDropzone } from 'react-dropzone'
import Cropper from 'react-easy-crop'
import { Box } from '@mui/system'
import { getCroppedImg, getRotatedImage } from './canvasUtils'
import { useUpdateCbtCoverMutation } from '../../features/cbts/cbtSlice'
import ImageDropZone from './ImageUploader'
import AspectRatioIcon from '@mui/icons-material/AspectRatio';

const modal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 3,
    rounded: 4,

    pt: 2,
    px: 4,
    pb: 3,
};

function readFile(file) {
    return new Promise((resolve) => {
        const reader = new FileReader()
        reader.addEventListener('load', () => resolve(reader.result), false)
        reader.readAsDataURL(file)
    })
}

const ImageCropper = props => {
    const { src, onSave, aspect, onCancel, onChangeImage } = props
    const [imageSrc, setImageSrc] = useState(src)
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [rotation, setRotation] = useState(0)
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [aspectRatio, setAspectRation] = useState(aspect || 16 / 9)

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])

    const handleSave = useCallback(async () => {
        const croppedImage = await getCroppedImg(
            imageSrc,
            croppedAreaPixels,
            rotation
        )

        onSave(croppedImage)
    }, [imageSrc, croppedAreaPixels, rotation])

    const handleCancel = (e) => {
        onCancel(e)
    }

    const handleChangeAspect = (e, val) => {
        setAspectRation(val)
    }


    return (
        <>
            {imageSrc &&
                <>
                    <Box sx={{
                        position: 'relative',
                        width: '100%',
                        height: 400,
                    }}>
                        <Cropper
                            image={imageSrc}
                            crop={crop}
                            rotation={rotation}
                            zoom={zoom}
                            aspect={aspectRatio}
                            onCropChange={setCrop}
                            onRotationChange={setRotation}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                        />
                    </Box>
                    <Stack p={1} mt={2}>
                        <Box display={'flex'} justifyContent={'center'}>
                            <ToggleButtonGroup
                                color='primary'
                                value={aspectRatio}
                                exclusive
                                onChange={handleChangeAspect}
                                aria-label="AspectRation"
                            >
                                <ToggleButton value={1 / 1}>1:1</ToggleButton>
                                <ToggleButton value={4 / 3}>4:3</ToggleButton>
                                <ToggleButton value={16 / 9}>16:9</ToggleButton>
                                <ToggleButton value={2.35 / 1}>2.35:1</ToggleButton>
                            </ToggleButtonGroup>
                        </Box>


                        <Box display={'flex'}>
                            <Typography
                                variant="overline"
                                minWidth={80}
                            >
                                Zoom
                            </Typography>
                            <Slider
                                value={zoom}
                                min={0.8}
                                max={3}
                                step={0.1}
                                aria-labelledby="Zoom"
                                onChange={(e, zoom) => setZoom(zoom)}
                            />
                        </Box>
                        <Box display={'flex'}>
                            <Typography
                                variant="overline"
                                minWidth={80}
                            >
                                Rotation
                            </Typography>
                            <Slider
                                value={rotation}
                                min={0}
                                max={360}
                                step={1}
                                aria-labelledby="Rotation"
                                onChange={(e, rotation) => setRotation(rotation)}
                            />


                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 2, flexDirection: 'row-reverse', gap: 2 }}>
                            <Button onClick={handleSave} variant={'contained'}>
                                Save
                            </Button>
                            <Button onClick={onChangeImage} color="warning" variant={'contained'}>
                                Change Image
                            </Button>
                            <Button onClick={handleCancel} color="error">
                                Cancel
                            </Button>
                        </Box>
                    </Stack>
                </>
            }
        </>
    )
}

const ImageViewer = props => {
    const { title, src } = props

    return (
        <Box sx={{
            position: 'relative',
        }}>

            <img
                style={{ width: "100%", height: '100%', margin: "30px 0" }}
                src={src}
                alt={title}
                crossOrigin={'use-credentials'}
            />
        </Box >
    )
}



const ImageEditor = props => {
    const { src, onSave, onCancel, title } = props


    const [editSate, setEditState] = useState(false)
    const [imageSrc, setImageSrc] = useState(src)
    const [edittedImage, setEdittedImage] = useState({
        src: '',
        file: ''
    })

    const onFileChange = async (file) => {
        let imageDataUrl = await readFile(file[0])
        setImageSrc(imageDataUrl)
        setEdittedImage(prev => ({
            ...prev,
            src: imageDataUrl,
            file: file[0]
        }))
        localStorage.file = imageDataUrl
    }

    const handleSave = async (data) => {
        setEdittedImage(data)
        setEditState(prev => (!prev))
    }

    const handelCancelUpload = (e) => {
        onCancel(e)
    }

    const handleSaveChange = (e) => {
        onSave(edittedImage)
    }

    const handleToogleEdit = () => {
        setEditState(prev => (!prev))
    }

    const handleChangeImage = () => {
        setEditState(false)
        setImageSrc(null)
        setEdittedImage(null)
    }

    return (
        <Box sx={{ background: 'white', py: 2, px: 4 }}>
            <Box>
                <Typography variant='h6'>{title}</Typography>
            </Box>
            {imageSrc ?
                editSate ?
                    <ImageCropper src={imageSrc}
                        onSave={handleSave}
                        onCancel={handleToogleEdit}
                        onChangeImage={handleChangeImage}
                    />
                    : <ImageViewer src={edittedImage?.src || imageSrc} title={title} />


                : <ImageDropZone onDrop={onFileChange} />
            }

            {
                !editSate &&
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 2, flexDirection: 'row-reverse', gap: 2 }}>
                    <Button onClick={handleSaveChange} variant={'contained'} disabled={!Boolean(edittedImage?.file)}>
                        Save Change
                    </Button>
                    {
                        imageSrc ?
                            <Button onClick={handleToogleEdit} variant={'contained'} >
                                Edit
                            </Button>
                            : null
                    }

                    <Button onClick={handelCancelUpload} color="error">
                        Cancel
                    </Button>
                </Box>
            }
        </Box>
    )
}

ImageEditor.propTypes = {
    title: PropTypes.string,
    src: PropTypes.string,
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
}

export default ImageEditor