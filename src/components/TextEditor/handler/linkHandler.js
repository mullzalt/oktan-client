import { Link } from "@mui/material";
import { CompositeDecorator, EditorState, Modifier } from "draft-js";



const LinkComponent = ({contentState, entityKey, children}) => {
    const {url, linkText} = contentState.getEntity(entityKey).getData()

    return(
        <Link href={url} target={'_blank'}>
            {linkText || children}
        </Link>
    )
}



const findLinkEntities = (contentBlock, callback, contentState) => {
    contentBlock.findEntityRanges((character) => {
        const entityKey = character.getEntity();
        return (
            entityKey !== null &&
            contentState.getEntity(entityKey).getType() === "LINK"
        );
    }, callback);
};




export const linkDecorator = () => new CompositeDecorator([
    {
        strategy: findLinkEntities,
        component: LinkComponent
    }
])


export const onAddLink = (link, displayText, editorState, setEditorState) => {
    const decorator = linkDecorator();

    let hyperLink = link 
    if(!link.includes('http://')){
        if(!link.includes('https://')){
            hyperLink = `http://${link}`
        }
    }

    const currentContent = editorState.getCurrentContent()

    currentContent.createEntity('LINK', 'IMUTABLE', {
        url: hyperLink, 
        target: '_blank'
    })
    
    const entityKey = currentContent.getSelection()

    const selection = editorState.getSelection()

    const textWithEntity = Modifier.replaceText(
        currentContent, 
        selection,
        displayText,
        editorState.getCurrentInlineStyle(), 
        entityKey
    )

    const newState = EditorState.createWithContent(textWithEntity, decorator)
    setEditorState(newState)
};