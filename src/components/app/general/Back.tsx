'use client'

import { useRouter } from 'next/router'
import { ActionIcon } from '@mantine/core'
import { IconChevronLeft } from '@tabler/icons-react'


const Back = () => {
	const { back } = useRouter()

	return (
		<ActionIcon variant='dark' onClick={back}>
			<IconChevronLeft />
		</ActionIcon>
	)
}

export default Back