import { Button, Stack } from '@mantine/core'
import { useRealmStore } from '~/state/useRealmStore'

export default function RealmSection() {
	const setInactive = useRealmStore(state => state.leaveRealm)

	return (
		<Stack align='flex-start'>
			<Button variant='default' onClick={setInactive}>
				Leave
			</Button>
		</Stack>
	)
}
