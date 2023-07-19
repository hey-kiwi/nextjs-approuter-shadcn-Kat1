'use client'

import { ActionIcon, Button, Group, Modal, Stack, TextInput } from '@mantine/core'
import { useSetState } from '@mantine/hooks'
import { isNotEmpty, useForm } from '@mantine/form'
import { organizationAction } from '../../stores/organization'
import { IResponse } from '../../interfaces/response'
import { notifications } from '@mantine/notifications'
import { IconCheck, IconX, IconPlus } from '@tabler/icons-react'

interface IProps {
	name?: string
	opened?: boolean
	withButton?: 'text' | 'icon'
	onClose: () => any
}

interface IState {
	loading: boolean
	opened: boolean
}

interface IOrganizationForm {
	name: string
	email: string
	phone: string
	location: string
}

const CreateModal = ({ name, opened, withButton, onClose }: IProps) => {
	const [state, setState] = useSetState<IState>({ loading: false, opened: opened })
	const form = useForm<IOrganizationForm>({
		initialValues: {
			name: name ?? '',
			email: '',
			phone: '',
			location: ''
		},
		validate: {
			name: isNotEmpty(),
			email: isNotEmpty(),
			phone: isNotEmpty(),
			location: isNotEmpty()
		}
	})

	const create = async (organization: IOrganizationForm) => {
		setState({ loading: true })
		const result: IResponse = await organizationAction.getState().create(organization)

		if (!result.ok) {
			notifications.show({
				message: result.message,
				color: 'red',
				icon: <IconX size={16} />
			})
		} else {
			notifications.show({
				message: result.message,
				color: 'green',
				icon: <IconCheck size={16} />
			})

			form.reset()

			setState({ loading: false, opened: false })

			onClose()
		}
	}

	return (
		<>
			{withButton && (withButton == 'text' ? (
				<Button variant='dark' onClick={() => {
					form.reset()
					setState({ opened: true })
				}}
				>
					Create
				</Button>
			) : (
				<ActionIcon variant='filled' onClick={() => {
					form.reset()
					setState({ opened: true })
				}}
				>
					<IconPlus />
				</ActionIcon>
			))}
			{state.opened && (
				<Modal
					title='Create new organization'
					py={20}
					opened={state.opened}
					onClose={() => {
						setState({ opened: false })
						onClose()
					}}
					transitionProps={{
						transition: 'fade',
						duration: 600,
						timingFunction: 'linear'
					}}
				>
					<form onSubmit={form.onSubmit((organization: IOrganizationForm) => create(organization))}>
						<Stack pt={25} pb={15}>
							<TextInput label='Name' withAsterisk data-autofocus {...form.getInputProps('name')} />
							<TextInput label='Email' withAsterisk {...form.getInputProps('email')} />
							<TextInput label='Phone' withAsterisk {...form.getInputProps('phone')} />
							<TextInput label='Location' withAsterisk {...form.getInputProps('location')} />
							<Group position='center' mt={20}>
								<Button variant='subtle' color='dark'
										onClick={() => {
											setState({ opened: false })
											onClose()
										}}>
									Close
								</Button>
								<Button variant='white' color='dark' type='submit'
										loading={state.loading}>{state.loading ? 'Creating' : 'Create'}</Button>
							</Group>
						</Stack>
					</form>
				</Modal>
			)}
		</>
	)
}

export default CreateModal