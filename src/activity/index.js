
/**
 *
 * @returns {Promise<HTMLElement>}
 */
function getActivityHeader() {
  return new Promise(resolve => {
    let searchedTimes = 0;
    const search = () => {
      setTimeout(() => {
        if (searchedTimes >= 20) {
          return;
        }
        searchedTimes += 1;
        const activityHeader = document.querySelector('.js-all-activity-header');
        if (activityHeader) {
          resolve(activityHeader);
        } else {
          search();
        }
      }, 500);
    }
    search();
  })
}

/**
 * 
 * @param {string} keyword 
 */
function filterActivityFrom(keyword) {
  console.log('haha')
  let username = keyword;
  let hideMode = false;
  if (keyword.startsWith('!')) {
    hideMode = true;
    username = keyword.slice(1);
  }
  /**
   * @type NodeListOf<HTMLElement>
   */
  const elems = document.querySelectorAll('.push');
  elems.forEach(elem => {
    const user = elem.innerText.replace(/\n/g, '').trim().split(' ')[0];
    const matched = user.includes(username);
    const needHide = username
      ? hideMode ? matched : !matched
      : false;
    if (needHide) {
      elem.style.display = 'none';
    } else {
      elem.style.display = 'block';
    }
  })
}

/**
 * @returns {Promise<HTMLElement>}
 */
async function getPushContainer() {
  let delay = 0;
  return new Promise(resolve => {
    let searchedTimes = 0;
    const search = () => {
      setTimeout(() => {
        if (searchedTimes >= 20) {
          return;
        }
        searchedTimes += 1;
        const activityHeader = document.querySelector('.push');
        if (activityHeader) {
          resolve(activityHeader.parentElement);
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
async function initActivityFilter() {
  const oldInput = document.getElementById('activity-filter-input');
  if (oldInput) {
    return;
  }
  const activityHeader = await getActivityHeader();
  const pushContainer = await getPushContainer();
  const nextElem = activityHeader.nextElementSibling;
  const activityContainer = activityHeader.parentElement;
  const filterDiv = document.createElement('div');
  filterDiv.style.display = 'flex';
  const span = document.createElement('span');
  span.style.margin = '0 10px';
  span.style.padding = '3px 0 0 0'
  span.innerText = 'Filter: ';
  const input = document.createElement('input');
  input.setAttribute('id', 'activity-filter-input')
  input.value = '!renovate';
  input.style.outline = 'none';
  input.style.width = '300px';
  filterDiv.appendChild(activityHeader);
  filterDiv.appendChild(span);
  filterDiv.appendChild(input);
  activityContainer.insertBefore(filterDiv, nextElem)
  input.addEventListener('change', () => {
    filterActivityFrom(input.value);
  });
  const observer = new MutationObserver(() => {
    setTimeout(() => {
      filterActivityFrom(input.value);
    }, 250);
  });
  observer.observe(pushContainer, { childList: true });
  filterActivityFrom(input.value);
}
export default initActivityFilter;