// Side hustles 💻☕🔥 - live coding personal website: Make rehydration work again after upgrade renderer/more info: !project, !today, !hello, !support
// Side hustles 💻☕🔥 - implementing a notes taking app - Type !project, !today, !hello or !support for more info
// Side hustles 💻☕🔥 - implementing component that allows users to create content in place - Type !project, !today for more info

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
  showWebCamFrame: false,
};

const defaultContent_h3nr1p_bot = {
  user: `h3nr1p_bot`,
  theme: 'default',
  hello: `Hi, schön das Du vorbeischaust. Ich spiele Games zum Spass und ab und an versuche ich auch etwas besser zu werden...`,
  support: `Tipps und Tricks sind willkommen, konstruktive Kritik und Lob auch ;)`,
  broadcasterLanguage: 'de',
  title: 'Playing',
  info: 'Tippe !today, !support oder !hello wenn Du mehr erfahren möchtest',
  goals: [],
  showWebCamFrame: false,
};

const content = {
  personalWebsite: {
    project: `My personal website henripodolski.com (not released yet)
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
    goals: [
      'Get back into the project after long time',
      'Finish something that I can actually use asap',
      'Polish UI',
    ],
    today: `
            Get used to the code again after a long time of not touching it //
            Get rid of Redux in favor of something that is easier to use
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
    project: `Live coding something valuable I hope ...`,
    today: `
            Creating something like a dashboard or info section 
            to cover the area beyond my wide screen capture 
            during streams
        `,
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
  nba2k: {
    theme: 'nba2k',
    title: 'NBA2K23  zocken 🏀🔥',
    goals: [
      'Unlimited/Limited besser werden',
      'Vernünftiges Team aufstellen',
      'Skills in Defense und Offense verbessern',
    ],
    today: `
        MyTeam grinding / Wurfauswahl verbessern / Moments
      `,
  },
};

const currentContent = {
  ...defaultContent,
  ...content.markdownEditor,
};

const currentContent_h3nr1p_bot = {
  ...defaultContent_h3nr1p_bot,
  ...content_h3nr1p_bot.nba2k,
};

export default currentContent;
