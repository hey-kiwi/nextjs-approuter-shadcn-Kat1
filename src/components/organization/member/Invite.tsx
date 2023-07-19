'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { ActionIcon, Button, Group, Modal, Stack, Text, TextInput } from '@mantine/core'
import { useSetState } from '@mantine/hooks'
import { isEmail, useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { IconCheck, IconUserPlus, IconX } from '@tabler/icons-react'
import { memberAction } from '../../../stores/member'
import { IMember } from '../../../interfaces/member'
import { organizationAction } from '../../../stores/organization'
import { IOrganization } from '../../../interfaces/organization'

interface IState {
	opened: boolean
	loading: boolean
	organization: IOrganization
}

interface IInviteMemberForm {
	id?: string
	email?: string
	owner?: boolean
	accepted?: boolean
	accountId?: string
	organizationId?: string
}

const Invite = () => {
	const router = useRouter()
	const [state, setState] = useSetState<IState>({
		opened: false,
		loading: false,
		organization: {
			id: '',
			name: '',
			email: '',
			phone: '',
			location: '',
			logo: ''
		}
	})

	const form = useForm<IInviteMemberForm>({
		initialValues: {
			email: ''
		},
		validate: {
			email: isEmail('Invalid email')
		}
	})

	const invite = async (member: IMember) => {
		setState({ loading: true })
		const result = await memberAction.getState().invite(state.organization, member)

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
		}

		form.reset()

		setState({ loading: false, opened: false })
	}

	organizationAction.subscribe(() => {
		const organization = organizationAction.getState().organizations?.filter((organization: IOrganization) => organization.id == state.organization.id)[0]

		if (organization) {
			setState({
				organization: organization
			})
		}
	})

	useEffect(() => {
		if (router.query.id != undefined) {
			const id: string = router.query.id as string
			setState({
				organization: {
					id: id,
					name: '',
					email: '',
					phone: '',
					location: ''
				}
			})
		}
	}, [router.query?.id])

	return (
		<>
			<Button variant='white' color='dark' onClick={() => setState({ opened: true })}>New invite</Button>
			{state.opened && (
				<Modal opened={state.opened} onClose={() => {
					form.reset()
					setState({ opened: false })
				}} withCloseButton={false}>
					<form onSubmit={form.onSubmit((member: IInviteMemberForm) => invite(member))}>
						<Stack p='sm'>
							<Text size='sm' color='dimmed'>The user will be required to signup and register if they are
								not
								yet registered with Hey'Kiwi.</Text>
							<TextInput label='Email' withAsterisk {...form.getInputProps('email')} />
							<Group position='center' mt={50}>
								<Button variant='subtle' color='dark'
										onClick={() => {
											setState({ opened: false })
											form.reset()
										}}
								>
									Close
								</Button>
								<Button variant='white' color='dark' type='submit'
										loading={state.loading}>{state.loading ? 'Inviting' : 'Invite'}</Button>
							</Group>
						</Stack>
					</form>
				</Modal>
			)}
		</>
	)
}

export default Invite