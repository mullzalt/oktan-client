
import { Avatar, Box, Grid, Stack } from '@mui/material'
import React, { useState } from 'react'
import SearchAppBar from '../../components/Navigation/SearchBar'
import Spinner from '../../components/Spinner'
import TableMain from '../../components/Tables/TableMain'
import { useGetUsersQuery } from '../../features/users/userSlice'


const column = [
    { colName: 'userAvatar', label: '', minWidth: 54, disableSorting: true },
    { colName: 'username', label: 'Username' },
    { colName: 'name', label: 'Name' },
    { colName: 'roles', label: 'Role' },
    { colName: 'email', label: 'Email' },
    { colName: 'institute', label: 'Institute' },
    { colName: 'phone', label: 'Phone' },
]


const UserTableAdmin = ({ sx }) => {
    const [params, setParams] = useState({
        page: 1,
        size: 25,
        search: '',
        verified: '',
        role: '',
        orderBy: '',
        sortDir: 'ASC'
    })

    const { data, isLoading, refecth, isFetching } = useGetUsersQuery(params)

    const handlePagChange = (e, newPage) => {
        setParams(prev => ({
            ...prev,
            page: newPage + 1
        }))
    }

    const formattedData = (data) => {

        var newData = []

        data.rows.map(row => {
            newData = [...newData, Object.assign({},
                { ...row },
                { ...row?.user_profile },
                { userAvatar: <Avatar sx={{ width: 40, height: 40 }} src={row?.user_profile?.avatar}></Avatar> })]
        })

        return newData
    }

    const handleRowsPerPageChange = (e) => {
        setParams(prev => ({
            ...prev,
            size: parseInt(e.target.value),
            page: 1
        }))

    }

    const handleSeachChange = (e) => {
        setParams(prev => ({
            ...prev,
            search: e.target.value,
            page: 1
        }))
    }

    const handleSorting = (col) => {

        let newDir

        if (params.sortDir === 'ASC') {
            newDir = 'DESC'
        }
        if (params.sortDir === 'DESC') {
            newDir = 'ASC'
        }

        setParams(prev => ({
            ...prev,
            orderBy: col,
            sortDir: newDir
        }))
    }

    return (
        <Box sx={{ ...sx, }}>

            <Spinner open={isLoading || isFetching} />


            {data &&
                <Stack gap={2} >

                    <Grid container columns={12} justifyContent={'flex-end'} alignItems={'flex-start'}>
                        <Grid item md={4} xs={12} sm={8}>
                            <SearchAppBar
                                onChange={handleSeachChange}
                                placeholder={'Search user...'}
                            />
                        </Grid>

                    </Grid>



                    <TableMain
                        page={params.page - 1}
                        count={data.totalItems}
                        rowsPerPage={params.size}
                        columns={column}
                        data={formattedData(data)}
                        onPageChange={handlePagChange}
                        onRowsPerPageChange={handleRowsPerPageChange}
                        onSort={handleSorting}
                        sortDir={params.sortDir}
                        selectedSort={params.orderBy}
                    />
                </Stack>
            }

        </Box>
    )
}

export default UserTableAdmin