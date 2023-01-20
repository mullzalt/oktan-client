import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { convertToRaw, EditorState, ContentState, } from "draft-js";
import { convertToHTML } from "draft-convert";
import draftToHtmlPuri from "draftjs-to-html";

import './rte.css'
import htmlToDraft from "html-to-draftjs";


const toolbarOptions = {
    options: ["inline", "textAlign", "fontSize", "link", "colorPicker", 'remove', 'history'],
    inline: {
        options: ["bold", "italic", "underline", "strikethrough", 'monospace', 'superscript', 'subscript'],
    },
    textAlign: {
        inDropdown: true,
        options: ['left', 'center', 'right', 'justify']
    },
};

const RTE = props => {
    const { onChange, value, placeholder, hideToolbar, readOnly } = props
    const initialValue = value ? value : '<p></p>'

    const blocksFromHtml = htmlToDraft(initialValue);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);

    const [editorState, setEditorState] = useState(
        () => EditorState.createWithContent(contentState)
    );

    const handleChange = (newEditorState) => {
        setEditorState(newEditorState)
    }

    useEffect(() => {
        const htmlPuri = draftToHtmlPuri(
            convertToRaw(editorState.getCurrentContent())
        );
        onChange(htmlPuri)
    }, [editorState])

    const editorRef = useRef()


    return (
        <div>
            <Editor
                toolbarHidden={hideToolbar}
                ref={editorRef}
                editorState={editorState}
                onEditorStateChange={handleChange}
                wrapperClassName="editor-wrapper"
                editorClassName="message-editor"
                toolbarClassName="message-toolbar"
                toolbar={toolbarOptions}
                placeholder={placeholder}
                readOnly={readOnly}
            />


        </div>
    )
}

RTE.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    hideToolbar: PropTypes.bool,
    readOnly: PropTypes.bool
}

RTE.defaultProps = {
    placeholder: 'Type something...',
    hideToolbar: false,
    readOnly: false,
    onChange: (e) => {

    }
}

export default RTE