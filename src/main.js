import initActivityFilter from './activity/index.js';
import initCommitFilter from './commit/index.js';


const button = document.createElement('button');
button.innerText = 'Filter';
button.style.position = 'fixed';
button.style.right = '0';
button.style.bottom = '0';
document.body.appendChild(button);
button.addEventListener('click', () => {
  initActivityFilter();
  initCommitFilter();
});
