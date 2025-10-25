// script.js - Enhanced Portfolio Website
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
	setupSectionNavigation();
	setupAnimations();
	setupAPI();
	setupAIFeatures();
});

// Footer year
function setupYear() {
	const yearEl = document.getElementById('year');
	if (yearEl) yearEl.textContent = String(new Date().getFullYear());
}

// Enhanced time-based greeting with automatic updates and emojis
function setupGreeting() {
	const el = document.getElementById('greeting');
	if (!el) return;

	function updateGreeting() {
	const now = new Date();
	const h = now.getHours();

	let text = 'Welcome';
		let emoji = '👋';
		
		if (h >= 5 && h < 12) {
			text = 'Good morning';
			emoji = '🌅';
		} else if (h >= 12 && h < 17) {
			text = 'Good afternoon';
			emoji = '🌞';
		} else if (h >= 17 && h < 22) {
			text = 'Good evening';
			emoji = '🌙';
		} else {
			text = 'Good night';
			emoji = '🌌';
		}

		el.textContent = `${text} ${emoji}`;
	}

	// Update immediately
	updateGreeting();

	// Update every minute to catch time changes
	setInterval(updateGreeting, 60000);
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

// Enhanced smooth scroll with section navigation
function setupSmoothScroll() {
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

// Dynamic section navigation with smooth transitions
function setupSectionNavigation() {
	const navLinks = document.querySelectorAll('.nav-link');
	const sections = document.querySelectorAll('.section');

	function updateActiveSection() {
		const scrollPos = window.scrollY + 100;
		
		sections.forEach(section => {
			const sectionTop = section.offsetTop;
			const sectionHeight = section.offsetHeight;
			const sectionId = section.getAttribute('id');
			
			if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
				// Update navigation
				navLinks.forEach(link => {
					link.classList.remove('active');
					if (link.getAttribute('data-section') === sectionId) {
						link.classList.add('active');
					}
				});
			}
		});
	}

	// Initial call
	updateActiveSection();
	
	// Listen for scroll events with throttling for better performance
	let ticking = false;
	function onScroll() {
		if (!ticking) {
			requestAnimationFrame(() => {
				updateActiveSection();
				ticking = false;
			});
			ticking = true;
		}
	}
	
	window.addEventListener('scroll', onScroll);
	
	// Handle navigation clicks
	navLinks.forEach(link => {
		link.addEventListener('click', (e) => {
			e.preventDefault();
			const targetId = link.getAttribute('data-section');
			const targetSection = document.getElementById(targetId);
			
			if (targetSection) {
				targetSection.scrollIntoView({ 
					behavior: 'smooth',
					block: 'start'
				});
			}
		});
	});
}

// Viewport-based animations using IntersectionObserver
function setupAnimations() {
	// Check if IntersectionObserver is supported
	if (!('IntersectionObserver' in window)) {
		// Fallback: show all elements immediately
		const animatedElements = document.querySelectorAll(`
			.project-card, 
			.timeline-item, 
			.about-text, 
			.contact-form,
			.hero-copy,
			.hero-visual,
			.about-photo-wrap,
			.contact-info,
			.api-data-section
		`);
		animatedElements.forEach(el => {
			el.classList.add('visible');
		});
		return;
	}

	const observerOptions = {
		threshold: 0.05, // Lower threshold for earlier triggering
		rootMargin: '0px 0px -20px 0px' // Reduced margin for earlier triggering
	};

	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
				// Stop observing once animated to improve performance
				observer.unobserve(entry.target);
			}
		});
	}, observerOptions);

	// Observe elements for animation with better selection
	const animatedElements = document.querySelectorAll(`
		.project-card, 
		.timeline-item, 
		.about-text, 
		.contact-form,
		.hero-copy,
		.hero-visual,
		.about-photo-wrap,
		.contact-info,
		.api-data-section
	`);
	
	animatedElements.forEach((el, index) => {
		// Add staggered animation classes
		if (index % 2 === 0) {
			el.classList.add('slide-in-left');
		} else {
			el.classList.add('slide-in-right');
		}
		observer.observe(el);
	});

	// Also add fade-in animations to sections
	const sections = document.querySelectorAll('.section');
	sections.forEach(section => {
		section.classList.add('fade-in');
		observer.observe(section);
	});
}

// API integration with loading states and error handling
function setupAPI() {
	const apiContent = document.getElementById('apiContent');
	const apiLoading = document.getElementById('apiLoading');
	const apiError = document.getElementById('apiError');
	const apiSuccess = document.getElementById('apiSuccess');
	const retryBtn = document.getElementById('retryBtn');

	if (!apiContent) return;

	async function fetchQuotes() {
		try {
			// Show loading state
			apiLoading.style.display = 'flex';
			apiError.style.display = 'none';
			apiSuccess.style.display = 'none';

			// Fetch from a free quotes API
			const response = await fetch('https://api.quotable.io/quotes/random?limit=3');
			
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			
			const quotes = await response.json();
			
			if (!quotes || quotes.length === 0) {
				throw new Error('No quotes available');
			}

			// Display quotes
			displayQuotes(quotes);
			
		} catch (error) {
			console.error('API Error:', error);
			showAPIError();
		}
	}

	function displayQuotes(quotes) {
		apiLoading.style.display = 'none';
		apiError.style.display = 'none';
		apiSuccess.style.display = 'grid';
		
		apiSuccess.innerHTML = quotes.map(quote => `
			<div class="quote-card fade-in">
				<div class="quote-text">"${quote.content}"</div>
				<div class="quote-author">— ${quote.author}</div>
			</div>
		`).join('');

		// Animate quote cards
		const quoteCards = apiSuccess.querySelectorAll('.quote-card');
		quoteCards.forEach((card, index) => {
			setTimeout(() => {
				card.classList.add('visible');
			}, index * 200);
		});
	}

	function showAPIError() {
		apiLoading.style.display = 'none';
		apiError.style.display = 'block';
		apiSuccess.style.display = 'none';
	}

	// Retry functionality
	retryBtn?.addEventListener('click', fetchQuotes);

	// Initial fetch
	fetchQuotes();
}

// AI-inspired features
function setupAIFeatures() {
	const aiQuoteEl = document.getElementById('aiQuote');
	const aiSuggestionBtn = document.getElementById('aiSuggestionBtn');

	// AI Quote Generator based on time of day
	function generateAIQuote() {
		const now = new Date();
		const h = now.getHours();
		
		const quotes = {
			morning: [
				"Start your day with purpose and watch opportunities unfold 🌅",
				"Every morning brings new possibilities - seize them! ☀️",
				"Rise and shine! Your potential is limitless today 💪"
			],
			afternoon: [
				"Midday momentum - keep pushing forward! 🌞",
				"The afternoon sun reminds us to stay bright and focused ✨",
				"Halfway through the day, halfway to your goals 🎯"
			],
			evening: [
				"Evening reflections bring wisdom for tomorrow 🌙",
				"Wind down with gratitude for today's achievements 🙏",
				"The evening sky holds promises of tomorrow's success 🌆"
			],
			night: [
				"Night brings rest, dreams, and preparation for greatness 🌌",
				"Sleep well knowing tomorrow holds new opportunities 💤",
				"The stars remind us that even in darkness, there's light ✨"
			]
		};

		let timeCategory = 'evening';
		if (h >= 5 && h < 12) timeCategory = 'morning';
		else if (h >= 12 && h < 17) timeCategory = 'afternoon';
		else if (h >= 17 && h < 22) timeCategory = 'evening';
		else timeCategory = 'night';

		const timeQuotes = quotes[timeCategory];
		const randomQuote = timeQuotes[Math.floor(Math.random() * timeQuotes.length)];
		
		return randomQuote;
	}

	// Show AI quote with animation
	function showAIQuote() {
		if (!aiQuoteEl) return;
		
		const quote = generateAIQuote();
		aiQuoteEl.textContent = quote;
		aiQuoteEl.classList.add('show');
		
		// Auto-hide after 5 seconds
		setTimeout(() => {
			aiQuoteEl.classList.remove('show');
		}, 5000);
	}

	// AI Suggestion feature
	function showAISuggestion() {
		const suggestions = [
			"💡 Try switching to dark mode for better eye comfort at night",
			"🎨 The color scheme adapts to your system preferences automatically",
			"📱 This site is fully responsive - try resizing your browser!",
			"⌨️ Use keyboard navigation for accessibility - try Tab to navigate",
			"🔄 Refresh the page to see new inspirational quotes",
			"💾 Your contact messages are saved locally in your browser",
			"🌙 The greeting updates automatically based on the time of day",
			"✨ Hover over elements to see smooth animations in action"
		];

		const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
		
		// Create temporary notification
		const notification = document.createElement('div');
		notification.textContent = randomSuggestion;
		notification.style.cssText = `
			position: fixed;
			top: 20px;
			right: 20px;
			background: var(--elev-1);
			border: 1px solid var(--border);
			border-radius: var(--radius-sm);
			padding: 12px 16px;
			color: var(--text);
			box-shadow: var(--shadow-md);
			z-index: 1000;
			max-width: 300px;
			animation: fadeInUp 0.3s ease;
		`;
		
		document.body.appendChild(notification);
		
		// Auto-remove after 4 seconds
		setTimeout(() => {
			notification.style.animation = 'fadeInUp 0.3s ease reverse';
			setTimeout(() => notification.remove(), 300);
		}, 4000);
	}

	// Event listeners
	aiSuggestionBtn?.addEventListener('click', showAISuggestion);
	
	// Show AI quote on page load
	setTimeout(showAIQuote, 1000);
	
	// Show new AI quote every 30 seconds
	setInterval(showAIQuote, 30000);
}

// Enhanced contact form with better validation and feedback
function setupContactForm() {
	const form = document.getElementById('contactForm');
	const statusEl = document.getElementById('formStatus');
	const exportBtn = document.getElementById('exportBtn');

	if (!form) return;

	function showStatus(msg, ok = true) {
		if (!statusEl) return;
		statusEl.textContent = msg;
		statusEl.className = `form-status ${ok ? 'success' : 'error'}`;
		statusEl.style.display = 'block';
		
		// Auto-hide success messages
		if (ok) {
			setTimeout(() => {
				statusEl.style.display = 'none';
			}, 3000);
		}
	}

	function validate() {
		const name = document.getElementById('name');
		const email = document.getElementById('email');
		const message = document.getElementById('message');

		const nameError = document.getElementById('nameError');
		const emailError = document.getElementById('emailError');
		const messageError = document.getElementById('messageError');

		let ok = true;

		// Name validation
		if (!name.value.trim()) {
			nameError.textContent = 'Please enter your name.';
			name.style.borderColor = 'var(--error)';
			ok = false;
		} else {
			nameError.textContent = '';
			name.style.borderColor = 'var(--success)';
		}

		// Email validation
		const emailVal = email.value.trim();
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailVal) {
			emailError.textContent = 'Please enter your email.';
			email.style.borderColor = 'var(--error)';
			ok = false;
		} else if (!emailRegex.test(emailVal)) {
			emailError.textContent = 'Please enter a valid email.';
			email.style.borderColor = 'var(--error)';
			ok = false;
		} else {
			emailError.textContent = '';
			email.style.borderColor = 'var(--success)';
		}

		// Message validation
		if (!message.value.trim()) {
			messageError.textContent = 'Please enter a message.';
			message.style.borderColor = 'var(--error)';
			ok = false;
		} else {
			messageError.textContent = '';
			message.style.borderColor = 'var(--success)';
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

	// Real-time validation
	const inputs = form.querySelectorAll('input, textarea');
	inputs.forEach(input => {
		input.addEventListener('blur', validate);
		input.addEventListener('input', function() {
			// Reset border color on input
			this.style.borderColor = '';
		});
	});

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
		
		// Reset all border colors
		inputs.forEach(input => {
			input.style.borderColor = '';
		});
	});

	exportBtn?.addEventListener('click', downloadAllMessages);
}