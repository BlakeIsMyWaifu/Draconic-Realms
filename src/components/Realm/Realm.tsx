import { Stack, Title } from '@mantine/core'
import CardGrid from '~/components/CardGrid'
import Resource from '~/components/Realm/Resource'
import { getRealm } from '~/data/realms'
import { useRealmStore } from '~/state/useRealmStore'

export default function Realm() {
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
