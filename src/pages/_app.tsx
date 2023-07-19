import Head from 'next/head'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'

const App = ({ Component, pageProps }) => {
	return (
		<>
			<Head>
				<title>HeyKiwi Portal</title>
				<meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
			</Head>
			<MantineProvider
				withGlobalStyles
				withNormalizeCSS
				theme={{
					colorScheme: 'dark',
					fontFamily: 'Poppins, sans-serif',
					components: {
						TextInput: {
							styles: theme => ({
								input: {
									backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3],
									borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3],
									'&:focus-within': {
										backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3],
										borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[3]
									}
								}
							}),
							defaultProps: {
								autoComplete: 'off'
							}
						},
						Textarea: {
							styles: theme => ({
								input: {
									backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3],
									borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3],
									'&:focus-within': {
										backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3],
										borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[3]
									}
								}
							}),
							defaultProps: {
								autoComplete: 'off'
							}
						},
						PasswordInput: {
							styles: theme => ({
								input: {
									backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3],
									borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3],
									'&:focus-within': {
										backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3],
										borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[3]
									}
								}
							}),
							defaultProps: {
								autoComplete: 'off'
							}
						},
						NumberInput: {
							styles: theme => ({
								input: {
									backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3],
									borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3],
									'&:focus-within': {
										backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3],
										borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[3]
									}
								}
							}),
							defaultProps: {
								autoComplete: 'off'
							}
						},
						DateInput: {
							styles: theme => ({
								input: {
									backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3],
									borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3],
									'&:focus-within': {
										backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3],
										borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[3]
									}
								}
							}),
							defaultProps: {
								autoComplete: 'off'
							}
						},
						Select: {
							styles: theme => ({
								input: {
									backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3],
									borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3],
									'&:focus-within': {
										backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3],
										borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[3]
									}
								}
							}),
							defaultProps: {
								autoComplete: 'off'
							}
						},
						Checkbox: {
							styles: theme => ({
								input: {
									backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3],
									borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3],
									radius: 'xl',
									'&:focus-within': {
										backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3],
										borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
									},
									'&:checked': {
										backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.black,
										borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
									}
								}
							})
						},
						Button: {
							styles: () => ({
								root: {
									variant: 'filled',
									radius: 'sm',
									'&:active': {
										backgroundColor: 'parent'
									}
								}
							})
						},
						ActionIcon: {
							styles: (theme, params, { variant }) => ({
								root: {
									color: variant === 'filled' ? theme.black : undefined,
									backgroundColor: variant === 'filled' ? theme.white : undefined,
									size: 'lg',
									radius: 'sm',
									'&:hover': {
										backgroundColor: '#fff',
										color: '#000'
									}
								}
							})
						},
						Tabs: {
							styles: theme => ({
								tab: {
									fontWeight: 600,
									fontSize: 14,
									'&[data-active]:hover': {
										backgroundColor: theme.colorScheme === 'dark' ? theme.white : theme.black,
										borderColor: theme.colorScheme === 'dark' ? theme.white : theme.black,
										color: theme.colorScheme === 'dark' ? theme.black : theme.white
									},
									'&[data-active]': {
										backgroundColor: theme.colorScheme === 'dark' ? theme.white : theme.black,
										borderColor: theme.colorScheme === 'dark' ? theme.white : theme.black,
										color: theme.colorScheme === 'dark' ? theme.black : theme.white
									}
								}
							})
						},
						Card: {
							styles: theme => ({
								root: {
									backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2],
									radius: 'md'
								}
							})
						},
						Paper: {
							styles: theme => ({
								root: {
									backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
									border: '0px',
									radius: 'md'
								}
							})
						},
						Modal: {
							styles: theme => ({
								props: {
									backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[3],
									radius: 'md'
								}
							})
						},
						Loader: {
							styles: theme => ({
								defaultProps: {
									color: theme.colorScheme === 'dark' ? theme.white : theme.black
								}
							})
						}
					}
			}}
			>
				<UserProvider>
					<Notifications position='top-center' />
					<Component {...pageProps} />
				</UserProvider>
			</MantineProvider>
		</>
	)
}

export default App
