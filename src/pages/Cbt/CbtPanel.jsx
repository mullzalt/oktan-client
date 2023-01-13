import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';

import MenuTab, { TabPanel } from '../../components/Tabs/MenuTab'
import GroupIcon from '@mui/icons-material/Group';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AirplayIcon from '@mui/icons-material/Airplay';
import CbtEditor from './CbtEditor';
import { Box } from '@mui/system';
import Spinner from '../../components/Spinner';
import { toast } from 'react-toastify';
import { Photo } from '@mui/icons-material';
import ImageForm from '../../components/Files/ImageForm';
import { Button } from '@mui/material';


import { useGetCbtByIdQuery, useUpdateCbtCoverMutation, useUpdateCbtMutation } from '../../features/cbts/cbtSlice';
import { LoadingButton } from '@mui/lab';
import CbtQuestion from './CbtQuestion';
import useQuery from '../../components/hooks/useQuery';


const tabList = [
    { label: 'Cbt', icon: <LocalLibraryIcon /> },
    { label: 'Cover', icon: <Photo /> },
    { label: 'Question', icon: <LibraryBooksIcon /> },
    { label: 'Members', icon: <GroupIcon /> },
    { label: 'Live Testing', icon: <AirplayIcon /> }
]

const queryParam = {
    0: 'edit',
    1: 'cover',
    2: 'questions',
    3: 'members',
    4: 'test'
}

const paramValue = {
    edit: 0,
    cover: 1,
    questions: 2,
    members: 3,
    test: 4
}



const CbtPanel = () => {
    const [queryParams, setQueryParams] = useSearchParams()
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState(null)

    const query = useQuery()

    const component = query.get('component') || 'edit'

    const [tabIndex, setTabIndex] = useState(paramValue[component])

    const navigate = useNavigate()

    const { data,
        isLoading,
        refetch,
        isFetching
    } = useGetCbtByIdQuery({ id })


    const [update,
        { isLoading: isUpdating,
            isError: isUpdateError,
            error: updateError,
            isSuccess: isUpdateSuccess
        }] = useUpdateCbtMutation()

    const [uploadCover,
        { isLoading: isCoverUpdate,
            isError: isCoverError,
            error: coverError,
            isSuccess: isCoverSuccess
        }] = useUpdateCbtCoverMutation()

    useEffect(() => {
        if (isUpdating) {
            toast.loading('Updating cbt data...', {
                toastId: 'UPDATE TOAST'
            })
            setLoading(true)
        }

        if (isUpdateError) {
            setTimeout(() => {
                toast.update('UPDATE TOAST', {
                    render: updateError.data.message,
                    type: toast.TYPE.ERROR,
                    autoClose: 2000,
                    closeButton: true,
                    isLoading: false
                })
                setLoading(false)
            }, 1000)
        }

        if (isUpdateSuccess) {
            refetch()
            setTimeout(() => {
                toast.update('UPDATE TOAST', {
                    render: 'Update success',
                    type: toast.TYPE.SUCCESS,
                    autoClose: 2000,
                    closeButton: true,
                    isLoading: false
                })
                setLoading(false)
            }, 1000)
        }
        return () => clearTimeout()
    }, [isUpdateSuccess, isUpdateError, isUpdating])

    useEffect(() => {
        if (isCoverUpdate) {
            toast.loading('Uploading image...', {
                toastId: 'UPLOAD_TOAST'
            })
            setLoading(true)
        }

        if (isCoverError) {
            setTimeout(() => {
                toast.update('UPLOAD_TOAST', {
                    render: coverError.data.message,
                    type: toast.TYPE.ERROR,
                    autoClose: 2000,
                    closeButton: true,
                    isLoading: false
                })
                setLoading(false)
            }, 1000)
        }

        if (isCoverSuccess) {
            refetch()
            setTimeout(() => {
                toast.update('UPLOAD_TOAST', {
                    render: 'Upload success',
                    type: toast.TYPE.SUCCESS,
                    autoClose: 2000,
                    closeButton: true,
                    isLoading: false
                })
                setLoading(false)
            }, 1000)
        }
        return () => clearTimeout()
    }, [isCoverSuccess, isCoverError, isCoverUpdate])

    const handleTabs = (event, index) => {
        navigate(`?component=${queryParam[index]}`)
        setTabIndex(index)
    }

    const handleUpdateCbt = async (cbtData) => {
        await update({ id: id, body: cbtData })
    }

    const handleFile = (file) => {
        setFile(file)
    }

    const handleUpload = async () => {
        const formData = new FormData
        formData.append('file', file, 'cbt_cover.png')

        await uploadCover({ body: formData, id: id })
    }

    const handleRemoveImage = async () => {
        await update({ id: id, body: { imgUrl: null } })
    }


    return (
        <>
            <Spinner open={isLoading} />
            {
                data &&
                <Box>
                    <MenuTab tabList={tabList} title={'Cbt-panel'} onMenuChage={handleTabs} currentIndex={tabIndex} />
                    <TabPanel value={tabIndex} index={0}>
                        <CbtEditor data={data} onSave={handleUpdateCbt} isLoading={loading} variant={'update'} />
                    </TabPanel>

                    <TabPanel value={tabIndex} index={1}>
                        <ImageForm
                            title={'Cover Image'}
                            src={data.imgUrl}
                            onDelete={handleRemoveImage}
                            onFileChange={handleFile} />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 5, }}>
                            <LoadingButton
                                variant='contained' disabled={!Boolean(file)} onClick={handleUpload}
                                loading={loading}
                            >
                                Upload
                            </LoadingButton>
                        </Box>
                    </TabPanel>

                    <TabPanel value={tabIndex} index={2}>
                        <CbtQuestion />
                    </TabPanel>

                    <TabPanel value={tabIndex} index={3}>
                        Live Testing
                    </TabPanel>
                </Box>
            }
        </>
    )
}

export default CbtPanel