'use client'

import { useUser } from '@auth0/nextjs-auth0/client'
import { Grid, Button, TextInput } from '@mantine/core'
import { useSetState } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import { isNotEmpty, useForm } from '@mantine/form'
import { IconX, IconCheck } from '@tabler/icons-react'
import { IAccount, IAccountAction } from '../../interfaces/account'
import { accountAction } from '../../stores/account'

interface IState {
	loading: boolean
	account: IAccount
}

interface IEditAccountForm {
	name: string
	email: string
	phone: string
	avatar: string
}

const Edit = () => {
	const auth0 = useUser()
	const [state, setState] = useSetState<IState>({
		loading: false,
		account: accountAction.getState().account
	})
	accountAction.subscribe((action: IAccountAction) => setState({
		account: action.account
	}))

	const form = useForm<IEditAccountForm>({
		initialValues: {
			name: state?.account?.name,
			email: state?.account?.email || auth0.user?.email,
			phone: state?.account?.phone,
			avatar: auth0.user?.picture
		},
		validate: {
			name: isNotEmpty(),
			email: isNotEmpty(),
			phone: isNotEmpty()
		}
	})

	const update = async (account: IAccount) => {
		setState({ loading: true })
		const result = await accountAction.getState().update(account)

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

	return (
		<>
			<form onSubmit={form.onSubmit((account: IEditAccountForm) => update(account))}>
				<Grid gutter='xl' mt={5}>
					<Grid.Col xl={4} lg={5} md={5} sm={6} xs={12}>
						<TextInput variant='filled' label='Name'
								   value={state.account.name} {...form.getInputProps('name')} />
					</Grid.Col>
					<Grid.Col xl={4} lg={5} md={5} sm={6} xs={12}>
						<TextInput readOnly variant='filled' label='Email'
								   value={state.account.email} {...form.getInputProps('email')} />
					</Grid.Col>
				</Grid>
				<Grid gutter='xl' mt={5}>
					<Grid.Col xl={4} lg={5} md={5} sm={6} xs={12}>
						<TextInput variant='filled' label='Phone'
								   value={state.account.phone} {...form.getInputProps('phone')} />
					</Grid.Col>
				</Grid>
				<Grid gutter='xl' mt={5}>
					<Grid.Col xl={8} lg={10} md={10} sm={12} xs={12}>
						<TextInput variant='filled' label='Avatar'
							value={state.account.avatar} {...form.getInputProps('avatar')} />
					</Grid.Col>
				</Grid>
				<Grid gutter='xl' mt={10}>
					<Grid.Col span={4}>
						<Button variant='white' color='dark' type='submit'
								loading={state.loading}>{state.loading ? 'Updating' : 'Update'}</Button>
					</Grid.Col>
				</Grid>
			</form>
		</>
	)
}

export default Edit