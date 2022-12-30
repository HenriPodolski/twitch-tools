// Side hustles 💻☕🔥 - live coding personal website: Make rehydration work again after upgrade renderer/more info: !project, !today, !hello, !support
// Side hustles 💻☕🔥 - Implementing a notes taking app - Type !project, !today, !hello or !support for more info

// h3nr1p is live: Make rehydration work again after upgrade Magnolia SPA renderer / live coding personal website
// h3nr1p is live: live coding a notes taking app

const defaultContent = {
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
  lol: {
    theme: 'lol',
    title: 'LoL zocken 🔥',
    goals: ['Training um Iron hinter mir zu lassen', 'andere Champs probieren', 'auf anderen Lanes verbessern'],
    today: `
        Ranked als Fill
      `,
  },
  nba2k: {
    theme: 'nba2k',
    title: 'NBA2K23  zocken 🏀🔥',
    goals: ['Unlimited/Limited besser werden', 'Vernünftiges Team aufstellen', 'Skills in Defense und Offense verbessern'],
    today: `
        MyTeam grinding / Wurfauswahl verbessern / Moments
      `,
  },
};

const currentContent = {
  ...defaultContent,
  ...content.nba2k,
};

export default currentContent;
