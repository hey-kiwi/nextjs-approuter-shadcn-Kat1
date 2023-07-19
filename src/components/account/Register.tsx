'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '@auth0/nextjs-auth0/client'
import { Button, Group, Modal, Stack, TextInput } from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form'
import { useDidUpdate, useSetState } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import { IconCheck, IconX } from '@tabler/icons-react'
import { accountAction } from '../../stores/account'
import { IAccount, IAccountAction } from '../../interfaces/account'

interface IState {
	account: IAccount
	opened: boolean
	loading: boolean
}

interface IRegisterAccountForm {
	name: string
	email: string
	phone: string
	avatar: string
}

const Register = () => {
	const router = useRouter()
	const auth0 = useUser()

	const [state, setState] = useSetState<IState>({
		account: accountAction.getState().account,
		opened: false,
		loading: false
	})

	const form = useForm<IRegisterAccountForm>({
		initialValues: {
			name: '',
			email: auth0.user?.email || '',
			phone: '',
			avatar: auth0.user?.picture
		},
		validate: {
			name: isNotEmpty(),
			email: isNotEmpty(),
			phone: isNotEmpty()
		}
	})

	const get = async () => {
		const result = await accountAction.getState().get()

		if (!result.ok) {
			setState({
				opened: true
			})
		}
	}

	const update = async (data: IAccount) => {
		setState({ loading: true })
		const result = await accountAction.getState().update(data)

		if (!result.ok) {
			notifications.show({
				message: result.message,
				color: 'red',
				icon: <IconX />
			})
		} else {
			notifications.show({
				message: result.message,
				color: 'green',
				icon: <IconCheck />
			})
		}

		setState({ loading: false })
	}

	accountAction.subscribe((action: IAccountAction) => {
		if (action.account.sub) {
			setState({
				account: action.account,
				opened: false
			})
		}
	})

	useDidUpdate(() => {
		if (auth0.user?.sub) {
			get()
		}

		if (auth0.user.email) {
			form.setFieldValue('email', auth0.user.email)
			form.setFieldValue('avatar', auth0.user.picture)
		}
	}, [auth0.user?.sub])

	useEffect(() => {
		get()
	}, [])

	return (
		<>
			{state.opened &&
				<Modal title='Please register to continue' py={20} opened={state.opened}
					   onClose={() => setState({ opened: false })}
					   transitionProps={{ transition: 'fade', duration: 300, timingFunction: 'linear' }}>
					<form onSubmit={form.onSubmit((values: IRegisterAccountForm) => update(values))}>
						<Stack pt={25} pb={15}>
							<TextInput label='Name' withAsterisk data-autofocus {...form.getInputProps('name')} />
							<TextInput label='Email' withAsterisk {...form.getInputProps('email')}
									   readOnly={!!auth0.user?.email} />
							<TextInput label='Phone' withAsterisk {...form.getInputProps('phone')} />
							<TextInput label='Avatar' {...form.getInputProps('avatar')} />
							<Group position='center' mt={20}>
								<Button variant='subtle' color='dark'
										onClick={() => router.push('/api/auth/logout')}>Logout</Button>
								<Button variant='white' color='dark' type='submit'
										loading={state.loading}>{state.loading ? 'Registering' : 'Register'}</Button>
							</Group>
						</Stack>
					</form>
				</Modal>
			}
		</>
	)
}

export default Register