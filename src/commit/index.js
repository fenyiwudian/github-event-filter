
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
      }, 500);
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
      elem.style.padding = 0;
    } else {
      elem.style.height = '';
      elem.style.visibility = '';
      elem.style.padding = '';
    }
  })
}


/**
 * 
 */
async function initCommitFilter() {
  const oldInput = document.getElementById('commit-filter-input');
  if (oldInput) {
    return;
  }
  const commitHeader = await getCommitHeader();
  const nextElem = commitHeader.nextElementSibling;
  const headParent = commitHeader.parentElement;
  const filterDiv = document.createElement('div');
  filterDiv.style.display = 'flex';
  const span = document.createElement('span');
  span.style.margin = '0 10px';
  span.style.padding = '3px 0 0 0'
  span.innerText = 'Filter: ';
  const input = document.createElement('input');
  input.setAttribute('id', 'commit-filter-input')
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
  filterCommitFrom(input.value);
}
export default initCommitFilter;