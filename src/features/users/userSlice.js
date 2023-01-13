const { apiSlice } = require("../../app/apiSlice");


export const userSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: (params) => {
                return {
                    url: `/users`,
                    method: 'GET',
                    params: params
                }
            }
        }),

        getMe: builder.query({
            query: (params) => {
                return {
                    url: `/me`,
                    method: 'GET',
                    params: params
                }
            }
        }),


    })
})

export const {
    useGetUsersQuery,
    useGetMeQuery
} = userSlice