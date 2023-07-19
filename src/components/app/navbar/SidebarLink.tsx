'use client'

import React from 'react'
import { useRouter } from 'next/router'
import { UnstyledButton, Group, Text } from '@mantine/core'

interface ISidebarLinks {
	icon: React.ReactNode
	label: string
	path: string
	handleClick?: (bool: boolean) => any
}

const SidebarLink = ({ icon, label, path, handleClick }: ISidebarLinks) => {
	const router = useRouter()

	const onClick = () => {
		router.push(path)

		if (handleClick) {
			handleClick(true)
		}
	}

	return (
		<UnstyledButton
			sx={theme => ({
				display: 'block',
				width: '100%',
				padding: theme.spacing.xs,
				borderRadius: theme.radius.sm,
				color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
				'&:hover': {
					backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0]
				}
			})}
			onClick={onClick}
		>
			<Group>
				{icon}
				<Text>{label}</Text>
			</Group>
		</UnstyledButton>
	)
}

export default SidebarLink
