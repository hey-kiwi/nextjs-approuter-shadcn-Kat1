'use client'

import { useEffect } from 'react'
import { Grid, Button, TextInput } from '@mantine/core'
import { useSetState } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import { isNotEmpty, useForm } from '@mantine/form'
import { IconX, IconCheck } from '@tabler/icons-react'
import { IAccounts, IOrganization } from '../../interfaces/organization'
import { organizationAction } from '../../stores/organization'
import { accountAction } from '../../stores/account'

interface IProps {
	organization: IOrganization
}

interface IState {
	loading: boolean
	owner: boolean
}

interface IEditOrganizationForm {
	id: string
	name: string
	email: string
	phone: string
	location: string
	logo: string
}

const Edit = ({ organization }: IProps) => {
	const [state, setState] = useSetState<IState>({
		loading: false,
		owner: false
	})

	const form = useForm<IEditOrganizationForm>({
		initialValues: {
			id: organization.id,
			name: organization.name,
			email: organization.email,
			phone: organization.phone,
			location: organization.location,
			logo: organization.logo
		},
		validate: {
			name: isNotEmpty(),
			email: isNotEmpty(),
			phone: isNotEmpty(),
			location: isNotEmpty()
		}
	})

	const update = async (organization: IOrganization) => {
		setState({ loading: true })
		const result = await organizationAction.getState().update(organization)

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

		setState({ loading: false })
	}

	useEffect(() => {
		if (organization) {
			form.setFieldValue('id', organization.id)
			form.setFieldValue('name', organization.name)
			form.setFieldValue('email', organization.email)
			form.setFieldValue('phone', organization.phone)
			form.setFieldValue('location', organization.location)
			form.setFieldValue('logo', organization.logo)
		}
	}, [organization])

	useEffect(() => {
		const account = organization.accounts?.filter((accounts: IAccounts) => accountAction.getState().account.email == accounts.accountEmail)[0]

		if (account) {
			setState({ owner: account.owner })
		}
	}, [accountAction.getState().account, organization])

	return (
		<>
			<form onSubmit={form.onSubmit((data: IEditOrganizationForm) => update(data))}>
				<Grid gutter='xl' mt={5}>
					<Grid.Col xl={4} lg={5} md={5} sm={6} xs={12}>
						<TextInput readOnly={!state.owner} variant='filled' label='Name'
								   value={organization.name} {...form.getInputProps('name')} />
					</Grid.Col>
					<Grid.Col xl={4} lg={5} md={5} sm={6} xs={12}>
						<TextInput readOnly variant='filled' label='Email'
								   value={organization.email} {...form.getInputProps('email')} />
					</Grid.Col>
				</Grid>
				<Grid gutter='xl' mt={5}>
					<Grid.Col xl={4} lg={5} md={5} sm={6} xs={12}>
						<TextInput readOnly={!state.owner} variant='filled' label='Phone'
								   value={organization.phone} {...form.getInputProps('phone')} />
					</Grid.Col>
					<Grid.Col xl={4} lg={5} md={5} sm={6} xs={12}>
						<TextInput readOnly={!state.owner} variant='filled' label='Location'
								   value={organization.location} {...form.getInputProps('location')} />
					</Grid.Col>
				</Grid>
				<Grid gutter='xl' mt={5}>
					<Grid.Col xl={8} lg={10} md={10} sm={12} xs={12}>
						<TextInput readOnly={!state.owner} variant='filled' label='Logo (Link)'
								   value={organization.logo} {...form.getInputProps('logo')} />
					</Grid.Col>
				</Grid>
				{state.owner && (
					<Grid gutter='xl' mt={10}>
						<Grid.Col span={4}>
							<Button variant='white' color='dark' type='submit'
									loading={state.loading}>{state.loading ? 'Updating' : 'Update'}</Button>
						</Grid.Col>
					</Grid>
				)}
			</form>
		</>
	)
}

export default Edit