import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, ToggleButton, Tooltip } from '@mui/material'
import { Link, LinkOff } from '@mui/icons-material'
import { EditorState, RichUtils } from 'draft-js'
import { Box } from '@mui/system'

const LinkButton = props => {
    const { onInsert, editorState, onRemoveLink, setState } = props
    const [displayText, setDisplayText] = useState('')
    const [url, setUrl] = useState('')
    const [disableDetach, setDisableDetach] = useState(true)


    const removeLink = () => {
        const selection = editorState.getSelection();

        const newState = RichUtils.toggleLink(editorState, selection, null)
        setState(newState)
    }

    const promptForLink = () => {
        const selection = editorState.getSelection()

        if (!selection.isCollapsed()) {
            const contentState = editorState.getCurrentContent();
            const startKey = editorState.getSelection().getStartKey();
            const startOffset = editorState.getSelection().getStartOffset();
            const endOffset = editorState.getSelection().getEndOffset();

            const selectionState = editorState.getSelection()
            const anchorKey = selectionState.getAnchorKey()

            const currentContentBlock = contentState.getBlockForKey(anchorKey)


            const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
            const textValue = currentContentBlock.getText().slice(startOffset, endOffset)
            const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);
            setDisplayText(textValue)
            let urlValue = ''
            if (linkKey) {
                const linkInstance = contentState.getEntity(linkKey);
                urlValue = linkInstance.getData().url;
                setUrl(urlValue)
                setDisableDetach(false)
            }
        }

        setOpen(true)
    }



    const [isOpen, setOpen] = useState(false)

    return (
        <React.Fragment>
            <Tooltip title={'Insert Link'}>
                <ToggleButton onMouseDown={promptForLink}>
                    <Link />
                </ToggleButton>
            </Tooltip>



            <Dialog
                fullWidth
                maxWidth={'xs'}
                open={isOpen}
                onClose={() => {
                    setUrl('')
                    setDisplayText('')
                    setDisableDetach(true)
                    setOpen(false)
                }}
            >
                <DialogTitle>
                    <Box display={'flex'} justifyContent={'space-between'}>
                        Attach Link
                        <Tooltip title={'Detach link'}>
                            <IconButton disabled={disableDetach} onMouseDown={() => {
                                onRemoveLink()
                                setOpen(false)
                            }}>
                                <LinkOff />
                            </IconButton>
                        </Tooltip>

                    </Box>

                </DialogTitle>

                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="diplayText"
                        label="Display Text"
                        type="text"
                        fullWidth
                        variant="outlined"
                        placeholder='enter your text'
                        value={displayText}
                        onChange={(e) => setDisplayText(e.target.value)}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />

                    <TextField
                        margin="dense"
                        id="url"
                        label="URL"
                        type="text"
                        placeholder='http://...'
                        fullWidth
                        variant="outlined"
                        value={url}
                        onChange={(e) => {
                            setUrl(e.target.value)
                        }}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />


                </DialogContent>
                <DialogActions>

                    <Button onMouseDown={(e) => {
                        onInsert(url, displayText)
                        setUrl('')
                        setDisplayText('')
                        setOpen(false)
                        setDisableDetach(true)
                    }}>
                        Attach
                    </Button>

                </DialogActions>
            </Dialog>



        </React.Fragment>
    )
}

LinkButton.propTypes = {
    onInsert: PropTypes.func,
    editorState: PropTypes.any,
    onRemoveLink: PropTypes.func,
    setState: PropTypes.func
}

LinkButton.defaultProps = {
    onInsert: (url, displayText) => { },
    onRemoveLink: (url, displayText) => { }
}

export default LinkButton