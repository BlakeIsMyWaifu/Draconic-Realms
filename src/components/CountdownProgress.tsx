import { Input, Progress, type MantineStyleProp } from '@mantine/core'
import { useInterval } from '@mantine/hooks'
import { useState } from 'react'
import { useMountEffect } from '~/hooks/useMountEffect'

type CountdownProgressProps = {
	/** Unix timestamps */
	time: [startTime: number, endTime: number]
	/** Use {{countdown}} to display the countdown timer */
	label?: string
	/** Ran once when the countdown finishes */
	onComplete?: () => void
	/** Additional styles added to the wrapper */
	style?: MantineStyleProp
}

export default function CountdownProgress({
	time: [startTime, endTime],
	label = '',
	onComplete
}: CountdownProgressProps) {
	const [percentage, setPercentage] = useState(0)
	const [countdown, setCountdown] = useState('')

	const { start, stop } = useInterval(() => {
		const maxTime = endTime - startTime
		const timeRemaining = endTime - +new Date()
		setPercentage(() => {
			const percentage = (timeRemaining / maxTime) * 100
			if (percentage <= 0) {
				onComplete?.()
				stop()
			}
			return percentage
		})
		setCountdown(() => {
			const days = ~~(timeRemaining / (1000 * 60 * 60 * 24))
			const hours = ~~((timeRemaining / (1000 * 60 * 60)) % 24)
			const minutes = ~~((timeRemaining / 1000 / 60) % 60)
			const seconds = ~~((timeRemaining / 1000) % 60)
			return [days, hours, minutes, seconds].filter(Boolean).join(':')
		})
	}, 100)

	useMountEffect(() => {
		start()
		return stop
	})

	return (
		<Input.Wrapper label={label.replaceAll('{{countdown}}', countdown)}>
			<Progress value={percentage} />
		</Input.Wrapper>
	)
}
