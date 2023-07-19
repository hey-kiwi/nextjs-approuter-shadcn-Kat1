'use client'

import { ActionIcon } from '@mantine/core'
import { useFullscreen } from '@mantine/hooks'
import { IconMaximize, IconMinimize } from '@tabler/icons-react'

const Fullscreen = () => {
	const { toggle, fullscreen } = useFullscreen()

	return <ActionIcon variant='transparent' size='md' onClick={toggle}>{fullscreen ? <IconMinimize size={24} /> :
		<IconMaximize size={20} />}</ActionIcon>
}

export default Fullscreen
