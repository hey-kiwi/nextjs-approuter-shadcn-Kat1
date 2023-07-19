'use client'

import { Card, Stack, Text } from '@mantine/core'

interface IProps {
	title: string
	message: string
	value: any
}

const ReferralStats = ({ title, message, value }: IProps) => {
	return (
		<Card>
			<Stack spacing={10}>
				<Text weight={500}>{title}</Text>
				<Text size='sm' color='dimmed'>{message}</Text>
				<Text size='lg'>${value}</Text>
			</Stack>
		</Card>
		)
}

export default ReferralStats