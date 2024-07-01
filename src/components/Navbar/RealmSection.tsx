import { Box, Group, Image, Stack } from '@mantine/core'
import CountdownProgress from '~/components/CountdownProgress'
import classes from '~/components/Navbar/Navbar.module.css'
import TimedProgress from '~/components/TimedProgress'
import type { ResourceNode } from '~/data/realms'
import { useRealmStore } from '~/state/useRealmStore'

export default function RealmSection() {
	return (
		<>
			<TimeRemaining />
			<ActivitySection />
		</>
	)
}

function TimeRemaining() {
	const time = useRealmStore(state => state.time)
	const leaveRealm = useRealmStore(state => state.leaveRealm)

	return (
		<Box className={classes.realmSection}>
			<CountdownProgress time={time} label='Time Remaining - {{countdown}}' onComplete={leaveRealm} />
		</Box>
	)
}

function ActivitySection() {
	const activity = useRealmStore(state => state.activity)
	const activityList = Object.values(activity)

	return activityList.length ? (
		<Stack className={classes.realmSection}>
			{activityList.map(resource => (
				<Activity key={resource.name} resource={resource} />
			))}
		</Stack>
	) : null
}

type ActivityProps = {
	resource: ResourceNode
}

function Activity({ resource }: ActivityProps) {
	return (
		<Group p='xs'>
			<Image src={`/resources/${resource.image}.png`} h={48} radius='md' />
			<TimedProgress
				time={resource.time}
				label={resource.name}
				onComplete={() => {
					// TODO add resources on complete
				}}
				style={{ flex: 1 }}
			/>
		</Group>
	)
}
