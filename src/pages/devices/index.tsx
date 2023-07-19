'use client'

import { useEffect } from 'react'
import { NextPage } from 'next'
import { useDidUpdate, useSetState } from '@mantine/hooks'
import Layout from '../../components/app/general/Layout'
import Toolbar from '../../components/app/general/Toolbar'
import Create from '../../components/device/Create'
import List from '../../components/device/List'
import { IDevice } from '../../interfaces/device'
import { deviceAction } from '../../stores/device'
import { organizationAction } from '../../stores/organization'
import { IResponse } from '../../interfaces/response'
import { IOrganization } from '../../interfaces/organization'
import { Loader, LoadingOverlay } from '@mantine/core'

interface IState {
	loading: boolean
	devices: IDevice[]
}

const Index: NextPage = () => {
	const [state, setState] = useSetState<IState>({
		loading: false,
		devices: []
	})

	const getList = async () => {
		setState({ loading: true })
		const store: IOrganization = JSON.parse(localStorage.getItem('active'))

		let active = null
		if (store.id) {
			active = store
		} else {
			active = organizationAction.getState().active
		}

		const result: IResponse = await deviceAction.getState().list(active)

		if (result.ok) {
			setState({
				devices: result.data
			})
		}
		setState({ loading: false })
	}

	deviceAction.subscribe(() => {
		setState({
			devices: deviceAction.getState().devices
		})
	})

	useEffect(() => {
		getList()
	}, [])

	return (
		<>
		<Layout>
				<LoadingOverlay overlayBlur={2} visible={state.loading} loader={<Loader color='white' />} />
				<Toolbar withBack>
					<Create withButton='icon' onClose={() => null} />
				</Toolbar>
				<List devices={state.devices} />
			</Layout>
		</>
	)
}

export default Index