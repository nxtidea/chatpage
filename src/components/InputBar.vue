<template>
    <form v-if="currentSession" @submit.prevent="fetchAnswer">
        <textarea rows="1" cols="1" placeholder="世界那么大，我想去看看。" v-model="currentSession.question"
            @keydown.enter.prevent="fetchAnswer"></textarea>
        <button type="submit"><img src="@/assets/send.svg" alt="send" /></button>
    </form>
</template>

<script setup>

import { journalSessions, currentSession } from "../store";
import showdown from "showdown";

const fetchAnswer = async () => {

    const tempSession = journalSessions.find(session => session.focused === true)
    try {
        tempSession.loading = true;
        if (tempSession.question === "") {
            return
        }
        tempSession.wrapper.push({
            isAi: false,
            value: tempSession.question,
        });
        tempSession.wrapper.push({
            isAi: true,
            value: "Loading....",
        });
        const tempQuestion = tempSession.question
        tempSession.question = ''


        const controller = new AbortController();
        const signal = controller.signal;

        setTimeout(() => {
            controller.abort();
        }, 300000); // 5 minutes in milliseconds


        const res = await fetch("http://localhost:8000", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                question: tempQuestion,
                info: tempSession.info,
            }),
            signal, // pass the signal option
        });
        const data = await res.json();
        const parsedData = data.bot.trim();
        let converter = new showdown.Converter();
        const markdownedData = converter.makeHtml(parsedData);
        tempSession.wrapper.pop();
        tempSession.wrapper.push({
            isAi: true,
            value: markdownedData,
        });
    } catch (error) {
    } finally {
        tempSession.loading = false;
    }
};




</script>


<style scoped>
form {
    width: 85%;
    max-width: 1280px;
    margin: 0 auto 1rem;
    border-radius: 0.5rem;
    padding: 10px;
    background: #E1E9EC;
    display: flex;
    flex-direction: row;
    gap: 10px;
}

@media (max-width: 1280px) {
    form {
        max-width: calc(100% - 40px);
    }
}

textarea {
    width: 100%;

    color: #323232;
    font-size: 18px;

    padding: 10px;
    background: transparent;
    border-radius: 5px;
    border: none;
    outline: none;
}

button {
    outline: 0;
    border: 0;
    cursor: pointer;
    background: transparent;
}

form img {
    width: 30px;
    height: 30px;
}
</style>