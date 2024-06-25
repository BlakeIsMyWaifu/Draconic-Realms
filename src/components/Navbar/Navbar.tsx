import { Box, Code, Group, Image, Stack, Text } from '@mantine/core'
import {
	IconAxe,
	IconHome,
	IconNotes,
	IconSettings,
	IconTower,
	IconUserShield,
	IconWorld,
	type Icon
} from '@tabler/icons-react'
import { Link, type LinkProps } from '@tanstack/react-router'
import { version } from '~/../package.json'
import { useRealmStore } from '~/state/useRealmStore'
import ActivitySection from './ActivitySection'
import classes from './Navbar.module.css'

const mainPages: NavLinkProps[] = [
	{ name: 'Home', icon: IconHome, link: '/' },
	{ name: 'Town', icon: IconTower, link: '/town' },
	{ name: 'Realms', icon: IconWorld, link: '/realms' },
	{ name: 'Gear', icon: IconUserShield, link: '/gear' },
	{ name: 'Skills', icon: IconAxe, link: '/skills' }
]

const realmPages: NavLinkProps[] = [
	{ name: 'Realm', icon: IconWorld, link: '/realm' },
	{ name: 'Gear', icon: IconUserShield, link: '/realmGear' },
	{ name: 'Skills', icon: IconAxe, link: '/skills' }
]

export default function NavbarSimple() {
	const isDev = process.env.NODE_ENV === 'development'

	const activeRealm = useRealmStore(state => state.active)

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

				{(activeRealm ? realmPages : mainPages).map(props => {
					return <NavLink key={props.link} {...props} />
				})}
				{isDev && <NavLink name='Dev' icon={IconNotes} link='/dev' />}

				{activeRealm && <ActivitySection />}
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
