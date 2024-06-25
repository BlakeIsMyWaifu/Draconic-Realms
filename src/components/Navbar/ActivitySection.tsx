import { Group, Image, Stack } from '@mantine/core'
import classes from '~/components/Navbar/Navbar.module.css'
import TimedProgress from '~/components/TimedProgress'
import type { ResourceNode } from '~/data/realms'
import { useRealmStore } from '~/state/useRealmStore'

export default function ActivitySection() {
	const activity = useRealmStore(state => state.activity)
	const activityList = Object.values(activity)

	return activityList.length ? (
		<Stack className={classes.activitySection}>
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
