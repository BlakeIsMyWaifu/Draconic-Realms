import { Title } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/town')({
	component: Town
})

function Town() {
	return <Title>Town</Title>
}
