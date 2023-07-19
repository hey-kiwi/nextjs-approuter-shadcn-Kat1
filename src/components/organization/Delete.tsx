'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Button } from '@mantine/core'
import { useMediaQuery, useSetState } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import { IconCheck, IconX } from '@tabler/icons-react'
import { organizationAction } from '../../stores/organization'
import { IAccounts, IOrganization } from '../../interfaces/organization'
import { IResponse } from '../../interfaces/response'
import { accountAction } from '../../stores/account'

interface IProps {
	organization: IOrganization
}

interface IState {
	loading: boolean
	owner: boolean
}

const Delete = ({ organization }: IProps) => {
	const isMobile = useMediaQuery('(max-width: 50em)')
	const router = useRouter()
	const [state, setState] = useSetState<IState>({
		loading: false,
		owner: false
	})

	const deleteOrganization = async () => {
		const result: IResponse = await organizationAction.getState().delete(organization)

		if (!result.ok) {
			notifications.show({
				message: result.message,
				color: 'red',
				icon: <IconX size={16} />
			})
		} else {
			notifications.show({
				message: result.message,
				color: 'green',
				icon: <IconCheck size={16} />
			})

			setState({ loading: false })

			await router.push('/organization')
		}
	}

	useEffect(() => {
		const account = organization.accounts?.filter((accounts: IAccounts) => accountAction.getState().account.email == accounts.accountEmail)[0]

		if (account) {
			setState({ owner: account.owner })
		}
	}, [accountAction.getState().account, organization])

	return (
		<>
			{state.owner && (
				<Button color='red' variant='light' fullWidth={isMobile} onClick={deleteOrganization}>Delete
					organization</Button>
			)}
		</>
	)
}

export default Delete