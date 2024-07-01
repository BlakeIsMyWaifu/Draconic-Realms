import Tile from '~/components/Tile'
import { useRealmStore } from '~/state/useRealmStore'

export default function NextArea() {
	const realmData = useRealmStore(state => state.realmData)

	return (
		<Tile image={`/realms/${realmData.image}`} title='Next Area' button={{ text: 'Next Area', color: 'green' }} />
	)
}
