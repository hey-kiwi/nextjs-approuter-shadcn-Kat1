'use client'

import { useUser } from '@auth0/nextjs-auth0/client'
import { Box, Divider, Menu, MediaQuery, Avatar } from '@mantine/core'
import { IconHelp, IconUser, IconLogout } from '@tabler/icons-react'
import Link from 'next/link'
import SidebarLink from './SidebarLink'
import { useSetState } from '@mantine/hooks'
import { IAccount } from '../../../interfaces/account'
import { accountAction } from '../../../stores/account'

interface IProps {
	mobile?: boolean
	handleClick: (bool: boolean) => any
}

interface IState {
	account: IAccount
}

const Account = ({ mobile, handleClick }: IProps) => {
	const [state, setState] = useSetState({
		account: accountAction.getState().account
	})

	const getFirstLetters = (string: string) => string.split(' ').map(word => word.charAt(0)).join('')

	accountAction.subscribe(() => {
		setState({
			account: accountAction.getState().account
		})
	})

	return (
		<>
			{mobile ? (
				<MediaQuery largerThan='sm' styles={{ display: 'none' }}>
					<Box>
						<Divider my={10} />
						<SidebarLink icon={<IconUser />} label='Account' path='/account'
									 handleClick={() => handleClick(true)} />
						<SidebarLink icon={<IconLogout />} label='Logout' path='/api/auth/logout' />
						<Divider my={10} />
						<SidebarLink icon={<IconHelp />} label='Support' path='' />
					</Box>
				</MediaQuery>
			) : (
				<Menu position='bottom' withArrow>
					<Menu.Target>
						<Avatar color='cyan' radius='xl' size='md' ml={5} src={state.account.avatar}>
							{getFirstLetters(state.account.name)}
						</Avatar>
					</Menu.Target>
					<Menu.Dropdown>
						<Menu.Item icon={<IconHelp size={14} />} pr={30}>
							Support
						</Menu.Item>
						<Menu.Divider />
						<Link href={'/account'} legacyBehavior>
							<Menu.Item icon={<IconUser size={14} />} pr={30}>
								Account
							</Menu.Item>
						</Link>
						<Link href={'/api/auth/logout'} legacyBehavior>
							<Menu.Item color='red' icon={<IconLogout size={14} />} pr={30}>
								Logout
							</Menu.Item>
						</Link>
					</Menu.Dropdown>
				</Menu>
			)}
		</>
	)
}

export default Account
