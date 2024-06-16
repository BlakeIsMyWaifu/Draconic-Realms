import { Box, Code, Group, Image, Stack, Text } from '@mantine/core'
import { IconAxe, IconHome, IconSettings, IconTower, IconUserShield, IconWorld, type Icon } from '@tabler/icons-react'
import { Link, type LinkProps } from '@tanstack/react-router'
import { version } from '~/../package.json'
import classes from './Navbar.module.css'

export default function NavbarSimple() {
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

				<NavLink name='Home' icon={IconHome} link='/' />
				<NavLink name='Town' icon={IconTower} link='/town' />
				<NavLink name='Realms' icon={IconWorld} link='/realms' />
				<NavLink name='Gear' icon={IconUserShield} link='/gear' />
				<NavLink name='Skills' icon={IconAxe} link='/skills' />
			</Box>

			<Box pt='md' mt='md' className={classes.footer}>
				<NavLink name='Settings' icon={IconSettings} link='/settings' />
			</Box>
		</Stack>
	)
}

type NavLinkProps = {
	name: string
	icon: Icon
	link: LinkProps['to']
}

function NavLink({ name, icon: Icon, link }: NavLinkProps) {
	return (
		<Link to={link} className={classes.link}>
			<Icon className={classes.linkIcon} stroke={1.5} />
			<Text>{name}</Text>
		</Link>
	)
}
