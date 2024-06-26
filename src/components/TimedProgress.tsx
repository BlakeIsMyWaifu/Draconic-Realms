import { Input, Progress, type MantineStyleProp } from '@mantine/core'
import { useInterval } from '@mantine/hooks'
import { useEffect, useMemo, useState } from 'react'

type TimedProgressProps = {
	/** Time in seconds */
	time: number
	/** Label added to the progression bar */
	label?: string
	/** Ran once when the countdown finishes */
	onComplete?: () => void
	/** Additional styles added to the wrapper */
	style?: MantineStyleProp
}

export default function TimedProgress({ time, label = '', onComplete, style = {} }: TimedProgressProps) {
	const [value, setValue] = useState(0)

	const timeInSeconds = useMemo(() => time * 1000, [time])
	const incrementor = useMemo(() => 100 / (timeInSeconds / 100), [timeInSeconds])

	const { start, stop } = useInterval(() => {
		setValue(prev => prev + incrementor)
	}, 100)

	// biome-ignore lint/correctness/useExhaustiveDependencies: <If the time is changed, restart the timer with the new time>
	useEffect(() => {
		start()
		return stop
	}, [timeInSeconds])

	useEffect(() => {
		if (value >= 100) {
			setValue(0)
			onComplete?.()
		}
	}, [onComplete, value])

	// biome-ignore lint/correctness/useExhaustiveDependencies: <If the time is changed, reset progress>
	useEffect(() => {
		setValue(0)
	}, [timeInSeconds])

	return (
		<Input.Wrapper label={label} style={style}>
			<Progress value={value} />
		</Input.Wrapper>
	)
}
