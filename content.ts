// Side hustles 💻☕🔥 - live coding personal website: Make rehydration work again after upgrade renderer/more info: !project, !today, !hello, !support
// Side hustles 💻☕🔥 - implementing a notes taking app - Type !project, !today, !hello or !support for more info
// Side hustles 💻☕🔥 - implementing component that allows users to create content in place - Type !project, !today for more info

// NBA2K23 MyTeam season 4 - path to Zach / locker code available 🏀🔥
// NBA2K23 MyCareer 3&D Wing 🏀🔥

// h3nr1p is live: Make rehydration work again after upgrade Magnolia SPA renderer / live coding personal website
// h3nr1p is live: live coding a notes taking app
// h3nrip is live: coding a user created content component
const defaultContent = {
  user: `h3nr1p`,
  theme: 'default',
  hello: `Hi I'm Henri, a software engineer with a focus on 
    front-end and web development. Glad to have you here.`,
  support: `Please follow me or watch me coding from time to time! 
    That helps me keep going ;)`,
  broadcasterLanguage: 'en',
  title: 'Coding side hustles 💻☕🔥',
  info: 'Type !project, !today, !support or !hello if you want to know more',
  goals: [],
  additionalHeaderElement: '</>',
  showWebCam: true,
  showWebCamFrame: false,
  twitterBot: true,
};

const defaultContent_h3nr1p_bot = {
  user: `h3nr1p_bot`,
  theme: 'default',
  hello: `Hi, I'm Henri. Glad to have you here.`,
  support: `Tips and tricks welcome, constructive critisim as well. ;)`,
  broadcasterLanguage: 'en',
  title: 'Playing',
  info: 'Type !today, !support or !hello if you want to know more!',
  goals: [],
  showWebCam: false,
  showWebCamFrame: false,
  twitterBot: false,
};

const content = {
  personalWebsite: {
    project: `My personal website henripodolski.com
      using Magnolia Community Edition CMS (learning Magnolia), 
      docker and Next.js`,
    goals: ['Update Magnolia to 6.2.18', 'Docker compose setup'],
    today: `
        Trying to fix Magnolia deps on update //
        Docker compose local setup
      `,
  },
  markdownEditor: {
    project: `Live coding a markdown editor to be used 
      to take notes, using React, Quill.js, isomorphic-git and ...`,
    goals: ['Finish something that I can actually use asap', 'Polish UI'],
    today: `
            Get rid of Redux in favor of Recoil.js, that is easier to use for me
        `,
    today2: `
            Implement form for changing the file name of 
            new note or update name of existing (markdown file) //
            Implement functionality for creating a 
            new folder (directory) //
            Implement form for changing the folder name //
            Delete file or folder
        `,
    today3: `
            Implementation of app and editor toolbars //
            Add preview CSS
        `,
    today4: `
            Make the windows resizable and the app responsive //
        `,
  },
  sideProject: {
    project: `Working on to be done items ...`,
    today: `
            Set up build task, Building webcomponent code, test
        `,
    goals: [
      'build a vanilla webcomponent containing a React component',
      'served and build by Next.js and Webpack',
      'expose via Next.js to be integrated as a widget',
    ],
    disableChat: true,
  },
  uccArea: {
    project: `Coding a web component for embedding user created content ...`,
    today: `
            PoC for the embedded WYSIWYG editor 
    `,
    goals: ['in place editor implementation', 'webapp/website embedded UI'],
  },
};

const content_h3nr1p_bot = {
  lol: {
    theme: 'lol',
    title: 'LoL zocken 🔥',
    goals: [
      'Training um Iron hinter mir zu lassen',
      'andere Champs probieren',
      'auf anderen Lanes verbessern',
    ],
    today: `
        Ranked als Fill
      `,
  },
  nba2kMyTeam: {
    theme: 'nba2k',
    title: 'NBA 2K23 MyTeam grinding 🏀🔥',
    info: 'Type !today (replies with locker codes sometimes 😉), !support or !hello if you want to know more!',
    goals: [
      'get better in Unlimited/Limited',
      'grind to setup my dream team using any game mode in MyTeam',
      'develop better skills in defense and offense',
    ],
    today: `
        MyTeam season 4 - path to Zach / Locker code: ASK-A-DEV-LOCKER-CODE
      `,
  },
  nba2kMyCareer: {
    theme: 'nba2k',
    title: 'NBA 2K23 MyCareer multiplayer for fun 🏀🔥',
    goals: [
      '3&D Wing - path to 99 ovr',
      'VC grinding',
    ],
    today: `
      MyCareer The Rec, probably Deuces or Trips
      `,
  },
};

const currentContent: any = {
  ...defaultContent,
  ...content.sideProject,
};

const currentContent_h3nr1p_bot: any = {
  ...defaultContent_h3nr1p_bot,
  ...content_h3nr1p_bot.nba2kMyTeam,
};

export default currentContent_h3nr1p_bot;
