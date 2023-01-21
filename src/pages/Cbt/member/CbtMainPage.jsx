import React, { useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useGetQuery } from '../../../features/generalSlice'
import { Box, Card, CardActionArea, CardHeader, CardMedia, Chip, Typography } from '@mui/material'
import moment from 'moment'
import Moment from 'react-moment'


import EmptyImage from '../../../assets/img/default-pictures.png'
import { blueGrey, grey } from '@mui/material/colors'
import { Stack } from '@mui/system'
import { useNavigate } from 'react-router-dom'




const CbtMainPage = props => {
    const navigate = useNavigate()

    const image = (imageUrl) => {
        if (!imageUrl) {
            return EmptyImage
        } else {
            return imageUrl
        }
    }

    const { data, isLoading } = useGetQuery({
        url: 'cbts',
        params: { archived: false }
    })

    return (
        <Box>
            <Stack gap={6}>
                {
                    data &&
                    data.rows.map(row => {
                        return (
                            <Card key={row.id}>
                                <CardHeader
                                    title={<Typography variant='h5' fontWeight={'bold'}>{row.title}</Typography>}
                                    action={
                                        <Box py={2} px={4}>
                                            <Chip variant='outlined' color='primary' label={<Moment local format='dddd, DD MMMM YYYY hh:mm [WIB]' >{row.startDate}</Moment>} />
                                        </Box>
                                    }
                                />
                                <CardActionArea onClick={() => {
                                    navigate(row.id)
                                }}>
                                    <Box display={'flex'}>
                                        <CardMedia
                                            component="img"
                                            src={image(row.imgUrl)}
                                            alt={row.title}
                                            sx={{
                                                maxHeight: 512,
                                                backgroundColor: grey[100],
                                                objectFit: 'contain',

                                            }}
                                        />
                                    </Box>
                                </CardActionArea>



                            </Card>
                        )

                    })
                }
            </Stack>

        </Box>
    )
}

CbtMainPage.propTypes = {}

export default CbtMainPage