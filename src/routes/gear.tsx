import { Title } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/gear')({
	component: Gear
})

function Gear() {
	return <Title>Gear</Title>
}
