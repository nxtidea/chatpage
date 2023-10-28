<template>
    <div id="chat_container">
        <!-- <MapContainer></MapContainer> -->
        <div v-if="currentSession?.wrapper" v-for="(chat, i) in currentSession.wrapper" :key="i" :class="{
            wrapper: true, ai: chat.isAi
        }">
            <Chat :chat="chat" :key="i" />
        </div>
    </div>
</template>

<script setup>
import Chat from "@/components/Chat.vue";
import { currentSession } from "../store";
import MapContainer from "./MapContainer.vue";

</script>