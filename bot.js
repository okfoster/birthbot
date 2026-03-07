console.log("Starting bot.js...");
const { Client, GatewayIntentBits } = require("discord.js");

require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
});

// globals
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// data
const characters = [
  { name: "Cecilia", fullName: "Cecilia Wispon", birthDate: "2007-01-07" },
  { name: "Andreas", fullName: "Andreas Macado", birthDate: "2010-01-22" },
  { name: "Lex", fullName: "Lex Whitlock", birthDate: "2011-01-28" },
  { name: "Victor and Alexander", fullName: "Victor and Alexander Wispon", birthDate: "1980-01-30" },
  { name: "Gabriel", fullName: "Gabriel Maywood", birthDate: "1935-02-06" },
  { name: "Gladys", fullName: "Gladys Dewberry", birthDate: "1952-02-22" },
  { name: "Corentin", fullName: "Corentin Whitlock", birthDate: "1980-03-06" },
  { name: "Baubles", fullName: "Baubles", birthDate: "1989-03-16" },
  { name: "The Large Scary Man", fullName: "The Large Scary Man", birthDate: "1959-04-18" },
  { name: "Jett and Spencer", fullName: "Jett and Spencer Van Damme", birthDate: "2007-04-10" },
  { name: "Jude", fullName: "Jude Whitlock", birthDate: "2008-05-08" },
  { name: "Cinder and Sage", fullName: "Cinder and Sage Whitlock", birthDate: "2016-06-30" },
  { name: "Maribelle", fullName: "Maribelle Orpheus", birthDate: "1985-07-05" },
  { name: "Nova", fullName: "Nova Sonastar", birthDate: "2007-07-08" },
  { name: "Scythian", fullName: "Scythian Igenmorgenschweissenmann", birthDate: "1986-07-19" },
  { name: "Isla", fullName: "Isla Wispon", birthDate: "1981-07-31" },
  { name: "Avongara", fullName: "Avongara Signoria", birthDate: "1971-08-08" },
  { name: "Sennett Reue", fullName: "Headmaster Sennett Reue", birthDate: "1940-08-13" },
  { name: "Astrillia Wispon", fullName: "Astrillia Wispon", birthDate: "1924-08-21" },
  { name: "Graham", fullName: "Graham Wispon", birthDate: "2008-09-02" },
  { name: "Calix", fullName: "Calix Luciano", birthDate: "1979-10-29" },
  { name: "Brindley", fullName: "Brindley Alegria-Audair-Whitlock", birthDate: "2025-10-31" },
  { name: "Layna", fullName: "Layna Wispon", birthDate: "2025-11-13" },
  { name: "Vendetta", fullName: "Vendetta Sekmeht Sabretooth Van Damme-Deathbringer-Johnson", birthDate: "1978-11-13" },
  { name: "Eden", fullName: "Eden Maywood", birthDate: "2008-12-01" },
  { name: "Bandit", fullName: "Bandit Van Damme", birthDate: "2010-12-08" },
  { name: "Avery", fullName: "Avery Whitlock", birthDate: "1979-12-14" },
  { name: "Tove", fullName: "Tovenaar Barlowe", birthDate: "1878-12-20" },
];

const deadCharacters = [
  { name: "Roxie Brindley", fullName: "Roxie Brindley", birthDate: "1947-01-20" },
  { name: "Solara", fullName: "Solara Mercia-Angevin", birthDate: "1922-02-28" },
  { name: "Hayes", fullName: "Hayes Octavius", birthDate: "1902-03-24" },
  { name: "Sung-ki", fullName: "Mok Sung-ki", birthDate: "1854-05-21" },
  { name: "Taraji", fullName: "Taraji", birthDate: "1856-07-29" },
  { name: "Clement", fullName: "Clement Maywood", birthDate: "1582-08-02" },
  { name: "Magni", fullName: "Magni Macado", birthDate: "1965-08-18" },
  { name: "Althea", fullName: "Althea Rosgaard", birthDate: "1963-11-08" },
  { name: "Aguri", fullName: "Aguri Swordsinger", birthDate: "1597-11-19" },
];

const npcHellCharacters = [

];

// message templates
const normalMessages = [
  "# HAPPY BIRTHDAY **{name}!!!!!!**\n\n**{fullName}** was born {birthDate} and is turning {age} today!",
  "# Happy birthday, **{name}!!!**\n\n**{fullName}** was born {birthDate} and is turning {age} today!",
  "# Guess what? It's **{name}**'s birthday!\n\n**{fullName}** was born {birthDate} and is turning {age} today!",
  "# AAAAAHH HAPPY BIRTHDAY **{name}!!!**\n\n**{fullName}** was born {birthDate} and is turning {age} today!",
  "# IT'S **{name}**'s BIRTHDAY IT REALLY IS FOR REAL AND FOR TRUE\n\n**{fullName}** was born {birthDate} and is turning {age} today!",
  "# The woke liberal media doesn't want you to know this, but it's **{name}**'s birthday today.\n\n**{fullName}** was born {birthDate} and is turning {age} today!",
  "# Oh my god oh my god oh my god it's **{name}**'s birthday!!!\n\n**{fullName}** was born {birthDate} and is turning {age} today!",
  "# **{name}** birotday hap.y birdaey\n\n**{fullName}** was born {birthDate} and is turning {age} today!",
  "# It's **{name}**'s birthday. Anyone who does not buy them presents will be shot.\n\n**{fullName}** was born {birthDate} and is turning {age} today!",
  "# GUYS IT'S **{name}**'s BIRTHDAY NOT FAKE NEWS\n\n**{fullName}** was born {birthDate} and is turning {age} today!"
];

const oldMessages = [
  "Jesus fucking Christ, **{fullName}** is still alive?\n\n**{fullName}** was born {birthDate} and is turning {age} today. Goddamn.",
];

const deadMessagesPost1916 = [
  "# Happy heavenly birthday, {fullName}.\n\n**{fullName}** was born {birthDate} and would be {age} today.",
  "# Today would be {name}'s {ageOrdinal} birthday today.\n\n**{fullName}** was born {birthDate} and would be {age} today."
];

const deadMessagesPre1916 = [
  "# Today is {fullName}'s {ageOrdinal} birthday today!\n\n**{fullName}** was born **{birthDate}**."
];

const npcHellMessages = [
  "# THEY DON'T CELEBRATE BIRTHDAYS IN NPC HELL, {fullName} 🔥🔥🔥🔥🔥🔥\n\n**{fullName}** was born {birthDate} and the world was rid of them on {deathDate}."
];

// - helpers -
function getAge(character) {
  const today = new Date();
  const birthDate = new Date(character.birthDate);
  return today.getFullYear() - birthDate.getFullYear();
}

function getOrdinal(n) {
  const s = ["th","st","nd","rd"];
  const v = n % 100;
  return n + (s[(v-20)%10] || s[v] || s[0]);
}

function getBirthdayMessage(character) {
  const age = getAge(character);

  if (character.name === "Brindley") {
    return `Happy adoption day, **Brindley!**\n**Brindley Alegria-Audair-Whitlock** was adopted 10/31/2025.`;
  }
  if (character.name === "Isla") {
    return `Unfortunately, **${character.fullName}** is still alive.\n\n**${character.fullName}** was born on ${character.birthDate} and is turning ${age} today.`;
  }

  if (age > 90) {
    const template = oldMessages[Math.floor(Math.random() * oldMessages.length)];
    return template.replace(/{name}/g, character.name)
                   .replace(/{fullName}/g, character.fullName)
                   .replace(/{birthDate}/g, character.birthDate)
                   .replace(/{age}/g, age);
  }

  const template = normalMessages[Math.floor(Math.random() * normalMessages.length)];
  return template.replace(/{name}/g, character.name)
                 .replace(/{fullName}/g, character.fullName)
                 .replace(/{birthDate}/g, character.birthDate)
                 .replace(/{age}/g, age);
}

// - send functions -
function sendTodaysBirthdays(channel) {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  const messagesToSend = [];

  // normal
  characters.forEach(c => {
    const [y,m,d] = c.birthDate.split("-").map(Number);
    if (m === month && d === day) messagesToSend.push(getBirthdayMessage(c));
  });

  // dead characters
  deadCharacters.forEach(c => {
    const [y,m,d] = c.birthDate.split("-").map(Number);
    if (m === month && d === day) {
      const age = today.getFullYear() - y;
      const ageOrdinal = getOrdinal(age);
      let template = y > 1916 
        ? deadMessagesPost1916[Math.floor(Math.random() * deadMessagesPost1916.length)]
        : deadMessagesPre1916[Math.floor(Math.random() * deadMessagesPre1916.length)];
      messagesToSend.push(template.replace(/{name}/g, c.name)
                                  .replace(/{fullName}/g, c.fullName)
                                  .replace(/{birthDate}/g, c.birthDate)
                                  .replace(/{age}/g, age)
                                  .replace(/{ageOrdinal}/g, ageOrdinal));
    }
  });

  // NPC Hell
  npcHellCharacters.forEach(c => {
    const [y,m,d] = c.birthDate.split("-").map(Number);
    if (m === month && d === day) {
      const template = npcHellMessages[Math.floor(Math.random() * npcHellMessages.length)];
      messagesToSend.push(template.replace(/{fullName}/g, c.fullName)
                                  .replace(/{birthDate}/g, c.birthDate)
                                  .replace(/{deathDate}/g, c.deathDate));
    }
  });

  if (messagesToSend.length === 0) {
    channel.send("It isn't anyone's birthday today :(");
  } else {
    messagesToSend.forEach(msg => channel.send(msg));
  }
}

// monthly birthdays
function sendMonthlyBirthdays(monthIndex = null, channel = null) {
  const month = monthIndex !== null ? monthIndex : (new Date()).getMonth();
  const allChars = [...characters, ...deadCharacters];

  const monthBirthdays = allChars
    .filter(c => {
      const [y,m,d] = c.birthDate.split("-").map(Number);
      return m === month + 1;
    })
    .map(c => `**${c.fullName}** (${c.birthDate.slice(5)})`);

  if (monthBirthdays.length === 0) return;

  const message = `# ${monthNames[month]} Birthdays!\n\n${monthBirthdays.join("\n")}`;

  if (channel) {
    channel.send(message);
  } else {
    client.guilds.cache.forEach(guild => {
      const ch = guild.channels.cache.find(
        c => c.isTextBased() && c.name.toLowerCase() === "birthdays" &&
             c.permissionsFor(guild.members.me).has("SendMessages")
      );
      if (ch) ch.send(message);
    });
  }
}

// - scheduled tasks -
function scheduleDailyBirthdays() {
  const now = new Date();
  const next9am = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0, 0, 0);
  if (now >= next9am) next9am.setDate(next9am.getDate() + 1);
  const delay = next9am - now;

  setTimeout(() => {
    sendTodaysBirthdaysToAllGuilds();
    setInterval(sendTodaysBirthdaysToAllGuilds, 24*60*60*1000);
  }, delay);
}

function scheduleMonthlySummary() {
  const now = new Date();
  const next9am = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0, 0, 0);
  if (now >= next9am) next9am.setDate(next9am.getDate() + 1);
  const delay = next9am - now;

  setTimeout(() => {
    if ((new Date()).getDate() === 1) sendMonthlyBirthdays();
    setInterval(() => { if ((new Date()).getDate() === 1) sendMonthlyBirthdays(); }, 24*60*60*1000);
  }, delay);
}

function sendTodaysBirthdaysToAllGuilds() {
  client.guilds.cache.forEach(guild => {
    const channel = guild.channels.cache.find(
      c => c.isTextBased() && c.name.toLowerCase() === "birthdays" &&
           c.permissionsFor(guild.members.me).has("SendMessages")
    );
    if (channel) sendTodaysBirthdays(channel);
  });
}

// - ready event -
client.once("ready", () => {
  console.log("ok i pull up");
  sendTodaysBirthdaysToAllGuilds();
  scheduleDailyBirthdays();
  scheduleMonthlySummary();
});

// - command handling -
client.on("messageCreate", message => {
  if (!message.guild) return; // only in servers

  const msg = message.content.toLowerCase();

  // !hello
  if (msg === "!hello") return message.reply("What up fam");

  // !happybirthday
  if (msg === "!happybirthday") {
    const channel = message.guild.channels.cache.find(
      c => c.isTextBased() && c.name.toLowerCase() === "birthdays" &&
           c.permissionsFor(message.guild.members.me).has("SendMessages")
    );
    if (!channel) return message.reply("⚠️ I can't find the birthdays channel :(");
    return sendTodaysBirthdays(channel);
  }
  
if (msg.startsWith("!birthday")) {
  const queryName = message.content
    .slice("!birthday".length)
    .trim()
    .toLowerCase()
    .replace(/\s+/g,"");

  const char =
    characters.find(c => c.fullName.replace(/\s+/g,"").toLowerCase() === queryName) ||
    deadCharacters.find(c => c.fullName.replace(/\s+/g,"").toLowerCase() === queryName) ||
    npcHellCharacters.find(c => c.fullName.replace(/\s+/g,"").toLowerCase() === queryName);

  if (!char) return message.reply(`⚠️ Couldn't find character "${queryName}"`);

  const [y,m,d] = char.birthDate.split("-").map(Number);

  // NPC Hell
  if (npcHellCharacters.includes(char)) {
    return message.reply(
      `${char.fullName}'s birthday is ${monthNames[m-1]} ${d}.\n` +
      `They were born ${char.birthDate} and died ${char.deathDate}.`
    );
  }

  // Dead characters
  if (deadCharacters.includes(char)) {
    const age = (new Date()).getFullYear() - y;
    return message.reply(
      `${char.fullName}'s birthday is ${monthNames[m-1]} ${d}.\n` +
      `They were born ${char.birthDate} and would be ${age} today.`
    );
  }

  // Normal characters
  return message.reply(`${char.name}'s birthday is ${monthNames[m-1]} ${d}.`);
}

// !checkbirthdays
if (msg === "!checkbirthdays") {
  const allChars = [...characters, ...deadCharacters, ...npcHellCharacters];

  const names = allChars
    .map(c => `**${c.fullName}** (${c.birthDate})`)
    .join("\n");

  return message.reply("Birthday list:\n" + names);
}

// !check<month>birthdays
if (msg.startsWith("!check") && msg.endsWith("birthdays")) {
  const monthInput = message.content.slice(6, -9).trim().toLowerCase();
  const monthIndex = monthNames.findIndex(m => m.toLowerCase() === monthInput);
  if (monthIndex === -1) return message.reply("⚠️ That is not a month.");

  const allChars = [...characters, ...deadCharacters, ...npcHellCharacters];
  const monthBirthdays = allChars
    .filter(c => {
      const [y,m,d] = c.birthDate.split("-").map(Number);
      return m === monthIndex + 1;
    })
    .map(c => {
      if (npcHellCharacters.includes(c)) {
        return `**${c.fullName}** (${c.birthDate.slice(5)})`;
      } else if (deadCharacters.includes(c)) {
        return `**${c.fullName}** (${c.birthDate.slice(5)})`;
      } else {
        return `**${c.fullName}** (${c.birthDate.slice(5)})`;
      }
    });

  if (monthBirthdays.length === 0) return message.reply(`No birthdays found for ${monthNames[monthIndex]}`);
  return message.channel.send(`# ${monthNames[monthIndex]} Birthdays!\n\n${monthBirthdays.join("\n")}`);
}

});

// - login -
client.login(process.env.BOT_TOKEN);