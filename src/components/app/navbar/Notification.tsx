'use client'

import React from 'react'
import { Menu, ActionIcon, Text } from '@mantine/core'
import { IconBell } from '@tabler/icons-react'

interface INotification {
	icon: React.ReactNode
	message: string
	time: string
}

interface IProps {
	notifications: INotification[]
	mobile?: boolean
}

const Notification = ({ notifications, mobile }: IProps) => {
	return (
		<>
			{mobile ? (
				<Menu position='bottom' withArrow>
					<Menu.Target>
						<ActionIcon variant='light' size='md'>
							<IconBell />
						</ActionIcon>
					</Menu.Target>
					<Menu.Dropdown>
						{notifications?.map((notification, index) => (
							<Menu.Item key={index} icon={notification.icon}>
								<Text lineClamp={2}>{notification.message}</Text>
								<Text size='xs' color='dimmed'>
									{notification.time}
								</Text>
							</Menu.Item>
						))}
					</Menu.Dropdown>
				</Menu>
			) : (
				<Menu position='bottom' withArrow>
					<Menu.Target>
						<ActionIcon variant='transparent' size='md'>
							<IconBell size={20} />
						</ActionIcon>
					</Menu.Target>
					<Menu.Dropdown>
						{notifications?.map((notification, index) => (
							<Menu.Item key={index} icon={notification.icon}>
								<Text lineClamp={2}>{notification.message}</Text>
								<Text size='xs' color='dimmed'>
									{notification.time}
								</Text>
							</Menu.Item>
						))}
					</Menu.Dropdown>
				</Menu>
			)}
		</>
	)
}

export default Notification
