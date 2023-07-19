'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Grid, Tabs, Stack, Text, LoadingOverlay, Loader, Box } from '@mantine/core'
import { useDidUpdate, useMediaQuery, useSetState } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import { IconX } from '@tabler/icons-react'
import { IResponse } from '../../interfaces/response'
import { IAccounts, IOrganization } from '../../interfaces/organization'
import { organizationAction } from '../../stores/organization'
import Layout from '../../components/app/general/Layout'
import Information from '../../components/organization/Information'
import Edit from '../../components/organization/Edit'
import Invite from '../../components/organization/member/Invite'
import List from '../../components/organization/member/List'
import { accountAction } from '../../stores/account'
import Toolbar from '../../components/app/general/Toolbar'
import Fusemetrix from '../../components/organization/integration/Fusemetrix'
import VCloud from '../../components/organization/integration/VCloud'

interface IState {
	id: string
	organization: IOrganization
	loading: boolean
}

const Id = () => {
	const isMobile = useMediaQuery('(max-width: 50em)')
	const router = useRouter()
	const [state, setState] = useSetState<IState>({
		id: '',
		organization: {
			id: '',
			name: '',
			email: '',
			phone: '',
			location: ''
		},
		loading: false
	})

	const getOrganization = async () => {
		setState({ loading: true })
		const result: IResponse = await organizationAction.getState().get(state.organization)

		if (result.ok) {
			const organization: IOrganization = result.data
			setState({
				organization: organization
			})
		} else {
			notifications.show({
				message: result.message,
				color: 'red',
				icon: <IconX />
			})

			await router.push('/organization')
		}

		setState({ loading: false })
	}

	useEffect(() => {
		if (router.query.id != undefined) {
			const id: string = router.query.id as string
			setState({
				id: id,
				organization: {
					id: id,
					name: '',
					email: '',
					phone: '',
					location: ''
				}
			})
		}
	}, [router.query.id])

	useDidUpdate(() => {
		getOrganization()
	}, [state.id])

	useEffect(() => {
		const canView = state.organization.accounts?.filter((accounts: IAccounts) => accounts.accountEmail == accountAction.getState().account.email)
		if (canView?.length == 0) {
			router.push('/organization')
		}
	}, [state.organization])

	return (
		<Layout>
			<Toolbar withBack />
			<Box>
				<LoadingOverlay overlayBlur={2} visible={state.loading} loader={<Loader color='white' />} />
				<Grid mt={20}>
					<Grid.Col span={12}>
						<Information organization={state.organization} />
					</Grid.Col>
					<Grid.Col span={12} mt={20}>
						<Tabs defaultValue='general' variant='pills'>
							<Tabs.List grow={isMobile} mb={40}>
								<Tabs.Tab value='general' pr={20}>
									General
								</Tabs.Tab>
								<Tabs.Tab value='members' pr={20}>
									Members
								</Tabs.Tab>
								<Tabs.Tab value='integrations' pr={20}>
									Integrations
								</Tabs.Tab>
							</Tabs.List>
							<Tabs.Panel value='general'>
								<Grid gutter='xl'>
									<Grid.Col span={12}>
										<Stack spacing={0}>
											<Text size='lg' weight={500}>
												Organization Information
											</Text>
											<Edit organization={state.organization} />
										</Stack>
									</Grid.Col>
								</Grid>
							</Tabs.Panel>
							<Tabs.Panel value='members'>
								<Grid gutter='xl'>
									<Grid.Col span={12}>
										<Invite />
									</Grid.Col>
								</Grid>
								<List organization={state.organization}
									  getOrganization={getOrganization} />
							</Tabs.Panel>
							<Tabs.Panel value='integrations'>
								<Grid gutter='xl'>
									<Grid.Col xl={3} lg={4} md={6} sm={12} xs={12}>
										<Fusemetrix organization={state.organization}
													getOrganization={getOrganization} />
									</Grid.Col>
									<Grid.Col xl={3} lg={4} md={6} sm={12} xs={12}>
										<VCloud organization={state.organization}
											getOrganization={getOrganization} />
									</Grid.Col>
								</Grid>
							</Tabs.Panel>
						</Tabs>
					</Grid.Col>
				</Grid>
			</Box>
		</Layout>
	)
}

export default Id