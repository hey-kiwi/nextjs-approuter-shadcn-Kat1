'use client'

import { Affix, rem, Transition, ActionIcon, createStyles } from '@mantine/core'
import { useWindowScroll } from '@mantine/hooks'
import { IconArrowUp } from '@tabler/icons-react'

const useStyles = createStyles((theme) => ({
	button: {
		background: theme.white,
		color: theme.black
	}
}))

const ScrollToTop = () => {
	const { classes } = useStyles()
	const [scroll, scrollTo] = useWindowScroll()

	return (
		<Affix position={{ bottom: rem(20), right: rem(20) }}>
			<Transition transition='slide-up' mounted={scroll.y > 0}>
				{transitionStyles => (
					<ActionIcon
						className={classes.button}
						style={transitionStyles}
						onClick={() => scrollTo({ y: 0 })}
					>
						<IconArrowUp size='1.3rem' />
					</ActionIcon>
				)}
			</Transition>
		</Affix>
	)
}

export default ScrollToTop
