import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Toolbar, Typography } from '@mui/material'

const TableMain = props => {

    const { title, columns, data, page, onPageChange, onRowsPerPageChange, count, rowsPerPage, onSort, selectedSort, sortDir } = props



    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', boxShadow: 4 }}>
            <TableContainer sx={{ maxHeight: 520 }}>
                <Table stickyHeader aria-label={title} >
                    <TableHead>
                        <TableRow>
                            {columns &&
                                columns.map((column) => (
                                    <TableCell
                                        key={column.colName}
                                        align={column?.align ? column.align : 'left'}
                                        style={{ minWidth: column?.minWidth ? column.minWidth : 170 }}
                                    >

                                        {column?.disableSorting ?
                                            <Typography>{column.label}</Typography> :
                                            <TableSortLabel
                                                active={selectedSort === column.colName}
                                                direction={selectedSort === column.colName ? sortDir.toLowerCase() : 'desc'}
                                                onClick={() => {
                                                    onSort(column.colName)
                                                }}
                                            >
                                                {column.label}
                                            </TableSortLabel>
                                        }


                                    </TableCell>
                                ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {data &&
                            data.map((row) => {
                                return (
                                    <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
                                        {
                                            columns.map(col => {
                                                return (
                                                    <TableCell key={col.colName}>
                                                        {row?.[col.colName]}
                                                    </TableCell>
                                                )
                                            })
                                        }

                                    </TableRow>
                                )
                            })
                        }

                    </TableBody>

                </Table>


            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50, 75, 100]}
                component={'div'}
                count={count}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
            >

            </TablePagination>

        </Paper>
    )
}

TableMain.propTypes = {
    title: PropTypes.string,
    labels: PropTypes.arrayOf(PropTypes.string),
    data: PropTypes.arrayOf(PropTypes.object),
    page: PropTypes.number,
    onPageChange: PropTypes.func,
    onRowsPerPageChange: PropTypes.func,
    count: PropTypes.number,
    rowsPerPage: PropTypes.number,
    onSort: PropTypes.func,
    selectedSort: PropTypes.string,
    sortDir: PropTypes.string
}

TableMain.defaultProps = {
    onSort: (col) => { }
}

export default TableMain