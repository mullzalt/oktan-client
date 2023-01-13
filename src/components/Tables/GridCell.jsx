import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/system'
import { Grid, Stack, Typography } from '@mui/material'

const GridCell = props => {
    const { data, columns } = props

    return (
        <React.Fragment>
            <Box sx={{ p: 4 }}>
                <Stack>
                    {columns &&
                        data &&
                        columns.map(col => (
                            <Grid key={col.col} container columns={12} columnGap={2} direction={'row'} padding={1} alignItems={'baseline'}>
                                <Grid item xs={12} sm={4} md={4}>
                                    <Typography
                                        variant={col.variant || 'body1'}
                                        fontWeight={col.fontWeight || 'bold'}
                                        fontStyle={col.fontStyle || ''}
                                    >
                                        {col.label}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} sm={6} md={6}>
                                    <Typography variant={data.variant || 'body2'}
                                        fontWeight={data.fontWeight || 'regular'}>
                                        {data[col.col]}
                                    </Typography>
                                </Grid>
                            </Grid>
                        ))
                    }

                </Stack>
            </Box>

        </React.Fragment>
    )
}

GridCell.propTypes = {
    data: PropTypes.object.isRequired,
    columns: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default GridCell