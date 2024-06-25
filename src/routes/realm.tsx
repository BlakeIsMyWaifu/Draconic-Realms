import { createFileRoute } from '@tanstack/react-router'
import Realm from '~/components/Realm'

export const Route = createFileRoute('/realm')({
	component: Realm
})
