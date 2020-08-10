const config = require('../config.json');
const Discord = require('discord.js');

let bot = new Discord.Client();

bot.login(config.token);

const fs = require('fs');
const path = require('path');

let commands = new Map();

fs.readdirSync(path.join(__dirname, 'commands')).forEach((f) => {
    if(f.endsWith(".js")) {
        let file = require(path.join(__dirname, 'commands', f));
        commands.set(file.info.name, file);
        console.log(`Registered command: ${file.info.name}`);
    }
});

bot.on('message', (msg) => {
    if(!msg.author.bot && msg.content.startsWith(config.prefix)) { // checks if the sender isnt a bot the message starts with the command prefix
        let command = msg.content.split(" ")[0].replace(config.prefix, "") //isolates the command name from the rest of the message. Does this by only getting the first word and removing the prefix.
        if(commands.has(command)) {
            let cmd = commands.get(command)
            if(typeof cmd.runner === "function") {
                cmd.runner(msg, bot);
            }
        }
    }
});
