// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
export const replaceText = (selector: string, text: string) => {
  const element = document.querySelector(selector);
  if (element) element.textContent = text;
};

window.addEventListener('DOMContentLoaded', () => {
  ['chrome', 'node', 'electron'].forEach((type) => {
    replaceText(`${type}-version`, process.versions[type] as string);
  });
});
