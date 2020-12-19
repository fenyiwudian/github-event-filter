

console.log('heow')
async function initActivityFilter() {
  /**
   * @returns {Promise<HTMLElement>}
   */
  const getActivityHeader = async () => {
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
        }, 2000);
      }
      search();
    })
  }
  const activityHeader = await getActivityHeader();
  const nextElem = activityHeader.nextElementSibling;
  const activityContainer = activityHeader.parentElement;
  const filterDiv = document.createElement('div');
  filterDiv.style.display = 'flex';
  const span = document.createElement('span');
  span.style.margin = '0 10px';
  span.style.padding = '3px 0 0 0'
  span.innerText = 'Hide activities from: ';
  const input = document.createElement('input');
  input.style.outline = 'none';
  filterDiv.appendChild(activityHeader);
  filterDiv.appendChild(span);
  filterDiv.appendChild(input);
  activityContainer.insertBefore(filterDiv, nextElem)
  input.addEventListener('change', () => {
    console.log(input.value);
  })
}
initActivityFilter();