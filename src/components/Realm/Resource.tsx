import Tile from '~/components/Tile'
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
		<Tile
			image={`/resources/${resource.image}`}
			title={resource.name}
			button={{
				text: isActive ? 'Stop' : 'Harvest',
				color: isActive ? 'red' : 'green',
				disabled: activityLimit <= Object.keys(activity).length && !isActive,
				onClick: () => toggleActivity(resource)
			}}
		/>
	)
}
