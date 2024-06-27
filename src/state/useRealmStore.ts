import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { getAllRealms, getRealm, type RealmName, type ResourceNode } from '~/data/realms'
import { router } from '~/main'
import { createActionName, persistStoreName, type Slice } from './storeTypes'

type RealmState = {
	active: boolean
	realmName: RealmName
	time: [start: number, end: number]
	currentArea: number
	activityLimit: number
	activity: Record<string, ResourceNode>
}

const realmState: RealmState = {
	active: false,
	realmName: getAllRealms()[0].name,
	time: [0, 0],
	currentArea: 0,
	activityLimit: 1,
	activity: {}
}

const actionName = createActionName<RealmAction>('realm')

type RealmAction = {
	openRealm: (realm: RealmName) => void
	leaveRealm: () => void

	toggleActivity: (resourceNode: ResourceNode) => void
}

const createRealmAction: Slice<RealmStore, RealmAction> = (set, get) => ({
	openRealm: realmName => {
		if (get().active) return

		router.navigate({ to: '/realm' })

		const realmData = getRealm(realmName)

		set(
			{
				active: true,
				time: [+new Date(), +new Date() + realmData.time * 1000]
			},
			...actionName('openRealm')
		)
	},

	leaveRealm: () => {
		if (!get().active) return

		router.navigate({ to: '/' })

		set({ ...realmState }, ...actionName('leaveRealm'))
	},

	toggleActivity: resourceNode => {
		if (!get().active) return

		if (get().activity[resourceNode.name]) {
			const { [resourceNode.name]: _toRemove, ...activity } = get().activity
			set({ activity }, ...actionName('toggleActivity/remove'))
		} else {
			if (get().activityLimit <= Object.keys(get().activity).length) return

			set(
				state => ({
					activity: {
						...state.activity,
						[resourceNode.name]: resourceNode
					}
				}),
				...actionName('toggleActivity/add')
			)
		}
	}
})

type RealmStore = RealmState & RealmAction

export const useRealmStore = create<RealmStore>()(
	devtools(
		persist(
			(...a) => ({
				...realmState,
				...createRealmAction(...a)
			}),
			{ name: persistStoreName('realm') }
		),
		{ name: 'Realm Store' }
	)
)
