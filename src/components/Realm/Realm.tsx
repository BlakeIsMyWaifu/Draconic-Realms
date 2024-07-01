import { Stack, Title } from '@mantine/core'
import Resource from '~/components/Realm/Resource'
import TileGrid from '~/components/TileGrid'
import { useRealmStore } from '~/state/useRealmStore'
import NextArea from './NextArea'
import LeaveRealm from './LeaveRealm'

export default function Realm() {
	const realmData = useRealmStore(state => state.realmData)
	const currentArea = useRealmStore(state => state.currentArea)

	return (
		<Stack>
			<Title>Realm - {realmData.name}</Title>
			<TileGrid title='Resources'>
				{realmData.areas[currentArea].resourceNodes.map(resource => {
					return <Resource key={resource.name} resource={resource} />
				})}
			</TileGrid>
			<TileGrid title='Travel'>
				<NextArea />
				<LeaveRealm />
			</TileGrid>
		</Stack>
	)
}
