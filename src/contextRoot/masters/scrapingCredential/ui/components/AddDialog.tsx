import { classValidatorResolver } from '@hookform/resolvers/class-validator'
import { CustomDialog, CustomSelect, } from '@shared/ui-library'
import { Controller, useForm } from 'react-hook-form'
import { CreateScrapingCredentialDTO, getDataScrapingSystem } from 'logiflowerp-sdk'
import { useSnackbar } from 'notistack'
import { Button, TextField } from '@mui/material'
import { useCreateScrapingCredentialMutation } from '@shared/api'

const resolver = classValidatorResolver(CreateScrapingCredentialDTO)

interface IProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    open: boolean
}

export function AddDialog(props: IProps) {

    const { open, setOpen } = props
    const {
        handleSubmit,
        formState: { errors },
        register,
        control
    } = useForm({ resolver })
    const { enqueueSnackbar } = useSnackbar()
    const [create, { isLoading }] = useCreateScrapingCredentialMutation()

    const onSubmit = async (data: CreateScrapingCredentialDTO) => {
        try {
            await create(data).unwrap()
            enqueueSnackbar({ message: '¡Agregado correctamente!', variant: 'success' })
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
            title='AGREGAR'
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
