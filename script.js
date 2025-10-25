// script.js w
// Utility: on DOM ready
function onReady(cb) {
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', cb, { once: true });
	} else { cb(); }
}

onReady(() => {
	// Init all features
	setupYear();
	setupGreeting();
	setupTheme();
	setupSmoothScroll();
	setupContactForm();
});

// Footer year
function setupYear() {
	const yearEl = document.getElementById('year');
	if (yearEl) yearEl.textContent = String(new Date().getFullYear());
}

// Time-based greeting
function setupGreeting() {
	const el = document.getElementById('greeting');
	if (!el) return;
	const now = new Date();
	const h = now.getHours();

	let text = 'Welcome';
	if (h >= 5 && h < 12) text = 'Good morning';
	else if (h >= 12 && h < 17) text = 'Good afternoon';
	else text = 'Good evening';

	el.textContent = text;
}

// Theme toggle with persistence and system preference
function setupTheme() {
	const root = document.documentElement;
	const btn = document.getElementById('themeToggle');
	const key = 'preferred-theme';

	// Resolve preferred theme
	const stored = localStorage.getItem(key);
	const systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

	function apply(theme) {
		root.setAttribute('data-theme', theme);
		// Swap icon
		if (btn) btn.querySelector('.toggle-icon').textContent = theme === 'light' ? '🌙' : '☀️';
	}

	let initial = 'light';
	if (stored === 'dark' || stored === 'light') initial = stored;
	else initial = systemDark ? 'dark' : 'light';
	apply(initial);

	// React to system changes
	if (window.matchMedia) {
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
			const saved = localStorage.getItem(key);
			if (!saved) apply(e.matches ? 'dark' : 'light');
		});
	}

	// Toggle
	btn?.addEventListener('click', () => {
		const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
		const next = current === 'dark' ? 'light' : 'dark';
		localStorage.setItem(key, next);
		apply(next);
	});
}

// Smooth scroll (CSS handles behavior; ensure header offset if needed)
function setupSmoothScroll() {
	// If your header height causes overlay, adjust with scroll-margin-top on sections via CSS.
	// Here we just enhance keyboard focus after hash navigation.
	const links = document.querySelectorAll('a[href^="#"]');
	links.forEach(a => {
		a.addEventListener('click', e => {
			const id = a.getAttribute('href');
			if (!id || id === '#') return;
			const target = document.querySelector(id);
			if (!target) return;
			// Native smooth via CSS; ensure focus for accessibility
			setTimeout(() => {
				target.setAttribute('tabindex', '-1');
				target.focus({ preventScroll: true });
			}, 300);
		});
	});
}

// Contact form: validation + simulate save to .txt (download) + localStorage
function setupContactForm() {
	const form = document.getElementById('contactForm');
	const statusEl = document.getElementById('formStatus');
	const exportBtn = document.getElementById('exportBtn');

	if (!form) return;

	function showStatus(msg, ok = true) {
		if (!statusEl) return;
		statusEl.textContent = msg;
		statusEl.style.color = ok ? 'var(--success)' : 'var(--error)';
	}

	function validate() {
		const name = document.getElementById('name');
		const email = document.getElementById('email');
		const message = document.getElementById('message');

		const nameError = document.getElementById('nameError');
		const emailError = document.getElementById('emailError');
		const messageError = document.getElementById('messageError');

		let ok = true;

		// Name
		if (!name.value.trim()) {
			nameError.textContent = 'Please enter your name.';
			ok = false;
		} else {
			nameError.textContent = '';
		}

		// Email
		const emailVal = email.value.trim();
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailVal) {
			emailError.textContent = 'Please enter your email.';
			ok = false;
		} else if (!emailRegex.test(emailVal)) {
			emailError.textContent = 'Please enter a valid email.';
			ok = false;
		} else {
			emailError.textContent = '';
		}

		// Message
		if (!message.value.trim()) {
			messageError.textContent = 'Please enter a message.';
			ok = false;
		} else {
			messageError.textContent = '';
		}

		return ok;
	}

	function getMessages() {
		try {
			const raw = localStorage.getItem('contact-messages');
			return raw ? JSON.parse(raw) : [];
		} catch {
			return [];
		}
	}
	function setMessages(arr) {
		localStorage.setItem('contact-messages', JSON.stringify(arr));
	}

	function formatMessage(entry) {
		return [
			'---- Message ----',
			`Name: ${entry.name}`,
			`Email: ${entry.email}`,
			`Date: ${entry.date}`,
			'',
			entry.message,
			'\n'
		].join('\n');
	}

	function downloadAllMessages() {
		const msgs = getMessages();
		if (!msgs.length) {
			showStatus('No messages to export yet.', false);
			return;
		}
		const content = msgs.map(formatMessage).join('\n');
		const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
		const url = URL.createObjectURL(blob);

		const now = new Date();
		const pad = n => String(n).padStart(2, '0');
		const filename = `messages-${now.getFullYear()}${pad(now.getMonth()+1)}${pad(now.getDate())}.txt`;

		const a = document.createElement('a');
		a.href = url;
		a.download = filename;
		document.body.appendChild(a);
		a.click();
		URL.revokeObjectURL(url);
		a.remove();
		showStatus('Messages exported as .txt.');
	}

	form.addEventListener('submit', e => {
		e.preventDefault();
		if (!validate()) {
			showStatus('Please fix the errors above.', false);
			return;
		}

		const formData = new FormData(form);
		const entry = {
			name: String(formData.get('name') || '').trim(),
			email: String(formData.get('email') || '').trim(),
			message: String(formData.get('message') || '').trim(),
			date: new Date().toLocaleString()
		};

		// Save to localStorage list
		const list = getMessages();
		list.push(entry);
		setMessages(list);

		// Simulate saving to a .txt by generating a per-message file download
		const content = formatMessage(entry);
		const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		const safeName = entry.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'message';
		a.download = `contact-${safeName}.txt`;
		document.body.appendChild(a);
		a.click();
		URL.revokeObjectURL(url);
		a.remove();

		showStatus('Message sent! A .txt file has been downloaded.');
		form.reset();
	});

	exportBtn?.addEventListener('click', downloadAllMessages);
}