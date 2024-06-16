import { Group, ScrollArea } from '@mantine/core'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import Mantine from '~/components/Mantine'
import Navbar from '~/components/Navbar'

export const Route = createRootRoute({
	component: () => (
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
})
