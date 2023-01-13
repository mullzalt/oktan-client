const { apiSlice } = require("../../app/apiSlice");


export const cbtSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getQuestions: builder.query({
            query: (payload) => {
                const { params, id } = payload
                return {
                    url: `/cbts/${id}/questions`,
                    method: 'GET',
                    params: params
                }
            }
        }),


    })
})

export const {
} = cbtSlice