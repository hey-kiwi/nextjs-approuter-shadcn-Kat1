'use client'

import { Avatar, Button, Group, Stack, Text } from '@mantine/core'
import { useMediaQuery, useSetState } from '@mantine/hooks'
import { IAccount, IAccountAction } from '../../interfaces/account'
import { accountAction } from '../../stores/account'

const Information = () => {
	const isMobile = useMediaQuery('(max-width: 50em)')
	const [state, setState] = useSetState<IAccount>({ ...accountAction.getState().account })
	accountAction.subscribe((action: IAccountAction) => setState({ ...action.account }))

	return (
		<>
			<Group position='apart' align='top'>
				<Group position='left' align='center'>
					<Avatar src={state.avatar} size='xl' />
					<Stack spacing={0}>
						<Text>{state.name}</Text>
						<Text size='sm' color='dimmed'>{state.email}</Text>
						<Text size='sm' color='dimmed'>{state.phone}</Text>
					</Stack>
				</Group>
				<Button variant='white' color='dark' fullWidth={isMobile}>Manage subscription</Button>
			</Group>
		</>
	)
}

export default Information