import { Autocomplete, Button, Group, NumberInput, Stack, Table } from '@mantine/core'
import { useMemo, useRef, useState, type Dispatch, type SetStateAction } from 'react'
import { useSkillsStore, type Skill, type Subskill } from '~/state/useSkillsStore'
import { typedObject } from '~/utils/typedObject'

export default function SkillSection() {
	const [selectedSkill, setSelectedSkill] = useState<string>('')

	return (
		<Stack>
			<AddXpSection selectedSkill={selectedSkill} setSelectedSkill={setSelectedSkill} />
			<SkillXpTable selectedSkill={selectedSkill} />
		</Stack>
	)
}

function stringIsSkill(skill: string): skill is Skill {
	const { skills } = useSkillsStore.getState()
	return Object.keys(skills).includes(skill)
}

function stringIsSubskill<T extends Skill>(skill: T, subskill: string): subskill is Subskill<T> {
	const subskillsData = useSkillsStore.getState().skills[skill]
	return Object.keys(subskillsData).includes(subskill)
}

type AddXpSectionProps = {
	selectedSkill: string
	setSelectedSkill: Dispatch<SetStateAction<AddXpSectionProps['selectedSkill']>>
}

function AddXpSection({ selectedSkill, setSelectedSkill }: AddXpSectionProps) {
	const skills = useSkillsStore(state => state.skills)
	const addXp = useSkillsStore(state => state.addXp)

	const subskillRef = useRef<HTMLInputElement>(null)
	const selectedSubskill = useMemo(() => {
		if (!stringIsSkill(selectedSkill)) return []
		return Object.keys(skills[selectedSkill]).filter(subskill => subskill !== 'main')
	}, [skills, selectedSkill])

	const amountRef = useRef<HTMLInputElement>(null)

	return (
		<Group align='end'>
			<Autocomplete
				label='Skill Name'
				placeholder='Agility'
				data={Object.keys(skills)}
				value={selectedSkill}
				onChange={setSelectedSkill}
			/>
			<Autocomplete ref={subskillRef} label='Subskill Name' placeholder='Assassination' data={selectedSubskill} />
			<NumberInput
				ref={amountRef}
				label='Amount'
				placeholder='100'
				defaultValue={0}
				min={0}
				step={100}
				stepHoldDelay={500}
				stepHoldInterval={time => Math.max(1000 / time ** 2, 25)}
			/>
			<Button
				variant='default'
				onClick={() => {
					if (!stringIsSkill(selectedSkill)) return
					const selectedSubskill = subskillRef.current?.value
					if (!selectedSubskill || !stringIsSubskill(selectedSkill, selectedSubskill)) return
					if (!amountRef.current?.value || typeof +amountRef.current.value !== 'number') return

					addXp(+amountRef.current.value, selectedSkill, selectedSubskill)
				}}
			>
				Add xp
			</Button>
		</Group>
	)
}

type SkillXpTableProps = {
	selectedSkill: string
}

function SkillXpTable({ selectedSkill }: SkillXpTableProps) {
	const skills = useSkillsStore(state => state.skills)
	const resetSubskill = useSkillsStore(state => state.resetSubskill)

	return (
		<Group>
			<Table>
				<Table.Thead>
					<Table.Tr>
						<Table.Th>Subskill</Table.Th>
						<Table.Th>Level</Table.Th>
						<Table.Th>Xp</Table.Th>
						<Table.Th>Xp Needed</Table.Th>
						<Table.Td>Reset</Table.Td>
					</Table.Tr>
				</Table.Thead>
				<Table.Tbody>
					{stringIsSkill(selectedSkill) &&
						typedObject.entries(skills[selectedSkill]).map(([subskill, { level, xp, xpNeeded }]) => {
							return (
								<Table.Tr key={subskill}>
									<Table.Td>{subskill}</Table.Td>
									<Table.Td>{level}</Table.Td>
									<Table.Td>{xp}</Table.Td>
									<Table.Td>{xpNeeded}</Table.Td>
									<Table.Td>
										<Button
											size='compact-xs'
											variant='light'
											color='red'
											onClick={() => resetSubskill(selectedSkill, subskill)}
										>
											Reset
										</Button>
									</Table.Td>
								</Table.Tr>
							)
						})}
				</Table.Tbody>
			</Table>
		</Group>
	)
}
