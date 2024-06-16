import { Title } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/skills')({
	component: Skills
})

function Skills() {
	return <Title>Skills</Title>
}
