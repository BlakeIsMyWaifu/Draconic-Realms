import { Badge, Box, Button, Card, Group, Image, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'
import { getAllRealms, type RealmData } from '~/data/realms'
import { useSkillsStore } from '~/state/useSkillsStore'

export const Route = createFileRoute('/realms')({
	component: Realms
})

function Realms() {
	const allRealms = getAllRealms()

	return (
		<Box>
			<Title>Realms</Title>

			<SimpleGrid cols={6}>
				{allRealms.map(realm => {
					return <Realm key={realm.name} realmData={realm} />
				})}
			</SimpleGrid>
		</Box>
	)
}

type RealmProps = {
	realmData: RealmData
}

function Realm({ realmData }: RealmProps) {
	const riftLevel = useSkillsStore(state => state.skills.arcane.rift.level)
	const hasLevelRequirement = riftLevel >= realmData.levelRequirement

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

				<Button disabled={!hasLevelRequirement}>Open Realm</Button>
			</Card.Section>
		</Card>
	)
}
