import { Box } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useEffect } from 'react'
import CbtCard from '../../components/Cbt/CbtCard'
import useDocumentTitle from '../../components/hooks/useDocumentTitle'
import useFormatDate from '../../components/hooks/useFormatDate'


const cbtData = [
    {
        id: 'adsf-sdflk-1232',
        title: 'FUCK YOU anjing sia bangsat setan',
        startDate: "	2023-07-01 09:55:51",
        endDate: "	2023-09-01 09:55:51",
        duration: 60,
        requireCompetition: [
            { id: 1 },
            { id: 2 },
        ],
        memberCount: 90,
        imgUrl: 'https://img.freepik.com/free-vector/colourful-science-work-concept_23-2148539571.jpg?w=2000'
    },
    {
        id: 'adsf-sfdd-1232',
        title: 'FUCK HER',
        startDate: "	2023-07-01 09:55:51",
        endDate: "	2023-08-01 09:55:51",
        duration: 90,
        requireCompetition: [],
        memberCount: 80,
        imgUrl: 'https://img.freepik.com/free-vector/colourful-science-work-concept_23-2148539571.jpg?w=2000'
    },
]


const CbtMain = () => {
    useDocumentTitle('CBT')
    const formatDate = useFormatDate()


    return (
        <div>

            <Stack spacing={6}>
                {
                    cbtData.map((data, index) => {
                        return (
                            <CbtCard key={data.id}
                                id={data.id}
                                title={data.title}
                                subHeader={formatDate(data.startDate)}
                                imgUrl={data.imgUrl}
                            >
                                <Box sx={{ p: 4 }}>
                                    Test
                                </Box>
                            </CbtCard>
                        )
                    })
                }
            </Stack>

        </div>
    )
}

export default CbtMain