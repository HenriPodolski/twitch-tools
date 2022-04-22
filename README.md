# Twitch Tools

Chat bot and live stream frame for 21:9 monitor view
to be used with Twitch.

## Usage
Rename .env.example to .env
and fill in account data
```
TWITCH_BOT_OAUTH_TOKEN=[your twitch oauth token]
TWITCH_CLIENT_ID=[your twitch client id]
TWITCH_CLIENT_SECRET=[your twitch client secret]
```

Then run (once):
```
npm install
```
followed by
```
npm run dev
```
or
```
npm run build && npm run start
```

Create a browser window in OBS studio
using address http://localhost:3201.
Place it on the screen and scale full size.
Done.