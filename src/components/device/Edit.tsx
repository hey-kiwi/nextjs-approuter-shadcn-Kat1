'use client'

import { useEffect } from 'react'
import { Grid, Button, TextInput, Stack, Checkbox, Text } from '@mantine/core'
import { useSetState } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import { isNotEmpty, useForm } from '@mantine/form'
import { IconX, IconCheck } from '@tabler/icons-react'
import { IDevice } from '../../interfaces/device'
import { deviceAction } from '../../stores/device'
import { IResponse } from '../../interfaces/response'

interface IProps {
	device: IDevice
}

interface IState {
	loading: boolean
}

interface IEditDeviceForm {
	id: string
	name: string
	location: string
	canBook: boolean
	canCheckin: boolean
	acceptStripe: boolean
	onMaintenance: boolean
}

const Edit = ({ device }: IProps) => {
	console.log(device)
	const [state, setState] = useSetState<IState>({
		loading: false
	})

	const form = useForm<IEditDeviceForm>({
		initialValues: {
			id: device.id,
			name: device.name,
			location: device.location,
			canBook: device.canBook,
			canCheckin: device.canCheckin,
			acceptStripe: device.acceptStripe,
			onMaintenance: device.onMaintenance
		},
		validate: {
			name: isNotEmpty(),
			location: isNotEmpty()
		}
	})

	const update = async (device: IDevice) => {
		setState({ loading: true })
		const result: IResponse = await deviceAction.getState().update(JSON.parse(localStorage.getItem('active')), device)

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
		}

		setState({ loading: false })
	}

	useEffect(() => {
		if (device) {
			form.setFieldValue('id', device.id)
			form.setFieldValue('name', device.name)
			form.setFieldValue('location', device.location)
			form.setFieldValue('canBook', device.canBook)
			form.setFieldValue('canCheckin', device.canCheckin)
			form.setFieldValue('acceptStripe', device.acceptStripe)
			form.setFieldValue('onMaintenance', device.onMaintenance)
		}
	}, [device])

	return (
		<>
			<form onSubmit={form.onSubmit((data: IEditDeviceForm) => update(data))}>
				<Grid gutter='xl' mt={5}>
					<Grid.Col xl={4} lg={5} md={5} sm={6} xs={12}>
						<TextInput variant='filled' label='Name'
								   value={device.name} {...form.getInputProps('name')} />
					</Grid.Col>
					<Grid.Col xl={4} lg={5} md={5} sm={6} xs={12}>
						<TextInput variant='filled' label='Location'
								   value={device.location} {...form.getInputProps('location')} />
					</Grid.Col>
				</Grid>
				<Grid gutter='xl' mt={15}>
					<Grid.Col span={12}>
						<Text color='dimmed'>Settings</Text>
					</Grid.Col>
					<Grid.Col span={12}>
						<Stack>
							<Checkbox label='Can Book?' checked={device?.canBook} {...form.getInputProps('canBook')} />
							<Checkbox label='Can Check-in?' checked={device.canCheckin} {...form.getInputProps('canCheckin')} />
							<Checkbox label='Accept Stripe?' checked={device.acceptStripe} {...form.getInputProps('acceptStripe')} />
							<Checkbox label='On Maintenance?' checked={device.onMaintenance} {...form.getInputProps('onMaintenance')} />
						</Stack>
					</Grid.Col>
				</Grid>
				<Grid gutter='xl' mt={15}>
					<Grid.Col span={4}>
						<Button variant='white' color='dark' type='submit'
								loading={state.loading}>{state.loading ? 'Updating' : 'Update'}</Button>
					</Grid.Col>
				</Grid>
			</form>
		</>
	)
}

export default Edit