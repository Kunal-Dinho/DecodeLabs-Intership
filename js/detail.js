'use strict';

const root = document.getElementById('detail-page');
const params = new URLSearchParams(location.search);
const type = location.pathname.includes('internship') ? 'internships' : 'courses';
const slug = params.get('slug');
const list = items => `<ul class="detail-list">${items.map(item => `<li>${item}</li>`).join('')}</ul>`;
const escapeHtml = value => String(value).replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));

function courseView(item) {
  document.title = `${item.title} — NTESHIP`;
  return `<section class="detail-hero"><div><span class="detail-kicker">${item.category} · ${item.level}</span><h1 class="detail-title">${item.title}</h1><p class="detail-description">${item.description}</p><div class="detail-meta"><span>🕒 ${item.duration}</span><span>🎓 ${item.level}</span><span>👤 ${item.instructor}</span></div></div><aside class="detail-card"><h2>Join this course</h2><p>Learn with live guidance, projects and a completion certificate.</p><strong class="detail-price">${item.price}</strong><a class="btn btn-primary btn-block" href="register.html">Enroll now</a><p class="detail-note">You will be asked to create an account before checkout.</p></aside></section><div class="detail-layout"><div><section class="detail-section"><h2>What you’ll learn</h2>${list(item.outcomes)}</section><section class="detail-section"><h2>Curriculum</h2><ol class="module-list">${item.modules.map(module => `<li>${module}</li>`).join('')}</ol></section></div><aside><section class="detail-section"><h2>Before you start</h2>${list(item.requirements)}</section><section class="detail-section"><h2>Your instructor</h2><p><strong>${item.instructor}</strong><br>${item.instructorRole}</p></section></aside></div>`;
}
function internshipView(item) {
  document.title = `${item.title} at ${item.company} — NTESHIP`;
  return `<section class="detail-hero"><div><span class="detail-kicker">${item.company} internship</span><h1 class="detail-title">${item.title}</h1><p class="detail-description">${item.description}</p><div class="detail-meta"><span>🕒 ${item.duration}</span><span>📍 ${item.location}</span><span>💰 ${item.stipend}</span></div></div><aside class="detail-card"><h2>Apply for this role</h2><p><strong>${item.company}</strong> · ${item.deadline}</p><form id="application-form" class="application-form"><label>Full name<input name="name" required autocomplete="name"></label><label>Email address<input type="email" name="email" required autocomplete="email"></label><label>Portfolio / LinkedIn link<input type="url" name="portfolio" placeholder="https://"></label><label>Why are you a good fit?<textarea name="message" required minlength="20"></textarea></label><button class="btn btn-primary btn-block" type="submit">Submit application</button><p class="form-status" id="form-status"></p></form></aside></section><div class="detail-layout"><div><section class="detail-section"><h2>What you’ll do</h2>${list(item.responsibilities)}</section><section class="detail-section"><h2>Skills you’ll use</h2>${list(item.skills)}</section></div><aside><section class="detail-section"><h2>Eligibility</h2>${list(item.eligibility)}</section><section class="detail-section"><h2>Program benefits</h2>${list(item.benefits)}</section></aside></div>`;
}
async function load() {
  if (!slug) throw new Error('Choose a course or internship from the catalogue.');
  const response = await fetch(`/api/${type}/${encodeURIComponent(slug)}`);
  if (!response.ok) throw new Error('This listing is unavailable. Please return to the catalogue.');
  const item = await response.json(); root.innerHTML = type === 'courses' ? courseView(item) : internshipView(item);
  const form = document.getElementById('application-form');
  if (form) form.addEventListener('submit', submitApplication);
}
async function submitApplication(event) {
  event.preventDefault(); const form = event.currentTarget; const status = document.getElementById('form-status'); const button = form.querySelector('button');
  button.disabled = true; button.textContent = 'Submitting…'; status.className = 'form-status'; status.textContent = '';
  const data = Object.fromEntries(new FormData(form)); data.internship = slug;
  try { const response = await fetch('/api/applications', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }); const result = await response.json(); if (!response.ok) throw new Error(result.error); status.textContent = result.message; status.classList.add('success'); form.reset(); }
  catch (error) { status.textContent = error.message || 'Unable to submit your application.'; status.classList.add('error'); }
  finally { button.disabled = false; button.textContent = 'Submit application'; }
}
load().catch(error => { root.innerHTML = `<div class="detail-error">${escapeHtml(error.message)}<br><br><a class="btn btn-primary" href="index.html">Back to home</a></div>`; });
