import { Box, Code, Group, Image, Stack, Text } from '@mantine/core'
import { IconAxe, IconSettings, IconTower, IconUserShield, IconWorld } from '@tabler/icons-react'
import { useState } from 'react'
import { version } from '~/../package.json'
import classes from './Navbar.module.css'

const data = [
	{ link: '', label: 'Town', icon: IconTower },
	{ link: '', label: 'Realms', icon: IconWorld },
	{ link: '', label: 'Gear', icon: IconUserShield },
	{ link: '', label: 'Skills', icon: IconAxe }
] as const

export default function NavbarSimple() {
	const [active, setActive] = useState<(typeof data)[number]['label']>(data[0].label)

	const links = data.map(item => (
		<a
			className={classes.link}
			data-active={item.label === active || undefined}
			href={item.link}
			key={item.label}
			onClick={event => {
				event.preventDefault()
				setActive(item.label)
			}}
		>
			<item.icon className={classes.linkIcon} stroke={1.5} />
			<Text>{item.label}</Text>
		</a>
	))

	return (
		<Stack component='nav' p='md' className={classes.navbar}>
			<Box style={{ flex: 1 }}>
				<Group className={classes.header} justify='space-between'>
					<Group gap='xs'>
						<Image src='/logo.png' w={32} />
						<Text>Draconic Realms</Text>
					</Group>
					<Code fw={700}>v{version}</Code>
				</Group>
				{links}
			</Box>

			<Box pt='md' mt='md' className={classes.footer}>
				<a href='/' className={classes.link}>
					<IconSettings className={classes.linkIcon} stroke={1.5} />
					<Text>Settings</Text>
				</a>
			</Box>
		</Stack>
	)
}
