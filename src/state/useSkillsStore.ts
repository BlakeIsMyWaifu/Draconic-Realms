import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { typedObject } from '~/utils/typedObject'
import { createActionName, persistStoreName, type Slice } from './storeTypes'

const skillDefinition = {
	agility: ['assassination', 'bardic', 'marksman'],
	intelligence: ['chaos', 'elemental', 'holy'],
	strength: ['berserker', 'guardian', 'martial'],
	agriculture: ['farming', 'ranching'],
	alchemy: ['healing', 'status', 'transmutation'],
	arcane: ['enchanting', 'rift', 'summoning', 'runecrafting'],
	artificer: ['fletching', 'jewelcrafting', 'metallurgy', 'weaving'],
	construction: ['carpentry', 'masonry'],
	dungeoneering: ['scout'],
	mining: ['archeology', 'quarrying', 'spelunking'],
	slayer: ['boss', 'swarm'],
	survival: ['cooking', 'firemaking', 'fishing', 'foraging', 'woodcutting']
} as const
export type Skill = keyof typeof skillDefinition
export type Subskill<T extends Skill = Skill> = {
	[T in keyof typeof skillDefinition]: (typeof skillDefinition)[T][number]
}[T]

type SkillsState = {
	skills: {
		[T in Skill]: {
			[P in Subskill<T> | 'main']: { xp: number; level: number; xpNeeded: number }
		}
	}
}
const calculateXpNeeded = (level: number) => ~~(0.16 * (level * 512 + 2 ** (level / 5)))

const generateStartingSkillsData = () => {
	const skillData = <T extends Skill>(skill: T) => {
		const subskillNames: (Subskill<Skill> | 'main')[] = ['main', ...skillDefinition[skill]]
		return typedObject.fromEntries(
			subskillNames.map(subskillName => {
				const skillData: SkillsState['skills'][Skill]['main'] = {
					xp: 0,
					level: 1,
					xpNeeded: calculateXpNeeded(1)
				}
				if (subskillName === 'main') {
					skillData.xpNeeded *= subskillNames.length - 1
				}
				return [subskillName as Subskill<T>, skillData]
			})
		) as SkillsState['skills'][T]
	}

	return typedObject.fromEntries(
		typedObject.keys(skillDefinition).map(skillName => {
			return [skillName, skillData(skillName)]
		})
	) as SkillsState['skills']
}

const skillsState: SkillsState = {
	skills: generateStartingSkillsData()
}

const actionName = createActionName<SkillsAction>('skills')

type SkillsAction = {
	addXp: <T extends Skill>(amount: number, skill: T, subskill: Subskill<T>) => void
	resetSubskill: <T extends Skill>(skill: T, subskill: Subskill<T> | 'main') => void
}

const createSkillsAction: Slice<SkillsStore, SkillsAction> = (set, get) => ({
	addXp: (amount, skill, subskill) => {
		set(
			state => ({
				skills: {
					...state.skills,
					[skill]: {
						...state.skills[skill],
						[subskill]: {
							...state.skills[skill][subskill],
							xp: state.skills[skill][subskill].xp + amount
						},
						main: {
							...state.skills[skill].main,
							xp: state.skills[skill].main.xp + amount
						}
					}
				}
			}),
			...actionName('addXp/xp')
		)

		const levelUp = <T extends Skill>(skill: T, subskill: Subskill<T> | 'main') => {
			const subskillData = get().skills[skill][subskill]
			let xpNeeded = calculateXpNeeded(subskillData.level + 1)
			if (subskill === 'main') {
				xpNeeded *= Object.keys(get().skills[skill]).length - 1
			}

			if (subskillData.xp >= subskillData.xpNeeded) {
				set(
					state => ({
						skills: {
							...state.skills,
							[skill]: {
								...state.skills[skill],
								[subskill]: {
									...state.skills[skill][subskill],
									xp: subskillData.xp - subskillData.xpNeeded,
									level: subskillData.level + 1,
									xpNeeded
								}
							}
						}
					}),
					...actionName('addXp/levelUp')
				)
			}
		}

		levelUp(skill, subskill)
		levelUp(skill, 'main')
	},

	resetSubskill: (skill, subskill) => {
		set(
			state => ({
				skills: {
					...state.skills,
					[skill]: {
						...state.skills[skill],
						[subskill]: skillsState.skills[skill][subskill]
					}
				}
			}),
			...actionName('resetSubskill')
		)
	}
})

type SkillsStore = SkillsState & SkillsAction

export const useSkillsStore = create<SkillsStore>()(
	devtools(
		persist(
			(...a) => ({
				...skillsState,
				...createSkillsAction(...a)
			}),
			{ name: persistStoreName('skills') }
		),
		{ name: 'Skills Store' }
	)
)
