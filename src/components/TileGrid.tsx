import { SimpleGrid, Title } from '@mantine/core'
import type { ReactNode } from 'react'

type TileGridProps = {
	title?: string
	children: ReactNode
}

export default function TileGrid({ title, children }: TileGridProps) {
	return (
		<>
			{title && <Title order={2}>{title}</Title>}
			<SimpleGrid
				type='container'
				cols={{
					base: 4,
					'950px': 5,
					'1350px': 6
				}}
			>
				{children}
			</SimpleGrid>
		</>
	)
}
