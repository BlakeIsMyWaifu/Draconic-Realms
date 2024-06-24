import { SimpleGrid } from '@mantine/core'
import type { ReactNode } from 'react'

type CardGridProps = {
	children: ReactNode
}

export default function CardGrid({ children }: CardGridProps) {
	return (
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
	)
}
