import { Title } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/realmGear')({
	component: RealmGear
})

function RealmGear() {
	return <Title>Realm Gear</Title>
}
