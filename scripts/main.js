// Personality Assessment System
class PersonalityAssessment {
    constructor() {
        this.questions = [
            {
                text: "What time of day do you feel most energetic?",
                options: [
                    { text: "Early morning - I love starting fresh", traits: { visual: 2, structured: 3, independent: 2 } },
                    { text: "Afternoon - Perfect focus time", traits: { auditory: 2, social: 2, structured: 2 } },
                    { text: "Evening - My creative hours", traits: { kinesthetic: 2, visual: 1, flexible: 3 } },
                    { text: "Late night - Quiet and peaceful", traits: { independent: 3, flexible: 2, reflective: 3 } }
                ]
            },
            {
                text: "When learning something new, you prefer to:",
                options: [
                    { text: "See examples and visual demonstrations", traits: { visual: 3, structured: 2, independent: 1 } },
                    { text: "Listen to explanations and discussions", traits: { auditory: 3, social: 2, collaborative: 2 } },
                    { text: "Try it hands-on immediately", traits: { kinesthetic: 3, flexible: 2, experimental: 2 } },
                    { text: "Read and study the theory first", traits: { structured: 3, independent: 2, reflective: 3 } }
                ]
            },
            {
                text: "Your ideal study environment includes:",
                options: [
                    { text: "Colorful notes, charts, and visual aids", traits: { visual: 3, organized: 2, creative: 2 } },
                    { text: "Background music or audio content", traits: { auditory: 3, flexible: 2, atmospheric: 2 } },
                    { text: "Comfortable seating and movement freedom", traits: { kinesthetic: 2, flexible: 3, comfort: 2 } },
                    { text: "Complete silence and minimal distractions", traits: { independent: 3, structured: 2, focused: 3 } }
                ]
            },
            {
                text: "When watching movies or shows, you most enjoy:",
                options: [
                    { text: "Stunning visuals and cinematography", traits: { visual: 3, artistic: 2, detail: 2 } },
                    { text: "Great dialogue and storytelling", traits: { auditory: 2, analytical: 2, narrative: 3 } },
                    { text: "Action scenes and emotional moments", traits: { kinesthetic: 2, emotional: 3, dynamic: 2 } },
                    { text: "Complex plots that make me think", traits: { analytical: 3, independent: 2, challenging: 3 } }
                ]
            },
            {
                text: "You feel most motivated when:",
                options: [
                    { text: "I can see my progress clearly", traits: { visual: 2, achievement: 3, structured: 2 } },
                    { text: "Others recognize my efforts", traits: { social: 3, collaborative: 2, validation: 2 } },
                    { text: "I feel challenged and engaged", traits: { kinesthetic: 2, challenging: 3, growth: 2 } },
                    { text: "I have autonomy and control", traits: { independent: 3, flexible: 2, self_directed: 3 } }
                ]
            }
        ];
        
        this.currentQuestion = 0;
        this.scores = {
            visual: 0,
            auditory: 0,
            kinesthetic: 0,
            structured: 0,
            flexible: 0,
            independent: 0,
            social: 0,
            collaborative: 0,
            analytical: 0,
            creative: 0,
            emotional: 0,
            achievement: 0
        };
        
        this.personalityType = null;
        this.isCompleted = false;
    }
    
    startAssessment() {
        const modal = document.getElementById('personalityModal');
        modal.style.display = 'block';
        this.showQuestion();
    }
    
    showQuestion() {
        const question = this.questions[this.currentQuestion];
        document.getElementById('questionText').textContent = question.text;
        document.getElementById('currentQuestion').textContent = this.currentQuestion + 1;
        document.getElementById('totalQuestions').textContent = this.questions.length;
        
        const optionsContainer = document.getElementById('answerOptions');
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'answer-option';
            optionElement.textContent = option.text;
            optionElement.onclick = () => this.selectAnswer(index);
            optionsContainer.appendChild(optionElement);
        });
        
        this.updateProgress();
    }
    
    selectAnswer(optionIndex) {
        const option = this.questions[this.currentQuestion].options[optionIndex];
        
        // Add traits to scores
        Object.keys(option.traits).forEach(trait => {
            if (this.scores.hasOwnProperty(trait)) {
                this.scores[trait] += option.traits[trait];
            }
        });
        
        // Visual feedback
        const options = document.querySelectorAll('.answer-option');
        options.forEach(opt => opt.classList.remove('selected'));
        options[optionIndex].classList.add('selected');
        
        // Move to next question after short delay
        setTimeout(() => {
            this.currentQuestion++;
            if (this.currentQuestion < this.questions.length) {
                this.showQuestion();
            } else {
                this.completeAssessment();
            }
        }, 800);
    }
    
    updateProgress() {
        const progress = ((this.currentQuestion + 1) / this.questions.length) * 100;
        document.getElementById('progressFill').style.width = progress + '%';
    }
    
    completeAssessment() {
        this.determinePersonalityType();
        this.isCompleted = true;
        
        // Store in localStorage
        localStorage.setItem('awakenitis_personality', JSON.stringify({
            type: this.personalityType,
            scores: this.scores,
            completed: true,
            timestamp: Date.now()
        }));
        
        // Close modal and customize content
        document.getElementById('personalityModal').style.display = 'none';
        this.customizeUserExperience();
        
        // Show completion message
        this.showWelcomeMessage();
    }
    
    determinePersonalityType() {
        // Determine primary learning style
        const learningStyle = this.getHighestScore(['visual', 'auditory', 'kinesthetic']);
        
        // Determine structure preference
        const structureStyle = this.scores.structured > this.scores.flexible ? 'structured' : 'flexible';
        
        // Determine social preference
        const socialStyle = this.scores.independent > this.scores.social ? 'independent' : 'social';
        
        // Create personality type
        this.personalityType = {
            learning: learningStyle,
            structure: structureStyle,
            social: socialStyle,
            detailed_scores: this.scores
        };
    }
    
    getHighestScore(traits) {
        let highest = traits[0];
        traits.forEach(trait => {
            if (this.scores[trait] > this.scores[highest]) {
                highest = trait;
            }
        });
        return highest;
    }
    
    showWelcomeMessage() {
        const message = this.getPersonalizedWelcomeMessage();
        
        // Create and show notification
        const notification = document.createElement('div');
        notification.className = 'welcome-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-sparkles"></i>
                <h3>Welcome to Your Personalized Journey!</h3>
                <p>${message}</p>
                <button onclick="this.parentElement.parentElement.remove()" class="notification-btn">Let's Begin!</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 8 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 8000);
    }
    
    getPersonalizedWelcomeMessage() {
        const type = this.personalityType;
        const messages = {
            visual: {
                structured: "Perfect! We've designed a visual learning path with clear progress tracking just for you.",
                flexible: "Great! You'll love our dynamic visual content that adapts to your pace and interests."
            },
            auditory: {
                structured: "Excellent! We'll provide you with structured audio lessons and clear verbal instructions.",
                flexible: "Wonderful! Our conversational approach and adaptive audio content will suit you perfectly."
            },
            kinesthetic: {
                structured: "Amazing! We'll give you hands-on activities with step-by-step guidance to master English.",
                flexible: "Perfect! Our interactive, movement-based learning will keep you engaged and motivated."
            }
        };
        
        return messages[type.learning][type.structure];
    }
    
    customizeUserExperience() {
        this.populateLearningContent();
        this.populateEntertainmentContent();
        this.adjustInterfaceElements();
    }
    
    populateLearningContent() {
        const container = document.getElementById('learningContent');
        const type = this.personalityType;
        
        const content = this.getLearningContentByType(type);
        container.innerHTML = content;
    }
    
    getLearningContentByType(type) {
        const visualContent = {
            structured: `
                <div class="learning-card">
                    <h3><i class="fas fa-chart-line"></i> Progress Tracker</h3>
                    <p>Visual progress tracking with colorful charts and milestone celebrations. See exactly where you are and where you're going.</p>
                    <button class="learning-btn" onclick="startLearningModule('visual-progress')">Start Visual Learning</button>
                </div>
                <div class="learning-card">
                    <h3><i class="fas fa-images"></i> Picture Vocabulary</h3>
                    <p>Learn new words through beautiful images and visual associations. Perfect for building vocabulary quickly.</p>
                    <button class="learning-btn" onclick="startLearningModule('picture-vocab')">Explore Pictures</button>
                </div>
                <div class="learning-card">
                    <h3><i class="fas fa-map"></i> Grammar Maps</h3>
                    <p>Navigate English grammar with clear visual maps and structured pathways. Never get lost in complex rules again.</p>
                    <button class="learning-btn" onclick="startLearningModule('grammar-maps')">View Grammar Maps</button>
                </div>
            `,
            flexible: `
                <div class="learning-card">
                    <h3><i class="fas fa-palette"></i> Creative Visuals</h3>
                    <p>Explore English through art, infographics, and dynamic visual content that adapts to your interests.</p>
                    <button class="learning-btn" onclick="startLearningModule('creative-visuals')">Get Creative</button>
                </div>
                <div class="learning-card">
                    <h3><i class="fas fa-eye"></i> Visual Stories</h3>
                    <p>Learn through illustrated stories and comics that make grammar and vocabulary come alive.</p>
                    <button class="learning-btn" onclick="startLearningModule('visual-stories')">Read Stories</button>
                </div>
                <div class="learning-card">
                    <h3><i class="fas fa-video"></i> Video Immersion</h3>
                    <p>Immerse yourself in engaging video content that teaches naturally through visual context.</p>
                    <button class="learning-btn" onclick="startLearningModule('video-immersion')">Watch & Learn</button>
                </div>
            `
        };
        
        const auditoryContent = {
            structured: `
                <div class="learning-card">
                    <h3><i class="fas fa-headphones"></i> Structured Audio Lessons</h3>
                    <p>Follow our carefully designed audio curriculum with clear pronunciation guides and listening exercises.</p>
                    <button class="learning-btn" onclick="startLearningModule('audio-structured')">Start Listening</button>
                </div>
                <div class="learning-card">
                    <h3><i class="fas fa-microphone"></i> Pronunciation Practice</h3>
                    <p>Master English sounds with our step-by-step pronunciation training and voice feedback system.</p>
                    <button class="learning-btn" onclick="startLearningModule('pronunciation')">Practice Speaking</button>
                </div>
                <div class="learning-card">
                    <h3><i class="fas fa-music"></i> Rhythm & Intonation</h3>
                    <p>Learn the music of English through structured rhythm and intonation patterns.</p>
                    <button class="learning-btn" onclick="startLearningModule('rhythm-intonation')">Find Your Rhythm</button>
                </div>
            `,
            flexible: `
                <div class="learning-card">
                    <h3><i class="fas fa-podcast"></i> Conversational English</h3>
                    <p>Learn through natural conversations, podcasts, and real-world audio that adapts to your level.</p>
                    <button class="learning-btn" onclick="startLearningModule('conversations')">Join Conversations</button>
                </div>
                <div class="learning-card">
                    <h3><i class="fas fa-volume-up"></i> Audio Adventures</h3>
                    <p>Embark on audio stories and adventures that teach English naturally through immersive experiences.</p>
                    <button class="learning-btn" onclick="startLearningModule('audio-adventures')">Start Adventure</button>
                </div>
                <div class="learning-card">
                    <h3><i class="fas fa-radio"></i> Music & Culture</h3>
                    <p>Discover English through music, cultural content, and entertainment that makes learning fun.</p>
                    <button class="learning-btn" onclick="startLearningModule('music-culture')">Explore Culture</button>
                </div>
            `
        };
        
        const kinestheticContent = {
            structured: `
                <div class="learning-card">
                    <h3><i class="fas fa-hands"></i> Interactive Exercises</h3>
                    <p>Learn through hands-on activities with clear step-by-step instructions and immediate feedback.</p>
                    <button class="learning-btn" onclick="startLearningModule('interactive-structured')">Get Active</button>
                </div>
                <div class="learning-card">
                    <h3><i class="fas fa-gamepad"></i> Learning Games</h3>
                    <p>Master English through carefully designed games that build skills systematically.</p>
                    <button class="learning-btn" onclick="startLearningModule('learning-games')">Play Games</button>
                </div>
                <div class="learning-card">
                    <h3><i class="fas fa-running"></i> Movement-Based Learning</h3>
                    <p>Learn vocabulary and grammar through physical activities and movement exercises.</p>
                    <button class="learning-btn" onclick="startLearningModule('movement-learning')">Move & Learn</button>
                </div>
            `,
            flexible: `
                <div class="learning-card">
                    <h3><i class="fas fa-puzzle-piece"></i> Dynamic Challenges</h3>
                    <p>Engage with ever-changing puzzles and challenges that adapt to keep you motivated and growing.</p>
                    <button class="learning-btn" onclick="startLearningModule('dynamic-challenges')">Take Challenges</button>
                </div>
                <div class="learning-card">
                    <h3><i class="fas fa-theater-masks"></i> Role-Playing</h3>
                    <p>Learn through immersive role-playing scenarios that let you experience English in action.</p>
                    <button class="learning-btn" onclick="startLearningModule('role-playing')">Start Acting</button>
                </div>
                <div class="learning-card">
                    <h3><i class="fas fa-rocket"></i> Exploration Mode</h3>
                    <p>Discover English through free-form exploration and hands-on experiments with the language.</p>
                    <button class="learning-btn" onclick="startLearningModule('exploration')">Explore Freely</button>
                </div>
            `
        };
        
        const contentMap = {
            visual: visualContent,
            auditory: auditoryContent,
            kinesthetic: kinestheticContent
        };
        
        return contentMap[type.learning][type.structure];
    }
    
    populateEntertainmentContent() {
        const container = document.getElementById('entertainmentContent');
        const type = this.personalityType;
        
        const content = this.getEntertainmentContentByType(type);
        container.innerHTML = content;
    }
    
    getEntertainmentContentByType(type) {
        const visualEntertainment = {
            structured: `
                <div class="entertainment-card">
                    <div class="entertainment-image"><i class="fas fa-film"></i></div>
                    <div class="entertainment-content">
                        <h3>Visual Masterpieces</h3>
                        <div class="genre">Drama • Sci-Fi</div>
                        <p>Curated films with stunning cinematography and clear storytelling perfect for visual learners.</p>
                        <button class="watch-btn" onclick="watchContent('visual-films')">Watch Now</button>
                    </div>
                </div>
                <div class="entertainment-card">
                    <div class="entertainment-image"><i class="fas fa-tv"></i></div>
                    <div class="entertainment-content">
                        <h3>Documentary Series</h3>
                        <div class="genre">Educational • Nature</div>
                        <p>Structured documentary series with rich visuals and educational English content.</p>
                        <button class="watch-btn" onclick="watchContent('visual-docs')">Explore</button>
                    </div>
                </div>
                <div class="entertainment-card">
                    <div class="entertainment-image"><i class="fas fa-magic"></i></div>
                    <div class="entertainment-content">
                        <h3>Animated Adventures</h3>
                        <div class="genre">Animation • Family</div>
                        <p>Beautiful animated content with clear dialogue and visual storytelling.</p>
                        <button class="watch-btn" onclick="watchContent('animated')">Discover</button>
                    </div>
                </div>
            `,
            flexible: `
                <div class="entertainment-card">
                    <div class="entertainment-image"><i class="fas fa-star"></i></div>
                    <div class="entertainment-content">
                        <h3>Visual Variety Show</h3>
                        <div class="genre">Mixed • Creative</div>
                        <p>Diverse visual content that changes based on your mood and interests.</p>
                        <button class="watch-btn" onclick="watchContent('visual-variety')">Surprise Me</button>
                    </div>
                </div>
                <div class="entertainment-card">
                    <div class="entertainment-image"><i class="fas fa-palette"></i></div>
                    <div class="entertainment-content">
                        <h3>Art & Culture</h3>
                        <div class="genre">Creative • Cultural</div>
                        <p>Explore visual arts, culture, and creativity through engaging English content.</p>
                        <button class="watch-btn" onclick="watchContent('art-culture')">Create</button>
                    </div>
                </div>
                <div class="entertainment-card">
                    <div class="entertainment-image"><i class="fas fa-camera"></i></div>
                    <div class="entertainment-content">
                        <h3>Travel & Photography</h3>
                        <div class="genre">Travel • Photography</div>
                        <p>Journey through beautiful places and learn English through visual exploration.</p>
                        <button class="watch-btn" onclick="watchContent('travel-photo')">Journey</button>
                    </div>
                </div>
            `
        };
        
        const auditoryEntertainment = {
            structured: `
                <div class="entertainment-card">
                    <div class="entertainment-image"><i class="fas fa-microphone-alt"></i></div>
                    <div class="entertainment-content">
                        <h3>Clear Dialogue Films</h3>
                        <div class="genre">Drama • Dialogue-Rich</div>
                        <p>Films selected for clear pronunciation and structured conversations.</p>
                        <button class="watch-btn" onclick="watchContent('clear-dialogue')">Listen & Learn</button>
                    </div>
                </div>
                <div class="entertainment-card">
                    <div class="entertainment-image"><i class="fas fa-music"></i></div>
                    <div class="entertainment-content">
                        <h3>Musical Theater</h3>
                        <div class="genre">Musical • Theater</div>
                        <p>Learn English rhythm and pronunciation through structured musical performances.</p>
                        <button class="watch-btn" onclick="watchContent('musical-theater')">Sing Along</button>
                    </div>
                </div>
                <div class="entertainment-card">
                    <div class="entertainment-image"><i class="fas fa-graduation-cap"></i></div>
                    <div class="entertainment-content">
                        <h3>Educational Audio</h3>
                        <div class="genre">Educational • Structured</div>
                        <p>Structured audio content that entertains while teaching clear English patterns.</p>
                        <button class="watch-btn" onclick="watchContent('educational-audio')">Learn</button>
                    </div>
                </div>
            `,
            flexible: `
                <div class="entertainment-card">
                    <div class="entertainment-image"><i class="fas fa-headphones"></i></div>
                    <div class="entertainment-content">
                        <h3>Podcast Adventures</h3>
                        <div class="genre">Podcasts • Varied</div>
                        <p>Discover diverse topics through engaging English podcasts and audio stories.</p>
                        <button class="watch-btn" onclick="watchContent('podcast-adventures')">Listen</button>
                    </div>
                </div>
                <div class="entertainment-card">
                    <div class="entertainment-image"><i class="fas fa-radio"></i></div>
                    <div class="entertainment-content">
                        <h3>Music & Talk Shows</h3>
                        <div class="genre">Music • Talk</div>
                        <p>Flexible entertainment through music and conversational shows from around the world.</p>
                        <button class="watch-btn" onclick="watchContent('music-talk')">Tune In</button>
                    </div>
                </div>
                <div class="entertainment-card">
                    <div class="entertainment-image"><i class="fas fa-globe"></i></div>
                    <div class="entertainment-content">
                        <h3>Global Voices</h3>
                        <div class="genre">Cultural • Diverse</div>
                        <p>Experience different English accents and cultures through diverse audio content.</p>
                        <button class="watch-btn" onclick="watchContent('global-voices')">Explore</button>
                    </div>
                </div>
            `
        };
        
        const kinestheticEntertainment = {
            structured: `
                <div class="entertainment-card">
                    <div class="entertainment-image"><i class="fas fa-running"></i></div>
                    <div class="entertainment-content">
                        <h3>Action Learning</h3>
                        <div class="genre">Action • Structured</div>
                        <p>Action-packed content with clear progression and hands-on learning opportunities.</p>
                        <button class="watch-btn" onclick="watchContent('action-learning')">Get Active</button>
                    </div>
                </div>
                <div class="entertainment-card">
                    <div class="entertainment-image"><i class="fas fa-gamepad"></i></div>
                    <div class="entertainment-content">
                        <h3>Interactive Shows</h3>
                        <div class="genre">Interactive • Gaming</div>
                        <p>Shows where you can participate and practice English through structured interaction.</p>
                        <button class="watch-btn" onclick="watchContent('interactive-shows')">Participate</button>
                    </div>
                </div>
                <div class="entertainment-card">
                    <div class="entertainment-image"><i class="fas fa-tools"></i></div>
                    <div class="entertainment-content">
                        <h3>How-To Content</h3>
                        <div class="genre">Educational • Practical</div>
                        <p>Learn English while following along with practical, hands-on tutorials.</p>
                        <button class="watch-btn" onclick="watchContent('how-to')">Learn & Do</button>
                    </div>
                </div>
            `,
            flexible: `
                <div class="entertainment-card">
                    <div class="entertainment-image"><i class="fas fa-fire"></i></div>
                    <div class="entertainment-content">
                        <h3>High-Energy Mix</h3>
                        <div class="genre">Action • Variety</div>
                        <p>Dynamic content that keeps you engaged and moving while learning English naturally.</p>
                        <button class="watch-btn" onclick="watchContent('high-energy')">Energize</button>
                    </div>
                </div>
                <div class="entertainment-card">
                    <div class="entertainment-image"><i class="fas fa-puzzle-piece"></i></div>
                    <div class="entertainment-content">
                        <h3>Mystery & Adventure</h3>
                        <div class="genre">Mystery • Adventure</div>
                        <p>Solve mysteries and go on adventures while naturally absorbing English.</p>
                        <button class="watch-btn" onclick="watchContent('mystery-adventure')">Investigate</button>
                    </div>
                </div>
                <div class="entertainment-card">
                    <div class="entertainment-image"><i class="fas fa-heart"></i></div>
                    <div class="entertainment-content">
                        <h3>Emotional Journeys</h3>
                        <div class="genre">Drama • Emotional</div>
                        <p>Experience powerful stories that connect with your emotions and enhance learning.</p>
                        <button class="watch-btn" onclick="watchContent('emotional-journeys')">Feel & Learn</button>
                    </div>
                </div>
            `
        };
        
        const contentMap = {
            visual: visualEntertainment,
            auditory: auditoryEntertainment,
            kinesthetic: kinestheticEntertainment
        };
        
        return contentMap[type.learning][type.structure];
    }
    
    adjustInterfaceElements() {
        const type = this.personalityType;
        
        // Adjust based on learning style
        if (type.learning === 'visual') {
            document.body.classList.add('visual-learner');
        } else if (type.learning === 'auditory') {
            document.body.classList.add('auditory-learner');
        } else if (type.learning === 'kinesthetic') {
            document.body.classList.add('kinesthetic-learner');
        }
        
        // Adjust based on structure preference
        if (type.structure === 'structured') {
            document.body.classList.add('structured-learner');
        } else {
            document.body.classList.add('flexible-learner');
        }
    }
    
    // Check if user has already completed assessment
    static checkExistingPersonality() {
        const stored = localStorage.getItem('awakenitis_personality');
        if (stored) {
            const data = JSON.parse(stored);
            const daysSince = (Date.now() - data.timestamp) / (1000 * 60 * 60 * 24);
            
            // Re-assess after 30 days
            if (daysSince < 30 && data.completed) {
                return data;
            }
        }
        return null;
    }
}

// Navigation System
class NavigationSystem {
    constructor() {
        this.init();
    }
    
    init() {
        this.handleMobileMenu();
        this.handleSmoothScrolling();
        this.handleFeatureCardClicks();
    }
    
    handleMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
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
    
    handleFeatureCardClicks() {
        document.querySelectorAll('.feature-card').forEach(card => {
            card.addEventListener('click', () => {
                const feature = card.dataset.feature;
                const targetSection = document.getElementById(feature);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Whop Integration
const WHOP_BASE_URL = 'https://whop.com'; // Update with your actual Whop URL

function redirectToWhop(courseId) {
    const courseUrls = {
        'english-mastery': `${WHOP_BASE_URL}/english-mastery-course`,
        'personal-development': `${WHOP_BASE_URL}/personal-development-course`,
        'complete-bundle': `${WHOP_BASE_URL}/complete-course-bundle`
    };
    
    const url = courseUrls[courseId] || WHOP_BASE_URL;
    
    // Add tracking for analytics
    trackEvent('course_click', {
        course_id: courseId,
        personality_type: JSON.stringify(window.personalityAssessment?.personalityType || 'unknown'),
        timestamp: Date.now()
    });
    
    // Open in new tab
    window.open(url, '_blank');
}

// Learning Module Functions
function startLearningModule(moduleId) {
    // Track module start
    trackEvent('module_start', {
        module_id: moduleId,
        personality_type: JSON.stringify(window.personalityAssessment?.personalityType || 'unknown'),
        timestamp: Date.now()
    });
    
    // Simulate module loading (replace with actual implementation)
    showLoadingMessage(`Loading ${moduleId.replace('-', ' ')} module...`);
    
    setTimeout(() => {
        hideLoadingMessage();
        // Here you would actually load the module content
        alert(`Welcome to ${moduleId.replace('-', ' ')} module! This feature will be available soon.`);
    }, 2000);
}

function watchContent(contentId) {
    // Track content view
    trackEvent('content_view', {
        content_id: contentId,
        personality_type: JSON.stringify(window.personalityAssessment?.personalityType || 'unknown'),
        timestamp: Date.now()
    });
    
    // Simulate content loading (replace with actual implementation)
    showLoadingMessage(`Loading ${contentId.replace('-', ' ')} content...`);
    
    setTimeout(() => {
        hideLoadingMessage();
        // Here you would actually load the content
        alert(`Welcome to ${contentId.replace('-', ' ')} content! This feature will be available soon.`);
    }, 2000);
}

// Utility Functions
function showLoadingMessage(message) {
    const loading = document.createElement('div');
    loading.id = 'loadingMessage';
    loading.className = 'loading-overlay';
    loading.innerHTML = `
        <div class="loading-content">
            <div class="loading"></div>
            <p>${message}</p>
        </div>
    `;
    document.body.appendChild(loading);
}

function hideLoadingMessage() {
    const loading = document.getElementById('loadingMessage');
    if (loading) {
        loading.remove();
    }
}

function trackEvent(eventName, eventData) {
    // Store events locally (replace with actual analytics)
    const events = JSON.parse(localStorage.getItem('awakenitis_events') || '[]');
    events.push({
        event: eventName,
        data: eventData,
        timestamp: Date.now()
    });
    
    // Keep only last 100 events
    if (events.length > 100) {
        events.splice(0, events.length - 100);
    }
    
    localStorage.setItem('awakenitis_events', JSON.stringify(events));
    
    // Log to console for development
    console.log('Event tracked:', eventName, eventData);
}

// Main initialization function
function startPersonalizedJourney() {
    // Check if user already completed assessment
    const existingPersonality = PersonalityAssessment.checkExistingPersonality();
    
    if (existingPersonality) {
        // User already has personality data, customize immediately
        window.personalityAssessment = new PersonalityAssessment();
        window.personalityAssessment.personalityType = existingPersonality.type;
        window.personalityAssessment.scores = existingPersonality.scores;
        window.personalityAssessment.isCompleted = true;
        window.personalityAssessment.customizeUserExperience();
        
        // Show welcome back message
        const welcomeMessage = `Welcome back! We've customized your experience based on your ${existingPersonality.type.learning} learning style.`;
        showNotification(welcomeMessage, 'success');
        
        // Scroll to learning section
        document.getElementById('learn').scrollIntoView({ behavior: 'smooth' });
    } else {
        // Start new assessment
        window.personalityAssessment = new PersonalityAssessment();
        window.personalityAssessment.startAssessment();
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="notification-close">×</button>
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

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation
    const navigation = new NavigationSystem();
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 14, 39, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 14, 39, 0.95)';
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
    
    // Observe all cards and sections
    document.querySelectorAll('.feature-card, .learning-card, .course-card, .news-card, .stat-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Copy logo to assets folder on page load
    copyLogoToAssets();
});

// Copy logo function
function copyLogoToAssets() {
    // This would typically be handled by your build process
    // For now, we'll just ensure the logo path is correct
    const logoElements = document.querySelectorAll('img[src="assets/logo.jpg"]');
    logoElements.forEach(img => {
        img.onerror = function() {
            // Fallback to a placeholder or default logo
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iOCIgZmlsbD0iIzQwZTBmZiIvPgo8dGV4dCB4PSIyMCIgeT0iMjgiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5BPC90ZXh0Pgo8L3N2Zz4K';
        };
    });
}

// Add custom CSS for notifications and loading overlay
const additionalStyles = `
.welcome-notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #40e0ff, #1e90ff);
    color: white;
    padding: 1.5rem;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(64, 224, 255, 0.3);
    z-index: 3000;
    max-width: 400px;
    animation: slideIn 0.5s ease;
}

.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: rgba(26, 31, 58, 0.95);
    border: 1px solid #40e0ff;
    color: white;
    padding: 1rem;
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

.notification-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
}

.notification-btn, .notification-close {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.notification-close {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    padding: 0;
}

.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 4000;
    backdrop-filter: blur(5px);
}

.loading-content {
    text-align: center;
    color: white;
}

.loading-content p {
    margin-top: 1rem;
    font-size: 1.1rem;
    color: #40e0ff;
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

/* Learning style specific adjustments */
.visual-learner .feature-icon {
    box-shadow: 0 0 25px rgba(64, 224, 255, 0.6);
}

.auditory-learner .hero-title {
    animation: pulse-text 3s ease-in-out infinite;
}

.kinesthetic-learner .cta-button {
    animation: button-bounce 2s ease-in-out infinite;
}

@keyframes pulse-text {
    0%, 100% { text-shadow: 0 0 10px rgba(64, 224, 255, 0.5); }
    50% { text-shadow: 0 0 20px rgba(64, 224, 255, 0.8); }
}

@keyframes button-bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-3px); }
}

.structured-learner .progress-bar {
    display: block !important;
}

.flexible-learner .card-hover-effect {
    animation: shimmer 3s ease-in-out infinite;
}

@keyframes shimmer {
    0% { left: -100%; }
    50% { left: 0%; }
    100% { left: 100%; }
}
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);