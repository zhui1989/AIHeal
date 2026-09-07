<template>
    <el-dialog
        title="文章详情"
        v-model="dialogVisible"
        width="50%"
        @close="handleClose"
    >
        <el-form :model="formData" :rules="rules" ref="formRef" label-width="120px">
            <el-form-item label="文章标题" prop="title">
                <el-input v-model="formData.title" placeholder="请输入文章标题" maxlength="200" show-word-limit clearable="true" />
            </el-form-item>
            <el-form-item label="分类" prop="categoryId">
                <el-select v-model="formData.categoryId" placeholder="请选择分类">
                    <el-option v-for="item in props.categories" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="文章摘要" prop="summary">
                <el-input type="textarea" v-model="formData.summary" placeholder="请输入文章摘要（可选）" maxlength="1000" show-word-limit clearable="true" :rows="4"/>
            </el-form-item>
            <el-form-item label="文章标签" prop="tags">
                <el-select v-model="formData.tagArray" placeholder="请输入文章标签" multiple filterable allow-create style="width: 100%" />
                <el-option v-for="tag in commonTags" :key="tag" :label="tag" :value="tag" />
            </el-form-item>
            <el-form-item label="封面图片" prop="coverImage">
                <div class="cover-upload">
                    <el-upload
                        class="avatar-uploader"
                        :action="uploadUrl"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        >
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </div>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script setup>
import { ref,reactive,computed } from 'vue'

const props = defineProps({
    modelValue: {
    type: Boolean,
    default: false
  },
    categories: {
    type: Array,
    default: () => []
  }
})
const emit = defineEmits(['update:modelValue'])

const dialogVisible = computed({
    get(){
        return props.modelValue
    },
    set(val){
        emit('update:modelValue',val)
    }
})

const handleClose = () => {}

//表单数据
const formData = reactive({
    "title":"",
    "content":"",
    "coverImage":"",
    "categoryId":1,
    "summary":"",
    "tags":"",
    "id":""
})

// 表单校验规则
const rules = reactive({
    title: [
        { required: true, message: '请输入文章标题', trigger: 'blur' },
        { max: 200, message: '文章标题最多200个字符', trigger: 'blur' },
    ],
    categoryId: [
        { required: true, message: '请选择分类', trigger: 'change' },
    ]
})

const commonTags = [
    '情绪管理','焦虑','抑郁','压力','睡眠',
    '冥想','正念','放松','心理健康','自我成长',
    '人际关系','工作压力','学习方法','生活技巧',
    '其他'
]

</script>
