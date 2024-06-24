import type { Skill, Subskill } from '~/state/useSkillsStore'

export type RealmName = (typeof realmsArray)[number]['name']
export type RealmData = RealmInternal<RealmName>

type RealmInternal<T extends string> = {
	/** Name of realm, must be unique */
	name: T
	/** Name of image in /public/realms/*.png */
	image: string
	/** Description of realm (resource nodes and monster types) */
	description: string
	/** Arcane/Rift level required to open this realm */
	levelRequirement: number
	/** Time in seconds that the realm will be open */
	time: number
	/** Arcane/Rift xp received for completing the realm */
	xp: number
	/** Areas that can be explored in order that they are found */
	areas: Area[]
}

type Area = {
	/** Time it takes to get to each area. The first area time is ignored because it will always be 0 */
	time: number
	/** Resources that can be found in the current area */
	resourceNodes: ResourceNode[]
}

type ResourceNode = {
	/** Name of node, doesn't need to be unique */
	name: string
	/** Skills that are required to farm the resource node */
	requirements: SkillRequirement[]
	/** Resources that are gained after a successful harvest */
	resources: Harvest[]
	/** Percentage chance for a successful harvest */
	successChance: number
}

type SkillRequirement = {
	[T in Skill]: {
		/** Skill required to harvest */
		skill: T
		/** Subskill required to harvest */
		subskill: Subskill<T> | 'main'
		/** Level of subskill required to harvest */
		levelRequirement: number
	}
}[Skill]

type Harvest = {
	/** Time in seconds per harvest attempt */
	time: number
	/** Resources received on successful harvest */
	resource: HarvestResource[]
}

type HarvestResource = {
	/** Time received on successful harvest */
	type: unknown
	/** Minium and maximum of item received */
	amount: [min: number, max: number]
	/** Percentage chance of receiving the item WITH a successful harvest */
	chance: number
}

const realmsArray = [
	{
		name: 'One',
		image: 'temp',
		description: 'Temp description of the realm',
		levelRequirement: 1,
		time: 1 * 60,
		xp: 50,
		areas: [
			{
				time: 0,
				resourceNodes: [
					{
						name: 'Tree',
						requirements: [
							{
								skill: 'survival',
								subskill: 'woodcutting',
								levelRequirement: 1
							}
						],
						resources: [
							{
								time: 1,
								resource: [
									{
										amount: [1, 1],
										chance: 100,
										type: null
									}
								]
							}
						],
						successChance: 50
					}
				]
			},
			{
				time: 20,
				resourceNodes: [
					{
						name: 'Berry Bush',
						requirements: [
							{
								skill: 'survival',
								subskill: 'foraging',
								levelRequirement: 1
							}
						],
						resources: [
							{
								time: 5,
								resource: [
									{
										amount: [2, 6],
										chance: 100,
										type: null
									}
								]
							}
						],
						successChance: 80
					}
				]
			}
		]
	},
	{
		name: 'Two',
		image: 'temp',
		description: 'Temp description of the realm',
		levelRequirement: 2,
		time: 1 * 60,
		xp: 50,
		areas: [
			{
				time: 0,
				resourceNodes: [
					{
						name: 'Tree',
						requirements: [
							{
								skill: 'survival',
								subskill: 'woodcutting',
								levelRequirement: 1
							}
						],
						resources: [
							{
								time: 1,
								resource: [
									{
										amount: [1, 1],
										chance: 100,
										type: null
									}
								]
							}
						],
						successChance: 50
					}
				]
			},
			{
				time: 20,
				resourceNodes: [
					{
						name: 'Berry Bush',
						requirements: [
							{
								skill: 'survival',
								subskill: 'foraging',
								levelRequirement: 1
							}
						],
						resources: [
							{
								time: 5,
								resource: [
									{
										amount: [2, 6],
										chance: 100,
										type: null
									}
								]
							}
						],
						successChance: 80
					}
				]
			}
		]
	},
	{
		name: 'Three',
		image: 'temp',
		description: 'Temp description of the realm',
		levelRequirement: 3,
		time: 1 * 60,
		xp: 50,
		areas: [
			{
				time: 0,
				resourceNodes: [
					{
						name: 'Tree',
						requirements: [
							{
								skill: 'survival',
								subskill: 'woodcutting',
								levelRequirement: 1
							}
						],
						resources: [
							{
								time: 1,
								resource: [
									{
										amount: [1, 1],
										chance: 100,
										type: null
									}
								]
							}
						],
						successChance: 50
					}
				]
			},
			{
				time: 20,
				resourceNodes: [
					{
						name: 'Berry Bush',
						requirements: [
							{
								skill: 'survival',
								subskill: 'foraging',
								levelRequirement: 1
							}
						],
						resources: [
							{
								time: 5,
								resource: [
									{
										amount: [2, 6],
										chance: 100,
										type: null
									}
								]
							}
						],
						successChance: 80
					}
				]
			}
		]
	}
] as const satisfies RealmInternal<string>[]

const realmMap = new Map<RealmName, RealmData>()
realmsArray.forEach(realm => realmMap.set(realm.name, realm))

export const getRealm = (realm: RealmName) => {
	if (!realmMap.has(realm)) throw new Error(`Missing Realm: ${realm}`)
	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	return realmMap.get(realm)!
}

export const getAllRealms = () => realmsArray
