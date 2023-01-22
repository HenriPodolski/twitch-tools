import fetch, { HeadersInit } from 'node-fetch';
import { Client } from 'twitter-api-sdk';
import got from 'got';
import crypto from 'crypto';
import OAuth from 'oauth-1.0a';
import qs from 'querystring';
import readlineModule from 'readline';

const readline = readlineModule.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// The code below sets the consumer key and consumer secret from your environment variables
// To set environment variables on macOS or Linux, run the export commands below from the terminal:
// export CONSUMER_KEY='YOUR-KEY'
// export CONSUMER_SECRET='YOUR-SECRET'
const consumer_key = process.env.TWITTER_APP_CLIENT_ID;
const consumer_secret = process.env.TWITTER_APP_CLIENT_SECRET;
const tweetEndpointURL = `https://api.twitter.com/2/tweets`;

// this example uses PIN-based OAuth to authorize the user
const requestTokenURL =
  'https://api.twitter.com/oauth/request_token?oauth_callback=oob&x_auth_access_type=write';
const authorizeURL = new URL('https://api.twitter.com/oauth/authorize');
const accessTokenURL = 'https://api.twitter.com/oauth/access_token';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const oauth = OAuth({
  consumer: {
    key: consumer_key,
    secret: consumer_secret,
  },
  signature_method: 'HMAC-SHA1',
  hash_function: (
    baseString: crypto.BinaryLike,
    key: crypto.BinaryLike | crypto.KeyObject
  ) => crypto.createHmac('sha1', key).update(baseString).digest('base64'),
});

async function input(prompt: string) {
  return new Promise(async (resolve, reject) => {
    readline.question(prompt, (out) => {
      readline.close();
      resolve(out);
    });
  });
}

async function requestToken() {
  const authHeader = oauth.toHeader(
    oauth.authorize({
      url: requestTokenURL,
      method: 'POST',
    })
  );

  const req = await got.post(requestTokenURL, {
    headers: {
      Authorization: authHeader['Authorization'],
    },
  });
  if (req.body) {
    return qs.parse(req.body);
  } else {
    throw new Error('Cannot get an OAuth request token');
  }
}

async function accessToken(
  { oauth_token, oauth_token_secret }: any,
  verifier: string
) {
  const authHeader = oauth.toHeader(
    oauth.authorize({
      url: accessTokenURL,
      method: 'POST',
    })
  );
  const path = `https://api.twitter.com/oauth/access_token?oauth_verifier=${verifier}&oauth_token=${oauth_token}`;
  const req = await got.post(path, {
    headers: {
      Authorization: authHeader['Authorization'],
    },
  });
  if (req.body) {
    return qs.parse(req.body);
  } else {
    throw new Error('Cannot get an OAuth request token');
  }
}

async function anounceLiveOnTwitterRequest(data: any) {
  const authHeader = await getTwitterAuthHeader();

  console.log('json: data', data);

  const req = await fetch(tweetEndpointURL, {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      Authorization: authHeader['Authorization'],
      'user-agent': 'v2CreateTweetJS',
      'content-type': 'application/json',
      accept: 'application/json',
    },
  });
  const tweetData = await req.json();
  if (tweetData) {
    console.log('send tweetData', tweetData);
  } else {
    throw new Error('Unsuccessful request');
  }
}

const getTwitterAuthHeader = async () => {
  // Get request token
  const oAuthRequestToken = await requestToken();
  // Get authorization
  authorizeURL.searchParams.append(
    'oauth_token',
    oAuthRequestToken.oauth_token as string
  );
  console.log('Please go here and authorize:', authorizeURL.href);
  const pin = await input('Paste the PIN here: ');
  // Get the access token
  const oAuthAccessToken = await accessToken(
    oAuthRequestToken,
    (pin as unknown as string).trim()
  );

  const { oauth_token, oauth_token_secret } = oAuthAccessToken;

  const token = {
    key: oauth_token,
    secret: oauth_token_secret,
  };

  const authHeader = oauth.toHeader(
    oauth.authorize(
      {
        url: tweetEndpointURL,
        method: 'POST',
      },
      token
    )
  );

  return authHeader;
};

const authorizeAndTweet = async (tweet: string) => {
  try {
    const createTweet = await anounceLiveOnTwitterRequest({
      text: tweet,
    });
    console.log('createTweet', createTweet);
  } catch (e) {
    console.log('error', e);
    console.log('body', (e as any).body.errors);
  }
};

const requestTwitchStreams = async ({ user }: { user: string }) => {
  const params: { [key: string]: string } = {
    client_id: process.env.TWITCH_CLIENT_ID as string,
    client_secret: process.env.TWITCH_CLIENT_SECRET as string,
    redirect_uri: 'http://localhost:3201',
    code: process.env.TWITCH_CLIENT_SECRET as string,
  };
  const searchParams = new URLSearchParams();
  for (const prop in params) {
    searchParams.set(prop, params[prop]);
  }
  const authResponse = await fetch(
    'https://id.twitch.tv/oauth2/token?grant_type=client_credentials',
    {
      method: 'post',
      body: searchParams,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }
  );
  const authData = await authResponse.json();

  const response = await fetch(
    `https://api.twitch.tv/helix/streams?user_login=${user}`,
    {
      method: 'get',
      headers: {
        Authorization: `Bearer ${authData.access_token}`,
        'Client-Id': process.env.TWITCH_CLIENT_ID,
      } as HeadersInit,
    }
  );

  const data = await response.json();

  console.log('twitchStreams data', data);

  const liveEntry = data?.data
    ?.map((stream: any) => {
      stream.thumbnail_url = stream.thumbnail_url.replace(
        '{width}x{height}',
        '640x360'
      );
      return stream;
    })
    .find((stream: any) => stream.type === 'live');

  return liveEntry;
};

const GoliveBot = async ({ user }: { user: string }) => {
  const retryUntilLive = setInterval(async () => {
    const liveEntry = await requestTwitchStreams({ user });
    console.log('retryUntilLive', new Date().toLocaleTimeString());
    if (liveEntry?.id) {
      clearInterval(retryUntilLive);
      const { user_name, title } = liveEntry;
      const tweetText = `🔴 I'm live coding on https://twitch.tv/${user_name} now: ${
        title.length >= 75 ? `${title.substring(0, 75)}...` : title
      }`;
      await authorizeAndTweet(tweetText);
    }
  }, 10000);
};

export default GoliveBot;
