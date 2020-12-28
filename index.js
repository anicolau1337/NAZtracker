const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json')
const fs = require("fs")
const path = './users.json'

try {
  if (fs.existsSync(path)) {
    console.log("users.json found")
  }else
    throw "unga";
} catch(err) {
    fs.writeFile(path, '{}', function (err) {
    if (err) throw err;
    console.log('Saved!');
  }); 
}

client.on('ready', () => {
    console.log('The client is ready.')
})

client.on('messageReactionAdd', (reaction, user) => {
    let listOfUsers = require("./users.json")
    let message = reaction.message, emoji = reaction.emoji;
    if (message.author.bot) return;

    if (emoji.name == '👌') {
        let userID = message.author.id;
        console.log(userID)

        // Check to see if User exists
        if (listOfUsers[userID] !== undefined) { // User Exists
            console.log("Updating user")
            fs.readFile("./users.json", function(err,data) {
                if(err) throw err

                let arrayOfUsers = JSON.parse(data)

                arrayOfUsers[userID] += 1

                console.log(arrayOfUsers[userID])

                fs.writeFileSync("./users.json", JSON.stringify(arrayOfUsers), function(err) {
                    if(err) throw err
                    console.log("Done adding to file")
                })
                
                // message.channel.send(arrayOfUsers[userID] + " Good Memes")
            })
            delete require.cache[require.resolve("./users.json")]
            listOfUsers = require("./users.json")
        }
        else { //User does not exist
            console.log("User does not exist")
            fs.readFile("./users.json", function(err,data) {
                if(err) throw err

                let arrayOfUsers = JSON.parse(data)
                console.log(arrayOfUsers)

                arrayOfUsers[userID] = 1

                // message.channel.send(arrayOfUsers[userID] + " Good Memes")

                fs.writeFileSync("./users.json", JSON.stringify(arrayOfUsers), function(err) {
                    if(err) throw err
                    console.log("Done adding to file")
                })
                delete require.cache[require.resolve("./users.json")]
                listOfUsers = require("./users.json")
            })   
        }
    }
});

client.on('message', async message =>  {
    if(message.content === 'ping') {
        message.channel.send('Keep it to yourself bud ', {url: ['https://cdn.discordapp.com/attachments/766432412955181076/791771383104798780/video05.mp4']})
    }
})

// client.on('message', async message => { 
//     if (!message.content.startsWith(config.prefix) || message.author.bot) return;
//     const args = message.content.slice(prefix.length).split(/ +/); //splices the argument out with the prefix, including a space in between
//     const command = args.shift().toLowerCase();
//     if(command === "")
// });

client.login(config.token)