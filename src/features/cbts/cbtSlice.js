const { apiSlice } = require("../../app/apiSlice");


export const cbtSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCbts: builder.query({
            query: (params) => {
                return {
                    url: `/cbts`,
                    method: 'GET',
                    params: params
                }
            }
        }),
        getCbtById: builder.query({
            query: (payload) => {
                const {id, params} = payload
                return {
                    url: `/cbts/${id}`,
                    method: 'GET',
                    params: params
                }
            }
        }),
        updateCbt: builder.mutation({
            query: (payload) => {
                const {id, body} = payload
                return {
                    url: `/cbts/${id}`,
                    method: 'PUT',
                    body: body
                }
            }
        }),



    })
})

export const {
    useGetCbtsQuery, 
    useGetCbtByIdQuery,
    useUpdateCbtMutation
} = cbtSlice