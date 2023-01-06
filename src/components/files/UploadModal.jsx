import { CameraAlt, Image, Link } from '@mui/icons-material'
import { IconButton, Modal, Tab, Tabs, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { AddImage, ImagePreview } from './ImageUploader';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 'md',
    bgcolor: 'white',
    boxShadow: 3,
    pt: 2,
    px: 4,
    pb: 3,
};

const a11yProps = (index) => {
    return {
        id: `upload-tab-${index}`,
        'aria-controls': `upload-tabpanel-${index}`
    }
}

const UploadContainer = () => {
    const [value, setValue] = useState(0)
    const [fileURL, setFileURL] = useState(null)

    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()

    const handleChange = (e, newValue) => {
        setValue(newValue)
    }

    const onFileUploaded = (file) => {
        setFileURL(file)
        setSelectedFile(file[0])
        console.log(file)
    }

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = window.URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => window.URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    return (
        <Box sx={{ ...style, width: 1 }}>
            <Typography variant='h6'>Upload image</Typography>
            <Box>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab icon={<CameraAlt />} iconPosition={'start'} label="Upload File" {...a11yProps(0)}></Tab>
                    <Tab icon={<Link />} iconPosition={'start'} label="From URL" {...a11yProps(1)} />
                </Tabs>
            </Box>

            <div
                role={'tabpanel'}
                hidden={value !== 0}
                id={`simple-tabpanel-0`}
                aria-labelledby={`simple-tab-0`}
            >
                {value === 0 && (
                    <>
                        <AddImage
                            onFileUploaded={onFileUploaded}
                        />
                        {selectedFile && <img src={preview} />}
                    </>
                )}

            </div>
        </Box>
    )
}

const UploadModal = (props) => {
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
            <IconButton
                color='primary'
                aria-label='upload images'
                component="label"
                onClick={handleOpen}
            >
                <Image />
            </IconButton>

            <Modal

                open={open}
                onClose={handleClose}
            >
                <UploadContainer></UploadContainer>
            </Modal>

        </>
    )
}

export default UploadModal