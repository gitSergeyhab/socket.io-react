import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Data } from '../types'
import { SERVER_URL } from '../const'



export const testApi = createApi({
    reducerPath: 'testApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${SERVER_URL}api/test/` }),
    endpoints: (build) => ({
        getRooms: build.query<Data[], null>({
            query: () => 'rooms'
        }),
        getUsers: build.query<Data[], null>({
            query: () => 'users'
        }),
    })
})


export const {useGetRoomsQuery, useGetUsersQuery} = testApi
