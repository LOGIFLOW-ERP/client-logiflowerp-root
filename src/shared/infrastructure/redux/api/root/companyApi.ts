import { createRepository } from '../baseRepository'
import { RootCompanyENTITY } from 'logiflowerp-sdk'
import { getBaseApiRoot } from './baseApi'
import { transformErrorResponse } from '../transformErrorResponse'

const schema = 'masters'
const resource = 'company'

const path = `${schema}/${resource}`

export const companyApi = createRepository<RootCompanyENTITY, string>(path, getBaseApiRoot(path))
    .injectEndpoints({
        endpoints: (builder) => ({
            getActive: builder.query<RootCompanyENTITY[], void>({
                query: () => `${path}/get-active`,
                providesTags: (result) =>
                    result ? [{ type: path, id: `LIST1${path}` }] : [],
                transformErrorResponse
            }),
        })
    })

export const {
    useGetAllQuery: useGetRootCompaniesQuery,
    useGetByIdQuery: useGetRootCompanyByIdQuery,
    useCreateMutation: useCreateRootCompanyMutation,
    useUpdateMutation: useUpdateRootCompanyMutation,
    useGetActiveQuery: useGetActiveRootCompaniesQuery
} = companyApi;
