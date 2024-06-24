import { Title } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/realm')({
	component: Realm
})

function Realm() {
	return <Title>Realm</Title>
}
