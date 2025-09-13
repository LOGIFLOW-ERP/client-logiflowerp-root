import { createRepository } from '../baseRepository'
import { ScrapingCredentialENTITY } from 'logiflowerp-sdk'
import { getBaseApiRoot } from './baseApi'

const schema = 'masters'
const resource = 'scrapingcredential'

const path = `${schema}/${resource}`

export const scrapingCredentialApi = createRepository<ScrapingCredentialENTITY, string>(path, getBaseApiRoot(path))

export const {
    useGetAllQuery: useGetScrapingCredentialsQuery,
    useGetByIdQuery: useGetScrapingCredentialByIdQuery,
    useCreateMutation: useCreateScrapingCredentialMutation,
    useUpdateMutation: useUpdateScrapingCredentialMutation,
    useDeleteMutation: useDeleteScrapingCredentialMutation,
} = scrapingCredentialApi
