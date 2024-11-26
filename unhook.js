document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submit-button');
    const responseElement = document.getElementById('unhook-response');
    const successSound = new Audio('sounds/vine-boom.mp3'); // Ensure this file exists
    const iconUrl = 'https://i.postimg.cc/FHtQ911B/icon-removebg-preview.png'; // Your hosted image URL

    submitButton.addEventListener('click', async () => {
        const webhookUrl = document.getElementById('webhook-url').value.trim();
        const webhookMsg = document.getElementById('webhook-msg').value.trim();

        // Clear previous response
        responseElement.innerHTML = '';

        if (!webhookUrl) {
            responseElement.innerHTML = '<b>Please enter a valid webhook URL.</b>';
            return;
        }

        try {
            // Prepare the embed payload
            const embedPayload = {
                username: 'stasko.me/unhook',
                avatar_url: iconUrl, // Use the hosted image URL
                embeds: [
                    {
                        title: 'Deleted Webhook',
                        description: webhookMsg || 'This webhook was deleted',
                        color: 16711680, // Red color
                        footer: {
                            text: 'Powered by stasko.me',
                            icon_url: iconUrl, // Use the hosted image URL
                        },
                    },
                ],
            };

            // Send the custom message to the webhook
            const sendResponse = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(embedPayload),
            });

            if (!sendResponse.ok) {
                responseElement.innerHTML = `<b>Failed to send taunt message. Error Code: ${sendResponse.status}</b>`;
                return;
            }

            // Delete the webhook
            const deleteResponse = await fetch(webhookUrl, { method: 'DELETE' });

            if (deleteResponse.ok) {
                responseElement.innerHTML = '<b>Webhook successfully boomed with taunt!</b>';
                successSound.play(); // Play success sound
            } else {
                responseElement.innerHTML = '<b>Webhook not found or already deleted.</b>';
            }
        } catch (error) {
            responseElement.innerHTML = `<b>An error occurred: ${error.message}</b>`;
        }
    });
});
