import { Badge, Box, Button, Card, Group, Image, Stack, Text, Title } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'
import CardGrid from '~/components/CardGrid'
import { getAllRealms, type RealmData } from '~/data/realms'
import { useRealmStore } from '~/state/useRealmStore'
import { useSkillsStore } from '~/state/useSkillsStore'

export const Route = createFileRoute('/realms')({
	component: Realms
})

function Realms() {
	const allRealms = getAllRealms()

	return (
		<Box>
			<Title>Realms</Title>

			<CardGrid>
				{allRealms.map(realm => {
					return <Realm key={realm.name} realmData={realm} />
				})}
			</CardGrid>
		</Box>
	)
}

type RealmProps = {
	realmData: RealmData
}

function Realm({ realmData }: RealmProps) {
	const riftLevel = useSkillsStore(state => state.skills.arcane.rift.level)
	const hasLevelRequirement = riftLevel >= realmData.levelRequirement

	const setActive = useRealmStore(state => state.setActive)

	return (
		<Card>
			<Card.Section>
				<Image src={`/public/realms/${realmData.image}.png`} />
			</Card.Section>

			<Card.Section p='md' component={Stack}>
				<Group justify='space-between'>
					<Text fw={500}>{realmData.name}</Text>
					<Badge color={hasLevelRequirement ? 'green' : 'dark.4'}>Level {realmData.levelRequirement}</Badge>
				</Group>
				<Text>{realmData.description}</Text>

				<Button disabled={!hasLevelRequirement} onClick={() => setActive(realmData.name)}>
					Open Realm
				</Button>
			</Card.Section>
		</Card>
	)
}
