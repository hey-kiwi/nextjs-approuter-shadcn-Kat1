'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Box, Grid, Loader, LoadingOverlay, Stack, Tabs, Text } from '@mantine/core'
import { useDidUpdate, useMediaQuery, useSetState } from '@mantine/hooks'
import { IDevice } from '../../interfaces/device'
import { deviceAction } from '../../stores/device'
import { IResponse } from '../../interfaces/response'
import Layout from '../../components/app/general/Layout'
import Toolbar from '../../components/app/general/Toolbar'
import Edit from '../../components/device/Edit'
import Information from '../../components/device/Information'

interface IState {
	id: string
	device: IDevice
	loading: boolean
}

const Id = () => {
	const isMobile = useMediaQuery('(max-width: 50em)')
	const router = useRouter()
	const [state, setState] = useSetState<IState>({
		id: '',
		device: {
			id: '',
			key: '',
			name: '',
			location: '',
			canBook: false,
			canCheckin: false,
			onMaintenance: false,
			bookingIntegration: null,
			paymentIntegration: null,
			acceptStripe: false,
			isActive: true,
			organizationId: null,
			organizationName: ''
		},
		loading: false
	})

	const getDevice = async () => {
		setState({ loading: true })
		if (state.id && JSON.parse(localStorage.getItem('active'))) {
			const result: IResponse = await deviceAction.getState().get(JSON.parse(localStorage.getItem('active')), state.device)

			if (result.ok) {
				setState({
					device: result.data
				})
			}
		}
		setState({ loading: false })
	}

	useEffect(() => {
		if (router.query.id) {
			setState({
				id: router.query.id as string,
				device: {
					...state.device,
					id: router.query.id as string
				}
			})
		}
	}, [router.query?.id])

	useDidUpdate(() => {
		getDevice()
	}, [state.id])

	return (
		<>
			<Layout>
				<Toolbar withBack />
				<Box>
					<LoadingOverlay overlayBlur={2} visible={state.loading} loader={<Loader color='white' />} />
					<Grid mt={20}>
						<Grid.Col span={12}>
							<Information device={state.device} />
						</Grid.Col>
						<Grid.Col span={12} mt={20}>
							<Tabs defaultValue='general' variant='pills'>
								<Tabs.List grow={isMobile} mb={40}>
									<Tabs.Tab value='general' pr={20}>
										General
									</Tabs.Tab>
									<Tabs.Tab value='transactions' pr={20}>
										Transactions
									</Tabs.Tab>
									<Tabs.Tab value='logs' pr={20}>
										Logs
									</Tabs.Tab>
								</Tabs.List>
								<Tabs.Panel value='general'>
									<Grid gutter='xl'>
										<Grid.Col span={12}>
											<Stack spacing={0}>
												<Text size='lg' weight={500}>
													Device Information
												</Text>
												<Edit device={state.device} />
											</Stack>
										</Grid.Col>
									</Grid>
								</Tabs.Panel>
								<Tabs.Panel value='transactions'>
									<Grid gutter='xl'>
										<Grid.Col span={12}>
											{/*<Invite />*/}
										</Grid.Col>
									</Grid>
									{/*<List device={state.device}*/}
									{/*	getDevice={getDevice} />*/}
								</Tabs.Panel>
								<Tabs.Panel value='logs'>
									<Grid gutter='xl'>
										<Grid.Col xl={3} lg={4} md={6} sm={12} xs={12}>
											{/*<Connection device={state.device}*/}
											{/*	getDevice={getDevice} />*/}
										</Grid.Col>
									</Grid>
								</Tabs.Panel>
							</Tabs>
						</Grid.Col>
					</Grid>
				</Box>
			</Layout>
		</>
	)
}

export default Id