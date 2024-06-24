import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { getRealm, type RealmName } from '~/data/realms'
import { router } from '~/main'
import { createActionName, persistStoreName, type Slice } from './storeTypes'

type RealmState = {
	active: boolean
	timeRemaining: number
	currentArea: number
}

const realmState: RealmState = {
	active: false,
	timeRemaining: 0,
	currentArea: 0
}

const actionName = createActionName<RealmAction>('realm')

type RealmAction = {
	setActive: (realm: RealmName) => void
	setInactive: () => void
}

const createRealmAction: Slice<RealmStore, RealmAction> = (set, get) => ({
	setActive: realmName => {
		if (get().active) return

		router.navigate({ to: '/realm' })

		const realmData = getRealm(realmName)

		set(
			{
				active: true,
				timeRemaining: realmData.time
			},
			...actionName('setActive')
		)
	},

	setInactive: () => {
		if (!get().active) return

		set({ ...realmState }, ...actionName('setInactive'))
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
