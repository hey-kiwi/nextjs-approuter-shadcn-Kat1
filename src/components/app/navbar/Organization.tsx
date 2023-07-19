'use client'

import React, { forwardRef, useCallback, useEffect } from 'react'
import { Avatar, Button, Group, Select, Text } from '@mantine/core'
import { useDidUpdate, useSetState } from '@mantine/hooks'
import { IOrganization, IOrganizationAction } from '../../../interfaces/organization'
import { organizationAction } from '../../../stores/organization'
import Create from '../../organization/Create'
import organization from '../../../pages/organization'
import { deviceAction } from '../../../stores/device'

interface DataProps extends React.ComponentPropsWithoutRef<'div'> {
	logo: string;
	label: string;
	location: string;
}

interface IState {
	opened: boolean
	active: IOrganization
	organizations: IOrganization[]
	data: any
	name: string
}

const getFirstLetters = (string: string) => string.split(' ').map(word => word.charAt(0)).join('')

const SelectItem = forwardRef<HTMLDivElement, DataProps>(
	({ logo, label, location, ...others }: DataProps, ref) => (
		<div ref={ref} {...others}>
			<Group align='center' noWrap>
				<Avatar color='dark' src={logo}>
					{getFirstLetters(label)}
				</Avatar>
				<div>
					<Text size='sm'>{label}</Text>
				</div>
			</Group>
		</div>
	)
)

const Organization = () => {
	const [state, setState] = useSetState<IState>({
		opened: false,
		active: organizationAction.getState().active,
		organizations: organizationAction.getState().organizations,
		data: [],
		name: ''
	})

	const list = async () => await organizationAction.getState().list()

	const updateActive = async (value: string) => {
		organizationAction.setState({
			active: organizationAction.getState().organizations?.filter((organization: IOrganization) => organization.name == value)[0]
		})

		localStorage.setItem('active', JSON.stringify(organizationAction.getState().organizations?.filter((organization: IOrganization) => organization.name == value)[0]))

		await deviceAction.getState().list(organizationAction.getState().active)
	}

	useEffect(() => {
		list()

		const active: IOrganization = JSON.parse(localStorage.getItem('active'))
		if (active?.id) {
			setState({
				active: active
			})
		}
	}, [])

	organizationAction.subscribe(() => {
		setState({
			organizations: organizationAction.getState().organizations
		})
	})

	useDidUpdate(() => {
		setState({
			data: state.organizations.map((organization: IOrganization) => {
				return {
					value: organization.id,
					label: organization.name,
					location: organization.location,
					logo: organization.logo
				}
			}) || []
		})

	}, [state.organizations])

	const Dropdown = useCallback(() => {
		return (
			<Select
				placeholder='Select organization'
				itemComponent={SelectItem}
				data={state.data}
				defaultValue={state.active?.id}
				maxDropdownHeight={400}
				color='grey'
				creatable
				getCreateLabel={(query) => `+ Create ${query}`}
				onCreate={(query: string) => {
					setState({ name: query || '', opened: true })
					return query
				}}
				onSelect={async (e: any) => updateActive(e.target.value)}
				filter={(value, item) =>
					item.label.toLowerCase().includes(value.toLowerCase().trim()) ||
					item.location.toLowerCase().includes(value.toLowerCase().trim())
				}
				transitionProps={{ transition: 'pop-top-left', duration: 80, timingFunction: 'ease' }}
			/>
		)
	}, [state.data])

	return (
		<>
			{state.opened &&
				<Create name={state.name} opened={state.opened} onClose={() => setState({ opened: false })} />}
			<Dropdown />
		</>
	)
}

export default Organization