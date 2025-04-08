import net.dv8tion.jda.api.JDABuilder
import net.dv8tion.jda.api.events.message.MessageReceivedEvent
import net.dv8tion.jda.api.hooks.ListenerAdapter

class DiscordListenerBot : ListenerAdapter() {
    override fun onMessageReceived(event: MessageReceivedEvent) {
        if (!event.author.isBot) {
            println("Otrzymano wiadomość: ${event.message.contentDisplay}")
            event.channel.sendMessage("Otrzymano wiadomość: ${event.message.contentDisplay}").queue()
        }
    }
}

fun startDiscordBot(token: String) {
    JDABuilder.createDefault(token)
        .addEventListeners(DiscordListenerBot())
        .build()
}