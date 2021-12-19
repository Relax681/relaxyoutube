const { Client, Intents, MessageEmbed } = require('discord.js');
const { DiscordTogether } = require('discord-together');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_VOICE_STATES] });
client.discordTogether = new DiscordTogether(client);

// değiştirelecek tek yer
const token = "OTIyMDY0MTU4MTA1Njk4MzE2.Yb8BKg.87nbhCKKkYAqpD5ce5rc09dNr9Y"
const prefix = "."
// değiştirelecek tek yer

client.on('ready', () => {
    console.log(`Hazır!`);
});

client.on('messageCreate', async message => { 
    if (message.content === prefix + 'parti') {
        message.channel.send(`
        **:white_check_mark: Örnek kullanım:** \`${prefix}parti <etkinlik>\`\n\n**:white_small_square: Etkinlik listesi:**\n\*youtube, poker, chess, checkers, betrayal, fishing, lettertile, wordsnack, doodlecrew, spellcast, awkword, puttparty\*
        `)
    };
    const args = message.content.slice(prefix.length).trim().split(" ");
    if (message.content === prefix + 'parti' + " " + args[1]) {
        if (message.member.voice.channel) {
            client.discordTogether.createTogetherCode(message.member.voice.channel.id, args[1]).then(async invite => {
                message.channel.send(`${invite.code}`);
            }).catch(e => {
                message.channel.send("**:x: Bir hata oluştu.**");
            });
        } else {
            message.channel.send(`**:x: Lütfen herhangi bir sesli kanala giriş yapınız.**`);
        };
    };
});

client.login(token);
