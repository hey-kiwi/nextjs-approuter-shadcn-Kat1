'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Avatar, Button, Group, Stack, Text } from '@mantine/core'
import { useMediaQuery, useSetState } from '@mantine/hooks'
import { IOrganization } from '../../interfaces/organization'
import { organizationAction } from '../../stores/organization'
import Delete from './Delete'

interface IProps {
	organization: IOrganization
}

const Information = ({ organization }: IProps) => {
	const isMobile = useMediaQuery('(max-width: 50em)')

	const getFirstLetters = (string: string) => string.split(' ').map(word => word.charAt(0)).join('')

	return (
		<>
			<Group position='apart' align='top'>
				<Group position='left' align='center'>
					<Avatar size='xl' color='dark' src={organization.logo} alt={organization.name}>
						{getFirstLetters(organization.name)}
					</Avatar>
					<Stack spacing={0}>
						<Text>{organization.name}</Text>
						<Text size='sm' color='dimmed'>{organization.email}</Text>
						<Text size='sm' color='dimmed'>{organization.phone}</Text>
					</Stack>
				</Group>
				<Delete organization={organization} />
			</Group>
		</>
	)
}

export default Information