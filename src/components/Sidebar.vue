<template>
    <div id="sidebar">
        <div id="logo-box">
            <div id="logo">智友</div>
        </div>
        <div id="sessions">
            <div :class="{ 'session': true, 'focused': session.focused }" v-for="(session, index) in journalSessions"
                :key="index" @click="toggleSessionFocus(session)">
                {{ session.name }}
            </div>
        </div>
        <div id="add-session" @click="addSession">
            <div id="add-session-btn">+</div>
        </div>
    </div>
</template>

<script setup>
import { journalSessions, showInfoForm } from '../store'

function toggleSessionFocus(session) {
    journalSessions.forEach(s => s.focused = false);
    session.focused = true;
    // set(currentSession)
}

function addSession() {
    journalSessions.forEach(s => s.focused = false);
    showInfoForm.value = !showInfoForm.value;
    journalSessions.push({ name: '新会话', focused: true, question: "", wrapper: [], loading: false, info: {} });
}

</script>

<style scoped>
#sidebar {
    display: flex;
    flex-direction: column;
    box-shadow: inset -4px 0px 4px 0px rgba(102, 102, 102, 0.25);
}

#logo-box {
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

#logo {
    color: #85A0A7;
    font-weight: bolder;
    font-size: larger;
}

#sessions {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.session {
    height: 3rem;
    display: flex;
    align-items: center;
    justify-self: center;
    background-color: rgb(255, 255, 255);
    color: #85A0A7;
    margin: 3px 0px 3px 3px;
    padding: 0 0 0 1rem;
    box-shadow: inset -4px 0px 4px 0px rgba(102, 102, 102, 0.25);
}

.session:hover {
    cursor: pointer;
    margin: 3px 0px 3px 9px;
    transition: 0.2s;
}

.session.focused {
    background-color: white;
    box-shadow: -4px 0px 6px 0px rgba(102, 102, 102, 0.25);
    margin: 3px 0px 3px 9px;
    transition: 0.2s;
}

#add-session {
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
}

#add-session-btn {
    height: 3rem;
    width: 80%;
    border-radius: 0.5rem;
    background-color: #bdd6d4;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: larger;
    font-weight: bold;
    color: aliceblue;
}

#add-session-btn:hover {
    background-color: #85A0A7;
    cursor: pointer;
    transition: 0.2s;
}
</style>