'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Card, Grid, Group, Stack, Avatar, Text, Indicator } from '@mantine/core'
import { useDidUpdate, useSetState } from '@mantine/hooks'
import { IAccounts, IOrganization } from '../../interfaces/organization'
import { organizationAction } from '../../stores/organization'
import { IAccount } from '../../interfaces/account'
import { accountAction } from '../../stores/account'
import { IconMapPinFilled, IconMailFilled, IconPhoneFilled } from '@tabler/icons-react'

interface IState {
	account: IAccount
	organizations: IOrganization[]
}

const List = () => {
	const router = useRouter()
	const [state, setState] = useSetState<IState>({
		account: accountAction.getState().account,
		organizations: []
	})

	const getFirstLetters = (string: string) => string.split(' ').map(word => word.charAt(0)).join('')

	const updateState = () => {
		setState({
			account: accountAction.getState().account,
			organizations: organizationAction.getState().organizations
				.filter((organization: IOrganization) => organization && organization.accounts
					?.filter((account: IAccounts) => account.accountEmail == state.account.email && !account.accepted).length == 0)
		})
	}

	organizationAction.subscribe(() => {
		updateState()
	})

	useDidUpdate(() => {
		updateState()
	}, [accountAction.getState().account, organizationAction.getState().organizations])

	useEffect(() => {
		organizationAction.getState().list
		updateState()
	}, [])

	return (
		<>
			{state.organizations && state.organizations.length > 0 && (
				<Grid mt={20}>
					{state.organizations && state.organizations.length > 0 && state.organizations.map((organization: IOrganization) => (
						<Grid.Col key={organization.id} xl={3} lg={4} md={6} sm={12} xs={12}>
							<Indicator color='dark' disabled={organization.accounts[0].accepted}>
								<Link href={`/organization/${organization.id}`} legacyBehavior>
									<Card component='a' href='#'>
										<Card.Section p='lg'>
											<Group noWrap>
												<Avatar size='lg' src={organization.logo} />
												<Text size='lg' weight={600}>{organization.name}</Text>
											</Group>
											<Stack mt={20} spacing={5}>
												<Group position='left' align='center' spacing={7}>
													<IconMailFilled size='17' />
													<Text size='sm' color='dimmed' truncate>{organization.email}</Text>
												</Group>
												<Group position='left' align='center' spacing={7}>
													<IconPhoneFilled size='17' />
													<Text size='sm' color='dimmed' truncate>{organization.phone}</Text>
												</Group>
												<Group position='left' align='center' spacing={7} noWrap>
													<IconMapPinFilled size='19' />
													<Text size='sm' color='dimmed'
														  truncate>{organization.location}</Text>
												</Group>
											</Stack>
										</Card.Section>
									</Card>
								</Link>
							</Indicator>
						</Grid.Col>
					))}
				</Grid>
			)}
		</>
	)
}

export default List