'use client'

import React from 'react'
import { Group, Card, Grid } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import Back from './Back'

interface IProps {
	withBack?: boolean
	children?: React.ReactNode
}

const Toolbar = ({ withBack, children }: IProps) => {
	const isMobile = useMediaQuery('(max-width: 50em)')

	return (
		<Grid>
			<Grid.Col span={12}>
				<Card py={isMobile ? 0 : 10} px={isMobile ? 0 : 15}>
					<Group grow={isMobile} position='left' align='center' spacing='xs'>
						{withBack && <Back />}
						{children}
					</Group>
				</Card>
			</Grid.Col>
		</Grid>
	)
}

export default Toolbar