import { Box, Code, Group, Image, Progress, Stack, Text } from '@mantine/core'
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
import type { ResourceNode } from '~/data/realms'
import { useRealmStore } from '~/state/useRealmStore'
import classes from './Navbar.module.css'

export default function NavbarSimple() {
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

				{activeRealm ? <RealmNavbar /> : <MainNavbar />}
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

function DevLink() {
	const isDev = process.env.NODE_ENV === 'development'
	return isDev ? <NavLink name='Dev' icon={IconNotes} link='/dev' /> : null
}

function MainNavbar() {
	return (
		<>
			<NavLink name='Home' icon={IconHome} link='/' />
			<NavLink name='Town' icon={IconTower} link='/town' />
			<NavLink name='Realms' icon={IconWorld} link='/realms' />
			<NavLink name='Gear' icon={IconUserShield} link='/gear' />
			<NavLink name='Skills' icon={IconAxe} link='/skills' />
			<DevLink />
		</>
	)
}

function RealmNavbar() {
	const activity = useRealmStore(state => state.activity)
	const activityList = Object.values(activity)

	return (
		<>
			<NavLink name='Realm' icon={IconWorld} link='/realm' />
			<NavLink name='Gear' icon={IconUserShield} link='/realmGear' />
			<NavLink name='Skills' icon={IconAxe} link='/skills' />
			<DevLink />

			<Stack className={classes.activitySection}>
				{!!activityList.length &&
					activityList.map(resource => <Activity key={resource.name} resource={resource} />)}
			</Stack>
		</>
	)
}

type ActivityProps = {
	resource: ResourceNode
}

function Activity({ resource }: ActivityProps) {
	return (
		<Group p='xs'>
			<Image src={`/resources/${resource.image}.png`} h={48} radius='md' />
			<Stack gap={0} style={{ flex: 1 }}>
				<Text>{resource.name}</Text>
				<Progress value={10} />
			</Stack>
		</Group>
	)
}
