import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/system'
import { Avatar, ButtonGroup, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, IconButton, Skeleton, Stack, styled, Tooltip, Typography } from '@mui/material'
import { useGetQuery, useLazyGetQuery } from '../../../features/generalSlice'
import moment from 'moment'
import { Delete, Edit, ExpandMoreOutlined } from '@mui/icons-material'
import { green, grey } from '@mui/material/colors'
import AvatarLink from '../../../components/Navigation/AvatarLink'


const useUser = (id) => {
    const { data, isLoading } = useGetQuery({ url: `users/${id}` })
    const [user, setUser] = useState({
        name: '',
        username: '',
        avatar: '',
        id: ''
    })

    useEffect(() => {
        if (data) {
            setUser({
                name: data?.user_profile?.name,
                username: data?.username,
                avatar: data?.user_profile?.avatar,
                id: data?.id
            })
        }
    }, [data])


    return { user, isLoading }
}



const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const QuestionContainer = props => {
    const [expanded, setExpanded] = useState(false)
    const { data, onDelete, onEdit } = props

    const { user, isLoading: loadingUser } = useUser(data.createdBy)


    return (
        <Card>
            <CardHeader
                avatar={
                    loadingUser ? (
                        <Skeleton animation="wave" variant="circular" width={40} height={40} />
                    ) : (
                        <AvatarLink
                            user={user}
                        />
                    )

                }
                title={loadingUser ? <Skeleton animation={'wave'} height={10} width="40%" /> : `Added by ${user.name}`}
                subheader={moment(data?.createdAt).startOf('minutes').fromNow()}
                action={(
                    <ButtonGroup sx={{ gap: 2 }}>
                        <Tooltip title={'Delete Question'}>
                            <IconButton onClick={() => { onDelete(data.id) }} >
                                <Delete />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title={'Edit Question'}>
                            <IconButton onClick={() => { onEdit(data.id) }}>
                                <Edit />
                            </IconButton>
                        </Tooltip>
                    </ButtonGroup>

                )}

            />
            <CardContent>
                <Stack sx={{ px: 4 }}>
                    {
                        data.imgUrl &&
                        <Box display={'flex'} justifyContent={'center'} mb={2}>
                            <Box component={'img'} src={data.imgUrl} alt={data.id} sx={{ maxHeight: { xs: 200, sm: 300, md: 350 }, objectFit: 'contain' }} />
                        </Box>
                    }
                    <Box display={'flex'} justifyContent={'center'}>
                        <Typography textAlign={'center'} fontSize={20}>
                            <div dangerouslySetInnerHTML={{ __html: data.question }} />
                        </Typography>
                    </Box>
                </Stack>
            </CardContent>
            <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Box display={'flex'} alignItems={'center'} justifyContent={'end'} px={2}>
                    <Typography>Show Options</Typography>
                    <ExpandMore expand={expanded} onClick={() => { setExpanded(!expanded) }}>
                        <ExpandMoreOutlined />
                    </ExpandMore>
                </Box>

            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                        {
                            data.options.map(option => {
                                return (
                                    <Box sx={{
                                        p: 2, border: 1, borderColor: grey[400], borderRadius: 4, flexGrow: 1,
                                        backgroundColor: option.isAnswer ? green[500] : null, color: option.isAnswer ? 'white' : 'inherit'
                                    }}>
                                        {
                                            option.imgUrl &&
                                            <Box display={'flex'} justifyContent={'center'} mb={2}>
                                                <Box component={'img'} src={option.imgUrl} alt={option.id} sx={{ maxHeight: { xs: 100, sm: 200, md: 250 }, objectFit: 'contain' }} />
                                            </Box>
                                        }

                                        <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                                            <Typography textAlign={'center'}>
                                                <div dangerouslySetInnerHTML={{ __html: option.option }} />
                                            </Typography>
                                        </Box>

                                    </Box>


                                )
                            })
                        }
                    </Box>
                </CardContent>
            </Collapse>

        </Card>
    )
}

QuestionContainer.propTypes = {
    data: PropTypes.object,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func
}

QuestionContainer.defaultProps = {
    onDelete: (id) => { },
    onEdit: (id) => { }
}

export default QuestionContainer