import { classValidatorResolver } from '@hookform/resolvers/class-validator'
import { CustomDialog, CustomSelect } from '@shared/ui-library'
import { Controller, useForm } from 'react-hook-form'
import { UpdateScrapingCredentialDTO, ScrapingCredentialENTITY, getDataScrapingSystem } from 'logiflowerp-sdk'
import { useSnackbar } from 'notistack'
import { Button, TextField } from '@mui/material'
import { useUpdateScrapingCredentialMutation } from '@shared/api'

const resolver = classValidatorResolver(UpdateScrapingCredentialDTO)

interface IProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    open: boolean
    row: ScrapingCredentialENTITY
}

export function EditDialog(props: IProps) {

    const { open, setOpen, row } = props
    const {
        handleSubmit,
        formState: { errors },
        register,
        control
    } = useForm({ resolver, defaultValues: { ...row } })
    const { enqueueSnackbar } = useSnackbar()
    const [update, { isLoading }] = useUpdateScrapingCredentialMutation()

    const onSubmit = async (data: UpdateScrapingCredentialDTO) => {
        try {
            await update({ id: row._id, data }).unwrap()
            enqueueSnackbar({ message: '¡Actualizado correctamente!', variant: 'success' })
            setOpen(false)
        } catch (error: any) {
            console.log(error)
            enqueueSnackbar({ message: error.message, variant: 'error' })
        }
    }

    return (
        <CustomDialog
            open={open}
            setOpen={setOpen}
            title={`EDITAR (${row.system})`}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label='URL'
                    autoFocus
                    variant='outlined'
                    fullWidth
                    margin='normal'
                    size='small'
                    {...register('url')}
                    error={!!errors.url}
                    helperText={errors.url?.message}
                />
                <TextField
                    label='Usuario'
                    variant='outlined'
                    fullWidth
                    margin='normal'
                    size='small'
                    {...register('userName')}
                    error={!!errors.userName}
                    helperText={errors.userName?.message}
                />
                <TextField
                    label='Contraseña'
                    variant='outlined'
                    fullWidth
                    margin='normal'
                    size='small'
                    {...register('password')}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                />
                <Controller
                    name='system'
                    control={control}
                    render={({ field }) => (
                        <CustomSelect
                            label='Sistema'
                            options={getDataScrapingSystem()}
                            {...field}
                            labelKey='label'
                            valueKey='value'
                            margin='normal'
                            error={!!errors.system}
                            helperText={errors.system?.message}
                        />
                    )}
                />
                <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    fullWidth
                    sx={{ marginTop: 2 }}
                    loading={isLoading}
                >
                    Guardar
                </Button>
            </form>
        </CustomDialog>
    )
}
