// Side hustles 💻☕🔥 - live coding personal website: Make rehydration work again after upgrade renderer/more info: !project, !today, !hello, !support
// Side hustles 💻☕🔥 - Implementing a notes taking app - Type !project, !today, !hello or !support for more info

// h3nr1p is live: Make rehydration work again after upgrade Magnolia SPA renderer / live coding personal website
// h3nr1p is live: live coding a notes taking app

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
    today: `
            Implement form for changing the file name of 
            new note or update name of existing (markdown file) //
            Implement functionality for creating a 
            new folder (directory) //
            Implement form for changing the folder name //
            Delete file or folder
        `,
    today2: `
            Implementation of app and editor toolbars //
            Add preview CSS
        `,
    today3: `
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
};

const currentContent = {
  ...defaultContent,
  ...content.personalWebsite,
};

export default currentContent;
