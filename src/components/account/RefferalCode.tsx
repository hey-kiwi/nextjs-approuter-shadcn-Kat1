'use client'

import { Grid, TextInput } from '@mantine/core'
import Copy from '../app/general/Copy'

const ReferralCode = () => {
	const code = 'welcome'
	const link = `https://heykiwi.app/referralCode=${code}`
	return (
		<Grid gutter='xl' mt={5}>
			<Grid.Col xl={4} lg={5} md={5} sm={6} xs={12}>
				<TextInput readOnly variant='filled' label='Refferal code' value={code}
						   rightSection={<Copy value={code} />} />
			</Grid.Col>
			<Grid.Col xl={4} lg={5} md={5} sm={6} xs={12}>
				<TextInput readOnly variant='filled' label='Referral link' value={link}
						   rightSection={<Copy value={link} />} />
			</Grid.Col>
		</Grid>
	)
}

export default ReferralCode