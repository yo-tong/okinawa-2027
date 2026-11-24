function safe(t){return String(t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function mapLink(q){return 'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(q)}
const pageTitles = {home:'總覽', days:'每日行程', places:'景點探索', resources:'實用連結', budget:'旅費預算', tools:'旅行工具'};

function dayFragment(index) {
  const [month, date] = days[index].date.split('/').map(part => part.padStart(2, '0'));
  return `#days/2027-${month}-${date}`;
}

function showPage(page, {updateHistory = true, focusHeading = false, dayIndex = selectedDay} = {}) {
  const pageId = Object.hasOwn(pageTitles, page) ? page : 'home';
  if (pageId === 'days' && dayIndex !== selectedDay) {
    selectedDay = dayIndex;
    renderDays();
  }
  document.querySelectorAll('.view').forEach(view => {
    view.classList.toggle('active', view.id === pageId);
  });
  document.querySelectorAll('.nav button').forEach(button => {
    const active = button.dataset.page === pageId;
    button.classList.toggle('active', active);
    if (active) button.setAttribute('aria-current', 'page');
    else button.removeAttribute('aria-current');
  });
  document.getElementById('inner-header').hidden = pageId === 'home';
  document.title = `${pageTitles[pageId]}｜沖繩 2027`;
  const fragment = pageId === 'days' ? dayFragment(selectedDay) : `#${pageId}`;
  if (updateHistory && location.hash !== fragment) {
    history.pushState({page: pageId}, '', fragment);
  }
  window.scrollTo({top: 0, behavior: 'auto'});
  if (focusHeading) {
    const heading = document.getElementById(pageId).querySelector('h1, h2');
    if (heading) {
      heading.tabIndex = -1;
      heading.focus({preventScroll: true});
    }
  }
}

document.querySelectorAll('[data-page]').forEach(button => {
  button.onclick = () => showPage(button.dataset.page);
});
document.querySelectorAll('[data-goto]').forEach(button => {
  button.onclick = () => showPage(button.dataset.goto, {focusHeading: true});
});
document.querySelector('.skip-link').addEventListener('click', event => {
  event.preventDefault();
  document.getElementById('main-content').focus();
});

function showPageFromLocation() {
  const [page] = location.hash.slice(1).split('/');
  const dayIndex = page === 'days' ? Math.max(0, days.findIndex((_, index) => dayFragment(index) === location.hash)) : selectedDay;
  showPage(page, {updateHistory: false, dayIndex});
}

function eventPhoto(title){const external=externalItineraryPhotos.find(p=>title.includes(p[0]));const p=external||itineraryPhotos.find(p=>title.includes(p[0]));if(!p)return '';const src=external?p[1]:'https://commons.wikimedia.org/wiki/Special:FilePath/'+encodeURIComponent(p[1])+'?width=960';return `<figure class="itinerary-photo"><img src="${safe(src)}" alt="${safe(p[2])}" width="960" height="540" loading="lazy" decoding="async" onerror="this.closest('figure').hidden=true"></figure>`}


function renderDayWeather(){const sunsets=['17:56','17:57','17:57','17:58','17:59'];const d=days[selectedDay];document.getElementById('day-weather').innerHTML=`<div class="day-conditions"><div><small>旅行日期</small><strong>2027/${d.date} ${d.sub.split(' · ')[0]}</strong></div><div><small>🌇 那霸日落參考（日本時間）</small><strong>約 ${sunsets[selectedDay]}</strong></div><div><small>🌡️ 那霸 1 月中旬歷年參考</small><strong>約 15–20°C</strong></div></div><p class="conditions-note">氣溫為 1991–2020 年平均低溫 15.1°C／高溫 19.9°C，並非當日預報。北部與海邊體感可能不同，出發前請再查天氣。日落依那霸天文計算，景點位置、地形與雲量會影響觀賞。${selectedDay===3?'建議當天若車程允許，17:20 前到海風露台等待夕陽。':''}${selectedDay===4?'本日午後已返台，日落數值仍為那霸地區參考。':''}<br><a href="https://eco.mtk.nao.ac.jp/koyomi/dni/2027/s4801.html.en" target="_blank" rel="noopener">日落：日本國立天文台</a> · <a href="https://www.data.jma.go.jp/stats/etrn/view/nml_sfc_10d.php?block_no=47936&prec_no=91" target="_blank" rel="noopener">氣溫：日本氣象廳</a></p>`}
function bookingActions(title){const match=bookingRules.find(r=>title.includes(r[0]));return match?'<div class="actions booking-actions">'+match[1].map(x=>`<a href="${safe(x[1])}" target="_blank" rel="noopener noreferrer">${safe(x[0])}</a>`).join('')+'</div>':''}
let selectedDay = 0;
const dayBar = document.getElementById('daybar');
dayBar.innerHTML = days.map((day, index) => {
  const weekday = day.sub.split(' · ')[0];
  return `<button class="daybtn" type="button" aria-pressed="false" data-day="${index}"><b>${safe(day.date)}</b><small>${safe(weekday)}</small></button>`;
}).join('');
const dayButtons = [...dayBar.querySelectorAll('[data-day]')];
for (const button of dayButtons) {
  button.addEventListener('click', () => {
    showPage('days', {dayIndex: Number(button.dataset.day)});
    document.getElementById('days').scrollIntoView({block: 'start'});
  });
}

function renderEvent([time, name, description, mapQuery, kind]) {
  const photo = eventPhoto(name);
  const heading = kind ? 'h4' : 'h3';
  const map = mapQuery ? `<div class="actions"><a href="${mapLink(mapQuery)}" target="_blank" rel="noopener noreferrer" aria-label="在 Google 地圖查看 ${safe(name)}">Google 地圖</a></div>` : '';
  return `<li class="event">
    <div class="time">${safe(time)}${kind === 'backup' ? '<small>備用</small>' : ''}</div>
    <div class="event-content">
      <${heading} class="event-title">${safe(name)}</${heading}>
      <p>${safe(description)}</p>
      ${bookingActions(name)}${map}
      ${photo ? `<details class="event-photo"><summary>景點照片</summary>${photo}</details>` : ''}
    </div>
  </li>`;
}

function renderTransportCard(primary, events) {
  const group = primary[5].group;
  const {title, stop, direction} = transportStops[group];
  const services = [primary, ...events.filter(event => event[4] === 'backup' && event[5]?.group === group)];
  const links = [...new Set(services.map(event => event[5].route))].map(route =>
    `<a href="${safe(busTimetables[route])}" target="_blank" rel="noopener noreferrer">${route} 號班表</a>`
  ).join('');
  return `<li class="event transport-event">
    <section class="transport-card" aria-labelledby="transport-${group}">
      <h3 id="transport-${group}">${safe(title)}</h3>
      <p>上車站 <strong lang="ja">${safe(stop)}</strong><br>${safe(direction)}</p>
      <ul class="transport-services">
        ${services.map(([time, , , , kind, service]) => `<li class="${kind ? '' : 'transport-primary'}">
          <strong>${safe(time)}　${service.route} 號</strong><span>${safe(service.label)} · ${safe(service.arrival)} 到站</span>
        </li>`).join('')}
      </ul>
      <p class="transport-note">依現行平日班表。出發前再確認當日班次。</p>
      <div class="actions"><a href="${mapLink(primary[3])}" target="_blank" rel="noopener noreferrer">上車站地圖</a>${links}</div>
    </section>
  </li>`;
}

function renderDays() {
  const day = days[selectedDay];
  const [weekday, ...notes] = day.sub.split(' · ');
  for (const [index, button] of dayButtons.entries()) {
    const active = index === selectedDay;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  }
  document.getElementById('daytag').textContent = `${day.date}（${weekday}）`;
  document.getElementById('daytitle').textContent = day.title;
  document.getElementById('daysub').textContent = notes.join(' · ');
  document.getElementById('timeline').innerHTML = day.events.filter(event => !event[4]).map(event =>
    event[5] ? renderTransportCard(event, day.events) : renderEvent(event)
  ).join('');
  const alternatives = day.events.filter(event => event[4] && !event[5]);
  document.getElementById('day-alternatives').hidden = alternatives.length === 0;
  document.getElementById('alternate-timeline').innerHTML = alternatives.map(renderEvent).join('');
  document.getElementById('day-share-status').textContent = '';
  renderDayWeather();
}

renderDays();
window.addEventListener('popstate', showPageFromLocation);
showPageFromLocation();

document.getElementById('share-day-link').onclick = async () => {
  const url = new URL(location.href);
  url.hash = dayFragment(selectedDay);
  const message = url.protocol === 'file:' ? '已複製本機日期連結。同一裝置可用。' : '已複製當日連結。';
  try {
    await navigator.clipboard.writeText(url.href);
    document.getElementById('day-share-status').textContent = message;
  } catch {
    prompt(url.protocol === 'file:' ? '複製本機日期連結（限同一裝置）' : '複製當日連結', url.href);
  }
};
document.getElementById('shareday').onclick = async () => {
  const day = days[selectedDay];
  const text = day.date + ' ' + day.title + '\n' + day.events.map(event => event[0] + ' ' + event[1] + '｜' + event[2]).join('\n');
  try {
    await navigator.clipboard.writeText(text);
    alert('已複製當日行程');
  } catch (error) {
    prompt('複製以下內容', text);
  }
};
function renderPlaces(){let q=document.getElementById('placeSearch').value.trim().toLowerCase(),list=places.filter(p=>p.join(' ').toLowerCase().includes(q));document.getElementById('placeStatus').textContent=`顯示 ${list.length} 個景點`;document.getElementById('placelist').innerHTML=list.length?list.map(p=>`<div class="card place"><div class="placeicon" aria-hidden="true">${p[0]}</div><div style="flex:1"><h3>${safe(p[1])}</h3><p>${safe(p[2])}</p><div class="buttons"><a class="btn secondary" href="${mapLink(p[3])}" target="_blank" rel="noopener noreferrer">📍 開啟地圖</a>${p[4]?`<a class="btn ghost" href="${p[4]}" target="_blank" rel="noopener noreferrer">官方網站</a>`:''}</div></div></div>`).join(''):'<div class="empty">找不到符合的景點，試試其他關鍵字。</div>'}document.getElementById('placeSearch').oninput=renderPlaces;renderPlaces();
function getStore(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

const budgetStorageKey = 'okinawa27_budget_v4';
const previousTourAmounts = {2: 7000, 3: 3731};

function loadBudget() {
  const defaults = defaultBudget.map(([, amount]) => amount);
  const saved = getStore(budgetStorageKey, null);
  if (Array.isArray(saved) && saved.length === defaults.length) return saved;

  const previous = getStore('okinawa27_budget_v3', null);
  if (!Array.isArray(previous) || previous.length !== defaults.length) return defaults;

  // Older versions saved all rows together, including rows left at their defaults.
  return previous.map((amount, index) => amount === previousTourAmounts[index] ? defaults[index] : amount);
}

let budget = loadBudget();

function saveBudget() {
  try {
    localStorage.setItem(budgetStorageKey, JSON.stringify(budget));
  } catch {
    // The current budget still works when browser storage is unavailable.
  }
}

function renderBudget() {
  document.getElementById('budgetrows').innerHTML = defaultBudget.map(([label], index) => `<div class="inputrow"><label for="b${index}">${safe(label)}</label><input id="b${index}" type="number" min="0" step="1" inputmode="numeric" value="${budget[index]}"></div>`).join('');
  defaultBudget.forEach((_, index) => {
    document.getElementById('b' + index).oninput = event => {
      budget[index] = Math.max(0, Number(event.target.value) || 0);
      saveBudget();
      updateTotal();
    };
  });
  updateTotal();
}

function money(amount) {
  return Math.round(amount).toLocaleString('zh-TW');
}

function updateTotal() {
  const sum = budget.reduce((total, amount) => total + amount, 0);
  renderBudgetChart();
  document.getElementById('totalTwd').textContent = 'NT$' + money(sum);
  document.getElementById('totalJpy').textContent = '約 ¥' + money(sum / .22) + '（規劃匯率）';
  document.getElementById('perPerson').textContent = '每人約 NT$' + money(sum / 3);
}

document.getElementById('resetBudget').onclick = () => {
  if (confirm('確定還原預設預算？')) {
    budget = defaultBudget.map(([, amount]) => amount);
    renderBudget();
    saveBudget();
  }
};
renderBudget();

const checkStorageKey = 'okinawa27_check_v3';
const savedChecks = getStore(checkStorageKey, []);
const checked = new Set(Array.isArray(savedChecks) ? savedChecks.filter(index => Number.isInteger(index) && index >= 0 && index < checks.length) : []);

function checklistItem(index) {
  return `<label class="check"><input type="checkbox" data-check="${index}" ${checked.has(index) ? 'checked' : ''}><span>${safe(checks[index])}</span></label>`;
}

function updateCheckProgress() {
  document.getElementById('checkprogress').textContent = `已完成 ${checked.size} / ${checks.length} 項`;
}

const departureIndexes = new Set(departureChecks.map(item => item.index));
document.getElementById('departure-checklist').innerHTML = departureChecks.map(({index, link, label}) => {
  const action = link ? `<a class="btn ghost" href="${safe(link)}" target="_blank" rel="noopener noreferrer">${safe(label)}</a>` : '';
  return `<div class="departure-check-row">${checklistItem(index)}${action}</div>`;
}).join('');
document.getElementById('checklist').innerHTML = checks.map((_, index) => departureIndexes.has(index) ? '' : checklistItem(index)).join('');
document.querySelectorAll('[data-check]').forEach(input => {
  input.addEventListener('change', () => {
    const index = Number(input.dataset.check);
    if (input.checked) checked.add(index);
    else checked.delete(index);
    try {
      localStorage.setItem(checkStorageKey, JSON.stringify([...checked]));
    } catch {
      // Checkboxes remain usable when browser storage is unavailable.
    }
    updateCheckProgress();
  });
});
updateCheckProgress();

document.getElementById('exportTxt').onclick=()=>{let text='沖繩之旅 2027｜五天四夜｜3人\n\n'+days.map(d=>d.date+' '+d.title+'\n'+d.events.map(e=>e[0]+' '+e[1]+'｜'+e[2]).join('\n')).join('\n\n')+'\n\n預算（NT$）：\n'+defaultBudget.map((b,i)=>b[0]+'：'+budget[i]).join('\n');let a=document.createElement('a');a.href=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));a.download='沖繩2027_行程與預算.txt';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)};
let resourceCategory='全部';const resourceCats=['全部','公車時刻查詢','門票與預訂','官網與導覽','住宿'];function renderResources(){const q=document.getElementById('resourceSearch').value.toLowerCase().trim();document.getElementById('resourceFilters').innerHTML=resourceCats.map(c=>`<button type="button" class="${resourceCategory===c?'active':''}" aria-pressed="${resourceCategory===c}" data-filter="${safe(c)}">${safe(c)}</button>`).join('');document.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>{resourceCategory=b.dataset.filter;renderResources()});const filtered=resourceData.filter(r=>(resourceCategory==='全部'||r[1]===resourceCategory)&&r.join(' ').toLowerCase().includes(q));document.getElementById('resourceStatus').textContent=`顯示 ${filtered.length} 個連結`;document.getElementById('resourceList').innerHTML=filtered.map(r=>`<div class="card rescard"><div class="resicon" aria-hidden="true">${r[0]}</div><div class="resbody"><h3>${safe(r[2])}</h3><p>${safe(r[3])}</p><div class="reslinks"><a class="primary" href="${r[4]}" target="_blank" rel="noopener noreferrer">${safe(r[5])}</a><a href="${mapLink(r[2])}" target="_blank" rel="noopener noreferrer">📍 地圖</a></div></div></div>`).join('')||'<div class="empty">沒有符合的連結</div>';}document.getElementById('resourceSearch').oninput=renderResources;renderResources();
document.getElementById('trip-days').innerHTML=days.map((d,i)=>`<article class="trip-day"><div class="day-art"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(dayPhotos[i][0])}?width=640" alt="${safe(dayPhotos[i][1])}" width="640" height="480" loading="lazy" decoding="async" onerror="this.hidden=true;this.nextElementSibling.hidden=false"><span class="day-photo-fallback" hidden>照片暫時無法載入</span></div><button type="button" class="day-card-copy" data-trip-day="${i}" aria-label="查看 ${d.date} ${safe(d.title)}"><span class="date">${d.date} · ${safe(d.sub.split(' · ')[0])}</span><strong>${dayViews[i][0]}</strong><small>${dayViews[i][1]}</small></button></article>`).join('');
const photoCredits=document.createElement('details');photoCredits.className='day-photo-credits';const allPhotoCredits=[...new Map([...dayPhotos,...itineraryPhotos.map(p=>p.slice(1))].map(p=>[p[0],p])).values()];photoCredits.innerHTML='<summary>圖片來源</summary><p>實景照片依版面比例裁切，以下保留攝影者與授權資訊。</p>'+allPhotoCredits.map(p=>`<p><a href="https://commons.wikimedia.org/wiki/File:${encodeURIComponent(p[0])}" target="_blank" rel="noopener">${safe(p[1])}</a> · ${safe(p[2])} · ${p[4]} · ${p[3]==='PD'?'Public domain':p[3]==='CC0'?'<a href="https://creativecommons.org/publicdomain/zero/1.0/" target="_blank" rel="noopener">CC0</a>':`<a href="https://creativecommons.org/licenses/${p[3]}/" target="_blank" rel="noopener">CC ${p[3].replace('/',' ').toUpperCase()}</a>`}</p>`).join('');photoCredits.innerHTML+=externalItineraryPhotos.map(p=>`<p>${safe(p[2])} · <a href="${safe(p[4])}" target="_blank" rel="noopener">${safe(p[3])}</a> · 外部圖片，版權歸原權利人</p>`).join('');document.querySelector('main').after(photoCredits);
document.querySelectorAll('[data-trip-day]').forEach(button => {
  button.onclick = () => {
    showPage('days', {focusHeading: true, dayIndex: Number(button.dataset.tripDay)});
  };
});

function renderBudgetChart(){
 const groups=[['機票',budget[0],'#087f80'],['住宿',budget[1],'#65a89a'],['一日遊・門票',budget[2]+budget[3]+budget[5],'#e8ad58'],['交通',budget[4],'#819cc7'],['餐飲',budget[6],'#d98076'],['購物',budget[7],'#a58db6']];
 const sum=groups.reduce((v,g)=>v+g[1],0),circ=2*Math.PI*70;let offset=0;
 document.getElementById('budget-ring-segments').innerHTML=groups.filter(g=>g[1]>0).map(g=>{const len=sum?g[1]/sum*circ:0;const segment=`<circle cx="90" cy="90" r="70" stroke="${g[2]}" stroke-dasharray="${len} ${circ-len}" stroke-dashoffset="${-offset}"><title>${g[0]}：NT$${money(g[1])}，${Math.round(g[1]/sum*100)}%</title></circle>`;offset+=len;return segment}).join('');
 document.getElementById('budget-ring-total').textContent='$'+money(sum);
 document.getElementById('budget-chart-title').textContent='三人旅費分布，總計新台幣 '+money(sum)+' 元';
 document.getElementById('budget-legend').innerHTML=groups.map(g=>`<div class="legend-row"><span class="legend-dot" style="background:${g[2]}"></span><span>${g[0]} <span class="muted">${sum?Math.round(g[1]/sum*100):0}%</span></span><strong>$${money(g[1])}</strong></div>`).join('');
}
