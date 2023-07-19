'use client'

import { NextPage } from 'next'
import { Grid, Tabs, Stack, Text } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import Layout from '../../components/app/general/Layout'
import Information from '../../components/account/Information'
import Edit from '../../components/account/Edit'
import ReferralStats from '../../components/account/RefferalStats'
import ReferralCode from '../../components/account/RefferalCode'
import Toolbar from '../../components/app/general/Toolbar'

const Index: NextPage = () => {
	const isMobile = useMediaQuery('(max-width: 50em)')

	return (
		<>
			<Layout>
				<Toolbar withBack />
				<Grid mt={20}>
					<Grid.Col span={12}>
						<Information />
					</Grid.Col>
					<Grid.Col span={12} mt={20}>
						<Tabs defaultValue='general' variant='pills'>
							<Tabs.List grow={isMobile} mb={40}>
								<Tabs.Tab value='general' pr={20}>
									General
								</Tabs.Tab>
								<Tabs.Tab value='referrals' pr={20}>
									Referrals
								</Tabs.Tab>
							</Tabs.List>
							<Tabs.Panel value='general'>
								<Grid gutter='xl'>
									<Grid.Col span={12}>
										<Stack spacing={0}>
											<Text size='lg' weight={500}>
												Profile Information
											</Text>
											<Edit />
										</Stack>
									</Grid.Col>
								</Grid>
							</Tabs.Panel>
							<Tabs.Panel value='referrals'>
								<Grid>
									<Grid.Col span={12} my={0}>
										<Stack spacing={5}>
											<Text size='lg' weight={500}>
												Share your link to get Free Credits
											</Text>
											<Text color='dimmed'>
												Get $5 in Credits for every person who signs up using your code once
												they pay their first bill or purchase credits.
											</Text>
											<ReferralCode />
										</Stack>
									</Grid.Col>
									<Grid.Col span={12} mt={20}>
										<Text size='lg' weight={500}>
											Referral stats
										</Text>
										<Text color='dimmed' mt={10}>
											A brief overview displaying the credits you have earned through referrals
										</Text>
									</Grid.Col>
									<Grid.Col xl={3} lg={3} md={4} sm={6} xs={6} mt={5}>
										<ReferralStats title='Pending' message='$5 per refferal who signed up.'
													   value={0} />
									</Grid.Col>
									<Grid.Col xl={3} lg={3} md={4} sm={6} xs={6} mt={5}>
										<ReferralStats title='Credited' message='Total credits earned so far.'
													   value={0} />
									</Grid.Col>
								</Grid>
							</Tabs.Panel>
						</Tabs>
					</Grid.Col>
				</Grid>
			</Layout>
		</>
	)
}

export default Index