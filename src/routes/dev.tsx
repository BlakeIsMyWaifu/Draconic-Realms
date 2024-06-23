import { Stack, Title } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'
import SkillSection from '~/components/Dev/SkillSection'

export const Route = createFileRoute('/dev')({
	component: Dev
})

function Dev() {
	return (
		<Stack>
			<Title>Dev Panel</Title>

			<SkillSection />
		</Stack>
	)
}
