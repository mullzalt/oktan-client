import React, { Component, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { EditorState, RichUtils, getDefaultKeyBinding, Modifier, Editor, CompositeDecorator, convertToRaw, ContentState } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import 'draft-js/dist/Draft.css';

import { Button, ButtonGroup, Card, Collapse, colors, Divider, Menu, MenuItem, Paper, TextField, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';

import { FormatAlignCenter, FormatAlignJustify, FormatAlignLeft, FormatAlignRight, FormatBold, FormatItalic, FormatStrikethrough, FormatUnderlined, Subscript, Superscript } from '@mui/icons-material';
import { Box, Stack } from '@mui/system';
import { blue, blueGrey, grey } from '@mui/material/colors';

import LinkIcon from '@mui/icons-material/Link'
import LinkButton from './handler/LinkButton';
import { linkDecorator, onAddLink } from './handler/linkHandler';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';


var INLINE_STYLES = [
    { label: 'Bold', style: 'BOLD', icon: <FormatBold /> },
    { label: 'Italic', style: 'ITALIC', icon: <FormatItalic /> },
    { label: 'Underline', style: 'UNDERLINE', icon: <FormatUnderlined /> },
    { label: 'Striketrough', style: 'STRIKETHROUGH', icon: <FormatStrikethrough /> },
    { label: 'Superscript', style: 'SUPERSCRIPT', icon: <Superscript /> },
    { label: 'Subscript', style: 'SUBSCRIPT', icon: <Subscript /> },
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
    const { editorState, onChange, value } = props
    const currentStyle = editorState.getCurrentInlineStyle()
    return (
        <>
            <ToggleButtonGroup
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


const customStyleMap = {
    SUPERSCRIPT: {
        fontSize: '.83em',
        veritcalAlign: 'sup'
    }
}

const TextEditor = props => {
    const { onChange, value, placeholder, hideToolbar, readOnly } = props

    const blocksFromHtml = htmlToDraft(value);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);


    const [editorState, setEditorState] = useState(
        () => EditorState.createWithContent(contentState),
    );
    const [isFocus, setFocus] = useState(false)


    useEffect(() => {
        const htmlPuri = draftToHtml(
            convertToRaw(editorState.getCurrentContent())
        );
        onChange(htmlPuri)
    }, [editorState])

    const handleChange = (newEditorState) => {
        setEditorState(newEditorState)
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

        let newState = RichUtils.toggleInlineStyle(editorState, value)
        if (value === 'SUPERSCRIPT' || value === 'SUBSCRIPT') {
            const removeStyle = value === 'SUPERSCRIPT' ? 'SUBSCRIPT' : 'SUPERSCRIPT'
            const contentState = Modifier.removeInlineStyle(
                newState.getCurrentContent(),
                newState.getSelection(),
                removeStyle
            )
            newState = EditorState.push(
                newState,
                contentState,
                'change-inline-style'
            )
        }

        if (newState) {
            handleChange(newState)
        }





    }

    const handleBlockType = (e, value) => {
        e.preventDefault()
        handleChange(
            RichUtils.toggleBlockType(
                editorState,
                value
            )
        )
    }

    const handleRemoveLink = () => {
        const selection = editorState.getSelection()
        handleChange(RichUtils.toggleLink(editorState, selection, null))

    }

    const handleLink = (url, displayText) => {
        const decorator = linkDecorator()

        let hyperLink = url
        if (!url.includes('http://')) {
            if (!url.includes('https://')) {
                hyperLink = `http://${url}`
            }
        }

        const currentContent = editorState.getCurrentContent()

        currentContent.createEntity('LINK', 'MUTABLE', {
            url: hyperLink
        })

        const entityKey = currentContent.getLastCreatedEntityKey()

        const selection = editorState.getSelection()

        const textWithEntity = Modifier.replaceText(
            currentContent,
            selection,
            displayText,
            editorState.getCurrentInlineStyle(),
            entityKey,
        )

        const newEntityKey = textWithEntity.getLastCreatedEntityKey()

        let newState = EditorState.createWithContent(textWithEntity, decorator)

        newState = RichUtils.toggleLink(newState, newState.getSelection(), newEntityKey)

        setEditorState(newState)
    }

    return (
        <Box sx={{
            px: 2,
            overflow: 'auto'
        }}>
            <Stack gap={2}>

                <Box overflow={'auto'}>
                    <Editor
                        ref={editorRef}
                        editorState={editorState}
                        onEditorStateChange={setEditorState}
                        onChange={handleChange}
                        handleKeyCommand={handleKeyCommand}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        readOnly={readOnly}
                        placeholder={placeholder}
                        onTab={handleTab}
                        customStyleMap={{
                            SUPERSCRIPT: {
                                fontSize: '.83em',
                                verticalAlign: 'super'
                            },
                            SUBSCRIPT: {
                                fontSize: '.83em',
                                verticalAlign: 'sub'
                            }
                        }}
                    />

                    {!readOnly &&
                        <Box sx={{
                            w: 1,
                            display: 'flex',
                            justifyContent: 'center',
                        }}>
                            <Box
                                sx={{
                                    width: 1,
                                    height: isFocus ? '2px' : '1px',
                                    backgroundColor: isFocus ? blue['400'] : blue['200'],
                                    borderRadius: 4
                                }}
                            />
                        </Box>
                    }

                </Box>


                {!readOnly &&
                    <Collapse in={isFocus}>
                        <Box sx={{
                            display: 'flex',
                            gap: 2,
                            flexWrap: 'wrap',
                            justifyContent: 'start',
                            px: 1,
                            mb: 2,
                        }}>
                            <InlineStyleControls
                                editorState={editorState}
                                onChange={handleInlineStyling}
                            />
                            <LinkButton
                                editorState={editorState}
                                onInsert={handleLink}
                                onRemoveLink={handleRemoveLink}
                            />


                        </Box>

                    </Collapse>


                }

            </Stack>



        </Box>

    )
}

TextEditor.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    hideToolbar: PropTypes.bool,
    readOnly: PropTypes.bool,
}

TextEditor.defaultProps = {
    placeholder: '',
    hideToolbar: false,
    readOnly: false,
    onChange: (e) => { },
    value: ''

}



export default TextEditor

