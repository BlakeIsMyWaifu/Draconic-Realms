import { Stack, Title } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'
import Tile from '~/components/Tile'
import TileGrid from '~/components/TileGrid'
import { getAllRealms, type RealmData } from '~/data/realms'
import { useRealmStore } from '~/state/useRealmStore'
import { useSkillsStore } from '~/state/useSkillsStore'

export const Route = createFileRoute('/realms')({
	component: Realms
})

function Realms() {
	const allRealms = getAllRealms()

	return (
		<Stack>
			<Title>Realms</Title>

			<TileGrid>
				{allRealms.map(realm => {
					return <Realm key={realm.name} realmData={realm} />
				})}
			</TileGrid>
		</Stack>
	)
}

type RealmProps = {
	realmData: RealmData
}

function Realm({ realmData }: RealmProps) {
	const riftLevel = useSkillsStore(state => state.skills.arcane.rift.level)
	const hasLevelRequirement = riftLevel >= realmData.levelRequirement

	const openRealm = useRealmStore(state => state.openRealm)

	return (
		<Tile
			image={`/realms/${realmData.image}`}
			title={realmData.name}
			badge={{
				text: `Level ${realmData.levelRequirement}`,
				color: hasLevelRequirement ? 'green' : 'dark.4'
			}}
			description={realmData.description}
			button={{
				text: 'Open Realm',
				disabled: !hasLevelRequirement,
				onClick: () => openRealm(realmData.name)
			}}
		/>
	)
}
