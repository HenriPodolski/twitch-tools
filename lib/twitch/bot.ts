import tmi from 'tmi.js';
import currentContent from '../../content';

const twitchContent = {
  ...currentContent,
};

const broadcastOpts = {
  identity: {
    username: 'h3nr1p',
    clientId: process.env.TWITCH_CLIENT_ID,
    clientSecret: process.env.TWITCH_CLIENT_SECRET,
  },
};

const opts = {
  identity: {
    username: 'h3nr1p_bot',
    password: process.env.TWITCH_BOT_OAUTH_TOKEN,
  },
  channels: ['h3nr1p'],
};

// Create a client with our options
const client = new tmi.client(opts);

globalThis.messages = [];

// Called every time a message comes in
function onMessageHandler(target: any, context: any, msg: any, self: any) {
  if (self) {
    return;
  } // Ignore messages from the bot

  globalThis.messages.push({
    user: context.username,
    message: msg.trim(),
  });

  globalThis.messages.length = Math.min(globalThis.messages.length, 50);

  const commandName = msg.trim();

  // If the command is known, let's execute it
  if (commandName.includes('!hello')) {
    client.say(target, twitchContent.hello);
  } else if (commandName.includes('!project')) {
    client.say(target, twitchContent.project);
    console.log(`* Executed ${commandName} command`);
  } else if (commandName.includes('!today')) {
    client.say(target, twitchContent.today);
    console.log(`* Executed ${commandName} command`);
  } else if (
    commandName.includes('!support') ||
    commandName.includes('!help')
  ) {
    client.say(target, twitchContent.support);
    console.log(`* Executed ${commandName} command`);
  }
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr: any, port: any) {
  console.log(`* Connected to ${addr}:${port}`);
}

async function authenticate(scopes: string[]) {
  const authTokenURL = `https://id.twitch.tv/oauth2/token`;

  const data = new URLSearchParams();
  data.append('client_id', (broadcastOpts.identity.clientId as string).trim());
  data.append(
    'client_secret',
    (broadcastOpts.identity.clientSecret as string).trim()
  );
  data.append('grant_type', 'client_credentials');
  data.append('scope', scopes.join(' '));

  const res = await fetch(authTokenURL, {
    method: 'post',
    body: data,
  });
  const resJson = await res.json();

  return resJson;
}

async function modifyChannelInfo() {
  const clientId = (broadcastOpts.identity.clientId as string).trim();
  const updateInfos = {
    broadcaster_language: twitchContent.broadcasterLanguage,
    title: twitchContent.title,
  };

  const authRes = await authenticate(['channel:manage:broadcast']);

  console.log('authRes', authRes);

  const res = await fetch(
    `https://api.twitch.tv/helix/channels?broadcaster_id=${clientId}`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authRes.access_token}`,
        'Client-Id': clientId,
      },
      method: 'patch',
      body: JSON.stringify(updateInfos),
    }
  );
  const resJson = await res.json();

  console.log(resJson);

  return updateInfos;
}

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();
