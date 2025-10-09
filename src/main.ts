// いいから寝ろ.com
console.log('loading...');

const form = document.getElementById('input-form');
const input = document.getElementById('input-text');
const submitBtn = document.getElementById('submit-btn');
const responseArea = document.getElementById('response-area');
const actions = document.getElementById('actions');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) {
    responseArea.textContent = '黙っててもいい。いいから寝ろ。';
    actions.style.display = 'flex';
    return;
  }
  
  responseArea.textContent = '';
  actions.style.display = 'none';
  submitBtn.disabled = true;
  
  const response = `${text.slice(0,10)}の件は夜に考えても解決しない。明日やれ。\n\nいいから寝ろ。`;
  
  for (const char of response) {
    responseArea.textContent += char;
    await new Promise(r => setTimeout(r, 30));
  }
  
  actions.style.display = 'flex';
  submitBtn.disabled = false;
  input.value = '';
});

document.getElementById('reset-btn').addEventListener('click', () => {
  responseArea.textContent = '';
  actions.style.display = 'none';
});

document.getElementById('share-x').addEventListener('click', () => {
  window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent('AIに相談したら「いいから寝ろ。」って言われた #いいから寝ろ'));
});

document.getElementById('share-line').addEventListener('click', () => {
  if (navigator.share) {
    navigator.share({ title: 'いいから寝ろ.com', text: 'AIに相談したら「いいから寝ろ。」って言われた', url: location.href });
  }
});
