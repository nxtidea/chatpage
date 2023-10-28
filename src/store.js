import { reactive, computed, ref } from 'vue'

export const journalSessions = reactive([
    // { name: '南京', focused: true, question: "", wrapper: [], loading: false, info: {} },
])

export const currentSession = computed(() => {
    return journalSessions.find(session => session.focused === true)
})

export const showInfoForm = ref(false)