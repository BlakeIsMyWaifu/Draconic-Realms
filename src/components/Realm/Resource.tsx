import { Button, Card, Image, Stack, Text } from '@mantine/core'
import type { ResourceNode } from '~/data/realms'
import { useRealmStore } from '~/state/useRealmStore'

type ResourceProp = {
	resource: ResourceNode
}

export default function Resource({ resource }: ResourceProp) {
	const toggleActivity = useRealmStore(state => state.toggleActivity)
	const activity = useRealmStore(state => state.activity)
	const isActive = Object.keys(activity).includes(resource.name)
	const activityLimit = useRealmStore(state => state.activityLimit)

	return (
		<Card>
			<Card.Section>
				<Image src={`/resources/${resource.image}.png`} />
			</Card.Section>

			<Card.Section p='md' component={Stack}>
				<Text fw={500}>{resource.name}</Text>

				<Button
					color={isActive ? 'red' : 'green'}
					disabled={activityLimit <= Object.keys(activity).length && !isActive}
					onClick={() => toggleActivity(resource)}
				>
					{isActive ? 'Stop' : 'Harvest'}
				</Button>
			</Card.Section>
		</Card>
	)
}
