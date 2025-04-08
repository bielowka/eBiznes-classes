import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.request.*
import io.ktor.http.*
import kotlinx.serialization.Serializable

const val getWebhookUrl = "https://discord.com/api/webhooks/1358411335234228244/rhWvrEvn_zZWttFd0kFvjj-ksY2w_iCy5zyKZW0eX48BahwboINfMki-x1pUQrcoX8tk"

@Serializable
data class Message(val content: String)

suspend fun sendMessageToDiscord(message: String) {
    val client = HttpClient(CIO) {}
        try {
            val response = client.post {
                url(getWebhookUrl)
                contentType(ContentType.Application.Json)
                setBody("""{"content": "$message"}""")
            }
            println("Message sent successfully: ${response.status}")
        } catch (e: Exception) {
            println("Failed to send message: ${e.message}")
        } finally {
            client.close()
        }
}