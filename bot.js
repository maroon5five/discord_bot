const { Client, GatewayIntentBits, Events } = require('discord.js');

const client = new Client({ 
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on(Events.MessageCreate, async message => {
	console.log(`Message: ${message}`);
    if (message.author.bot) return;
	
    if (message.content.startsWith('!start_minecraft')) {
        const url = 'https://prod-api.bromigosminecraft.com/v1/server/1/start';
		const body = JSON.stringify({id:1})
		const headers = {
			'Content-Type': 'application/json',
			'Content-Length': body.length
		}
        try {
            const resp = await fetch(url, {
                method: 'POST',
                body,
                headers
            });
			const responseBody = await resp.json();
            message.channel.send(`Request sent successfully! Status: ${responseBody.status}`);
        } catch (error) {
            console.error(`Error making request: ${error.message}`);
            message.channel.send('Error sending request!');
        }
    } else if (message.content.startsWith('!stop_minecraft')) {
		const url = 'https://prod-api.bromigosminecraft.com/v1/server/1/stop';
		const body = JSON.stringify({id:1})
		const headers = {
			'Content-Type': 'application/json',
			'Content-Length': body.length
		}
        try {
            const resp = await fetch(url, {
                method: 'POST',
                body,
                headers
            });
            message.channel.send('Request sent successfully!');
        } catch (error) {
            console.error(`Error making request: ${error.message}`);
            message.channel.send('Error sending request!');
        }
	} else if (message.content.startsWith('!status_minecraft')){
		const url = 'https://prod-api.bromigosminecraft.com/v1/server/1/status';
		const headers = {
			'Content-Type': 'application/json'
		}
        try {
            const resp = await fetch(url, {
                method: 'GET',
                headers
            });
			const response = await resp.json();
            message.channel.send(JSON.stringify(response));
        } catch (error) {
            console.error(`Error making request: ${error.message}`);
            message.channel.send('Error sending request!');
        }
	}
});


client.login();