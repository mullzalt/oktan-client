import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/system'
import { useGetQuery } from '../../../features/generalSlice'
import { Link, Outlet, useParams } from 'react-router-dom'
import { Tab, Tabs } from '@mui/material'
import { ExitToApp, JoinFull, LocalLibrary } from '@mui/icons-material'

const CbtPage = props => {

    const { id } = useParams()

    const { data: cbtData } = useGetQuery({ url: `cbts/${id}` })
    const { data: questionData } = useGetQuery({ url: `cbts/${id}/questions` })

    const [tab, setTab] = useState(0)




    return (
        <Box>

            <Tabs
                onChange={(e, v) => {
                    setTab(v)
                }}
                value={tab}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="cbt tab panel">
                <Tab component={Link} icon={<LocalLibrary />} label={'info'} to={'info'} iconPosition={'start'} key={'info'} />
                <Tab component={Link} icon={<ExitToApp />} label={'join'} to={'join'} iconPosition={'start'} key={'join'} />
            </Tabs>

            <Box sx={{ py: 4 }}>
                <Outlet />
            </Box>


        </Box>
    )
}

CbtPage.propTypes = {}

export default CbtPage