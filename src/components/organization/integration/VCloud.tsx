'use client'

import { useEffect } from 'react'
import { Avatar, Button, Card, Group, Modal, Stack, Text, TextInput } from '@mantine/core'
import { useSetState } from '@mantine/hooks'
import { isNotEmpty, useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { IconX, IconCheck } from '@tabler/icons-react'
import { IOrganization } from '../../../interfaces/organization'
import { IVcloud } from '../../../interfaces/vcloud'
import { vcloudAction } from '../../../stores/vcloud'

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
	apiKey: string
	serviceName: string
	merchantName: string
	organization: IOrganization
}

const Connection = ({ organization, getOrganization }: IProps) => {
	const [state, setState] = useSetState<IState>({
		openedConnect: false,
		openedDisconnect: false,
		loading: false
	})

	const form = useForm<IConnectForm>({
		initialValues: {
			apiKey: '',
			serviceName: '',
			merchantName: '',
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
			apiKey: isNotEmpty(),
			serviceName: isNotEmpty(),
			merchantName: isNotEmpty()
		}
	})

	const connect = async (vcloud: IVcloud) => {
		setState({ loading: true })
		const result = await vcloudAction.getState().connect(vcloud)

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
		const result = await vcloudAction.getState().disconnect(organization)

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

	return (
		<>
		<Card>
			<Stack>
				<Group noWrap>
					<Avatar color='dark' radius={5} size='xl' src='/integrations/vcloud.png' />
					<Stack spacing={0}>
						<Text>VCloud</Text>
						<Text size='xs' color='dimmed'>Payment software</Text>
					</Stack>
				</Group>
				<Text size='sm' lineClamp={3}>One of the most advanced Leisure Booking Systems
					available on the market</Text>
				<Group position='apart' align='center'>
					<>
					{organization.vcloud ? (
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
			<form onSubmit={form.onSubmit((vcloud: IConnectForm) => connect(vcloud))}>
				<Group p='sm' noWrap>
					<Avatar color='dark' radius={5} size='xl' src='/integrations/vcloud.png' />

					<Stack spacing={0}>
						<Text>VCloud</Text>
						<Text size='xs' color='dimmed'>Payment software</Text>
					</Stack>
				</Group>
				<Stack p='sm'>
					<Text size='sm' lineClamp={3}>One of the most advanced Leisure Booking Systems
						available on the market</Text>
				</Stack>
				<Stack p='sm'>
					<TextInput label='API Key' withAsterisk data-autofocus {...form.getInputProps('apiKey')} />
					<TextInput label='Service Name' withAsterisk data-autofocus {...form.getInputProps('serviceName')} />
					<TextInput label='Merchant Name' withAsterisk data-autofocus {...form.getInputProps('merchantName')} />
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

		<Modal title='Disconnect from VCloud' opened={state.openedDisconnect}
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

export default Connection