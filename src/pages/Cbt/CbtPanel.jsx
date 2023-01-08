import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';

import MenuTab, { TabPanel } from '../../components/Tabs/MenuTab'
import GroupIcon from '@mui/icons-material/Group';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AirplayIcon from '@mui/icons-material/Airplay';
import CbtEditor from './CbtEditor';

const tabList = [
    { label: 'Cbt', icon: <LocalLibraryIcon /> },
    { label: 'Question', icon: <LibraryBooksIcon /> },
    { label: 'Members', icon: <GroupIcon /> },
    { label: 'Live Testing', icon: <AirplayIcon /> }
]

const CbtPanel = () => {
    const { id } = useParams()

    const [tabIndex, setTabIndex] = useState(0)

    const handleTabs = (event, index) => {
        setTabIndex(index)
    }

    return (
        <div>
            <MenuTab tabList={tabList} title={'Cbt-panel'} onMenuChage={handleTabs} currentIndex={tabIndex} />
            <TabPanel value={tabIndex} index={0}>
                <CbtEditor />
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

export default CbtPanel