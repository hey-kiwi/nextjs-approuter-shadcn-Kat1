'use client'

import { Avatar, Button, Group, Stack, Text } from '@mantine/core'
import { useMediaQuery, useSetState } from '@mantine/hooks'
//import Delete from './Delete'
import { IDevice } from '../../interfaces/device'
import { IconKey, IconMapPinFilled } from '@tabler/icons-react'

interface IProps {
	device: IDevice
}

const Information = ({ device }: IProps) => {
	const isMobile = useMediaQuery('(max-width: 50em)')

	const getFirstLetters = (string: string) => string.split(' ').map(word => word.charAt(0)).join('')

	return (
		<>
			<Group position='apart' align='top'>
				<Stack spacing='xs'>
					<Text size='xl'>{device.name}</Text>
					<Group position='left' spacing='xs'>
						<IconKey />
						<Text color='dimmed'>{device.key}</Text>
					</Group>
					<Group position='left' spacing='xs'>
						<IconMapPinFilled />
						<Text color='dimmed'>{device.location}</Text>
					</Group>
				</Stack>
				{/*<Delete organization={organization} />*/}
			</Group>
		</>
	)
}

export default Information