'use client'

import Link from 'next/link'
import { Card, Divider, Grid, Group, Stack, Text } from '@mantine/core'
import { IconMapPin, IconKey, IconPointFilled } from '@tabler/icons-react'
import { IDevice } from '../../interfaces/device'

interface IProps {
	devices: IDevice[]
}

const List = ({ devices }: IProps) => {
	return (
		<>
			<Grid mt={10}>
				{devices?.length > 0 && devices.map((device: IDevice) => (
					<Grid.Col key={device.id} xl={3} lg={4} md={6} sm={12} xs={12}>
						<Link href={`/devices/${device.id}`} legacyBehavior>
							<Card component='a' href='#'>
								<Card.Section px='lg' py='sm'>
									<Group noWrap>
										<Text size='lg' weight={600}>{device.name}</Text>
									</Group>
								</Card.Section>
								<Card.Section>
									<Divider color='#373a4054' />
								</Card.Section>
								<Card.Section px='lg' py='sm'>
									<Stack spacing='xs'>
										<Group position='left' align='center' spacing={7} noWrap>
											<IconKey size={20} />
											<Text size='sm' color='dimmed' truncate>{device.key}</Text>
										</Group>
										<Group position='left' align='center' spacing={7} noWrap>
											<IconMapPin size={20} />
											<Text size='sm' color='dimmed' truncate>{device.location}</Text>
										</Group>
									</Stack>
								</Card.Section>
								<Card.Section>
									<Divider color='#373a4054' />
								</Card.Section>
								<Card.Section p='lg' py='sm'>
									<Group>
										<Stack spacing={5}>
											<Group position='left' align='center' spacing={7}>
												<IconPointFilled size={20}
																 style={{ color: device.onMaintenance ? '#87ef87' : '#ff8b8b' }} />
												<Text size='sm' color='dimmed' truncate>Maintenance</Text>
											</Group>
											<Group position='left' align='center' spacing={7}>
												<IconPointFilled size={20}
																 style={{ color: device.acceptStripe ? '#87ef87' : '#ff8b8b' }} />
												<Text size='sm' color='dimmed' truncate>Stripe</Text>
											</Group>
										</Stack>
										<Stack spacing={5}>
											<Group position='left' align='center' spacing={7}>
												<IconPointFilled size={20}
																 style={{ color: device.canBook ? '#87ef87' : '#ff8b8b' }} />
												<Text size='sm' color='dimmed' truncate>Booking</Text>
											</Group>
											<Group position='left' align='center' spacing={7}>
												<IconPointFilled size={20}
																 style={{ color: device.canCheckin ? '#87ef87' : '#ff8b8b' }} />
												<Text size='sm' color='dimmed' truncate>Check-in</Text>
											</Group>
										</Stack>
									</Group>
								</Card.Section>
							</Card>
						</Link>
					</Grid.Col>
				))}
			</Grid>
		</>
	)
}

export default List