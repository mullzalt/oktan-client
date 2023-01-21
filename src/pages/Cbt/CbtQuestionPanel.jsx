import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { Box } from '@mui/system'



import { useDeleteMutation, useGetQuery, usePostMutation, usePutMutation } from '../../features/generalSlice'
import ActionButton from '../../components/Menu/ActionButton'
import QuestionForm from './question/QuestionForm'
import ActionDial from '../../components/Menu/ActionDial'
import QuestionEditor from './question/QuestionEditor'
import Spinner from '../../components/Spinner'
import { Button, Dialog, DialogContent, DialogTitle, Divider, Slide, Stack, TablePagination, Typography } from '@mui/material'
import { toast } from 'react-toastify'
import TextEditor from '../../components/TextEditor/TextEditor'
import { grey } from '@mui/material/colors'
import QuestionContainer from './question/QuestionContainer'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../features/auth/authSlice'
import ConfirmDialog from '../../components/Cards/ConfirmDialog'
import SearchAppBar from '../../components/Navigation/SearchBar'
import { useParams } from 'react-router-dom'



const initialState = {
    success: false,
    loading: false,
    error: false,
    message: '',
    toastId: ''
}


const CbtEditDialog = props => {

    const { onClose, open, cbtId, questionId, onSuccess, optionCount } = props

    const [state, setState] = useState(initialState)

    const { data, isLoading, refetch } = useGetQuery({ url: `cbts/${cbtId}/questions/${questionId}` })

    useEffect(() => {
        if (state.loading) {
            toast.loading(state.message, {
                toastId: state.toastId
            })
        }

        if (state.error) {
            toast.update(state.toastId, {
                render: state.message,
                type: toast.TYPE.ERROR,
                autoClose: 1500,
                closeButton: true,
                isLoading: false
            })
            setState(initialState)
        }

        if (state.success) {
            toast.update(state.toastId, {
                render: state.message,
                type: toast.TYPE.SUCCESS,
                autoClose: 1500,
                closeButton: true,
                isLoading: false
            })
            refetch()
            onSuccess()
            setState(initialState)
        }

    }, [state.success, state.loading, state.error])

    const [put] = usePutMutation()

    const handleSubmit = async (data) => {
        setState(prev => ({ ...prev, toastId: 'UPDATE', loading: true, message: 'Updating question...' }))
        try {
            const form = new FormData()

            const { imgUrl, ...question } = data?.question
            for (var key in question) {
                form.append(key, question[key])
            }
            await put({ url: `cbts/${cbtId}/questions/${questionId}`, body: form }).unwrap()

            if (question.removedImage) {
                await put({ url: `cbts/${cbtId}/questions/${questionId}`, body: { imgUrl: null } }).unwrap()
            }

            data.options.map(async (option) => {
                const optionForm = new FormData()
                const { imgUrl, ...op } = option

                for (var key in op) {
                    optionForm.append(key, option[key])
                }
                await put({ url: `cbts/${cbtId}/questions/${questionId}/options/${option.id}`, body: optionForm }).unwrap()

                if (option.removedImage) {
                    await put({ url: `cbts/${cbtId}/questions/${questionId}/options/${option.id}`, body: { imgUrl: null } }).unwrap()
                }
            })

            setState(prev => ({ ...prev, loading: false, success: true, message: 'Updated success' }))
        } catch (error) {
            setState(prev => ({ ...prev, loading: false, error: true, message: `Failed to update question: ${error.message}` }))
        }
    }



    return (
        <Dialog
            open={open}
            aria-describedby="alert-dialog-slide-description"
            onClose={(e, reason) => {
                if (reason && reason == "backdropClick") return
                onClose()
            }}
            fullWidth
            scroll='body'
            maxWidth={'md'}
            disableEscapeKeyDown={false}


        >
            <DialogTitle>Edit Question</DialogTitle>
            <DialogContent>
                {
                    data &&
                    <QuestionEditor
                        onSubmit={handleSubmit}
                        onCancel={() => {
                            onClose()
                        }}
                        data={data}
                        optionCount={optionCount}
                    />
                }

            </DialogContent>

        </Dialog>
    )
}



const CbtQuestionPanel = props => {
    // const { cbtId } = props

    const [openCreateForm, setOpenCreateForm] = useState(false)
    const [openEditForm, setOpenEditForm] = useState(false)
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
    const [questionId, setQuestionId] = useState(null)


    const [optionCount, setOptionCount] = useState(null)
    const [data, setData] = useState({})

    const cbtId = useParams().id




    const user = useSelector(selectCurrentUser)

    const [state, setState] = useState({
        success: false,
        loading: false,
        error: false,
        message: '',
        toastId: ''
    })

    const [params, setParams] = useState({
        page: 1,
        size: 10,
        search: '',
        orderBy: 'createdAt',
        sortDir: 'DESC'
    })


    const { data: questionData, isLoading, isSuccess, refetch, isFetching } = useGetQuery({
        url: `cbts/${cbtId}/questions`, params: params
    })

    const { data: cbtData, isSuccess: cbtSuccess } = useGetQuery({
        url: `cbts/${cbtId}`
    })


    useEffect(() => {
        if (questionData) {
            setData(questionData)
        }

        if (cbtData) {
            const opCount = cbtData?.optionCount
            setOptionCount(opCount)
        }
    }, [questionData, cbtSuccess])

    useEffect(() => {
        if (state.loading) {
            toast.loading(state.message, {
                toastId: state.toastId
            })
        }

        if (state.error) {
            toast.update(state.toastId, {
                render: state.message,
                type: toast.TYPE.ERROR,
                autoClose: 1500,
                closeButton: true,
                isLoading: false
            })
            setState(initialState)
        }

        if (state.success) {
            toast.update(state.toastId, {
                render: state.message,
                type: toast.TYPE.SUCCESS,
                autoClose: 1500,
                closeButton: true,
                isLoading: false
            })
            refetch()

            setOpenCreateForm(false)
            setState(initialState)
        }

    }, [state.success, state.loading, state.error])

    const [post] = usePostMutation()
    const [deleteQuestion] = useDeleteMutation()

    const handleClose = () => {

    }

    const handleSubmit = async (data) => {
        setState(prev => ({ ...prev, toastId: 'CREATE', loading: true, message: 'Creating data...' }))
        try {
            const form = new FormData()

            const question = data?.question
            for (var key in question) {
                form.append(key, question[key])
            }

            form.append('createdBy', user.id)

            const { id } = await post({ url: `cbts/${cbtId}/questions`, body: form }).unwrap()

            data.options.map(async (option) => {
                const optionForm = new FormData()
                for (var key in option) {
                    optionForm.append(key, option[key])
                }
                await post({ url: `cbts/${cbtId}/questions/${id}/options`, body: optionForm }).unwrap()
            })

            setState(prev => ({ ...prev, loading: false, success: true, message: 'Question created' }))
        } catch (error) {
            setState(prev => ({ ...prev, loading: false, error: true, message: `Failed to create new question: ${error.message}` }))
        }
    }

    const handleEdit = (id) => {
        setQuestionId(id)
        const to = setTimeout(() => {
            setOpenEditForm(true)
        }, 200)
        to()
        clearTimeout(to)
    }

    const handleDelete = (id) => {
        setQuestionId(id)
        const to = setTimeout(() => {
            setOpenConfirmDialog(true)
        }, 200)

        to()
        clearTimeout(to)
    }

    const confirmDelete = async () => {
        setOpenConfirmDialog(false)
        setState(prev => ({ ...prev, toastId: 'DELETE', loading: true, message: 'Deleting question...' }))
        try {
            await deleteQuestion({ url: `cbts/${cbtId}/questions/${questionId}` })
            setTimeout(() => {
                setState(prev => ({ ...prev, loading: false, success: true, message: 'Question created' }))
            }, 1000)

        } catch (error) {
            setTimeout(() => {
                setState(prev => ({ ...prev, loading: false, error: true, message: `Failed to create new question: ${error.message}` }))
            }, 1000)
        }
    }


    const handlePageChange = (e, newPage) => {
        setParams(prev => ({
            ...prev,
            page: newPage + 1
        }))
    }
    const handleRowsPerPageChange = (e) => {
        setParams(prev => ({
            ...prev,
            size: parseInt(e.target.value),
            page: 1
        }))

    }

    return (
        <React.Fragment>

            <Spinner open={isLoading} />
            <Dialog
                open={openCreateForm}
                aria-describedby="alert-dialog-slide-description"
                onClose={(e, reason) => {
                    if (reason && reason == "backdropClick") return
                    setOpenCreateForm(false)
                }}
                fullWidth
                scroll='body'
                maxWidth={'md'}
                disableEscapeKeyDown={false}


            >
                <DialogTitle>Insert New Question</DialogTitle>
                <DialogContent>
                    <QuestionEditor
                        onSubmit={handleSubmit}
                        onCancel={() => {
                            setOpenCreateForm(false)
                        }}
                        optionCount={optionCount}
                    />
                </DialogContent>

            </Dialog>

            {
                questionId &&
                <CbtEditDialog
                    open={openEditForm}
                    onClose={() => setOpenEditForm(false)}
                    cbtId={cbtId}
                    questionId={questionId}
                    onSuccess={() => {
                        setOpenEditForm(false)
                        refetch()
                    }}
                    optionCount={optionCount}
                />
            }

            <ConfirmDialog
                title={'Are you sure want to remove this question?'}
                actions={(
                    <Box>
                        <Button onClick={() => { setOpenConfirmDialog(false) }}>
                            Cancel
                        </Button>
                        <Button onClick={confirmDelete}>
                            Delete
                        </Button>
                    </Box>
                )}
                open={openConfirmDialog}
            >
                Deleted question cannot be restored! Still want to proceed?
            </ConfirmDialog>


            {questionData &&
                <Box sx={{ py: 6 }} >
                    <Box flexGrow={1}>
                        <Stack divider={<Divider />} gap={2} mb={6}>
                            <SearchAppBar onChange={(e) => {
                                setParams(prev => ({
                                    ...prev,
                                    search: e.target.value,
                                    page: 1
                                }))
                            }}
                                placeholder={'Search question...'}
                            />
                            <TablePagination
                                component="div"
                                count={questionData?.totalItems}
                                page={params.page - 1}
                                onPageChange={handlePageChange}
                                rowsPerPage={params.size}
                                onRowsPerPageChange={handleRowsPerPageChange}
                                rowsPerPageOptions={[1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50]}
                            />

                        </Stack>

                    </Box>

                    <Box display={'flex'} flexGrow={1} justifyContent={'center'}>
                        <Box maxWidth={'md'} sx={{ w: 1, flexGrow: 1 }}>
                            <Stack gap={6} >
                                {
                                    questionData && questionData.rows.map(row => {
                                        return (

                                            <QuestionContainer key={row.id} data={row} onEdit={handleEdit} onDelete={handleDelete} />
                                        )
                                    })
                                }

                            </Stack>
                        </Box>
                    </Box>





                </Box>


            }

            <ActionButton tooltip={'Create new Question'} onClick={() => {
                setOpenCreateForm(true)
            }} />
        </React.Fragment>
    )
}

CbtQuestionPanel.propTypes = {
    cbtId: PropTypes.any,
    optionCount: PropTypes.number
}

export default CbtQuestionPanel