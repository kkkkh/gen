import {ref} from 'vue'
import {StorageItemType, OptionType} from '@/types/index'

const storage = ref<OptionType<string>[]>([])
export const storageHandle = (name: string) => {
	const updateStorage = () => {
		storage.value = []
		let index = localStorage.length
		// index localStorage 长度
		if (index) {
			while (index !== 0) {
				// index-1 对应每一个key的名称
				const keyName = localStorage.key(index - 1)
				if (keyName?.includes(name)) {
					addStorage(keyName, localStorage.getItem(keyName) as string)
				}
				index--
			}
		}
	}
	const setStorage = (item: StorageItemType) => {
		const index = storage.value.length
		const addIndex = index > 0 ? Number(storage.value[index - 1].label?.replace(name, '')) + 1 : 1
		// 依据实际数据长度 最后一位 增加
		const itemStr = JSON.stringify(item)
		const addKeyName = `${name}${addIndex}`
		localStorage.setItem(addKeyName, itemStr)
		addStorage(addKeyName, itemStr)
	}
	const addStorage = (label: string, value: string) => {
		storage.value.push({label, value})
	}
	const getStorage = (index: number) => {
		return JSON.parse(storage.value[index].value)
	}
	const deleteStorage = (name: string, index: number) => {
		localStorage.removeItem(name)
		storage.value.splice(index, 1)
	}
	updateStorage()
	return {
		storage,
		addStorage,
		setStorage,
		getStorage,
		deleteStorage,
	}
}
