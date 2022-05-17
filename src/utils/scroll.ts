import {HandleType} from '@/types/scroll'
// import {Ref} from 'vue'
import {throttle} from 'lodash'

export const scrollHandle = <T extends HandleType>(handle: T) => {
	window.addEventListener('scroll', throttle(defineScroll<T>(handle), 50))
}

const defineScroll = <T extends HandleType>(handle: T) => {
	return () => {
		const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
		handle(scrollTop)
	}
}
