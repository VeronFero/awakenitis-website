// Daily Quote System - Changes at midnight (12:00 AM)
class DailyQuoteSystem {
    constructor() {
        this.quotes = [];
        this.loadQuotesFromStorage();
    }

    loadQuotesFromStorage() {
        // Get quotes from localStorage (managed by admin dashboard)
        const storedQuotes = localStorage.getItem('awakenitis_quotes');
        if (storedQuotes) {
            this.quotes = JSON.parse(storedQuotes);
        } else {
            // Fallback quotes if no admin data
            this.quotes = [
                {
                    id: 'default_1',
                    quote_text: "When you change the way you look at things, the things you look at change",
                    author: "Wayne Dyer",
                    is_active: false,
                    display_date: null
                },
                {
                    id: 'default_2',
                    quote_text: "The only way to do great work is to love what you do",
                    author: "Steve Jobs",
                    is_active: false,
                    display_date: null
                },
                {
                    id: 'default_3',
                    quote_text: "Your time is limited, do not waste it living someone elses life",
                    author: "Steve Jobs",
                    is_active: false,
                    display_date: null
                },
                {
                    id: 'default_4',
                    quote_text: "The future belongs to those who believe in the beauty of their dreams",
                    author: "Eleanor Roosevelt",
                    is_active: false,
                    display_date: null
                },
                {
                    id: 'default_5',
                    quote_text: "Success is not final, failure is not fatal: it is the courage to continue that counts",
                    author: "Winston Churchill",
                    is_active: false,
                    display_date: null
                },
                {
                    id: 'default_6',
                    quote_text: "Believe you can and you are halfway there",
                    author: "Theodore Roosevelt",
                    is_active: false,
                    display_date: null
                },
                {
                    id: 'default_7',
                    quote_text: "The only impossible journey is the one you never begin",
                    author: "Tony Robbins",
                    is_active: false,
                    display_date: null
                },
                {
                    id: 'default_8',
                    quote_text: "Everything you can imagine is real",
                    author: "Pablo Picasso",
                    is_active: false,
                    display_date: null
                },
                {
                    id: 'default_9',
                    quote_text: "Do what you can with all you have, wherever you are",
                    author: "Theodore Roosevelt",
                    is_active: false,
                    display_date: null
                },
                {
                    id: 'default_10',
                    quote_text: "What lies behind us and what lies before us are tiny matters compared to what lies within us",
                    author: "Ralph Waldo Emerson",
                    is_active: false,
                    display_date: null
                }
            ];
            localStorage.setItem('awakenitis_quotes', JSON.stringify(this.quotes));
        }
    }

    getTodayDate() {
        return new Date().toISOString().split('T')[0];
    }

    getTodayQuote() {
        const today = this.getTodayDate();
        
        // Check if there's an active quote for today
        let activeQuote = this.quotes.find(q => q.is_active && q.display_date === today);
        
        // If no quote for today, select a new one
        if (!activeQuote) {
            // Deactivate all quotes
            this.quotes.forEach(q => q.is_active = false);
            
            // Get unused quotes (no display_date or old date)
            const unusedQuotes = this.quotes.filter(q => !q.display_date || q.display_date < today);
            
            // If no unused quotes, reset all
            if (unusedQuotes.length === 0) {
                this.quotes.forEach(q => {
                    q.display_date = null;
                    q.is_active = false;
                });
                activeQuote = this.quotes[Math.floor(Math.random() * this.quotes.length)];
            } else {
                activeQuote = unusedQuotes[Math.floor(Math.random() * unusedQuotes.length)];
            }
            
            // Mark as active for today
            activeQuote.is_active = true;
            activeQuote.display_date = today;
            
            // Save to localStorage
            localStorage.setItem('awakenitis_quotes', JSON.stringify(this.quotes));
        }
        
        return activeQuote;
    }

    start() {
        this.displayQuote();
        
        // Check for new quote at midnight
        this.scheduleMidnightCheck();
    }

    displayQuote() {
        const quoteElement = document.getElementById('quoteText');
        const authorElement = document.getElementById('quoteAuthor');
        const quote = this.getTodayQuote();
        
        if (quoteElement && authorElement) {
            quoteElement.textContent = quote.quote_text;
            authorElement.textContent = `- ${quote.author}`;
        }
    }

    scheduleMidnightCheck() {
        // Calculate time until next midnight
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        
        const timeUntilMidnight = tomorrow - now;
        
        // Check at midnight
        setTimeout(() => {
            this.loadQuotesFromStorage(); // Reload in case admin updated
            this.displayQuote();
            
            // Add smooth transition
            const quoteContainer = document.getElementById('inspirationalQuote');
            if (quoteContainer) {
                quoteContainer.classList.add('quote-fade-in');
                setTimeout(() => {
                    quoteContainer.classList.remove('quote-fade-in');
                }, 1000);
            }
            
            // Schedule next midnight check
            this.scheduleMidnightCheck();
        }, timeUntilMidnight);
        
        console.log(`Next quote change in ${Math.round(timeUntilMidnight / 1000 / 60)} minutes`);
    }
}

// Music Player System with real HTML5 audio
class MusicPlayer {
    constructor() {
        this.currentTrack = null;
        this.isPlaying = false;
        this.audioElement = null;
        this.musicTracks = {
            meditation: 'https://cdn.pixabay.com/download/audio/2024/03/26/audio_64ff8c5fce.mp3?filename=deep-healing-music-432-hz-meditation-sleep-238160.mp3',
            sleep: 'https://cdn.pixabay.com/download/audio/2023/01/11/audio_c34ad8eefc.mp3?filename=528hz-healing-frequency-healing-meditation-binaural-beat-meditation-music-145346.mp3',
            focus: 'https://cdn.pixabay.com/download/audio/2022/07/05/audio_a002aded58.mp3?filename=meditation-1-165765.mp3'
        };
    }

    init() {
        this.audioElement = document.getElementById('musicPlayer');
        if (!this.audioElement) {
            console.error('Audio element not found');
            return;
        }
        this.audioElement.controls = true;
        this.audioElement.volume = 0.5;
    }

    play(type) {
        if (!this.audioElement) {
            this.init();
        }

        const trackUrl = this.musicTracks[type];
        if (!trackUrl) {
            showNotification('Track not available', 'error');
            return;
        }

        this.audioElement.src = trackUrl;
        this.audioElement.play().then(() => {
            showNotification(`Playing ${type} frequency music...`, 'success');
            this.isPlaying = true;
            this.currentTrack = type;
            
            // Animate sound waves
            const soundWaves = document.querySelectorAll('.sound-waves span');
            soundWaves.forEach(wave => {
                wave.style.animation = 'soundWave 1.2s ease-in-out infinite';
            });
        }).catch(error => {
            console.error('Playback error:', error);
            showNotification('Unable to play audio. Please try again.', 'error');
        });
    }

    pause() {
        if (!this.audioElement) return;
        
        this.audioElement.pause();
        this.isPlaying = false;
        showNotification('Music paused', 'info');
        
        // Stop sound wave animation
        const soundWaves = document.querySelectorAll('.sound-waves span');
        soundWaves.forEach(wave => {
            wave.style.animation = 'none';
        });
    }

    stop() {
        if (!this.audioElement) return;
        
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
        this.isPlaying = false;
        this.currentTrack = null;
        
        const soundWaves = document.querySelectorAll('.sound-waves span');
        soundWaves.forEach(wave => {
            wave.style.animation = 'none';
        });
    }
}

// Games System
class GameSystem {
    constructor() {
        this.personalityData = {};
    }

    playGame(gameId) {
        switch(gameId) {
            case 'tic-tac-toe':
                this.launchTicTacToe();
                break;
            case 'color-choice':
                this.launchColorChoice();
                break;
            case 'pattern-match':
                this.launchPatternMatch();
                break;
            case 'rhythm-flow':
                this.launchRhythmFlow();
                break;
            default:
                showNotification('Game coming soon!', 'info');
        }
    }

    launchTicTacToe() {
        // Redirect to the actual Tic-Tac-Toe game
        window.location.href = 'tic-tac-toe.html';
    }

    launchColorChoice() {
        showNotification('Color Vibration game loading...', 'info');
        window.location.href = 'interactive-games.html?game=color-choice';
    }

    launchPatternMatch() {
        showNotification('Pattern Recognition game loading...', 'info');
        window.location.href = 'interactive-games.html?game=pattern-match';
    }

    launchRhythmFlow() {
        showNotification('Rhythm Flow game loading...', 'info');
        window.location.href = 'interactive-games.html?game=rhythm-flow';
    }
}

// Meditation System
class MeditationSystem {
    constructor() {
        this.currentSession = null;
    }

    start(type) {
        showNotification(`Starting ${type} meditation session...`, 'success');
        
        // In a real implementation, you would start meditation audio/video
        const durations = {
            'morning': '10 minutes',
            'stress': '15 minutes',
            'sleep': '20 minutes',
            'self-love': '12 minutes'
        };
        
        setTimeout(() => {
            showNotification(`Enjoy your ${durations[type]} ${type} meditation journey.`, 'info');
        }, 2000);
        
        this.currentSession = type;
    }

    stop() {
        this.currentSession = null;
    }
}

// Alarm System
class AlarmSystem {
    constructor() {
        this.alarms = this.loadAlarms();
        this.displayAlarms();
    }

    loadAlarms() {
        const stored = localStorage.getItem('awakenitis_alarms');
        return stored ? JSON.parse(stored) : [];
    }

    saveAlarms() {
        localStorage.setItem('awakenitis_alarms', JSON.stringify(this.alarms));
    }

    createAlarm() {
        const frequency = document.getElementById('alarmFrequency').value;
        const mantra = document.getElementById('alarmMantra').value;
        const time = document.getElementById('alarmTime').value;

        if (!time) {
            showNotification('Please set a wake-up time', 'error');
            return;
        }

        if (!mantra) {
            showNotification('Please add your morning mantra', 'error');
            return;
        }

        const alarm = {
            id: Date.now(),
            frequency: frequency,
            mantra: mantra,
            time: time,
            enabled: true
        };

        this.alarms.push(alarm);
        this.saveAlarms();
        this.displayAlarms();

        // Clear form
        document.getElementById('alarmMantra').value = '';
        document.getElementById('alarmTime').value = '';

        showNotification('Alarm created successfully!', 'success');
    }

    deleteAlarm(id) {
        this.alarms = this.alarms.filter(alarm => alarm.id !== id);
        this.saveAlarms();
        this.displayAlarms();
        showNotification('Alarm deleted', 'info');
    }

    displayAlarms() {
        const container = document.querySelector('.alarms-list');
        
        if (this.alarms.length === 0) {
            container.innerHTML = '<p class="no-alarms">No alarms yet. Create your first awakening alarm!</p>';
            return;
        }

        container.innerHTML = this.alarms.map(alarm => `
            <div class="alarm-item">
                <div class="time">${alarm.time}</div>
                <div class="mantra">"${alarm.mantra}"</div>
                <div class="frequency">${alarm.frequency} Hz</div>
                <button class="alarm-btn" onclick="alarmSystem.deleteAlarm(${alarm.id})" style="margin-top: 1rem; background: linear-gradient(45deg, #ff5757, #dc2626);">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        `).join('');
    }
}

// SOS Modal System
function showSOSContacts() {
    const modal = document.getElementById('sosModal');
    modal.style.display = 'block';
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

function closeSOSModal() {
    const modal = document.getElementById('sosModal');
    modal.style.display = 'none';
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('sosModal');
    if (event.target == modal) {
        closeSOSModal();
    }
}

// Help Functions
function showFAQs() {
    showNotification('FAQs page coming soon!', 'info');
}

function contactSupport() {
    showNotification('Support contact form coming soon!', 'info');
}

function showGuide() {
    showNotification('User guide coming soon!', 'info');
}

function joinForum() {
    showNotification('Community forum coming soon!', 'info');
}

// Global Function Wrappers
function playMusic(type) {
    musicPlayer.play(type);
}

function pauseMusic() {
    musicPlayer.pause();
}

function playGame(gameId) {
    gameSystem.playGame(gameId);
}

function startMeditation(type) {
    meditationSystem.start(type);
}

function createAlarm() {
    alarmSystem.createAlarm();
}

// Navigation System
class NavigationSystem {
    constructor() {
        this.init();
    }
    
    init() {
        this.handleMobileMenu();
        this.handleSmoothScrolling();
    }
    
    handleMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
            
            // Close menu when clicking on links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }
    }
    
    handleSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Utility Functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="notification-close">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Personality Assessment (simplified version)
function startPersonalizedJourney() {
    showNotification('Welcome! Let\'s discover your unique path...', 'success');
    
    // Scroll to games section for personality assessment
    setTimeout(() => {
        const gamesSection = document.getElementById('games');
        if (gamesSection) {
            gamesSection.scrollIntoView({ behavior: 'smooth' });
        }
    }, 1500);
}

// Copy logo function
function copyLogoToAssets() {
    const logoElements = document.querySelectorAll('img[src="assets/logo.jpg"]');
    logoElements.forEach(img => {
        img.onerror = function() {
            // Fallback to a placeholder
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iOCIgZmlsbD0iIzQwZTBmZiIvPgo8dGV4dCB4PSIyMCIgeT0iMjgiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5BPC90ZXh0Pgo8L3N2Zz4K';
        };
    });
}

// Initialize systems
let quotesSystem;
let musicPlayer;
let gameSystem;
let meditationSystem;
let alarmSystem;
let navigation;

// Main initialization
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all systems
    quotesSystem = new DailyQuoteSystem();
    quotesSystem.start();
    
    musicPlayer = new MusicPlayer();
    musicPlayer.init(); // Initialize music player
    
    gameSystem = new GameSystem();
    meditationSystem = new MeditationSystem();
    alarmSystem = new AlarmSystem();
    navigation = new NavigationSystem();
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(10, 14, 39, 0.98)';
            } else {
                navbar.style.background = 'rgba(10, 14, 39, 0.95)';
            }
        }
    });
    
    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    document.querySelectorAll('.game-card, .meditation-card, .video-card, .help-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Scroll to show videos partially on page load
    setTimeout(() => {
        // Calculate scroll position to show videos partially
        const videosSection = document.getElementById('videos');
        if (videosSection) {
            const videosSectionTop = videosSection.offsetTop;
            const windowHeight = window.innerHeight;
            // Scroll to position where videos section is 40% visible from bottom
            const targetScroll = videosSectionTop - (windowHeight * 0.6);
            
            window.scrollTo({
                top: Math.max(0, targetScroll),
                behavior: 'smooth'
            });
        }
    }, 1500);
    
    // Copy logo to assets
    copyLogoToAssets();
});

// Add notification styles dynamically
const notificationStyles = `
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: rgba(26, 31, 58, 0.95);
    border: 1px solid #40e0ff;
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    z-index: 3000;
    max-width: 350px;
    animation: slideIn 0.5s ease;
}

.notification-success {
    border-color: #4ade80;
    background: linear-gradient(135deg, rgba(74, 222, 128, 0.2), rgba(34, 197, 94, 0.1));
}

.notification-error {
    border-color: #ff5757;
    background: linear-gradient(135deg, rgba(255, 87, 87, 0.2), rgba(220, 38, 38, 0.1));
}

.notification-info {
    border-color: #40e0ff;
}

.notification-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
}

.notification-close {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
}

.notification-close:hover {
    background: rgba(255, 255, 255, 0.3);
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}
`;

// Inject notification styles
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);


// Video Hover Preview System
class VideoHoverSystem {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        setTimeout(() => {
            this.setupVideoHoverEffects();
        }, 1000);
    }

    setupVideoHoverEffects() {
        const videoCards = document.querySelectorAll('.video-card');
        
        videoCards.forEach((card, index) => {
            const iframe = card.querySelector('iframe');
            if (!iframe) return;

            // Store original src
            const originalSrc = iframe.src;
            
            // Add hover event listeners
            card.addEventListener('mouseenter', () => {
                this.playVideoPreview(iframe, originalSrc);
                card.classList.add('video-hovering');
            });

            card.addEventListener('mouseleave', () => {
                this.stopVideoPreview(iframe, originalSrc);
                card.classList.remove('video-hovering');
            });
        });
    }

    playVideoPreview(iframe, originalSrc) {
        // Enable autoplay and mute for preview
        if (originalSrc.includes('youtube.com') || originalSrc.includes('youtu.be')) {
            // For YouTube videos, add autoplay=1 and mute=1 parameters
            let newSrc = originalSrc;
            if (!originalSrc.includes('autoplay=1')) {
                newSrc += (originalSrc.includes('?') ? '&' : '?') + 'autoplay=1&mute=1';
            }
            iframe.src = newSrc;
        }
    }

    stopVideoPreview(iframe, originalSrc) {
        // Reset to original src (stops playback)
        iframe.src = originalSrc;
    }
}

// Initialize video hover system after DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const videoHoverSystem = new VideoHoverSystem();
});


// ===================================
// AI KNOWLEDGE BASE SYSTEM
// ===================================

class AIKnowledgeBase {
    constructor() {
        this.documents = [];
        this.chatHistory = [];
        this.loadFromStorage();
        this.initializeEventListeners();
        this.updateDocumentsList();
        this.loadChatHistory();
    }

    initializeEventListeners() {
        // Upload area click
        const uploadArea = document.getElementById('uploadArea');
        const documentUpload = document.getElementById('documentUpload');
        
        if (uploadArea && documentUpload) {
            uploadArea.addEventListener('click', () => {
                documentUpload.click();
            });
            
            // File selection
            documentUpload.addEventListener('change', (e) => {
                this.handleFileUpload(e.target.files);
            });
            
            // Drag and drop
            uploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadArea.style.borderColor = '#40e0ff';
            });
            
            uploadArea.addEventListener('dragleave', () => {
                uploadArea.style.borderColor = 'rgba(64, 224, 255, 0.5)';
            });
            
            uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadArea.style.borderColor = 'rgba(64, 224, 255, 0.5)';
                this.handleFileUpload(e.dataTransfer.files);
            });
        }
        
        // Chat input - Enter key
        const chatInput = document.getElementById('chatInput');
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    sendChatMessage();
                }
            });
        }
    }

    async handleFileUpload(files) {
        const progressDiv = document.getElementById('uploadProgress');
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        progressDiv.style.display = 'block';
        
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            
            // Validate file size (10MB max)
            if (file.size > 10 * 1024 * 1024) {
                alert(`File ${file.name} is too large. Maximum size is 10MB.`);
                continue;
            }
            
            // Validate file type
            const validTypes = ['.pdf', '.txt', '.doc', '.docx'];
            const fileExt = '.' + file.name.split('.').pop().toLowerCase();
            if (!validTypes.includes(fileExt)) {
                alert(`File ${file.name} has an invalid type. Supported types: PDF, TXT, DOC, DOCX.`);
                continue;
            }
            
            // Update progress
            const progress = ((i + 1) / files.length) * 100;
            progressFill.style.width = progress + '%';
            progressText.textContent = `Processing ${file.name}...`;
            
            // Extract text from file
            try {
                const text = await this.extractTextFromFile(file);
                
                // Save document
                const document = {
                    id: 'doc_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
                    name: file.name,
                    type: fileExt,
                    size: file.size,
                    uploadDate: new Date().toISOString(),
                    content: text,
                    preview: text.substring(0, 200) + '...'
                };
                
                this.documents.push(document);
                this.saveToStorage();
                
            } catch (error) {
                alert(`Error processing ${file.name}: ${error.message}`);
            }
        }
        
        // Hide progress and update display
        setTimeout(() => {
            progressDiv.style.display = 'none';
            progressFill.style.width = '0%';
            this.updateDocumentsList();
        }, 500);
    }

    async extractTextFromFile(file) {
        const fileExt = '.' + file.name.split('.').pop().toLowerCase();
        
        if (fileExt === '.txt') {
            return await this.readTextFile(file);
        } else if (fileExt === '.pdf') {
            return await this.extractPDFText(file);
        } else if (fileExt === '.doc' || fileExt === '.docx') {
            // For DOC/DOCX, we'll use a simplified approach
            // In production, you'd want to use a library like mammoth.js
            return await this.readTextFile(file);
        }
        
        throw new Error('Unsupported file type');
    }

    readTextFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (e) => reject(new Error('Failed to read file'));
            reader.readAsText(file);
        });
    }

    async extractPDFText(file) {
        // For PDF text extraction, we'll use a simplified approach
        // In production, you'd want to use PDF.js library
        try {
            const text = await this.readTextFile(file);
            // Simple PDF text extraction (works for text-based PDFs)
            return text.replace(/[^\x20-\x7E\n]/g, ' ').trim();
        } catch (error) {
            throw new Error('PDF extraction failed. Please try converting to TXT first.');
        }
    }

    deleteDocument(docId) {
        if (confirm('Are you sure you want to delete this document?')) {
            this.documents = this.documents.filter(doc => doc.id !== docId);
            this.saveToStorage();
            this.updateDocumentsList();
        }
    }

    updateDocumentsList() {
        const docsList = document.getElementById('documentsList');
        if (!docsList) return;
        
        if (this.documents.length === 0) {
            docsList.innerHTML = '<p class="empty-state">No documents uploaded yet. Upload your first document to get started!</p>';
            return;
        }
        
        docsList.innerHTML = this.documents.map(doc => `
            <div class="document-item">
                <div class="document-info">
                    <div class="document-name">
                        <i class="fas fa-file-alt"></i> ${doc.name}
                    </div>
                    <div class="document-meta">
                        Uploaded: ${new Date(doc.uploadDate).toLocaleDateString()} | 
                        Size: ${this.formatFileSize(doc.size)}
                    </div>
                </div>
                <div class="document-actions">
                    <button class="doc-action-btn" onclick="aiKnowledgeBase.viewDocumentPreview('${doc.id}')">
                        <i class="fas fa-eye"></i> Preview
                    </button>
                    <button class="doc-action-btn delete" onclick="aiKnowledgeBase.deleteDocument('${doc.id}')">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `).join('');
    }

    viewDocumentPreview(docId) {
        const doc = this.documents.find(d => d.id === docId);
        if (!doc) return;
        
        alert(`Document: ${doc.name}\n\nPreview:\n${doc.preview}`);
    }

    formatFileSize(bytes) {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    }

    // Chat functionality
    async sendMessage(userMessage) {
        if (!userMessage.trim()) return;
        
        // Add user message to chat
        this.addMessageToChat(userMessage, 'user');
        
        // Check if documents exist
        if (this.documents.length === 0) {
            const response = "I don't have any documents to search through yet. Please upload some documents first, and then I'll be able to help you find information within them.";
            this.addMessageToChat(response, 'bot');
            return;
        }
        
        // Search through documents
        const searchResults = this.searchDocuments(userMessage);
        
        // Generate response
        const response = this.generateResponse(userMessage, searchResults);
        this.addMessageToChat(response.text, 'bot', response.sources);
        
        // Save chat history
        this.saveChatHistory();
    }

    searchDocuments(query) {
        const queryLower = query.toLowerCase();
        const keywords = queryLower.split(' ').filter(word => word.length > 2);
        
        const results = [];
        
        for (const doc of this.documents) {
            const contentLower = doc.content.toLowerCase();
            let relevance = 0;
            const matchedSections = [];
            
            // Check for keyword matches
            for (const keyword of keywords) {
                if (contentLower.includes(keyword)) {
                    relevance++;
                    
                    // Extract context around the keyword
                    const index = contentLower.indexOf(keyword);
                    const start = Math.max(0, index - 100);
                    const end = Math.min(doc.content.length, index + 100);
                    const context = doc.content.substring(start, end);
                    
                    matchedSections.push(context);
                }
            }
            
            if (relevance > 0) {
                results.push({
                    document: doc,
                    relevance: relevance,
                    sections: matchedSections.slice(0, 3) // Top 3 matches
                });
            }
        }
        
        // Sort by relevance
        results.sort((a, b) => b.relevance - a.relevance);
        
        return results.slice(0, 5); // Top 5 documents
    }

    generateResponse(query, searchResults) {
        if (searchResults.length === 0) {
            return {
                text: "I couldn't find any information about that in your uploaded documents. Try rephrasing your question or check if you've uploaded the relevant documents.",
                sources: []
            };
        }
        
        // Build response from search results
        let responseText = "Based on your uploaded documents, here's what I found:\n\n";
        const sources = [];
        
        for (let i = 0; i < searchResults.length; i++) {
            const result = searchResults[i];
            responseText += `${i + 1}. From "${result.document.name}":\n`;
            responseText += `${result.sections[0]}\n\n`;
            
            sources.push({
                name: result.document.name,
                relevance: result.relevance
            });
        }
        
        return {
            text: responseText,
            sources: sources
        };
    }

    addMessageToChat(message, type, sources = null) {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${type}-message`;
        
        const icon = type === 'bot' ? 'fa-robot' : 'fa-user';
        
        let sourcesHtml = '';
        if (sources && sources.length > 0) {
            sourcesHtml = `
                <div class="message-sources">
                    <h4>Sources:</h4>
                    ${sources.map(source => `
                        <div class="source-item">
                            <i class="fas fa-file-alt"></i>
                            ${source.name} (Relevance: ${source.relevance})
                        </div>
                    `).join('')}
                </div>
            `;
        }
        
        messageDiv.innerHTML = `
            <div class="message-icon"><i class="fas ${icon}"></i></div>
            <div class="message-content">
                <p>${message.replace(/\n/g, '<br>')}</p>
                ${sourcesHtml}
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Save to history
        this.chatHistory.push({
            message: message,
            type: type,
            sources: sources,
            timestamp: new Date().toISOString()
        });
    }

    loadChatHistory() {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;
        
        // Clear existing messages except welcome message
        const welcomeMessage = chatMessages.querySelector('.bot-message');
        
        for (const item of this.chatHistory) {
            this.addMessageToChat(item.message, item.type, item.sources);
        }
    }

    clearChat() {
        if (confirm('Are you sure you want to clear the chat history?')) {
            this.chatHistory = [];
            this.saveChatHistory();
            
            const chatMessages = document.getElementById('chatMessages');
            if (chatMessages) {
                chatMessages.innerHTML = `
                    <div class="chat-message bot-message">
                        <div class="message-icon"><i class="fas fa-robot"></i></div>
                        <div class="message-content">
                            <p>Hello! I'm your AI assistant. Upload some documents and I'll help you find information within them. Ask me anything!</p>
                        </div>
                    </div>
                `;
            }
        }
    }

    // Storage management
    loadFromStorage() {
        const stored = localStorage.getItem('awakenitis_documents');
        if (stored) {
            this.documents = JSON.parse(stored);
        }
        
        const storedChat = localStorage.getItem('awakenitis_chat_history');
        if (storedChat) {
            this.chatHistory = JSON.parse(storedChat);
        }
    }

    saveToStorage() {
        localStorage.setItem('awakenitis_documents', JSON.stringify(this.documents));
    }

    saveChatHistory() {
        localStorage.setItem('awakenitis_chat_history', JSON.stringify(this.chatHistory));
    }

    // Get stats for admin dashboard
    getStats() {
        return {
            totalDocuments: this.documents.length,
            totalChats: this.chatHistory.length,
            lastUpload: this.documents.length > 0 ? 
                new Date(Math.max(...this.documents.map(d => new Date(d.uploadDate)))).toLocaleDateString() : 
                'Never'
        };
    }
}

// Global instance
let aiKnowledgeBase;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    aiKnowledgeBase = new AIKnowledgeBase();
});

// Global functions for HTML onclick handlers
function sendChatMessage() {
    const chatInput = document.getElementById('chatInput');
    if (!chatInput) return;
    
    const message = chatInput.value.trim();
    if (message) {
        aiKnowledgeBase.sendMessage(message);
        chatInput.value = '';
    }
}

function clearChatHistory() {
    aiKnowledgeBase.clearChat();
}


// ==========================================
// BLOG & VLOG FUNCTIONALITY
// ==========================================

// Global blog state
let currentBlogFilter = 'all';
let allBlogPosts = [];

// Load blog posts on page load
async function loadBlogPosts() {
    try {
        const response = await fetch('https://fhfnhospzarinmiqrgqn.supabase.co/functions/v1/blog-manager', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${window.SUPABASE_CONFIG.anonKey}`
            },
            body: JSON.stringify({
                operation: 'list',
                data: { showAll: false }
            })
        });

        const result = await response.json();
        if (result.data) {
            allBlogPosts = result.data;
            displayBlogPosts(allBlogPosts);
        } else {
            showBlogError('No blog posts found');
        }
    } catch (error) {
        console.error('Error loading blog posts:', error);
        showBlogError('Failed to load blog posts');
    }
}

// Display blog posts in grid
function displayBlogPosts(posts) {
    const grid = document.getElementById('blogPostsGrid');
    if (!grid) return;

    if (posts.length === 0) {
        grid.innerHTML = '<div class="empty-state"><p>No blog posts yet. Check back soon for new content!</p></div>';
        return;
    }

    grid.innerHTML = posts.map(post => `
        <div class="blog-card" data-category="${post.category}" onclick="viewBlogPost('${post.id}')">
            ${post.video_url ? `
                <div class="blog-video-preview">
                    <i class="fas fa-play-circle"></i>
                    <div class="video-overlay">VLOG</div>
                </div>
            ` : `
                <div class="blog-image-placeholder">
                    <i class="fas fa-${post.category === 'vlog' ? 'video' : 'book-open'}"></i>
                </div>
            `}
            <div class="blog-card-content">
                <div class="blog-meta">
                    <span class="blog-category">${post.category.toUpperCase()}</span>
                    <span class="blog-date">${formatBlogDate(post.published_date)}</span>
                </div>
                <h3>${post.title}</h3>
                <p>${truncateText(post.content, 120)}</p>
                <button class="blog-read-more">
                    ${post.video_url ? 'Watch Now' : 'Read More'} 
                    <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// Filter blog posts
function filterBlogPosts(category) {
    currentBlogFilter = category;
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Filter posts
    const filteredPosts = category === 'all' 
        ? allBlogPosts 
        : allBlogPosts.filter(post => post.category === category);
    
    displayBlogPosts(filteredPosts);
}

// View individual blog post
async function viewBlogPost(postId) {
    try {
        const response = await fetch('https://fhfnhospzarinmiqrgqn.supabase.co/functions/v1/blog-manager', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${window.SUPABASE_CONFIG.anonKey}`
            },
            body: JSON.stringify({
                operation: 'get',
                data: { id: postId }
            })
        });

        const result = await response.json();
        if (result.data) {
            showBlogDetail(result.data);
        }
    } catch (error) {
        console.error('Error loading blog post:', error);
        alert('Failed to load blog post');
    }
}

// Show blog detail in modal
function showBlogDetail(post) {
    const modal = document.getElementById('blogModal');
    const detailDiv = document.getElementById('blogPostDetail');
    
    if (!modal || !detailDiv) return;

    detailDiv.innerHTML = `
        <div class="blog-detail-header">
            <div class="blog-detail-meta">
                <span class="blog-category">${post.category.toUpperCase()}</span>
                <span class="blog-date">${formatBlogDate(post.published_date)}</span>
                <span class="blog-author">By ${post.author}</span>
            </div>
            <h1>${post.title}</h1>
        </div>
        ${post.video_url ? `
            <div class="blog-video-container">
                ${embedVideo(post.video_url)}
            </div>
        ` : ''}
        <div class="blog-detail-content">
            ${formatBlogContent(post.content)}
        </div>
        <div class="blog-detail-footer">
            <button class="blog-back-btn" onclick="closeBlogModal()">
                <i class="fas fa-arrow-left"></i> Back to All Posts
            </button>
        </div>
    `;

    modal.style.display = 'block';
}

// Close blog modal
function closeBlogModal() {
    const modal = document.getElementById('blogModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Embed video from URL
function embedVideo(url) {
    // YouTube
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
        const videoId = extractYouTubeId(url);
        return `<iframe width="100%" height="500" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    }
    // Vimeo
    else if (url.includes('vimeo.com')) {
        const videoId = url.split('/').pop();
        return `<iframe src="https://player.vimeo.com/video/${videoId}" width="100%" height="500" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
    }
    // Default
    else {
        return `<video width="100%" height="500" controls><source src="${url}" type="video/mp4"></video>`;
    }
}

// Extract YouTube video ID
function extractYouTubeId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

// Format blog content (convert line breaks to paragraphs)
function formatBlogContent(content) {
    return content.split('\n\n').map(para => `<p>${para.replace(/\n/g, '<br>')}</p>`).join('');
}

// Format date for blog posts
function formatBlogDate(dateString) {
    if (!dateString) return 'Recently';
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Truncate text for preview
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
}

// Show blog error
function showBlogError(message) {
    const grid = document.getElementById('blogPostsGrid');
    if (grid) {
        grid.innerHTML = `
            <div class="error-state">
                <i class="fas fa-exclamation-circle"></i>
                <p>${message}</p>
            </div>
        `;
    }
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const blogModal = document.getElementById('blogModal');
    if (event.target === blogModal) {
        closeBlogModal();
    }
});

// Initialize blog posts when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadBlogPosts);
} else {
    loadBlogPosts();
}
