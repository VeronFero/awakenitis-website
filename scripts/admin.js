// Admin Dashboard JavaScript
// LocalStorage-based data management (ready for Supabase migration)

// Admin Authentication
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'awakenitis2024'
};

// Initialize data storage
function initializeStorage() {
    if (!localStorage.getItem('awakenitis_quotes')) {
        const initialQuotes = [
            { id: generateId(), quote_text: 'When you change the way you look at things, the things you look at change', author: 'Wayne Dyer', is_active: true, display_date: getTodayDate(), created_at: new Date().toISOString() },
            { id: generateId(), quote_text: 'The only way to do great work is to love what you do', author: 'Steve Jobs', is_active: false, display_date: null, created_at: new Date().toISOString() },
            { id: generateId(), quote_text: 'Your time is limited, do not waste it living someone elses life', author: 'Steve Jobs', is_active: false, display_date: null, created_at: new Date().toISOString() },
            { id: generateId(), quote_text: 'The future belongs to those who believe in the beauty of their dreams', author: 'Eleanor Roosevelt', is_active: false, display_date: null, created_at: new Date().toISOString() },
            { id: generateId(), quote_text: 'Success is not final, failure is not fatal: it is the courage to continue that counts', author: 'Winston Churchill', is_active: false, display_date: null, created_at: new Date().toISOString() },
            { id: generateId(), quote_text: 'Believe you can and you are halfway there', author: 'Theodore Roosevelt', is_active: false, display_date: null, created_at: new Date().toISOString() },
            { id: generateId(), quote_text: 'The only impossible journey is the one you never begin', author: 'Tony Robbins', is_active: false, display_date: null, created_at: new Date().toISOString() },
            { id: generateId(), quote_text: 'Everything you can imagine is real', author: 'Pablo Picasso', is_active: false, display_date: null, created_at: new Date().toISOString() },
            { id: generateId(), quote_text: 'Do what you can with all you have, wherever you are', author: 'Theodore Roosevelt', is_active: false, display_date: null, created_at: new Date().toISOString() },
            { id: generateId(), quote_text: 'What lies behind us and what lies before us are tiny matters compared to what lies within us', author: 'Ralph Waldo Emerson', is_active: false, display_date: null, created_at: new Date().toISOString() }
        ];
        localStorage.setItem('awakenitis_quotes', JSON.stringify(initialQuotes));
    }
    
    if (!localStorage.getItem('awakenitis_music')) {
        localStorage.setItem('awakenitis_music', JSON.stringify([]));
    }
    
    if (!localStorage.getItem('awakenitis_knowledge')) {
        localStorage.setItem('awakenitis_knowledge', JSON.stringify([]));
    }
    
    if (!localStorage.getItem('awakenitis_logs')) {
        localStorage.setItem('awakenitis_logs', JSON.stringify([]));
    }
}

// Utility Functions
function generateId() {
    return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function getTodayDate() {
    return new Date().toISOString().split('T')[0];
}

function showAlert(message, type = 'success') {
    const alertContainer = document.getElementById('alertContainer');
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    alertContainer.appendChild(alert);
    
    setTimeout(() => {
        alert.remove();
    }, 3000);
}

// Login
document.getElementById('loginForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        localStorage.setItem('awakenitis_admin_logged_in', 'true');
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('dashboardSection').style.display = 'block';
        loadDashboard();
    } else {
        document.getElementById('loginError').innerHTML = '<div class="alert alert-error">Invalid credentials</div>';
    }
});

function adminLogout() {
    localStorage.removeItem('awakenitis_admin_logged_in');
    location.reload();
}

// Check login status
if (localStorage.getItem('awakenitis_admin_logged_in') === 'true') {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('dashboardSection').style.display = 'block';
    loadDashboard();
}

// Load Dashboard
function loadDashboard() {
    initializeStorage();
    updateStats();
    loadQuotes();
    loadMusic();
    loadKnowledge();
    loadLogs();
}

function updateStats() {
    const quotes = JSON.parse(localStorage.getItem('awakenitis_quotes') || '[]');
    const music = JSON.parse(localStorage.getItem('awakenitis_music') || '[]');
    const knowledge = JSON.parse(localStorage.getItem('awakenitis_knowledge') || '[]');
    
    document.getElementById('totalQuotes').textContent = quotes.length;
    document.getElementById('totalMusic').textContent = music.length;
    document.getElementById('totalKnowledge').textContent = knowledge.length;
    document.getElementById('currentDate').textContent = getTodayDate();
}

// Tab Switching
function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    document.getElementById(tabName + 'Tab').classList.add('active');
}

// Quotes Management
document.getElementById('addQuoteForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const quote_text = document.getElementById('quoteText').value;
    const author = document.getElementById('quoteAuthor').value;
    
    const quotes = JSON.parse(localStorage.getItem('awakenitis_quotes') || '[]');
    const newQuote = {
        id: generateId(),
        quote_text,
        author,
        is_active: false,
        display_date: null,
        created_at: new Date().toISOString()
    };
    
    quotes.push(newQuote);
    localStorage.setItem('awakenitis_quotes', JSON.stringify(quotes));
    
    logUpdate('quote', 'Added new quote: ' + quote_text);
    showAlert('Quote added successfully!');
    
    document.getElementById('addQuoteForm').reset();
    loadQuotes();
    updateStats();
});

function loadQuotes() {
    const quotes = JSON.parse(localStorage.getItem('awakenitis_quotes') || '[]');
    const quotesList = document.getElementById('quotesList');
    
    if (quotes.length === 0) {
        quotesList.innerHTML = '<p style="color: #888;">No quotes yet. Add your first quote above.</p>';
        return;
    }
    
    quotesList.innerHTML = quotes.map(quote => `
        <div class="item-card">
            <div class="item-content">
                <div class="item-title">"${quote.quote_text}"</div>
                <div class="item-meta">
                    - ${quote.author} | 
                    ${quote.is_active ? '<span style="color: #0f0;">Active</span>' : '<span style="color: #888;">Inactive</span>'} | 
                    ${quote.display_date || 'Not scheduled'}
                </div>
            </div>
            <div class="item-actions">
                ${!quote.is_active ? `<button class="btn btn-small" onclick="activateQuote('${quote.id}')">Activate Today</button>` : ''}
                <button class="btn btn-danger btn-small" onclick="deleteQuote('${quote.id}')">Delete</button>
            </div>
        </div>
    `).join('');
}

function activateQuote(id) {
    const quotes = JSON.parse(localStorage.getItem('awakenitis_quotes') || '[]');
    
    // Deactivate all quotes
    quotes.forEach(q => q.is_active = false);
    
    // Activate selected quote
    const quote = quotes.find(q => q.id === id);
    if (quote) {
        quote.is_active = true;
        quote.display_date = getTodayDate();
        localStorage.setItem('awakenitis_quotes', JSON.stringify(quotes));
        
        logUpdate('quote', 'Activated quote: ' + quote.quote_text);
        showAlert('Quote activated for today!');
        loadQuotes();
    }
}

function deleteQuote(id) {
    if (!confirm('Are you sure you want to delete this quote?')) return;
    
    let quotes = JSON.parse(localStorage.getItem('awakenitis_quotes') || '[]');
    quotes = quotes.filter(q => q.id !== id);
    localStorage.setItem('awakenitis_quotes', JSON.stringify(quotes));
    
    logUpdate('quote', 'Deleted quote');
    showAlert('Quote deleted successfully!');
    loadQuotes();
    updateStats();
}

// Music Management
document.getElementById('addMusicForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const music = JSON.parse(localStorage.getItem('awakenitis_music') || '[]');
    const newTrack = {
        id: generateId(),
        title: document.getElementById('musicTitle').value,
        file_url: document.getElementById('musicUrl').value,
        genre: document.getElementById('musicGenre').value,
        frequency: document.getElementById('musicFrequency').value,
        description: document.getElementById('musicDescription').value,
        created_at: new Date().toISOString(),
        is_active: true
    };
    
    music.push(newTrack);
    localStorage.setItem('awakenitis_music', JSON.stringify(music));
    
    logUpdate('music', 'Added new track: ' + newTrack.title);
    showAlert('Music track added successfully!');
    
    document.getElementById('addMusicForm').reset();
    loadMusic();
    updateStats();
});

function loadMusic() {
    const music = JSON.parse(localStorage.getItem('awakenitis_music') || '[]');
    const musicList = document.getElementById('musicList');
    
    if (music.length === 0) {
        musicList.innerHTML = '<p style="color: #888;">No music tracks yet. Add your first track above.</p>';
        return;
    }
    
    musicList.innerHTML = music.map(track => `
        <div class="item-card">
            <div class="item-content">
                <div class="item-title">${track.title}</div>
                <div class="item-meta">
                    ${track.genre} | ${track.frequency} | ${new Date(track.created_at).toLocaleDateString()}
                </div>
            </div>
            <div class="item-actions">
                <button class="btn btn-danger btn-small" onclick="deleteMusic('${track.id}')">Delete</button>
            </div>
        </div>
    `).join('');
}

function deleteMusic(id) {
    if (!confirm('Are you sure you want to delete this music track?')) return;
    
    let music = JSON.parse(localStorage.getItem('awakenitis_music') || '[]');
    music = music.filter(m => m.id !== id);
    localStorage.setItem('awakenitis_music', JSON.stringify(music));
    
    logUpdate('music', 'Deleted music track');
    showAlert('Music track deleted successfully!');
    loadMusic();
    updateStats();
}

// Knowledge Base Management
document.getElementById('addKnowledgeForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const knowledge = JSON.parse(localStorage.getItem('awakenitis_knowledge') || '[]');
    const tags = document.getElementById('knowledgeTags').value.split(',').map(t => t.trim()).filter(t => t);
    
    const newEntry = {
        id: generateId(),
        category: document.getElementById('knowledgeCategory').value,
        title: document.getElementById('knowledgeTitle').value,
        content: document.getElementById('knowledgeContent').value,
        source: document.getElementById('knowledgeSource').value,
        tags: tags,
        created_at: new Date().toISOString(),
        is_active: true
    };
    
    knowledge.push(newEntry);
    localStorage.setItem('awakenitis_knowledge', JSON.stringify(knowledge));
    
    logUpdate('knowledge', 'Added new entry: ' + newEntry.title);
    showAlert('Knowledge entry added successfully!');
    
    document.getElementById('addKnowledgeForm').reset();
    loadKnowledge();
    updateStats();
});

function loadKnowledge() {
    const knowledge = JSON.parse(localStorage.getItem('awakenitis_knowledge') || '[]');
    const knowledgeList = document.getElementById('knowledgeList');
    
    if (knowledge.length === 0) {
        knowledgeList.innerHTML = '<p style="color: #888;">No knowledge entries yet. Add your first entry above.</p>';
        return;
    }
    
    knowledgeList.innerHTML = knowledge.map(entry => `
        <div class="item-card">
            <div class="item-content">
                <div class="item-title">${entry.title}</div>
                <div class="item-meta">
                    ${entry.category} | ${entry.tags.length > 0 ? entry.tags.join(', ') : 'No tags'}
                </div>
            </div>
            <div class="item-actions">
                <button class="btn btn-danger btn-small" onclick="deleteKnowledge('${entry.id}')">Delete</button>
            </div>
        </div>
    `).join('');
}

function deleteKnowledge(id) {
    if (!confirm('Are you sure you want to delete this knowledge entry?')) return;
    
    let knowledge = JSON.parse(localStorage.getItem('awakenitis_knowledge') || '[]');
    knowledge = knowledge.filter(k => k.id !== id);
    localStorage.setItem('awakenitis_knowledge', JSON.stringify(knowledge));
    
    logUpdate('knowledge', 'Deleted knowledge entry');
    showAlert('Knowledge entry deleted successfully!');
    loadKnowledge();
    updateStats();
}

// Search Knowledge
document.getElementById('knowledgeSearch')?.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const knowledge = JSON.parse(localStorage.getItem('awakenitis_knowledge') || '[]');
    
    const filtered = knowledge.filter(entry => 
        entry.title.toLowerCase().includes(searchTerm) ||
        entry.content.toLowerCase().includes(searchTerm) ||
        entry.category.toLowerCase().includes(searchTerm)
    );
    
    const knowledgeList = document.getElementById('knowledgeList');
    knowledgeList.innerHTML = filtered.map(entry => `
        <div class="item-card">
            <div class="item-content">
                <div class="item-title">${entry.title}</div>
                <div class="item-meta">
                    ${entry.category} | ${entry.tags.length > 0 ? entry.tags.join(', ') : 'No tags'}
                </div>
            </div>
            <div class="item-actions">
                <button class="btn btn-danger btn-small" onclick="deleteKnowledge('${entry.id}')">Delete</button>
            </div>
        </div>
    `).join('');
});

// Update Logs
function logUpdate(type, description) {
    const logs = JSON.parse(localStorage.getItem('awakenitis_logs') || '[]');
    logs.unshift({
        id: generateId(),
        content_type: type,
        description: description,
        updated_at: new Date().toISOString()
    });
    
    // Keep only last 100 logs
    if (logs.length > 100) {
        logs.pop();
    }
    
    localStorage.setItem('awakenitis_logs', JSON.stringify(logs));
}

function loadLogs() {
    const logs = JSON.parse(localStorage.getItem('awakenitis_logs') || '[]');
    const logsList = document.getElementById('logsList');
    
    if (logs.length === 0) {
        logsList.innerHTML = '<p style="color: #888;">No activity logs yet.</p>';
        return;
    }
    
    logsList.innerHTML = logs.slice(0, 50).map(log => `
        <div class="item-card">
            <div class="item-content">
                <div class="item-title">${log.content_type.toUpperCase()}: ${log.description}</div>
                <div class="item-meta">
                    ${new Date(log.updated_at).toLocaleString()}
                </div>
            </div>
        </div>
    `).join('');
}


// ===================================
// DOCUMENTS & CHATS MANAGEMENT
// ===================================

function loadDocuments() {
    const documents = JSON.parse(localStorage.getItem('awakenitis_documents') || '[]');
    const docsList = document.getElementById('adminDocumentsList');
    
    if (!docsList) return;
    
    if (documents.length === 0) {
        docsList.innerHTML = '<p style="color: #888; text-align: center; padding: 2rem;">No documents uploaded yet.</p>';
        return;
    }
    
    docsList.innerHTML = documents.map(doc => `
        <div class="item" style="display: flex; justify-content: space-between; align-items: center;">
            <div style="flex: 1;">
                <strong style="color: #40e0ff;"><i class="fas fa-file-alt"></i> ${doc.name}</strong>
                <div style="color: #888; font-size: 0.85rem; margin-top: 0.3rem;">
                    Type: ${doc.type} | Size: ${formatFileSize(doc.size)} | 
                    Uploaded: ${new Date(doc.uploadDate).toLocaleString()}
                </div>
                <div style="color: #aaa; font-size: 0.85rem; margin-top: 0.5rem; max-width: 600px;">
                    ${doc.preview}
                </div>
            </div>
            <button class="btn" onclick="deleteDocumentAdmin('${doc.id}')" 
                    style="background: #ff4444; margin-left: 1rem;">
                <i class="fas fa-trash"></i> Delete
            </button>
        </div>
    `).join('');
}

function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

function deleteDocumentAdmin(docId) {
    if (confirm('Are you sure you want to delete this document?')) {
        let documents = JSON.parse(localStorage.getItem('awakenitis_documents') || '[]');
        documents = documents.filter(doc => doc.id !== docId);
        localStorage.setItem('awakenitis_documents', JSON.stringify(documents));
        updateStats();
        loadDocuments();
        showAlert('Document deleted successfully', 'success');
    }
}

function loadChatLogs() {
    const chatHistory = JSON.parse(localStorage.getItem('awakenitis_chat_history') || '[]');
    const chatsList = document.getElementById('adminChatsList');
    
    if (!chatsList) return;
    
    if (chatHistory.length === 0) {
        chatsList.innerHTML = '<p style="color: #888; text-align: center; padding: 2rem;">No chat messages yet.</p>';
        return;
    }
    
    // Group messages by date
    const groupedChats = {};
    chatHistory.forEach(chat => {
        const date = new Date(chat.timestamp).toLocaleDateString();
        if (!groupedChats[date]) {
            groupedChats[date] = [];
        }
        groupedChats[date].push(chat);
    });
    
    let html = '';
    Object.keys(groupedChats).sort().reverse().forEach(date => {
        html += `<div style="margin-bottom: 2rem;">`;
        html += `<h3 style="color: #40e0ff; margin-bottom: 1rem;"><i class="fas fa-calendar"></i> ${date}</h3>`;
        
        groupedChats[date].forEach(chat => {
            const icon = chat.type === 'bot' ? 'fa-robot' : 'fa-user';
            const color = chat.type === 'bot' ? '#40e0ff' : '#fff';
            
            html += `
                <div class="item" style="margin-bottom: 1rem;">
                    <div style="display: flex; align-items: start; gap: 1rem;">
                        <i class="fas ${icon}" style="color: ${color}; font-size: 1.2rem; margin-top: 0.3rem;"></i>
                        <div style="flex: 1;">
                            <div style="color: #888; font-size: 0.85rem; margin-bottom: 0.5rem;">
                                ${new Date(chat.timestamp).toLocaleTimeString()}
                            </div>
                            <div style="color: #fff;">
                                ${chat.message.replace(/\n/g, '<br>')}
                            </div>
                            ${chat.sources && chat.sources.length > 0 ? `
                                <div style="margin-top: 0.5rem; padding: 0.5rem; background: rgba(64, 224, 255, 0.1); border-radius: 6px;">
                                    <strong style="color: #40e0ff; font-size: 0.85rem;">Sources:</strong>
                                    ${chat.sources.map(s => `<div style="color: #aaa; font-size: 0.85rem; margin-top: 0.3rem;">- ${s.name}</div>`).join('')}
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `;
        });
        
        html += `</div>`;
    });
    
    chatsList.innerHTML = html;
}

function clearAllChats() {
    if (confirm('Are you sure you want to clear all chat history? This cannot be undone.')) {
        localStorage.setItem('awakenitis_chat_history', JSON.stringify([]));
        updateStats();
        loadChatLogs();
        showAlert('All chats cleared successfully', 'success');
    }
}

// Update the stats function to include documents and chats
const originalUpdateStats = updateStats;
updateStats = function() {
    originalUpdateStats();
    
    // Add documents and chats stats
    const documents = JSON.parse(localStorage.getItem('awakenitis_documents') || '[]');
    const chatHistory = JSON.parse(localStorage.getItem('awakenitis_chat_history') || '[]');
    
    const totalDocsEl = document.getElementById('totalDocuments');
    const totalChatsEl = document.getElementById('totalChats');
    
    if (totalDocsEl) totalDocsEl.textContent = documents.length;
    if (totalChatsEl) totalChatsEl.textContent = chatHistory.length;
};

// Update switchTab function to handle documents tab
const originalSwitchTab = switchTab;
switchTab = function(tab) {
    originalSwitchTab(tab);
    
    if (tab === 'documents') {
        loadDocuments();
        loadChatLogs();
    }
};


// ==========================================
// BLOG POSTS MANAGEMENT
// ==========================================

// Load blog posts for admin
async function loadBlogPosts() {
    try {
        const response = await fetch('https://fhfnhospzarinmiqrgqn.supabase.co/functions/v1/blog-manager', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`
            },
            body: JSON.stringify({
                operation: 'list',
                data: { showAll: true } // Show all posts including drafts
            })
        });

        const result = await response.json();
        if (result.data) {
            displayAdminBlogPosts(result.data);
            document.getElementById('totalBlogPosts').textContent = result.data.length;
        }
    } catch (error) {
        console.error('Error loading blog posts:', error);
    }
}

// Display blog posts in admin
function displayAdminBlogPosts(posts) {
    const list = document.getElementById('blogPostsList');
    if (!list) return;

    if (posts.length === 0) {
        list.innerHTML = '<p style="color: #888;">No blog posts yet.</p>';
        return;
    }

    list.innerHTML = posts.map(post => `
        <div class="item-card">
            <div>
                <h3>${post.title}</h3>
                <p style="color: #888; font-size: 0.9rem;">
                    ${post.category.toUpperCase()} | 
                    ${post.is_published ? 'Published' : 'Draft'} | 
                    ${post.published_date ? new Date(post.published_date).toLocaleDateString() : 'Not published'}
                </p>
                ${post.video_url ? `<p style="color: #40e0ff; font-size: 0.85rem;"><i class="fas fa-video"></i> Has video</p>` : ''}
                <p style="margin-top: 0.5rem; color: #ccc;">${post.content.substring(0, 150)}...</p>
            </div>
            <div class="item-actions">
                <button class="btn-small ${post.is_published ? 'btn-warning' : 'btn-success'}" onclick="toggleBlogPublish('${post.id}', ${!post.is_published})">
                    <i class="fas fa-${post.is_published ? 'eye-slash' : 'check-circle'}"></i> 
                    ${post.is_published ? 'Unpublish' : 'Publish'}
                </button>
                <button class="btn-small" onclick="editBlogPost('${post.id}')">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn-small btn-danger" onclick="deleteBlogPost('${post.id}')">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
    `).join('');
}

// Add blog post
document.getElementById('addBlogForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const title = document.getElementById('blogTitle').value;
    const content = document.getElementById('blogContent').value;
    const videoUrl = document.getElementById('blogVideoUrl').value;
    const category = document.getElementById('blogCategory').value;
    const isPublished = document.getElementById('blogPublished').checked;

    try {
        const response = await fetch('https://fhfnhospzarinmiqrgqn.supabase.co/functions/v1/blog-manager', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`
            },
            body: JSON.stringify({
                operation: 'add',
                data: {
                    title,
                    content,
                    video_url: videoUrl || null,
                    category,
                    is_published: isPublished,
                    author: 'admin'
                }
            })
        });

        const result = await response.json();
        if (result.data) {
            showAlert('Blog post created successfully!', 'success');
            this.reset();
            loadBlogPosts();
        } else {
            showAlert('Failed to create blog post', 'error');
        }
    } catch (error) {
        console.error('Error creating blog post:', error);
        showAlert('Error: ' + error.message, 'error');
    }
});

// Toggle blog publish status
async function toggleBlogPublish(postId, shouldPublish) {
    try {
        const operation = shouldPublish ? 'publish' : 'unpublish';
        const response = await fetch('https://fhfnhospzarinmiqrgqn.supabase.co/functions/v1/blog-manager', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`
            },
            body: JSON.stringify({
                operation,
                data: { id: postId }
            })
        });

        const result = await response.json();
        if (result.data) {
            showAlert(`Blog post ${shouldPublish ? 'published' : 'unpublished'} successfully!`, 'success');
            loadBlogPosts();
        } else {
            showAlert('Failed to update blog post', 'error');
        }
    } catch (error) {
        console.error('Error updating blog post:', error);
        showAlert('Error: ' + error.message, 'error');
    }
}

// Delete blog post
async function deleteBlogPost(postId) {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    try {
        const response = await fetch('https://fhfnhospzarinmiqrgqn.supabase.co/functions/v1/blog-manager', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`
            },
            body: JSON.stringify({
                operation: 'delete',
                data: { id: postId }
            })
        });

        const result = await response.json();
        if (result.data) {
            showAlert('Blog post deleted successfully!', 'success');
            loadBlogPosts();
        } else {
            showAlert('Failed to delete blog post', 'error');
        }
    } catch (error) {
        console.error('Error deleting blog post:', error);
        showAlert('Error: ' + error.message, 'error');
    }
}

// Edit blog post (simplified - just shows alert for now)
function editBlogPost(postId) {
    alert('Edit functionality: To edit, delete the post and create a new one with updated content.');
}

// Load blog posts when blog tab is active
const originalSwitchTab = window.switchTab;
window.switchTab = function(tabName) {
    if (typeof originalSwitchTab === 'function') {
        originalSwitchTab(tabName);
    }
    
    if (tabName === 'blog') {
        loadBlogPosts();
    }
};

// Load blog count on dashboard load
if (window.location.pathname.includes('admin.html')) {
    setTimeout(() => {
        loadBlogPosts();
    }, 1000);
}
