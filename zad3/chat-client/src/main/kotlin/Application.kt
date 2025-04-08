package com.example

import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.plugins.contentnegotiation.*
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking
import startDiscordBot


fun main() = runBlocking {
    val discordToken = System.getenv("DISCORD_TOKEN") ?: error("DISCORD_TOKEN is not set")
    val serverJob = launch {
        startHttpServer()
    }

    val discordJob = launch {
        startDiscordBot(discordToken)
    }

    serverJob.join()
    discordJob.join()
}

fun startHttpServer() {
    embeddedServer(Netty, port = 8080, module = Application::module).start(wait = false)
}


fun Application.module() {
    install(ContentNegotiation) {
        json()
    }

    configureRouting()
}
