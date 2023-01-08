import { AdminPanelSettings, People, PersonAdd, TaskAlt } from '@mui/icons-material'
import React, { useState } from 'react'
import useDocumentTitle from '../../components/hooks/useDocumentTitle'
import TableMain from '../../components/Tables/TableMain'
import MenuTab, { TabPanel } from '../../components/Tabs/MenuTab'
import UserTableAdmin from './UsersTable'

const tabList = [
    { label: 'User Table', icon: <People /> },
    { label: 'Validate Users', icon: <TaskAlt /> },
    { label: 'Create Users', icon: <PersonAdd /> },
    { label: 'Manage User Role', icon: <AdminPanelSettings /> }
]

const UsersAdminPage = () => {
    const [tabIndex, setTabIndex] = useState(0)

    const handleTabs = (event, index) => {
        setTabIndex(index)
    }

    useDocumentTitle('Admin | Users')


    return (
        <div>
            <MenuTab tabList={tabList} title={'Cbt-panel'} onMenuChage={handleTabs} currentIndex={tabIndex} />
            <TabPanel value={tabIndex} index={0}>
                <UserTableAdmin sx={{ mt: 2 }} />
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

        </div>
    )
}

export default UsersAdminPage