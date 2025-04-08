package com.example

import Message
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.http.content.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.coroutines.runBlocking
import sendMessageToDiscord

fun Application.configureRouting() {
    routing {
        staticResources("/", "static") {}
        post("/send") {
            val message = call.receiveParameters()["content"] ?: "No message provided"
            runBlocking {
                sendMessageToDiscord(message)
            }
            call.respondRedirect("/")
        }
        route("/api") {
            post("/send") {
                val message = call.receive<Message>()
                runBlocking {
                    sendMessageToDiscord(message.content)
                }
                call.respond(HttpStatusCode.OK, "Message sent to Discord!")
                }
        }
    }
}
