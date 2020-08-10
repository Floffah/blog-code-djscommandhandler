module.exports = {
    info: {
        name: "ping"
    },
    runner(msg, bot) {
        msg.channel.send("Pinging").then(sent => {
            sent.edit(sent.createdTimestamp - msg.createdTimestamp + "ms");
        });
    }
}
