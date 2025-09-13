import {
    GridActionsCellItem,
    GridColDef
} from '@mui/x-data-grid'
import { getDataScrapingSystem, ScrapingCredentialENTITY } from 'logiflowerp-sdk'
import EditIcon from '@mui/icons-material/Edit'

interface IParams {
    handleEditClick: (row: ScrapingCredentialENTITY) => void
}

export const columns = (params: IParams): GridColDef<ScrapingCredentialENTITY>[] => {
    const { handleEditClick } = params
    return [
        {
            field: 'url',
            headerName: 'URL',
            width: 200,
            editable: true
        },
        {
            field: 'userName',
            headerName: 'Nombre de usuario',
            width: 150,
            editable: true
        },
        {
            field: 'password',
            headerName: 'Contraseña',
            width: 150,
            editable: true
        },
        {
            field: 'system',
            headerName: 'Sistema',
            type: 'singleSelect',
            width: 150,
            editable: true,
            valueOptions: getDataScrapingSystem(),
        },
        {
            field: 'actions',
            type: 'actions',
            width: 50,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<EditIcon />}
                    label='Editar'
                    onClick={() => handleEditClick(params.row)}
                    showInMenu
                />
            ],
        },
    ]
}
