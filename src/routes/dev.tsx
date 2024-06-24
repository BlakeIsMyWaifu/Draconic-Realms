import { Accordion, Stack, Title } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import RealmSection from '~/components/Dev/RealmSection'
import SkillSection from '~/components/Dev/SkillSection'

export const Route = createFileRoute('/dev')({
	component: Dev
})

function Dev() {
	return (
		<Stack>
			<Title>Dev Panel</Title>

			<Accordion variant='separated'>
				<Section title='Skills' contents={<SkillSection />} />
				<Section title='Realm' contents={<RealmSection />} />
			</Accordion>
		</Stack>
	)
}

type SectionProps = {
	title: string
	contents: ReactNode
}

function Section({ title, contents }: SectionProps) {
	return (
		<Accordion.Item value={title}>
			<Accordion.Control>{title}</Accordion.Control>
			<Accordion.Panel>{contents}</Accordion.Panel>
		</Accordion.Item>
	)
}
