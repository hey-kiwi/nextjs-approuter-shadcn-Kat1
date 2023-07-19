'use client'

import { useCallback, useEffect } from 'react'
import {
	Card,
	Grid,
	Group,
	Stack,
	Avatar,
	Text,
	Menu,
	ActionIcon,
	rem,
	LoadingOverlay,
	Loader,
	Badge
} from '@mantine/core'
import { useSetState } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import { IconCheck, IconDots, IconX, IconMail, IconPhone } from '@tabler/icons-react'
import { IAccounts, IOrganization } from '../../../interfaces/organization'
import { IMember } from '../../../interfaces/member'
import { memberAction } from '../../../stores/member'
import { accountAction } from '../../../stores/account'

interface IMemberCard {
	owner: boolean
	organization: IOrganization
	accounts: IAccounts
	getOrganization: () => void
}

interface IMemberState {
	loading: boolean
}

const MemberCard = ({ owner, organization, accounts, getOrganization }: IMemberCard) => {
	const [state, setState] = useSetState<IMemberState>({
		loading: false
	})

	const getFirstLetters = (string: string) => string.split(' ').map(word => word.charAt(0)).join('')

	const remove = async (member: IMember) => {
		setState({ loading: true })
		const result = await memberAction.getState().remove(organization, member)


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

			getOrganization()
		}

		setState({ loading: false })
	}

	return (
		<Grid.Col key={accounts.account.email} xl={3} lg={4} md={6} sm={12} xs={12}>
			<Card>
				<Stack>
					<Group position='apart' align='top'>
						<Group noWrap>
							<Avatar size='lg' color='dark' src={accounts.account.avatar}
									alt={accounts.account.name}>
								{getFirstLetters(accounts.account.name)}
							</Avatar>
							<Stack spacing={0}>
								<Text size='lg' weight={600}>{accounts.account.name}</Text>
								<Text size='sm'
									  color='dimmed'>{accounts.owner ? 'Owner' : 'Member'}</Text>
							</Stack>
						</Group>
						{(owner && accountAction.getState().account.email != accounts.account.email) || (!owner && accountAction.getState().account.email == accounts.account.email) && (
							<Menu withinPortal position='bottom-end' shadow='sm'>
								<Menu.Target>
									<ActionIcon>
										<IconDots size='1rem' />
									</ActionIcon>
								</Menu.Target>

								<Menu.Dropdown>
									<Menu.Item icon={<IconX size={rem(14)} />} color='red'
											   onClick={() => remove(accounts)}>
										{accountAction.getState().account.email == accounts.account.email ? 'Leave' : 'Remove'}
									</Menu.Item>
								</Menu.Dropdown>
							</Menu>
						)}
					</Group>
					<Stack spacing={0}>
						<Group spacing={5} noWrap>
							<IconMail size='17' />
							<Text size='sm' color='dimmed'>{accounts.account.email}</Text>
						</Group>
						<Group spacing={5} noWrap>
							<IconPhone size='17' />
							<Text size='sm' color='dimmed'>{accounts.account.phone}</Text>
						</Group>
					</Stack>
				</Stack>
				{state.loading && <LoadingOverlay visible={true} loader={<Loader color='white' />} />}
			</Card>
		</Grid.Col>
	)
}

interface IProps {
	organization: IOrganization
	getOrganization: () => void
}

interface IState {
	owner: boolean
}

const List = ({ organization, getOrganization }: IProps) => {
	const [state, setState] = useSetState<IState>({
		owner: false
	})
	const MemberCardCallback = useCallback(({ owner, organization, accounts }) => {
		return <MemberCard owner={owner} organization={organization} accounts={accounts}
						   getOrganization={getOrganization} />
	}, [state, organization])

	useEffect(() => {
		const account = organization.accounts?.filter((accounts: IAccounts) => accountAction.getState().account.email == accounts.accountEmail)[0]

		if (account) {
			setState({ owner: account.owner })
		}
	}, [accountAction.getState().account, organization])

	return (
		<>
			{organization && (
				<Grid mt={20}>
					{organization && organization.accounts?.length > 0 && organization.accounts?.map((accounts: IAccounts) => (
						<MemberCardCallback key={accounts.accountEmail} owner={state.owner} organization={organization}
											accounts={accounts} />
					))}
				</Grid>
			)}
		</>
	)
}

export default List