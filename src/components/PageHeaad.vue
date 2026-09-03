<template>
    <div class="page-head">
        <p class="page-title">{{ props.title }}</p>
        <div class="action-btn">
            <slot name="buttons"></slot>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    title: {
        type: String,
        default: 'yemianbiaoti'
    }
})
</script>
<style lang="scss" scoped>
.page-head {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .page-title {
        font-size: 20px;
        color: #2d3748;
    }
}
</style>
