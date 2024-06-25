import { useEffect, type EffectCallback } from 'react'

export const useMountEffect = (func: EffectCallback) => {
	useEffect(func, [])
}
