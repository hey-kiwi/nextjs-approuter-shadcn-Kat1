'use client'

import {NextPage} from 'next'
import {useRouter} from 'next/router'
import {useUser} from '@auth0/nextjs-auth0/client'
import {Loader, LoadingOverlay} from '@mantine/core'
import {useDidUpdate} from '@mantine/hooks'
import {useEffect} from 'react'

const Index: NextPage = () => {
	const router = useRouter()
	const auth0 = useUser()

	useDidUpdate(() => {
		if (auth0.user?.sub) {
			router?.push('/dashboard')
		} else {
			router?.push('/api/auth/login')
		}
	}, [auth0])

	return (
		<>
			<LoadingOverlay bg='transparent' visible={true} loader={<Loader color='white'/>}/>
		</>
	)
}

export default Index