// Supabase Configuration and Migration Helper
// This file enables seamless transition from localStorage to Supabase

const SUPABASE_CONFIG = {
    url: 'https://fhfnhospzarinmiqrgqn.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZoZm5ob3NwemFyaW5taXFyZ3FuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk1NzU1MTQsImV4cCI6MjA0NTE1MTUxNH0.nJvPtHDXFSj7d6-OpjuT_Y9KHMqNlQQQbV1eBx8jyBk'
};

// Initialize Supabase client (will be ready when project activates)
let supabaseClient = null;

// Check if Supabase is available
async function initializeSupabase() {
    try {
        if (typeof supabase !== 'undefined') {
            supabaseClient = supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
            
            // Test connection
            const { data, error } = await supabaseClient
                .from('daily_quotes')
                .select('count')
                .limit(1);
            
            if (!error) {
                console.log('✓ Supabase connection successful - using cloud database');
                return true;
            }
        }
    } catch (error) {
        console.log('ℹ️ Supabase not available - using localStorage (normal for inactive project)');
    }
    return false;
}

// Data Access Layer - Automatically uses Supabase when available, localStorage otherwise
class DataAccessLayer {
    constructor() {
        this.useSupabase = false;
        this.initialize();
    }
    
    async initialize() {
        this.useSupabase = await initializeSupabase();
    }
    
    // Daily Quotes Methods
    async getDailyQuote() {
        if (this.useSupabase) {
            const today = new Date().toISOString().split('T')[0];
            const { data, error } = await supabaseClient
                .from('daily_quotes')
                .select('*')
                .eq('is_active', true)
                .eq('display_date', today)
                .maybeSingle();
            
            if (!error && data) return data;
        }
        
        // Fallback to localStorage
        const quotes = JSON.parse(localStorage.getItem('awakenitis_quotes') || '[]');
        return quotes.find(q => q.is_active) || quotes[0];
    }
    
    async getAllQuotes() {
        if (this.useSupabase) {
            const { data, error } = await supabaseClient
                .from('daily_quotes')
                .select('*')
                .order('created_at', { ascending: false });
            
            if (!error) return data;
        }
        
        return JSON.parse(localStorage.getItem('awakenitis_quotes') || '[]');
    }
    
    async addQuote(quoteData) {
        if (this.useSupabase) {
            const { data, error } = await supabaseClient
                .from('daily_quotes')
                .insert([quoteData])
                .select()
                .single();
            
            if (!error) return data;
        }
        
        // Fallback to localStorage
        const quotes = JSON.parse(localStorage.getItem('awakenitis_quotes') || '[]');
        const newQuote = {
            ...quoteData,
            id: 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            created_at: new Date().toISOString()
        };
        quotes.push(newQuote);
        localStorage.setItem('awakenitis_quotes', JSON.stringify(quotes));
        return newQuote;
    }
    
    async updateQuote(id, updates) {
        if (this.useSupabase) {
            const { data, error } = await supabaseClient
                .from('daily_quotes')
                .update(updates)
                .eq('id', id)
                .select()
                .single();
            
            if (!error) return data;
        }
        
        // Fallback to localStorage
        const quotes = JSON.parse(localStorage.getItem('awakenitis_quotes') || '[]');
        const index = quotes.findIndex(q => q.id === id);
        if (index !== -1) {
            quotes[index] = { ...quotes[index], ...updates, updated_at: new Date().toISOString() };
            localStorage.setItem('awakenitis_quotes', JSON.stringify(quotes));
            return quotes[index];
        }
        return null;
    }
    
    async deleteQuote(id) {
        if (this.useSupabase) {
            const { error } = await supabaseClient
                .from('daily_quotes')
                .delete()
                .eq('id', id);
            
            if (!error) return true;
        }
        
        // Fallback to localStorage
        let quotes = JSON.parse(localStorage.getItem('awakenitis_quotes') || '[]');
        quotes = quotes.filter(q => q.id !== id);
        localStorage.setItem('awakenitis_quotes', JSON.stringify(quotes));
        return true;
    }
    
    // Music Library Methods
    async getAllMusic() {
        if (this.useSupabase) {
            const { data, error } = await supabaseClient
                .from('music_library')
                .select('*')
                .eq('is_active', true)
                .order('created_at', { ascending: false });
            
            if (!error) return data;
        }
        
        return JSON.parse(localStorage.getItem('awakenitis_music') || '[]');
    }
    
    async addMusic(musicData) {
        if (this.useSupabase) {
            const { data, error } = await supabaseClient
                .from('music_library')
                .insert([musicData])
                .select()
                .single();
            
            if (!error) return data;
        }
        
        // Fallback to localStorage
        const music = JSON.parse(localStorage.getItem('awakenitis_music') || '[]');
        const newTrack = {
            ...musicData,
            id: 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            created_at: new Date().toISOString()
        };
        music.push(newTrack);
        localStorage.setItem('awakenitis_music', JSON.stringify(music));
        return newTrack;
    }
    
    // Knowledge Base Methods
    async getAllKnowledge(category = null) {
        if (this.useSupabase) {
            let query = supabaseClient
                .from('ai_knowledge_base')
                .select('*')
                .eq('is_active', true);
            
            if (category) {
                query = query.eq('category', category);
            }
            
            const { data, error } = await query.order('created_at', { ascending: false });
            
            if (!error) return data;
        }
        
        const knowledge = JSON.parse(localStorage.getItem('awakenitis_knowledge') || '[]');
        return category ? knowledge.filter(k => k.category === category) : knowledge;
    }
    
    async addKnowledge(knowledgeData) {
        if (this.useSupabase) {
            const { data, error } = await supabaseClient
                .from('ai_knowledge_base')
                .insert([knowledgeData])
                .select()
                .single();
            
            if (!error) return data;
        }
        
        // Fallback to localStorage
        const knowledge = JSON.parse(localStorage.getItem('awakenitis_knowledge') || '[]');
        const newEntry = {
            ...knowledgeData,
            id: 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            created_at: new Date().toISOString()
        };
        knowledge.push(newEntry);
        localStorage.setItem('awakenitis_knowledge', JSON.stringify(knowledge));
        return newEntry;
    }
    
    async searchKnowledge(searchTerm) {
        if (this.useSupabase) {
            const { data, error } = await supabaseClient
                .from('ai_knowledge_base')
                .select('*')
                .eq('is_active', true)
                .or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`)
                .limit(20);
            
            if (!error) return data;
        }
        
        // Fallback to localStorage
        const knowledge = JSON.parse(localStorage.getItem('awakenitis_knowledge') || '[]');
        return knowledge.filter(entry => 
            entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entry.content.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    // Migration Helper - Export all localStorage data for Supabase import
    exportAllData() {
        return {
            quotes: JSON.parse(localStorage.getItem('awakenitis_quotes') || '[]'),
            music: JSON.parse(localStorage.getItem('awakenitis_music') || '[]'),
            knowledge: JSON.parse(localStorage.getItem('awakenitis_knowledge') || '[]'),
            logs: JSON.parse(localStorage.getItem('awakenitis_logs') || '[]')
        };
    }
    
    // Migration Helper - Import data to Supabase
    async importAllData(data) {
        if (!this.useSupabase) {
            console.error('Supabase not available for import');
            return false;
        }
        
        try {
            // Import quotes
            if (data.quotes && data.quotes.length > 0) {
                await supabaseClient.from('daily_quotes').insert(data.quotes);
            }
            
            // Import music
            if (data.music && data.music.length > 0) {
                await supabaseClient.from('music_library').insert(data.music);
            }
            
            // Import knowledge
            if (data.knowledge && data.knowledge.length > 0) {
                await supabaseClient.from('ai_knowledge_base').insert(data.knowledge);
            }
            
            console.log('✓ Data migration to Supabase completed successfully');
            return true;
        } catch (error) {
            console.error('Migration error:', error);
            return false;
        }
    }
}

// Export for use in other scripts
window.DataAccessLayer = DataAccessLayer;
window.SUPABASE_CONFIG = SUPABASE_CONFIG;

// Initialize on load
window.addEventListener('DOMContentLoaded', async () => {
    window.dataLayer = new DataAccessLayer();
    await window.dataLayer.initialize();
});
