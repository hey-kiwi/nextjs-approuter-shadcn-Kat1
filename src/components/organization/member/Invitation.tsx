'use client'

import { useEffect } from 'react'
import { Grid, Indicator, Card, Group, Avatar, Stack, Text, ActionIcon, Menu, rem, Image } from '@mantine/core'
import { useDidUpdate, useSetState } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import { IconCheck, IconFileZip, IconDots, IconX, IconEye, IconTrash } from '@tabler/icons-react'
import { IAccounts, IOrganization } from '../../../interfaces/organization'
import { organizationAction } from '../../../stores/organization'
import { IAccount } from '../../../interfaces/account'
import { accountAction } from '../../../stores/account'
import { IResponse } from '../../../interfaces/response'
import { memberAction } from '../../../stores/member'
import { IMember } from '../../../interfaces/member'

interface IState {
	loading: boolean
	account: IAccount
	organizations: IOrganization[]
}

const Invitation = () => {
	const [state, setState] = useSetState<IState>({
		loading: false,
		account: accountAction.getState().account,
		organizations: []
	})

	const getFirstLetters = (string: string) => string.split(' ').map(word => word.charAt(0)).join('')

	const accept = async (organization: IOrganization, member: IMember) => {
		setState({ loading: true })
		const result: IResponse = await memberAction.getState().accept(organization, member)

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

	const updateState = () => {
		setState({
			account: accountAction.getState().account,
			organizations: organizationAction.getState().organizations
				.filter((organization: IOrganization) => organization && organization.accounts
					?.filter((account: IAccounts) => account.accountEmail == state.account.email && !account.accepted).length > 0)
		})
	}

	organizationAction.subscribe(() => {
		updateState()
	})

	useDidUpdate(() => {
		updateState()
	}, [accountAction.getState().account, organizationAction.getState().organizations])

	useEffect(() => {
		updateState()
	}, [])

	return (
		<>
			{state.organizations && state.organizations.length > 0 && (
				<Grid mt={20}>
					{state.organizations && state.organizations.length > 0 && state.organizations.map((organization: IOrganization) => (
						<Grid.Col key={organization.id} xl={3} lg={4} md={6} sm={12} xs={12}>
							<Indicator color='dark' disabled={organization.accounts[0].accepted}>
								<Card>
									<Card.Section withBorder inheritPadding py='xs'>
										<Group position='apart' align='top'>
											<Text>{organization.name}</Text>
											<Menu withinPortal position='bottom-end' shadow='sm'>
												<Menu.Target>
													<ActionIcon>
														<IconDots size='1rem' />
													</ActionIcon>
												</Menu.Target>

												<Menu.Dropdown>
													<Menu.Item
														icon={<IconCheck size={rem(14)} />}
														onClick={() => accept(organization, organization.accounts.filter((accounts: IAccounts) => accounts.accountEmail == state.account.email)[0])}
													>
														Accept
													</Menu.Item>
													<Menu.Item icon={<IconX size={rem(14)} />} color='red'>
														Reject
													</Menu.Item>
												</Menu.Dropdown>
											</Menu>
										</Group>
									</Card.Section>
									<Card.Section>
										<Group position='left' align='center'>
											<Avatar radius={0} size='xl' color='dark' src={organization.logo} alt={organization.name}>
												{getFirstLetters(organization.name)}
											</Avatar>
											<Stack spacing={0} py={5}>
												<Text size='sm' color='dimmed'>{organization.email}</Text>
												<Text size='sm' color='dimmed'>{organization.phone}</Text>
												<Text size='sm' color='dimmed'>{organization.location}</Text>

											</Stack>
										</Group>
									</Card.Section>
								</Card>
							</Indicator>
						</Grid.Col>
					))}
				</Grid>
			)}
		</>
	)
}

export default Invitation