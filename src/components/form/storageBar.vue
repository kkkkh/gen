<template>
    <!-- store -->
    <div class="flex m-2 items-center flex-wrap">
        <span class="text-xs" v-if="storage.length">storage：</span>
        <div class="relative mx-2 my-1" v-for="(item, index) in storage" :key="index">
            <el-icon class="absolute z-10 right-0 top-0 -mr-2 -mt-1 cursor-pointer text-red-600 hover:text-red-500"
                @click="deleteStorage(item.label, index)">
                <circle-close-filled />
            </el-icon>
            <el-button @click="viewStorage(index)">{{ item.label }}</el-button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { CircleCloseFilled } from '@element-plus/icons'
import { storageHandle } from '@/hooks/form/storage'
const emit = defineEmits(["update"])
const { storage, getStorage, deleteStorage } = storageHandle('form')
const viewStorage = (index: number) => {
    const storageValue = getStorage(index)
    emit("update", storageValue)
}
</script>
