import { Camera, Photo } from "@mui/icons-material"
import { Paper, Box } from "@mui/material"
import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"


export const AddImage = (props) => {
    const [file, setFile] = useState(null)

    const onDrop = useCallback((acceptedFile) => {
        setFile(acceptedFile)
        props.onFileUploaded(acceptedFile)
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
        accept: { 'image/*': [] }
    })


    return (
        <Paper
            sx={{
                curson: 'pointer',
                background: '#fafafa',
                color: '#bdbdbd',
                border: '1px dashed #ccc',
                '&:hover': { border: '1px solid #ccc', background: '#ffff' },
            }}
        >
            <Box
                display="grid"
                alignItems="center"
                justifyContent="center"
                textAlign='center'
                padding={4}
                paddingY={10}
                {...getRootProps()}
            >
                <input {...getInputProps()} />
                {isDragActive ? (
                    <>
                        <Photo sx={{ justifySelf: 'center', color: 'info', fontSize: '60px' }} />
                        <p style={{ color: 'info' }}>Drop the image here...</p>
                    </>
                ) : (
                    <>
                        <Photo sx={{ justifySelf: 'center', fontSize: '60px' }} />
                        <p>Drag and Drop an image here, or click to select files</p>
                    </>
                )}
                <em>(images with *.jpeg, *.png, *.jpg extension will be accepted)</em>


            </Box>
        </Paper>
    )
}


const ImageUploader = () => {
    return (
        <div>ImageUploader</div>
    )
}

export default ImageUploader