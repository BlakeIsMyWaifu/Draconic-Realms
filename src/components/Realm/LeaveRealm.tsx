import { Button, Group, Modal, Stack, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import Tile from '~/components/Tile'
import { useRealmStore } from '~/state/useRealmStore'

export default function LeaveRealm() {
	const realmData = useRealmStore(state => state.realmData)
	const leaveRealm = useRealmStore(state => state.leaveRealm)

	const [opened, { open, close }] = useDisclosure(false)

	return (
		<>
			<Tile
				image={`/realms/${realmData.image}`}
				title='Leave Realm'
				button={{ text: 'Leave Realm', color: 'red.7', onClick: open }}
			/>

			<Modal centered opened={opened} onClose={close} withCloseButton={false}>
				<Stack align='center'>
					<Text style={{ textAlign: 'center' }}>
						You're about to leave the Realm early. Leaving early rewards less rift xp, are you sure?
					</Text>
					<Group>
						<Button color='green' onClick={close}>
							Cancel
						</Button>
						<Button color='red.7' onClick={leaveRealm}>
							Leave Realm
						</Button>
					</Group>
				</Stack>
			</Modal>
		</>
	)
}
