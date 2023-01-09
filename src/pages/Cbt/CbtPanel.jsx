import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';

import MenuTab, { TabPanel } from '../../components/Tabs/MenuTab'
import GroupIcon from '@mui/icons-material/Group';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AirplayIcon from '@mui/icons-material/Airplay';
import CbtEditor from './CbtEditor';
import { useGetCbtByIdQuery, useUpdateCbtMutation } from '../../features/cbts/cbtSlice';
import { Box } from '@mui/system';
import Spinner from '../../components/Spinner';
import { toast } from 'react-toastify';

const tabList = [
    { label: 'Cbt', icon: <LocalLibraryIcon /> },
    { label: 'Question', icon: <LibraryBooksIcon /> },
    { label: 'Members', icon: <GroupIcon /> },
    { label: 'Live Testing', icon: <AirplayIcon /> }
]

const CbtPanel = () => {
    const { id } = useParams()
    const [loading, setLoading] = useState(false)

    const [tabIndex, setTabIndex] = useState(0)

    const { data, isLoading, refetch, isFetching } = useGetCbtByIdQuery({ id })
    const [update, { isLoading: isUpdating, isError: isUpdateError, error: updateError, isSuccess: isUpdateSuccess }] = useUpdateCbtMutation()


    useEffect(() => {
        if (isUpdating) {
            toast.loading('Updating cbt data...', {
                toastId: 'UPDATE TOAST'
            })
            setLoading(true)
        }

        if (isUpdateError) {
            toast.update('UPDATE TOAST', { type: toast.TYPE.ERROR, render: updateError.data.message })
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


    return (
        <>
            <Spinner open={isLoading} />
            {
                data &&
                <Box>
                    <MenuTab tabList={tabList} title={'Cbt-panel'} onMenuChage={handleTabs} currentIndex={tabIndex} />
                    <TabPanel value={tabIndex} index={0}>
                        <CbtEditor data={data} onSave={handleUpdateCbt} isLoading={loading} />
                    </TabPanel>

                    <TabPanel value={tabIndex} index={1}>
                        Question Edit

                    </TabPanel>

                    <TabPanel value={tabIndex} index={2}>
                        Member List
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