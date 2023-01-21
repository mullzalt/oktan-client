import React, { useEffect, useRef, useState } from 'react'
import { Link, Outlet, useNavigate, useParams, useSearchParams } from 'react-router-dom'

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
import { Button, Tab, Tabs } from '@mui/material';


import { useGetCbtByIdQuery, useUpdateCbtCoverMutation, useUpdateCbtMutation } from '../../features/cbts/cbtSlice';
import { LoadingButton } from '@mui/lab';
import CbtQuestion from './CbtQuestion';
import useQuery from '../../components/hooks/useQuery';
import CbtQuestionPanel from './CbtQuestionPanel';
import CbtPreview from './CbtPreview';




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

    const [tabIndex, setTabIndex] = useState(0)

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
                    render: `Update error: ${updateError.data?.message}`,
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

    const handleTabs = (event, index) => {
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

        await update({ body: formData, id: id })
    }

    const handleRemoveImage = async () => {
        await update({ id: id, body: { imgUrl: null } })
    }

    const tabList = [
        { label: 'Cover', icon: <Photo /> },
        { label: 'Question', icon: <LibraryBooksIcon /> },
        { label: 'Members', icon: <GroupIcon /> },
        { label: 'Preview', icon: <AirplayIcon /> }
    ]


    return (
        <>
            <Spinner open={isLoading} />
            {
                data &&
                <Box>


                    <Tabs
                        onChange={handleTabs}
                        value={tabIndex}
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="cbt tab panel">
                        <Tab component={Link} icon={<LocalLibraryIcon />} label={'EDIT'} to={'edit'} iconPosition={'start'} key={'edit'} />
                        <Tab component={Link} icon={<LibraryBooksIcon />} label={'Question'} to={'questions'} iconPosition={'start'} key={'Question'} />
                        <Tab component={Link} icon={<GroupIcon />} label={'Members'} to={'members'} iconPosition={'start'} key={'Members'} />
                        <Tab component={Link} icon={<AirplayIcon />} label={'Preview'} to={'preview'} iconPosition={'start'} key={'Preview'} />
                    </Tabs>


                    <Outlet />

                    {/* <TabPanel value={tabIndex} index={2}>
<CbtQuestionPanel cbtId={data.id} optionCount={data.optionCount} />
</TabPanel>

<TabPanel value={tabIndex} index={3}>
Live Testing
</TabPanel>

<TabPanel value={tabIndex} index={4}>
<CbtPreview cbtId={data.id} />
</TabPanel> */}





                </Box>
            }
        </>
    )
}

export default CbtPanel

