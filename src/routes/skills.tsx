import { Progress, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'
import { useMemo } from 'react'
import { useSkillsStore, type Skill, type Subskill } from '~/state/useSkillsStore'
import { capitalise } from '~/utils/capitalise'
import { typedObject } from '~/utils/typedObject'

export const Route = createFileRoute('/skills')({
	component: Skills
})

function Skills() {
	const skills = useMemo(() => typedObject.keys(useSkillsStore.getState().skills), [])

	return (
		<Stack gap='xl'>
			<Title>Skills</Title>

			<SimpleGrid cols={3} verticalSpacing={80}>
				{skills.map(skill => {
					return <SkillProgress key={skill} skill={skill} />
				})}
			</SimpleGrid>
		</Stack>
	)
}

type SkillProgressProps = {
	skill: Skill
}

function SkillProgress({ skill }: SkillProgressProps) {
	const subskills = useSkillsStore(state => state.skills[skill])

	return (
		<Stack gap='xs'>
			{typedObject.keys(subskills).map(subskill => {
				return <SkillBar key={subskill} skill={skill} subskill={subskill} />
			})}
		</Stack>
	)
}

type SkillBarProps<T extends Skill> = {
	skill: T
	subskill: Subskill<T> | 'main'
}

function SkillBar<T extends Skill>({ skill, subskill }: SkillBarProps<T>) {
	const subskillData = useSkillsStore(state => state.skills[skill][subskill])

	const isMain = subskill === 'main'

	return (
		<>
			<Text size={isMain ? 'md' : 'xs'}>{capitalise(isMain ? skill : subskill)}</Text>
			<Progress value={(subskillData.xp / subskillData.xpNeeded) * 100} color={isMain ? 'blue' : 'cyan'} />
		</>
	)
}
