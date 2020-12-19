
/**
 * 
 * @returns {Promise<HTMLElement>}
 */
function getCommitHeader() {
  return new Promise(resolve => {
    let searchedTimes = 0;
    const search = () => {
      setTimeout(() => {
        if (searchedTimes >= 20) {
          return;
        }
        searchedTimes += 1;
        const header = document.querySelector('.repository-content .file-navigation');
        if (header) {
          resolve(header);
        } else {
          search();
        }
      }, 2000);
    }
    search();
  })
}

/**
 * 
 * @param {string} keyword 
 */
function filterCommitFrom(keyword) {
  console.log('ooo')
  let username = keyword;
  let hideMode = false;
  if (keyword.startsWith('!')) {
    hideMode = true;
    username = keyword.slice(1);
  }
  /**
   * @type NodeListOf<HTMLElement>
   */
  const elems = document.querySelectorAll('.Box-row');
  elems.forEach(elem => {
    const user = elem.querySelector('.commit-author').innerText.replace(/\n/g, '').trim().split(' ')[0];
    const matched = user.includes(username);
    const needHide = username
      ? hideMode ? matched : !matched
      : false;
    if (needHide) {
      elem.style.height = '0';
      elem.style.visibility = 'hidden'
    } else {
      elem.style.height = 'initial';
      elem.style.visibility = 'initial';
    }
  })
}

/**
 * @returns {Promise<HTMLElement>}
 */
async function getCommitContainer() {
  let delay = 0;
  return new Promise(resolve => {
    let searchedTimes = 0;
    const search = () => {
      setTimeout(() => {
        if (searchedTimes >= 20) {
          return;
        }
        searchedTimes += 1;
        const container = document.querySelector('.repository-content .js-navigation-container');
        if (container) {
          resolve(container);
        } else {
          delay = 2000;
          search();
        }
      }, delay);
    }
    search();
  })
}


/**
 * 
 */
async function initCommitFilter() {
  console.log('fasdfasdf')
  const commitHeader = await getCommitHeader();
  const commitContainer = await getCommitContainer();
  const nextElem = commitHeader.nextElementSibling;
  const headParent = commitHeader.parentElement;
  const filterDiv = document.createElement('div');
  filterDiv.style.display = 'flex';
  const span = document.createElement('span');
  span.style.margin = '0 10px';
  span.style.padding = '3px 0 0 0'
  span.innerText = 'Filter: ';
  const input = document.createElement('input');
  input.value = '!renovate';
  input.style.outline = 'none';
  input.style.width = '300px';
  filterDiv.appendChild(commitHeader);
  filterDiv.appendChild(span);
  filterDiv.appendChild(input);
  headParent.insertBefore(filterDiv, nextElem)
  input.addEventListener('change', () => {
    filterCommitFrom(input.value);
  });
  const observer = new MutationObserver(() => {
    setTimeout(() => {
      filterCommitFrom(input.value);
    }, 250);
  });
  observer.observe(commitContainer, { childList: true });
  filterCommitFrom(input.value);
}
export default initCommitFilter;