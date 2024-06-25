import { Group, ScrollArea } from '@mantine/core'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import Mantine from '~/components/Mantine'
import Navbar from '~/components/Navbar'
import { useMountEffect } from '~/hooks/useMountEffect'
import { router } from '~/main'
import { useRealmStore } from '~/state/useRealmStore'

export const Route = createRootRoute({
	component: Root
})

function Root() {
	const activeRealm = useRealmStore(state => state.active)

	useMountEffect(() => {
		if (activeRealm) {
			router.navigate({ to: '/realm' })
		}
	})

	return (
		<>
			<Mantine>
				<Group align='flex-start'>
					<Navbar />
					<ScrollArea p='lg' component='main' style={{ flex: 1 }}>
						<Outlet />
					</ScrollArea>
				</Group>
			</Mantine>
			<TanStackRouterDevtools />
		</>
	)
}
