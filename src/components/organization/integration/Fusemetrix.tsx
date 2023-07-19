'use client'

import { useEffect } from 'react'
import { Avatar, Button, Card, Group, Image, Modal, PasswordInput, Stack, Text, TextInput } from '@mantine/core'
import { useSetState } from '@mantine/hooks'
import { isNotEmpty, useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { IconX, IconCheck } from '@tabler/icons-react'
import { IOrganization } from '../../../interfaces/organization'
import { IFusemetrix } from '../../../interfaces/fusemetrix'
import { fusemetrixAction } from '../../../stores/fusemetrix'

interface IProps {
	organization: IOrganization
	getOrganization: () => void
}

interface IState {
	openedConnect: boolean
	openedDisconnect: boolean
	loading: boolean
}

interface IConnectForm {
	username: string
	password: string
	organization: IOrganization
}

const Fusemetrix = ({ organization, getOrganization }: IProps) => {
	const [state, setState] = useSetState<IState>({
		openedConnect: false,
		openedDisconnect: false,
		loading: false
	})

	const form = useForm<IConnectForm>({
		initialValues: {
			username: '',
			password: '',
			organization: {
				id: organization.id,
				name: organization.name,
				email: organization.email,
				phone: organization.phone,
				location: organization.location,
				logo: organization.logo
			}
		},
		validate: {
			username: isNotEmpty(),
			password: isNotEmpty()
		}
	})

	const connect = async (fusemetrix: IFusemetrix) => {
		setState({ loading: true })
		const result = await fusemetrixAction.getState().connect(fusemetrix)

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

			getOrganization()

			form.reset()

			setState({ loading: false, openedConnect: false })
		}

		setState({ loading: false })
	}

	const disconnect = async (organization: IOrganization) => {
		setState({ loading: true })
		const result = await fusemetrixAction.getState().disconnect(organization)

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

			getOrganization()

			form.reset()

			setState({ loading: false, openedDisconnect: false })
		}

		setState({ loading: false })
	}

	useEffect(() => {
		form.setValues({ organization: { ...organization } })
	}, [organization])

	const Title = () => (
		<Group position='left' align='center'>

		</Group>
	)

	const Description = () => (
		<Text size='sm' lineClamp={3}>One of the most advanced Leisure Booking Systems
			available on the market</Text>
	)

	return (
		<>
			<Card>
				<Stack>
					<Group noWrap>
						<Avatar color='dark' radius={5} size='xl' src='/integrations/fusemetrix.png' />
						<Stack spacing={0}>
							<Text>FuseMetrix</Text>
							<Text size='xs' color='dimmed'>Booking software</Text>
						</Stack>
					</Group>
					<Text size='sm' lineClamp={3}>One of the most advanced Leisure Booking Systems
						available on the market</Text>
					<Group position='apart' align='center'>
						<>
							{organization.fusemetrix ? (
								<Button color='red'
										onClick={() => setState({ openedDisconnect: true })}>Disconnect</Button>
							) : (
								<Button variant='white' color='dark'
										onClick={() => setState({ openedConnect: true })}>Connect</Button>
							)}
						</>
					</Group>
				</Stack>
			</Card>

			<Modal opened={state.openedConnect}
				   onClose={() => setState({ openedConnect: false })} withCloseButton={false}>
				<form onSubmit={form.onSubmit((fusemetrix: IConnectForm) => connect(fusemetrix))}>
					<Group p='sm' noWrap>
						<Avatar color='dark' radius={5} size='xl' src='/integrations/fusemetrix.png' />

						<Stack spacing={0}>
							<Text>FuseMetrix</Text>
							<Text size='xs' color='dimmed'>Booking software</Text>
						</Stack>
					</Group>
					<Stack p='sm'>
						<Text size='sm' lineClamp={3}>One of the most advanced Leisure Booking Systems
							available on the market</Text>
					</Stack>
					<Stack p='sm'>
						<TextInput label='Username' withAsterisk data-autofocus {...form.getInputProps('username')} />
						<PasswordInput label='Password' withAsterisk
									   data-autofocus {...form.getInputProps('password')} />
						<Group position='center' mt={50}>
							<Button variant='subtle' color='dark' onClick={() => {
								setState({ openedConnect: false })
							}}>
								Close
							</Button>
							<Button variant='white' color='dark' type='submit'
									loading={state.loading}>{state.loading ? 'Connecting' : 'Connect'}</Button>
						</Group>
					</Stack>
				</form>
			</Modal>

			<Modal title='Disconnect from FuseMetrix' opened={state.openedDisconnect}
				   onClose={() => setState({ openedDisconnect: false })}>
				<Stack pt={20}>
					<Text>Are you sure you would like to proceed?</Text>
					<Group position='center' mt={20}>
						<Button variant='transparent' color='dark' onClick={() => {
							setState({ openedDisconnect: false })
						}}>
							Close
						</Button>
						<Button color='red' onClick={() => disconnect(organization)}
								loading={state.loading}>{state.loading ? 'Disconnecting' : 'Disconnect'}</Button>
					</Group>
				</Stack>
			</Modal>
		</>
	)
}

export default Fusemetrix