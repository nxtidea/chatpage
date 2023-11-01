import { reactive, computed, ref, watch } from 'vue'

export const journalSessions = reactive(JSON.parse(localStorage.getItem('journalSessions')) || [])

export const currentSession = computed(() => {
    return journalSessions.find(session => session.focused === true)
})

export const showInfoForm = ref(JSON.parse(localStorage.getItem('showInfoForm')) || false)

watch(journalSessions, (newValue) => {
    localStorage.setItem('journalSessions', JSON.stringify(newValue))
})

watch(showInfoForm, (newValue) => {
    localStorage.setItem('showInfoForm', JSON.stringify(newValue))
})

