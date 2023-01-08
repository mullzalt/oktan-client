import { useState } from "react"
import { Paper } from "@mui/material"
import { Box } from "@mui/system"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import TextEditor from "../TextEditor/TextEditor"
import PropTypes from 'prop-types';

export const QuestionPreview = (props) => {


}

const OptionForm = (props) => {

}

const QuestionForm = ({ onSubmit }) => {
    const [hideEditor, setHideEditor] = useState(false)
    const { register, handleSubmit, control } = useForm({
        defaultValues: {
            options: [{ id: null, option: '', imgUrl: 'https://cdn.britannica.com/16/234216-050-C66F8665/beagle-hound-dog.jpg' }]
        }
    })
    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control,
        name: "options",
    });

    return (
        <>
            <Paper elevation={3}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        control={control}
                        name={'question'}
                        defaultValue={''}
                        render={({ field: { value, onChange } }) => (
                            <TextEditor
                                hideToolbar={hideEditor}
                                onChange={onChange}
                                value={value}
                                placeholder={'enter a question'}
                            />
                        )}
                    />

                    <input type={'submit'} />
                </form>
            </Paper>
        </>
    )
}

QuestionForm.propTypes = {
    onSubmit: PropTypes.func
}

export default QuestionForm