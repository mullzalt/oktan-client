import React, { Component, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { EditorState, RichUtils, getDefaultKeyBinding, Modifier, Editor, CompositeDecorator } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import 'draft-js/dist/Draft.css';

import { Button, ButtonGroup, Card, Menu, MenuItem, Paper, TextField, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';

import { FormatAlignCenter, FormatAlignJustify, FormatAlignLeft, FormatAlignRight, FormatBold, FormatItalic, FormatStrikethrough, FormatUnderlined } from '@mui/icons-material';
import { Box, Stack } from '@mui/system';
import { grey } from '@mui/material/colors';

import LinkIcon from '@mui/icons-material/Link'
import { createLinkDecorator, onAddLink } from './linkHandler';


var INLINE_STYLES = [
    { label: 'Bold', style: 'BOLD', icon: <FormatBold /> },
    { label: 'Italic', style: 'ITALIC', icon: <FormatItalic /> },
    { label: 'Underline', style: 'UNDERLINE', icon: <FormatUnderlined /> },
    { label: 'Striketrough', style: 'STRIKETHROUGH', icon: <FormatStrikethrough /> },
];

var BLOCK_TYPE = [
    { label: 'H1', style: 'header-one' },
    { label: 'H2', style: 'header-two' },
    { label: 'H3', style: 'header-three' },
    { label: 'H4', style: 'header-four' },
    { label: 'H5', style: 'header-five' },
    { label: 'H6', style: 'header-six' },
    { label: 'Blockquote', style: 'blockquote' },
    { label: 'UL', style: 'unordered-list-item' },
    { label: 'OL', style: 'ordered-list-item' },
    { label: 'Code Block', style: 'code-block' },
];


const InlineStyleControls = props => {
    const { editorState, onChange } = props
    const currentStyle = editorState.getCurrentInlineStyle()
    return (
        <>
            <ToggleButtonGroup
                size='small'
                aria-label="inline-styles"
            >
                {
                    INLINE_STYLES.map(style => {
                        return (
                            <Tooltip title={style.label}>
                                <ToggleButton value={style.style} key={style.label}
                                    selected={currentStyle.has(style.style)}
                                    onMouseDown={(e) => {
                                        onChange(e, style.style)
                                    }}
                                >
                                    {style.icon}

                                </ToggleButton>
                            </Tooltip>
                        )
                    })
                }

            </ToggleButtonGroup>

        </>

    )
}

const BlockTypeControl = props => {
    const { editorState, onChange } = props
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();
    return (
        <>
            <ToggleButtonGroup
                size='small'
                aria-label="blocktype-control"
                exclusive
            >
                {
                    BLOCK_TYPE.map(style => {
                        return (
                            <Tooltip title={style.label}>
                                <ToggleButton value={style.style} key={style.label}
                                    selected={blockType === style.style}
                                    onMouseDown={(e) => {
                                        onChange(e, style.style)
                                    }}
                                >
                                    {style.label}
                                </ToggleButton>
                            </Tooltip>
                        )
                    })
                }

            </ToggleButtonGroup>

        </>

    )
}

const LinkControl = prop => {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleOpen = (e) => {
        setAnchorEl(e.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <div>
            <ToggleButton
                onMouseDown={handleOpen}
            >
                <LinkIcon
                />
            </ToggleButton>

            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Box
                    sx={{
                        py: 1,
                        px: 2,
                        display: 'flex',
                        gap: 2,
                        flexWrap: 'wrap'
                    }}
                >
                    <TextField
                        size='small'
                        label='Link Url'
                    />
                    <Button
                        variant='contained'
                        size='small'
                    >
                        Attach Link
                    </Button>
                </Box>
            </Menu>


        </div>
    )
}

const linkDecorator = createLinkDecorator()


const TextEditor = props => {
    const { onChange, value, placeholder, hideToolbar, readOnly } = props

    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );
    const [isFocus, setFocus] = useState(false)

    const handleChange = (newEditorState) => {
        setEditorState(newEditorState)

        onChange(convertToHTML(editorState.getCurrentContent()))
    }

    const editorRef = useRef()

    const handleKeyCommand = (command) => {
        const newEditorState = RichUtils.handleKeyCommand(
            editorState,
            command
        )

        if (newEditorState) {
            handleChange(newEditorState)
            return 'handled'
        }

        return 'not-handled'
    }

    const handleTab = (e) => {
        e.preventDefault()

        const selection = editorState.getSelection();
        const blockType = editorState
            .getCurrentContent()
            .getBlockForKey(selection.getStartKey())
            .getType();

        if (blockType === "unordered-list-item" || blockType === "ordered-list-item") {
            handleChange(RichUtils.onTab(e, editorState, 4));
        } else {
            let newContentState = Modifier.replaceText(
                editorState.getCurrentContent(),
                editorState.getSelection(),
                '    '
            );
            handleChange(EditorState.push(editorState, newContentState, 'insert-characters'))
        }

    }

    const handleFocus = (e) => {
        setFocus(true)
    }


    const handleBlur = (e) => {
        setFocus(false)
    }

    const handleInlineStyling = (e, value) => {
        e.preventDefault()
        console.log(value)

        handleChange(
            RichUtils.toggleInlineStyle(
                editorState,
                value
            )
        )
    }

    const handleLink = () => {
        onAddLink(editorState, setEditorState)
    }

    const handleBlockType = (e, value) => {
        e.preventDefault()
        console.log(value)
        handleChange(
            RichUtils.toggleBlockType(
                editorState,
                value
            )
        )
    }





    return (
        <Box sx={{
            px: 2,
            py: 4
        }}>
            <Stack gap={2}>
                <Box sx={{
                    display: hideToolbar ? 'none' : 'flex',
                    gap: 2,
                    flexWrap: 'wrap',
                    justifyContent: 'start',
                    border: 1,
                    borderColor: grey[200],
                    py: 2,
                    px: 1

                }}>
                    <InlineStyleControls
                        editorState={editorState}
                        onChange={handleInlineStyling}
                    />
                    <BlockTypeControl
                        editorState={editorState}
                        onChange={handleBlockType}
                    />

                    <LinkControl />


                </Box>

                <Card sx={{
                    px: 2,
                    py: 4,
                    border: readOnly ? 0 : 1,
                    borderColor: isFocus ? grey[300] : grey[200],
                    boxShadow: isFocus ? 2 : 0
                }}>
                    <Editor
                        ref={editorRef}
                        editorState={editorState}
                        onEditorStateChange={setEditorState}
                        onChange={handleChange}
                        onTab={handleTab}
                        handleKeyCommand={handleKeyCommand}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        readOnly={readOnly}
                        placeholder={placeholder}
                    />
                </Card>
            </Stack>



        </Box>

    )
}

TextEditor.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    hideToolbar: PropTypes.bool,
    readOnly: PropTypes.bool
}

TextEditor.defaultProps = {
    placeholder: 'Type something...',
    hideToolbar: false,
    readOnly: false
}



export default TextEditor

