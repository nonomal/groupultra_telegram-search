<script setup lang="ts">
import { ref, watch } from 'vue'
import SelectDropdown from './SelectDropdown.vue'

interface Props {
  modelValue: string
  label?: string
  placeholder?: string
  required?: boolean
  helpText?: string
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  label: '手机号码',
  placeholder: '123 4567 8901',
  required: false,
  helpText: '请选择国家/地区代码并输入您的手机号',
  id: `phone-input-${Math.random().toString(36).substring(2, 9)}`,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const selectedCountryCode = ref('+86')
const phoneNumberInput = ref('')

// 常用国家/地区区号
const countryCodeOptions = [
  { label: '+86 中国', value: '+86' },
  { label: '+1 美国/加拿大', value: '+1' },
  { label: '+44 英国', value: '+44' },
  { label: '+81 日本', value: '+81' },
  { label: '+82 韩国', value: '+82' },
  { label: '+852 香港', value: '+852' },
  { label: '+886 台湾', value: '+886' },
  { label: '+65 新加坡', value: '+65' },
  { label: '+7 俄罗斯', value: '+7' },
  { label: '+61 澳大利亚', value: '+61' },
]

// 初始化时从props中解析手机号和区号
function initializeFromProps() {
  if (!props.modelValue) {
    phoneNumberInput.value = ''
    return
  }

  // 查找匹配的区号
  const matchingCode = countryCodeOptions
    .map(option => option.value)
    .find(code => props.modelValue.startsWith(code))

  if (matchingCode) {
    selectedCountryCode.value = matchingCode
    // 从完整号码中移除区号部分
    phoneNumberInput.value = props.modelValue.substring(matchingCode.length).trim()
  }
  else {
    // 如果没有匹配的区号，保留整个号码
    phoneNumberInput.value = props.modelValue
  }
}

// 当区号或输入的手机号变化时，更新完整手机号
function updateFullPhoneNumber() {
  const fullNumber = `${selectedCountryCode.value}${phoneNumberInput.value.trim()}`
  emit('update:modelValue', fullNumber)
}

// 监听props变化
watch(() => props.modelValue, initializeFromProps, { immediate: true })

// 监听组件内部状态变化
watch([selectedCountryCode, phoneNumberInput], updateFullPhoneNumber)
</script>

<template>
  <div>
    <label v-if="label" :for="id" class="block text-sm text-gray-700 font-medium">
      {{ label }}
    </label>
    <div class="mt-1 flex gap-2">
      <div class="w-1/3">
        <SelectDropdown
          v-model="selectedCountryCode"
          :options="countryCodeOptions"
        />
      </div>
      <input
        :id="id"
        v-model="phoneNumberInput"
        type="tel"
        :placeholder="placeholder"
        class="block w-2/3 border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
        :required="required"
      >
    </div>
    <p v-if="helpText" class="mt-1 text-sm text-gray-500">
      {{ helpText }}
    </p>
  </div>
</template>
