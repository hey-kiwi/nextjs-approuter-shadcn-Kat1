'use client'

import React from 'react'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { AppShell, Navbar, Header, Burger, Image, MediaQuery, useMantineTheme, Group, Divider } from '@mantine/core'
import { useSetState } from '@mantine/hooks'
import { IconChartBar, IconListDetails, IconRocket, IconDeviceTablet, IconBuilding } from '@tabler/icons-react'
import SidebarLink from '../navbar/SidebarLink'
import Notification from '../navbar/Notification'
import Account from '../navbar/Account'
import Fullscreen from '../navbar/Fullscreen'
import Register from '../../account/Register'
import Organization from '../navbar/Organization'

const notifications = [
	{
		icon: <IconListDetails size={17} />,
		message: 'New job assigned to you',
		time: '2 hours ago'
	},
	{
		icon: <IconListDetails size={17} />,
		message: 'The job assigned to you has nbeen updated',
		time: '2 hours ago'
	},
	{
		icon: <IconRocket size={17} />,
		message: 'New job assigned to you',
		time: '2 hours ago'
	},
	{
		icon: <IconListDetails size={17} />,
		message: 'New job assigned to you',
		time: '2 hours ago'
	}
]

interface IProps {
	children: React.ReactNode
}

const Layout = ({ children }: IProps) => {
	const theme = useMantineTheme()
	const [state, setState] = useSetState({
		menuOpen: false
	})

	const handleClick = (bool: boolean) => setState({ menuOpen: !bool })

	return (
		<AppShell
			styles={{
				main: {
					background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1]
				}
			}}
			navbarOffsetBreakpoint='sm'
			asideOffsetBreakpoint='sm'
			navbar={
				<Navbar p='md' hiddenBreakpoint='sm' hidden={!state.menuOpen} width={{ sm: 200, lg: 250 }} sx={{ background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] }}>
					<SidebarLink icon={<IconChartBar />} label='Dashboard' path='/dashboard'
								 handleClick={handleClick} />
					<SidebarLink icon={<IconDeviceTablet />} label='Devices' path='/devices'
								 handleClick={handleClick} />
					<SidebarLink icon={<IconBuilding />} label='Organizations' path='/organization'
								 handleClick={handleClick} />
					<Account handleClick={handleClick} mobile />
				</Navbar>
			}
			header={
				<Header height={{ base: 65, md: 65 }} p='md' sx={{ background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] }}>
					<div style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						height: '100%',
						width: '100%'
					}}>
						<Image src='/logo.png' alt='logo' width={35} radius={5} />
						<Group position='right' align='center'>
							<Organization />
							<MediaQuery largerThan='sm' styles={{ display: 'none' }}>
								<Burger opened={state.menuOpen}
										onClick={() => setState({ menuOpen: !state.menuOpen })} size='sm'
										color={theme.colors.gray[6]} />
							</MediaQuery>
							<MediaQuery smallerThan='sm' styles={{ display: 'none' }}>
								<Group spacing='sm'>
									<Notification notifications={notifications} />
									<Fullscreen />
									<Account handleClick={handleClick} />
								</Group>
							</MediaQuery>
						</Group>
					</div>
				</Header>
			}
		>
			<Register />
			{/*<ScrollToTop />*/}
			{children}
		</AppShell>
	)
}

export default Layout

export const getServerSideProps = withPageAuthRequired()