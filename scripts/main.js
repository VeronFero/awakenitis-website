// scripts/main.js

// Personality Assessment System
class PersonalityAssessment {
    constructor() {
        this.currentQuestion = 0;
        this.answers = [];
        this.questions = [
            {
                question: "What's your ideal way to spend a weekend?",
                options: [
                    { text: "Reading a good book or watching documentaries", type: "visual" },
                    { text: "Listening to podcasts or music", type: "auditory" },
                    { text: "Going for a hike or playing sports", type: "kinesthetic" }
                ]
            },
            {
                question: "When learning something new, you prefer to:",
                options: [
                    { text: "See diagrams and visual examples", type: "visual" },
                    { text: "Have someone explain it to you", type: "auditory" },
                    { text: "Try it hands-on immediately", type: "kinesthetic" }
                ]
            },
            {
                question: "In a group project, you usually:",
                options: [
                    { text: "Create charts and organize information visually", type: "visual" },
                    { text: "Lead discussions and brainstorming sessions", type: "auditory" },
                    { text: "Build prototypes and test ideas", type: "kinesthetic" }
                ]
            },
            {
                question: "Your favorite type of content is:",
                options: [
                    { text: "Infographics and visual stories", type: "visual" },
                    { text: "Audiobooks and interviews", type: "auditory" },
                    { text: "Interactive experiences and games", type: "kinesthetic" }
                ]
            },
            {
                question: "When you're stressed, you:",
                options: [
                    { text: "Look at inspiring images or art", type: "visual" },
                    { text: "Listen to calming music", type: "auditory" },
                    { text: "Go for a walk or do physical exercise", type: "kinesthetic" }
                ]
            }
        ];
    }

    start() {
        this.showModal('assessment-modal');
        this.displayQuestion();
    }

    displayQuestion() {
        const question = this.questions[this.currentQuestion];
        const modal = document.getElementById('assessment-modal');
        
        modal.innerHTML = `
            <div class="modal-content">
                <h3>Question ${this.currentQuestion + 1} of ${this.questions.length}</h3>
                <p>${question.question}</p>
                <div class="options">
                    ${question.options.map((option, index) => `
                        <button class="option-btn" onclick="personalityTest.selectAnswer(${index})">
                            ${option.text}
                        </button>
                    `).join('')}
                </div>
                <div class="progress-bar">
                    <div class="progress" style="width: ${((this.currentQuestion + 1) / this.questions.length) * 100}%"></div>
                </div>
            </div>
        `;
    }

    selectAnswer(optionIndex) {
        const question = this.questions[this.currentQuestion];
        this.answers.push({
            question: this.currentQuestion,
            answer: optionIndex,
            type: question.options[optionIndex].type
        });

        this.currentQuestion++;

        if (this.currentQuestion < this.questions.length) {
            this.displayQuestion();
        } else {
            this.calculatePersonality();
        }
    }

    calculatePersonality() {
        const typeCounts = { visual: 0, auditory: 0, kinesthetic: 0 };
        
        this.answers.forEach(answer => {
            typeCounts[answer.type]++;
        });

        const personalityType = Object.keys(typeCounts).reduce((a, b) => 
            typeCounts[a] > typeCounts[b] ? a : b
        );

        this.savePersonality(personalityType);
        this.showResults(personalityType);
    }

    savePersonality(type) {
        localStorage.setItem('awakenitis_personality', type);
        localStorage.setItem('awakenitis_assessment_completed', 'true');
    }

    showResults(type) {
        const personalities = {
            visual: {
                title: "Visual Learner",
                description: "You learn best through visual aids, charts, and diagrams. Your content will be rich with infographics and visual elements!",
                color: "#00aaff"
            },
            auditory: {
                title: "Auditory Learner", 
                description: "You excel with audio content and discussions. Expect podcasts, audio lessons, and interactive conversations!",
                color: "#00ffaa"
            },
            kinesthetic: {
                title: "Kinesthetic Learner",
                description: "You learn through hands-on experience and movement. Get ready for interactive exercises and practical activities!",
                color: "#ff6600"
            }
        };

        const personality = personalities[type];
        const modal = document.getElementById('assessment-modal');
        
        modal.innerHTML = `
            <div class="modal-content">
                <div class="result-icon" style="background: ${personality.color}">✨</div>
                <h2>${personality.title}</h2>
                <p>${personality.description}</p>
                <button class="cta-btn" onclick="personalityTest.completeAssessment()">
                    Start Your Journey!
                </button>
            </div>
        `;
    }

    completeAssessment() {
        this.hideModal('assessment-modal');
        this.personalizeContent();
    }

    personalizeContent() {
        const type = localStorage.getItem('awakenitis_personality');
        document.body.classList.add(`personality-${type}`);
        
        // Update learning section based on personality
        this.updateLearningContent(type);
    }

    updateLearningContent(type) {
        const learningGrid = document.querySelector('.learning-grid');
        if (!learningGrid) return;

        const content = {
            visual: [
                { title: "Visual Vocabulary", desc: "Learn with colorful flashcards and mind maps", icon: "👁️" },
                { title: "Grammar Charts", desc: "Master English grammar with visual diagrams", icon: "📊" },
                { title: "Story Illustrations", desc: "Read stories with beautiful illustrations", icon: "🎨" }
            ],
            auditory: [
                { title: "Pronunciation Practice", desc: "Perfect your accent with audio guides", icon: "🎵" },
                { title: "Listening Exercises", desc: "Improve comprehension with podcasts", icon: "👂" },
                { title: "Speaking Challenges", desc: "Practice conversations with AI", icon: "🗣️" }
            ],
            kinesthetic: [
                { title: "Interactive Games", desc: "Learn through fun, hands-on activities", icon: "🎮" },
                { title: "Physical Exercises", desc: "Move your body while learning words", icon: "🏃" },
                { title: "Building Projects", desc: "Create something while practicing English", icon: "🔨" }
            ]
        };

        learningGrid.innerHTML = content[type].map(item => `
            <div class="learning-card">
                <div class="card-icon">${item.icon}</div>
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
                <button class="card-btn">Start Learning</button>
            </div>
        `).join('');
    }

    showModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('active'), 10);
    }

    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.classList.remove('active');
        setTimeout(() => modal.style.display = 'none', 300);
    }
}

// Navigation and UI Management
class UIManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupScrollEffects();
        this.setupInteractiveElements();
        this.checkPersonalityStatus();
    }

    setupNavigation() {
        // Mobile menu toggle
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');

        if (hamburger && navLinks) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navLinks.classList.toggle('active');
            });
        }

        // Smooth scrolling for navigation links
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

    setupScrollEffects() {
        // Header scroll effect
        const header = document.querySelector('.header');
        if (header) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
        }

        // Parallax effect for hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const parallax = hero.querySelector('.hero-background');
                if (parallax) {
                    parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
                }
            });
        }

        // Reveal animations
        this.setupRevealAnimations();
    }

    setupRevealAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.card, .learning-card, .movie-card, .course-card, .news-card').forEach(el => {
            observer.observe(el);
        });
    }

    setupInteractiveElements() {
        // Course cards hover effects
        document.querySelectorAll('.course-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Movie cards interaction
        document.querySelectorAll('.movie-card').forEach(card => {
            const playBtn = card.querySelector('.play-btn');
            if (playBtn) {
                playBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.showComingSoon();
                });
            }
        });

        // News card interactions
        document.querySelectorAll('.news-card').forEach(card => {
            card.addEventListener('click', function() {
                this.classList.toggle('expanded');
            });
        });
    }

    checkPersonalityStatus() {
        const hasCompletedAssessment = localStorage.getItem('awakenitis_assessment_completed');
        
        if (!hasCompletedAssessment) {
            // Show assessment after a brief delay
            setTimeout(() => {
                personalityTest.start();
            }, 2000);
        } else {
            // Load existing personality and personalize content
            personalityTest.personalizeContent();
        }
    }

    showComingSoon() {
        const modal = document.getElementById('coming-soon-modal');
        if (modal) {
            personalityTest.showModal('coming-soon-modal');
        } else {
            alert('Coming Soon! We\'re working on bringing you amazing content.');
        }
    }
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Create global instances
    window.personalityTest = new PersonalityAssessment();
    window.uiManager = new UIManager();

    // Add some interactive features
    initializeCounters();
    initializeNewsRotation();
});

// Counter animation for statistics
function initializeCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        element.textContent = Math.floor(current).toLocaleString();
        
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        }
    }, 16);
}

// News rotation system
function initializeNewsRotation() {
    const newsCards = document.querySelectorAll('.news-card');
    if (newsCards.length === 0) return;

    let currentIndex = 0;
    
    setInterval(() => {
        newsCards[currentIndex].classList.remove('featured');
        currentIndex = (currentIndex + 1) % newsCards.length;
        newsCards[currentIndex].classList.add('featured');
    }, 5000);

    // Set initial featured card
    if (newsCards[0]) {
        newsCards[0].classList.add('featured');
    }
}

// Utility functions
function openCourseLink() {
    // This will eventually link to your Whop store
    window.open('https://whop.com/your-store', '_blank');
}

function resetPersonalityTest() {
    localStorage.removeItem('awakenitis_personality');
    localStorage.removeItem('awakenitis_assessment_completed');
    location.reload();
}

// Performance optimization
window.addEventListener('load', () => {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});
