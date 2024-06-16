import { Title } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/settings')({
	component: Settings
})

function Settings() {
	return <Title>Settings</Title>
}
