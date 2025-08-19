import { createRepository } from '../baseRepository'
import { SystemOptionENTITY } from 'logiflowerp-sdk'
import { getBaseApiRoot } from './baseApi';

const schema = 'masters'
const resource = 'systemoption'

const path = `${schema}/${resource}`

export const systemOptionApi = createRepository<SystemOptionENTITY, string>(path, getBaseApiRoot(path))

export const {
    useGetAllQuery: useGetSystemOptionsQuery,
    useGetByIdQuery: useGetSystemOptionByIdQuery,
    useCreateMutation: useCreateSystemOptionMutation,
    useUpdateMutation: useUpdateSystemOptionMutation,
    useDeleteMutation: useDeleteSystemOptionMutation,
    useGetPipelineQuery: useGetSystemOptionsPipelineQuery
} = systemOptionApi;
