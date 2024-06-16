import { Title } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/realms')({
	component: Realms
})

function Realms() {
	return <Title>Realms</Title>
}
