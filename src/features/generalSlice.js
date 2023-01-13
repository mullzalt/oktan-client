const { apiSlice } = require("../app/apiSlice");


export const generalSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        Post: builder.mutation({
            query: (payload) => {
                const { params, id, body, url } = payload
                return {
                    url: `/${url}`,
                    method: 'POST',
                    params: params,
                    body: body
                }
            }
        }),

        Put: builder.mutation({
            query: (payload) => {
                const { params, body, url } = payload
                return {
                    url: `/${url}`,
                    method: 'PUT',
                    params: params,
                    body: body
                }
            }
        }),

        Delete: builder.mutation({
            query: (payload) => {
                const { params, body, url } = payload
                return {
                    url: `/${url}`,
                    method: 'DELETE',
                    params: params,
                    body: body
                }
            }
        }),

        Get: builder.query({
            query: (payload) => {
                const { params, body, url } = payload
                return {
                    url: `/${url}`,
                    method: 'GET',
                    params: params,
                    body: body
                }
            }
        }),


    })
})

export const {
    useDeleteMutation,
    useGetQuery,
    useLazyGetQuery,
    usePostMutation,
    usePutMutation
} = generalSlice