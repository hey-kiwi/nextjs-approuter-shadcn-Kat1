'use client'

import { CopyButton, ActionIcon } from '@mantine/core'
import { IconCheck, IconCopy } from '@tabler/icons-react'

interface IProps {
	value: string
}

const Copy = ({ value }: IProps) => {
	return (
		<CopyButton value={value} timeout={5000}>
			{({ copied, copy }) => <ActionIcon onClick={copy}>{copied ? <IconCheck /> : <IconCopy />}</ActionIcon>}
		</CopyButton>
	)
}

export default Copy
