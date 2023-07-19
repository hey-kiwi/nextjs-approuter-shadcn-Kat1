'use client'

import { Grid } from '@mantine/core'
import Layout from '../../components/app/general/Layout'
import Toolbar from '../../components/app/general/Toolbar'
import Create from '../../components/organization/Create'
import List from '../../components/organization/List'
import Invitation from '../../components/organization/member/Invitation'

const Index = () => {
	return (
		<>
			<Layout>
				<Toolbar withBack>
					<Create withButton='icon' onClose={() => null} />
				</Toolbar>
				<Invitation />
				<List />
			</Layout>
		</>
	)
}

export default Index