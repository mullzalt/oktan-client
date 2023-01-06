import { Paper } from "@mui/material"
import { Box } from "@mui/system"
import { useFieldArray, useForm } from "react-hook-form"

export const QuestionPreview = (props) => {


}

const OptionForm = (props) => {

}

const QuestionForm = (props) => {
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
                Question
            </Paper>
        </>
    )
}




export default QuestionForm