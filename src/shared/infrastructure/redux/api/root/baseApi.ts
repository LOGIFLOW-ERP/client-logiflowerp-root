import { getBaseApi } from '../baseApi'

export const getBaseApiRoot = (resource: string) => getBaseApi(import.meta.env.VITE_API_BASE_URL, resource)