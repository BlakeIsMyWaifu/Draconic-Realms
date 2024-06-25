import { Button, Card, Image, Stack, Text, Title } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'
import CardGrid from '~/components/CardGrid'
import { getRealm, type ResourceNode } from '~/data/realms'
import { useRealmStore } from '~/state/useRealmStore'

export const Route = createFileRoute('/realm')({
	component: Realm
})

function Realm() {
	const realmName = useRealmStore(state => state.realmName)
	const realmData = getRealm(realmName)

	const currentArea = useRealmStore(state => state.currentArea)

	return (
		<Stack>
			<Title>Realm - {realmName}</Title>
			<CardGrid>
				{realmData.areas[currentArea].resourceNodes.map(resource => {
					return <Resource key={resource.name} resource={resource} />
				})}
			</CardGrid>
		</Stack>
	)
}

type ResourceProp = {
	resource: ResourceNode
}

function Resource({ resource }: ResourceProp) {
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
