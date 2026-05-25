'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  PieChart, 
  Search, 
  Filter, 
  Calendar, 
  Mail, 
  Phone, 
  Briefcase, 
  Tag, 
  Trash2, 
  CheckCircle, 
  Clock, 
  FileText, 
  Plus, 
  RefreshCw, 
  ArrowLeft, 
  X, 
  ChevronRight, 
  Sparkles,
  Info,
  Layers,
  Database
} from 'lucide-react'

// Define Lead interface
interface Lead {
  id: string
  name: string
  email: string
  phone: string
  budget: string
  type: string
  message: string
  status: string // 'New' | 'Contacted' | 'In Progress' | 'Closed' | 'Rejected'
  createdAt: string
  notes: string
}



export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')
  const [editNotes, setEditNotes] = useState('')
  const [notification, setNotification] = useState<string | null>(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [emailInput, setEmailInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [authError, setAuthError] = useState<string | null>(null)
  const [isSubmittingAuth, setIsSubmittingAuth] = useState(false)

  // Load leads from API backend / local fallback on mount
  useEffect(() => {
    // Check session authentication on tab mount
    if (typeof window !== 'undefined') {
      const activeAuth = localStorage.getItem('studiogenz_admin_auth')
      if (activeAuth === 'true') {
        setIsAuthenticated(true)
      }
    }

    loadLeadsFromStorage()

    // Poll server-side database every 10 seconds for real-time synchronization
    const pollingInterval = setInterval(() => {
      syncBackgroundLeads()
    }, 10000)

    // Listen for custom window event for real-time sync across tabs
    const handleNewLead = () => {
      loadLeadsFromStorage()
      showNotification('New lead received!')
    }
    window.addEventListener('studiogenz_new_lead', handleNewLead)

    return () => {
      clearInterval(pollingInterval)
      window.removeEventListener('studiogenz_new_lead', handleNewLead)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError(null)
    setIsSubmittingAuth(true)

    // Demo administrative access gate
    const normalizedEmail = emailInput.trim().toLowerCase()
    if (normalizedEmail === 'admin@studiogenz.com' && (passwordInput === 'admin' || passwordInput === 'password')) {
      localStorage.setItem('studiogenz_admin_auth', 'true')
      setIsAuthenticated(true)
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('studiogenz_admin_auth_change'))
      }
      showNotification('Access Granted. Welcome!')
    } else {
      setAuthError('Access Denied. Check credentials.')
      showNotification('Verification failed.')
    }
    setIsSubmittingAuth(false)
  }

  const handleLogout = () => {
    if (confirm('End administrative CRM dashboard session?')) {
      localStorage.removeItem('studiogenz_admin_auth')
      setIsAuthenticated(false)
      setEmailInput('')
      setPasswordInput('')
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('studiogenz_admin_auth_change'))
      }
      showNotification('Dashboard securely locked.')
    }
  }

  const loadLeadsFromStorage = async () => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/leads')
      if (res.ok) {
        const data = await res.json()
        setLeads(data)
        // Keep localStorage synced for local state fallback
        localStorage.setItem('studiogenz_leads', JSON.stringify(data))
      } else {
        throw new Error('Failed to fetch from backend')
      }
    } catch (err) {
      console.error('Error fetching leads from API backend, falling back to localStorage:', err)
      // LocalStorage Fallback
      try {
        const stored = localStorage.getItem('studiogenz_leads')
        if (stored) {
          setLeads(JSON.parse(stored))
        }
      } catch (storageErr) {
        console.error('Error parsing leads from localStorage fallback:', storageErr)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const syncBackgroundLeads = async () => {
    try {
      const res = await fetch('/api/leads')
      if (res.ok) {
        const data = await res.json()
        // If data differs in size or ID content, we update and alert the user
        if (data.length !== leads.length || JSON.stringify(data.map((l: any) => l.id)) !== JSON.stringify(leads.map((l: any) => l.id))) {
          const hasNewLead = data.some((incoming: any) => !leads.some(existing => existing.id === incoming.id));
          setLeads(data)
          localStorage.setItem('studiogenz_leads', JSON.stringify(data))
          if (hasNewLead) {
            showNotification('New lead captured from contact form!')
          }
        }
      }
    } catch (err) {
      console.warn('Background sync polling failed:', err)
    }
  }

  // Notification popup helper
  const showNotification = (message: string) => {
    setNotification(message)
    setTimeout(() => setNotification(null), 3000)
  }



  // Clear leads database
  const clearDatabase = async () => {
    if (confirm('Are you sure you want to delete all leads from the CRM system? This cannot be undone.')) {
      // Optimistic update
      setLeads([])
      localStorage.setItem('studiogenz_leads', JSON.stringify([]))
      setSelectedLead(null)

      try {
        const res = await fetch('/api/leads?clear=true', {
          method: 'DELETE'
        })
        if (!res.ok) throw new Error('Failed to clear database on server')
        showNotification('Database wiped on server!')
      } catch (err) {
        console.error('Server clear database error:', err)
        showNotification('Database cleared locally. Sync issue.')
      }
    }
  }

  // Update lead status
  const handleStatusChange = async (leadId: string, newStatus: string) => {
    // Optimistic Update
    const updated = leads.map(lead => {
      if (lead.id === leadId) {
        const u = { ...lead, status: newStatus }
        if (selectedLead && selectedLead.id === leadId) {
          setSelectedLead(u)
        }
        return u
      }
      return lead
    })
    setLeads(updated)
    localStorage.setItem('studiogenz_leads', JSON.stringify(updated))

    try {
      const res = await fetch('/api/leads', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: leadId, status: newStatus })
      })
      if (!res.ok) throw new Error('Failed to update status on server')
      showNotification(`Lead status updated to: ${newStatus}`)
    } catch (err) {
      console.error('Server status update error:', err)
      showNotification('Status updated locally. Sync issue with backend.')
    }
  }

  // Save Notes for specific lead
  const handleSaveNotes = async () => {
    if (!selectedLead) return
    
    // Optimistic Update
    const updated = leads.map(lead => {
      if (lead.id === selectedLead.id) {
        const u = { ...lead, notes: editNotes }
        setSelectedLead(u)
        return u
      }
      return lead
    })
    setLeads(updated)
    localStorage.setItem('studiogenz_leads', JSON.stringify(updated))

    try {
      const res = await fetch('/api/leads', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selectedLead.id, notes: editNotes })
      })
      if (!res.ok) throw new Error('Failed to save notes on server')
      showNotification('Internal notes updated on server!')
    } catch (err) {
      console.error('Server notes update error:', err)
      showNotification('Notes saved locally. Sync issue with backend.')
    }
  }

  // Delete specific lead
  const handleDeleteLead = async (leadId: string) => {
    // Optimistic Update
    const updated = leads.filter(lead => lead.id !== leadId)
    setLeads(updated)
    localStorage.setItem('studiogenz_leads', JSON.stringify(updated))
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead(null)
    }
    setDeleteConfirmId(null)

    try {
      const res = await fetch(`/api/leads?id=${leadId}`, {
        method: 'DELETE'
      })
      if (!res.ok) throw new Error('Failed to delete lead from server')
      showNotification('Lead deleted successfully.')
    } catch (err) {
      console.error('Server delete error:', err)
      showNotification('Deleted locally. Sync issue with backend.')
    }
  }

  // Advanced Budget Parser for Financial KPI Metric
  const parseBudgetToNumeric = (budgetStr: string): number => {
    if (!budgetStr) return 0
    
    const cleanStr = budgetStr.toLowerCase()
    
    // Check if it represents Indian Rupees
    const isRupee = cleanStr.includes('₹') || cleanStr.includes('inr') || cleanStr.includes('rs')
    let conversionRate = 1 // Default is INR base
    if (!isRupee) {
      if (cleanStr.includes('$') || cleanStr.includes('usd')) {
        conversionRate = 83 // Convert USD to INR (₹)
      }
    }
    
    const parseSingle = (s: string): number => {
      const parsed = parseFloat(s.replace(/[^0-9.]/g, ''))
      if (isNaN(parsed)) return 0
      
      let multiplier = 1
      if (s.includes('k')) multiplier = 1000
      else if (s.includes('m')) multiplier = 1000000
      
      return parsed * multiplier
    }
    
    // Handle ranges (e.g. "₹50k - ₹100k")
    if (cleanStr.includes('-')) {
      const parts = cleanStr.split('-')
      const min = parseSingle(parts[0])
      const max = parseSingle(parts[1])
      return ((min + max) / 2) * conversionRate
    }
    
    return parseSingle(cleanStr) * conversionRate
  }

  // Metric Computations
  const totalLeadsCount = leads.length
  
  // Pipeline Value (using parsed numbers in INR)
  const pipelineValueINR = leads.reduce((acc, lead) => {
    if (lead.status === 'Rejected') return acc
    return acc + parseBudgetToNumeric(lead.budget)
  }, 0)

  // Status Counts
  const newLeadsCount = leads.filter(l => l.status === 'New').length
  const inProgressLeadsCount = leads.filter(l => l.status === 'In Progress').length
  const closedLeadsCount = leads.filter(l => l.status === 'Closed').length
  const activeLeadsCount = newLeadsCount + inProgressLeadsCount
  
  // Conversion Rate (Closed or In Progress leads out of total)
  const conversionRate = totalLeadsCount > 0 
    ? Math.round(((closedLeadsCount + inProgressLeadsCount) / totalLeadsCount) * 100) 
    : 0

  // Project Type Breakdown (For Horizontal Distribution Graph)
  const projectTypes = ['Branding', 'Web Design', 'UI/UX', 'Content', 'Video', 'Inquiry']
  const projectTypeCounts = projectTypes.reduce((acc, type) => {
    acc[type] = leads.filter(l => l.type === type).length
    return acc
  }, {} as Record<string, number>)

  // Filtered Leads
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.message.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter
    const matchesType = typeFilter === 'All' || lead.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  // Format Date beautifully (Indian Standard)
  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString)
      return d.toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return isoString
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-(--bg-primary) text-(--text-primary) font-sans antialiased overflow-x-hidden transition-colors duration-300 flex items-center justify-center p-4 sm:p-6 relative">
        {/* Ambient glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-[10%] w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[160px] pointer-events-none -z-10" />

        <AnimatePresence>
          {notification && (
            <motion.div 
              initial={{ opacity: 0, y: -50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-violet-950/80 backdrop-blur-md border border-violet-500/40 px-5 py-3 rounded-full text-violet-200 text-xs font-semibold uppercase tracking-wider shadow-lg shadow-violet-950/20"
            >
              <Sparkles className="w-4 h-4 text-violet-400 animate-pulse" />
              {notification}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[450px] w-full bg-(--bg-secondary)/60 border border-(--border-color) backdrop-blur-xl rounded-4xl p-8 md:p-10 shadow-2xl relative overflow-hidden"
        >
          {/* subtle decorative card glows */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/5 rounded-full blur-2xl -z-10" />
          
          <div className="flex flex-col items-center text-center gap-6 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-500 shadow-md">
              <span className="font-display font-black text-lg">GZ</span>
            </div>
            <div>
              <span className="text-[9px] bg-violet-500/10 border border-violet-500/20 text-violet-400 px-3 py-1 rounded-full font-bold uppercase tracking-widest block w-max mx-auto mb-2">
                Secure Portal
              </span>
              <h2 className="font-display font-900 text-xl leading-none uppercase tracking-tighter text-(--text-primary)">
                STUDIO GENZ CRM
              </h2>
              <p className="text-(--text-muted) text-xs font-light mt-1">
                Enter administrative validation key to inspect lead database.
              </p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-1.5 relative">
              <label className="text-[9px] text-(--text-muted) tracking-widest uppercase font-bold block">
                Admin Email
              </label>
              <input 
                type="email" 
                required
                value={emailInput}
                onChange={e => setEmailInput(e.target.value)}
                placeholder="admin@studiogenz.com"
                className="w-full bg-(--bg-primary) border border-(--border-color) text-xs text-(--text-primary) rounded-xl py-3 px-4 focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>

            <div className="space-y-1.5 relative">
              <label className="text-[9px] text-(--text-muted) tracking-widest uppercase font-bold block">
                Access Password
              </label>
              <input 
                type="password" 
                required
                value={passwordInput}
                onChange={e => setPasswordInput(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-(--bg-primary) border border-(--border-color) text-xs text-(--text-primary) rounded-xl py-3 px-4 focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>

            {authError && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-[10px] font-bold text-red-500 bg-red-500/10 border border-red-500/20 py-2 px-3 rounded-lg text-center uppercase tracking-wider"
              >
                {authError}
              </motion.div>
            )}

            <button 
              type="submit" 
              disabled={isSubmittingAuth}
              className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest transition-colors scale-100 hover:scale-[1.02] active:scale-98 shadow-lg shadow-violet-500/10 cursor-pointer disabled:opacity-50"
            >
              {isSubmittingAuth ? 'Verifying Key...' : 'Validate Access'}
            </button>
          </form>

        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-(--bg-primary) text-(--text-primary) font-sans antialiased overflow-x-hidden transition-colors duration-300">
      
      {/* Decorative luxury gradient background blooms */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute top-[20%] left-[-200px] w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[180px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-[20%] w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* Real-time Notification Banner */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-violet-950/80 backdrop-blur-md border border-violet-500/40 px-5 py-3 rounded-full text-violet-200 text-xs font-semibold uppercase tracking-wider shadow-lg shadow-violet-950/20"
          >
            <Sparkles className="w-4 h-4 text-violet-400 animate-pulse" />
            {notification}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-10 py-6 sm:py-10">
        
        {/* Header Section */}
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pb-8 border-b border-(--border-color) mb-10">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <a href="/" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-(--border-color) bg-(--bg-secondary)/50 hover:bg-(--border-color)/20 transition-colors text-(--text-muted) hover:text-(--text-primary) text-[11px] font-bold uppercase tracking-wider">
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Site
              </a>
              <span className="text-[10px] bg-violet-500/10 border border-violet-500/20 text-violet-400 px-3 py-1 rounded-full font-bold uppercase tracking-widest">
                Admin Console
              </span>
            </div>
            <h1 className="font-display font-900 text-3xl md:text-4xl leading-none uppercase tracking-tighter mt-2 text-(--text-primary)">
              STUDIO GENZ <span className="gradient-text-violet italic">CRM</span>
            </h1>
            <p className="text-(--text-muted) text-sm font-light">
              Automatic lead generation, pipeline analytics, and client relations manager.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <button 
              onClick={loadLeadsFromStorage} 
              disabled={isLoading}
              className="flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 text-white px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider shadow-lg shadow-violet-600/15 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              title="Refresh CRM database data"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              {isLoading ? 'Syncing...' : 'Refresh Leads'}
            </button>
            {leads.length > 0 && (
              <button 
                onClick={clearDatabase} 
                className="flex items-center justify-center gap-2 bg-transparent border border-red-500/20 text-red-500/80 hover:text-red-500 hover:bg-red-500/10 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all"
                title="Reset CRM database (Wipe all leads)"
              >
                <Trash2 className="w-4 h-4" />
                Reset CRM
              </button>
            )}
            <button 
              onClick={handleLogout} 
              className="flex items-center justify-center gap-2 bg-(--bg-secondary) border border-(--border-color) text-(--text-muted) hover:text-(--text-primary) hover:bg-(--border-color)/30 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all"
            >
              Logout
            </button>
          </div>
        </header>

        {/* KPI Metrics */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-10">
          
          {/* Card 1: Total Leads */}
          <div className="p-6 rounded-2xl bg-(--bg-secondary)/60 border border-(--border-color) backdrop-blur-xl hover:border-violet-500/30 transition-all duration-300 relative group overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-violet-500/5 rounded-full blur-2xl -z-10 group-hover:bg-violet-500/10 transition-all pointer-events-none" />
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-[10px] text-emerald-400 bg-emerald-950/40 border border-emerald-900/40 px-2 py-0.5 rounded-md font-bold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> Live
              </span>
            </div>
            <p className="text-(--text-muted) text-[10px] font-bold tracking-widest uppercase mb-1">Total Submissions</p>
            <h2 className="font-display font-900 text-3xl text-(--text-primary)">{totalLeadsCount}</h2>
            <div className="mt-3 flex items-center justify-between text-[11px] text-(--text-muted) border-t border-(--border-color) pt-3">
              <span>New queue:</span>
              <span className="font-bold text-violet-400">{newLeadsCount} leads</span>
            </div>
          </div>

          {/* Card 2: Estimated Pipeline Value */}
          <div className="p-6 rounded-2xl bg-(--bg-secondary)/60 border border-(--border-color) backdrop-blur-xl hover:border-indigo-500/30 transition-all duration-300 relative group overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl -z-10 group-hover:bg-indigo-500/10 transition-all pointer-events-none" />
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <DollarSign className="w-5 h-5" />
              </div>
              <span className="text-[10px] text-indigo-400 bg-indigo-950/40 border border-indigo-900/40 px-2.5 py-0.5 rounded-md font-bold uppercase tracking-wider">
                ₹ INR Est.
              </span>
            </div>
            <p className="text-(--text-muted) text-[10px] font-bold tracking-widest uppercase mb-1">Active Pipeline Value</p>
            <h2 className="font-display font-900 text-3xl text-(--text-primary)">
              ₹{pipelineValueINR.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </h2>
            <div className="mt-3 flex items-center justify-between text-[11px] text-(--text-muted) border-t border-(--border-color) pt-3">
              <span>Currency standard:</span>
              <span className="font-bold text-indigo-400">Indian Rupees</span>
            </div>
          </div>

          {/* Card 3: Active Queue (Pending Needs Attention) */}
          <div className="p-6 rounded-2xl bg-(--bg-secondary)/60 border border-(--border-color) backdrop-blur-xl hover:border-amber-500/30 transition-all duration-300 relative group overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl -z-10 group-hover:bg-amber-500/10 transition-all pointer-events-none" />
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-[10px] text-amber-400 bg-amber-950/40 border border-amber-900/40 px-2 py-0.5 rounded-md font-bold">
                {activeLeadsCount} Pending
              </span>
            </div>
            <p className="text-(--text-muted) text-[10px] font-bold tracking-widest uppercase mb-1">Needs Attention</p>
            <h2 className="font-display font-900 text-3xl text-(--text-primary)">
              {activeLeadsCount} <span className="text-sm font-light text-(--text-muted)">leads</span>
            </h2>
            <div className="mt-3 flex items-center justify-between text-[11px] text-(--text-muted) border-t border-(--border-color) pt-3">
              <span>New / In Progress:</span>
              <span className="font-bold text-amber-400">Follow-up queue</span>
            </div>
          </div>

        </section>

        {/* Database Search, Filters, and Table */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Left Column: Interactive Leads Table (Span 8) */}
          <div className="lg:col-span-8 bg-(--bg-secondary)/40 border border-(--border-color) rounded-2xl sm:rounded-3xl p-4 sm:p-6 relative overflow-hidden">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-6 border-b border-(--border-color)">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-violet-500 animate-pulse" />
                <h3 className="font-display font-bold text-base text-(--text-primary) uppercase tracking-tight">Interactive Lead Register</h3>
                <span className="text-[10px] bg-(--bg-primary) text-(--text-muted) border border-(--border-color) px-2.5 py-0.5 rounded-full font-semibold">
                  Showing {filteredLeads.length} leads
                </span>
              </div>

              {/* Reset filter if any active */}
              {(statusFilter !== 'All' || typeFilter !== 'All' || searchQuery !== '') && (
                <button 
                  onClick={() => { setStatusFilter('All'); setTypeFilter('All'); setSearchQuery(''); }}
                  className="text-(--text-muted) hover:text-(--text-primary) text-xs underline transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>

            {/* Filters Control Panel */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              
              {/* Search Field */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-(--text-muted)" />
                <input 
                  type="text" 
                  placeholder="Search name, message, email..." 
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-(--bg-primary) border border-(--border-color) text-xs text-(--text-primary) rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>

              {/* Status Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-(--text-muted)" />
                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  className="w-full bg-(--bg-primary) border border-(--border-color) text-xs text-(--text-primary) rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-violet-500 transition-colors appearance-none cursor-pointer"
                >
                  <option value="All">All Statuses</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              {/* Type Filter */}
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-(--text-muted)" />
                <select
                  value={typeFilter}
                  onChange={e => setTypeFilter(e.target.value)}
                  className="w-full bg-(--bg-primary) border border-(--border-color) text-xs text-(--text-primary) rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-violet-500 transition-colors appearance-none cursor-pointer"
                >
                  <option value="All">All Project Types</option>
                  {projectTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

            </div>

            {/* Table Area — desktop table / mobile cards */}
            <div className="w-full">
              {leads.length === 0 ? (
                <div className="text-center py-12 sm:py-16 flex flex-col items-center justify-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-(--bg-primary) border border-(--border-color) flex items-center justify-center text-violet-400">
                    <Users className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-(--text-primary)">No leads captured yet</h4>
                  <p className="text-xs text-(--text-muted) max-w-xs leading-normal font-light">
                    Your Leads CRM is active and ready to host. Leads will automatically appear here as soon as a visitor submits the contact form.
                  </p>
                </div>
              ) : filteredLeads.length === 0 ? (
                <div className="text-center py-12 sm:py-16 flex flex-col items-center justify-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-(--bg-primary) border border-(--border-color) flex items-center justify-center text-(--text-muted)">
                    <Search className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-(--text-muted)">No matching leads found</h4>
                  <p className="text-xs text-(--text-muted) max-w-xs leading-normal font-light">
                    Adjust your search query or filter selectors to locate specific client requests.
                  </p>
                </div>
              ) : (
                <>
                  {/* Mobile card view (hidden on md+) */}
                  <div className="flex flex-col gap-3 md:hidden">
                    {filteredLeads.map((lead) => {
                      const isSelected = selectedLead?.id === lead.id
                      return (
                        <div
                          key={lead.id}
                          onClick={() => { setSelectedLead(lead); setEditNotes(lead.notes || '') }}
                          className={`rounded-xl border p-4 cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-violet-500/10 border-violet-500/40'
                              : 'bg-(--bg-primary) border-(--border-color) hover:border-violet-500/30'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2 mb-3">
                            <div className="flex flex-col gap-0.5">
                              <span className="font-semibold text-sm text-(--text-primary)">{lead.name}</span>
                              <span className="text-[10px] text-(--text-muted) font-mono">{lead.email}</span>
                            </div>
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border shrink-0 ${
                              lead.status === 'New' ? 'bg-purple-950/30 border-purple-800/40 text-purple-400'
                              : lead.status === 'Contacted' ? 'bg-sky-950/30 border-sky-800/40 text-sky-400'
                              : lead.status === 'In Progress' ? 'bg-amber-950/30 border-amber-800/40 text-amber-400'
                              : lead.status === 'Closed' ? 'bg-emerald-950/30 border-emerald-800/40 text-emerald-400'
                              : 'bg-red-950/30 border-red-800/40 text-red-400'
                            }`}>{lead.status}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold text-violet-400 bg-violet-950/40 border border-violet-950/60 px-2 py-0.5 rounded-full">{lead.type}</span>
                              <span className="text-[10px] font-mono text-amber-500 font-bold">{lead.budget}</span>
                            </div>
                            <div className="flex items-center gap-1.5" onClick={e => e.stopPropagation()}>
                              <a
                                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${lead.email}&su=${encodeURIComponent('Studio GENZ - Project Proposal Reply')}&body=${encodeURIComponent(`Hi ${lead.name},\n\nThank you for reaching out to Studio GENZ!\n\nWe received your request regarding: "${lead.type}" with estimated budget ${lead.budget}.\n\nBest regards,\nStudio GENZ Team`)}`}
                                target="_blank" rel="noopener noreferrer"
                                className="w-7 h-7 rounded-lg bg-(--bg-secondary) border border-(--border-color) flex items-center justify-center text-(--text-muted) hover:text-violet-500"
                              ><Mail className="w-3 h-3" /></a>
                              {deleteConfirmId === lead.id ? (
                                <div className="flex gap-1">
                                  <button onClick={() => handleDeleteLead(lead.id)} className="bg-red-600 text-white text-[9px] font-bold px-2 py-1 rounded">OK</button>
                                  <button onClick={() => setDeleteConfirmId(null)} className="bg-(--bg-secondary) text-(--text-muted) text-[9px] font-bold px-2 py-1 rounded">No</button>
                                </div>
                              ) : (
                                <button onClick={() => setDeleteConfirmId(lead.id)} className="w-7 h-7 rounded-lg bg-(--bg-secondary) border border-(--border-color) flex items-center justify-center text-(--text-muted) hover:text-red-500"><Trash2 className="w-3 h-3" /></button>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Desktop table view (hidden on mobile) */}
                  <div className="hidden md:block overflow-x-auto w-full">
                  <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-(--border-color) text-[10px] font-bold text-(--text-muted) uppercase tracking-wider">
                      <th className="pb-3 pt-1 pl-4">Client Details</th>
                      <th className="pb-3 pt-1">Type & Budget</th>
                      <th className="pb-3 pt-1">Status</th>
                      <th className="pb-3 pt-1">Date Captured</th>
                      <th className="pb-3 pt-1 pr-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.map((lead) => {
                      const isSelected = selectedLead?.id === lead.id
                      return (
                        <tr 
                          key={lead.id}
                          onClick={() => {
                            setSelectedLead(lead)
                            setEditNotes(lead.notes || '')
                          }}
                          className={`border-b border-(--border-color)/50 text-xs cursor-pointer transition-colors group ${
                            isSelected 
                              ? 'bg-violet-500/10 hover:bg-violet-500/15' 
                              : 'hover:bg-(--bg-secondary)/50'
                          }`}
                        >
                          {/* Client Details */}
                          <td className="py-4 pl-4 font-light text-left">
                            <div className="flex flex-col gap-0.5">
                              <span className="font-semibold text-(--text-primary) group-hover:text-violet-500 transition-colors">{lead.name}</span>
                              <span className="text-[10px] text-(--text-muted) font-mono select-all" onClick={e => e.stopPropagation()}>{lead.email}</span>
                            </div>
                          </td>

                          {/* Project Type & Budget */}
                          <td className="py-4 font-light">
                            <div className="flex flex-col gap-0.5">
                              <span className="text-[10px] font-bold text-violet-400 bg-violet-950/40 border border-violet-950/60 px-2 py-0.5 rounded-full w-max flex items-center gap-1">
                                <Tag className="w-2.5 h-2.5" />
                                {lead.type}
                              </span>
                              <span className="font-medium text-amber-500 font-mono mt-1">{lead.budget}</span>
                            </div>
                          </td>

                          {/* Status Badge */}
                          <td className="py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                              lead.status === 'New' 
                                ? 'bg-purple-950/30 border-purple-800/40 text-purple-400 animate-pulse'
                                : lead.status === 'Contacted'
                                ? 'bg-sky-950/30 border-sky-800/40 text-sky-400'
                                : lead.status === 'In Progress'
                                ? 'bg-amber-950/30 border-amber-800/40 text-amber-400'
                                : lead.status === 'Closed'
                                ? 'bg-emerald-950/30 border-emerald-800/40 text-emerald-400'
                                : 'bg-red-950/30 border-red-800/40 text-red-400'
                            }`}>
                              {lead.status === 'New' && <Clock className="w-3 h-3" />}
                              {lead.status === 'Closed' && <CheckCircle className="w-3 h-3" />}
                              {lead.status}
                            </span>
                          </td>

                          {/* Date Captured */}
                          <td className="py-4 text-(--text-muted) font-mono text-[10px]">
                            {formatDate(lead.createdAt)}
                          </td>

                          {/* Quick Actions */}
                          <td className="py-4 pr-4 text-right" onClick={e => e.stopPropagation()}>
                            <div className="flex items-center justify-end gap-2">
                              {deleteConfirmId === lead.id ? (
                                <div className="flex items-center gap-1.5">
                                  <button 
                                    onClick={() => handleDeleteLead(lead.id)}
                                    className="bg-red-600 hover:bg-red-500 text-white text-[9px] font-bold px-2 py-1 rounded transition-colors"
                                  >
                                    Confirm
                                  </button>
                                  <button 
                                    onClick={() => setDeleteConfirmId(null)}
                                    className="bg-(--bg-secondary) hover:bg-(--border-color) text-(--text-muted) text-[9px] font-bold px-2 py-1 rounded transition-colors"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              ) : (
                                <>
                                  <a 
                                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${lead.email}&su=${encodeURIComponent(`Studio GENZ - Project Proposal Reply`)}&body=${encodeURIComponent(`Hi ${lead.name},\n\nThank you for reaching out to Studio GENZ!\n\nWe received your request regarding: "${lead.type}" with estimated budget ${lead.budget}.\n\nWe would love to discuss this further with you. Are you available for a quick sync this week?\n\nBest regards,\nStudio GENZ Team`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-8 h-8 rounded-lg bg-(--bg-primary) border border-(--border-color) flex items-center justify-center text-(--text-muted) hover:text-violet-500 hover:border-violet-500/30 transition-all"
                                    title="Email reply client (Google Mail)"
                                  >
                                    <Mail className="w-3.5 h-3.5" />
                                  </a>
                                  <button 
                                    onClick={() => setDeleteConfirmId(lead.id)}
                                    className="w-8 h-8 rounded-lg bg-(--bg-primary) border border-(--border-color) flex items-center justify-center text-(--text-muted) hover:text-red-500 hover:border-red-200 transition-all"
                                    title="Delete lead proposal"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>

                        </tr>
                      )
                    })}
                  </tbody>
                  </table>
                  </div>
                </>
              )}
            </div>

          </div>

          {/* Right Column: Lead Drawer / Workspace (Span 4) */}
          <div className="lg:col-span-4 flex flex-col gap-4 sm:gap-6">
            
            {/* Lead Inspection Panel */}
            <div className="bg-(--bg-secondary)/40 border border-(--border-color) rounded-3xl p-6 relative overflow-hidden flex flex-col h-[580px]">
              
              <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/5 rounded-full blur-2xl -z-10 pointer-events-none" />

              <div className="pb-4 border-b border-(--border-color) mb-4 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-violet-400" />
                  <h3 className="font-display font-bold text-sm text-(--text-primary) uppercase tracking-tight">Lead Workspace</h3>
                </div>
                {selectedLead && (
                  <button 
                    onClick={() => setSelectedLead(null)}
                    className="w-6 h-6 rounded-md bg-(--bg-primary) border border-(--border-color) text-(--text-muted) hover:text-(--text-primary) flex items-center justify-center"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>

              {!selectedLead ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6 gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-(--bg-primary) border border-(--border-color) flex items-center justify-center text-(--text-muted)">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-(--text-muted)">Select a lead for overview</h4>
                  <p className="text-xs text-(--text-muted) max-w-[200px] leading-normal font-light">
                    Click any record in the table database to view full client specs, edit pipeline status, and write internal tracking notes.
                  </p>
                </div>
              ) : (
                <div className="flex-1 flex flex-col overflow-y-auto text-left pr-1 scrollbar-thin">
                  
                  {/* Lead Info Header */}
                  <div className="flex flex-col gap-2 mb-4">
                    <span className="text-[10px] text-(--text-muted) font-mono">ID: {selectedLead.id}</span>
                    <h2 className="font-display font-800 text-xl text-(--text-primary) tracking-tight leading-tight uppercase">
                      {selectedLead.name}
                    </h2>
                    
                    {/* Status Dropdown */}
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-[10px] text-(--text-muted) font-bold uppercase">Pipeline Status:</span>
                      <select
                        value={selectedLead.status}
                        onChange={e => handleStatusChange(selectedLead.id, e.target.value)}
                        className="bg-(--bg-primary) border border-(--border-color) text-[10px] font-bold text-violet-400 rounded-md py-1.5 px-3 focus:outline-none cursor-pointer uppercase tracking-wider"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Closed">Closed</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>
                  </div>

                  {/* Metadata Fields */}
                  <div className="grid grid-cols-2 gap-3 p-3 bg-(--bg-primary) border border-(--border-color) rounded-xl mb-4 text-[11px]">
                    <div>
                      <span className="text-(--text-muted) block mb-0.5">Budget</span>
                      <span className="font-bold text-amber-500 font-mono">{selectedLead.budget}</span>
                    </div>
                    <div>
                      <span className="text-(--text-muted) block mb-0.5">Type</span>
                      <span className="font-bold text-violet-400">{selectedLead.type}</span>
                    </div>
                    <div className="col-span-2 border-t border-(--border-color) pt-2 mt-1">
                      <span className="text-(--text-muted) block mb-0.5">Captured</span>
                      <span className="font-mono text-(--text-primary) flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 text-(--text-muted)" />
                        {formatDate(selectedLead.createdAt)}
                      </span>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2 mb-4 text-[11px]">
                    <span className="text-[10px] text-(--text-muted) font-bold uppercase tracking-widest block mb-1">Contact Channels</span>
                    <a 
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${selectedLead.email}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 p-2.5 rounded-lg bg-(--bg-primary)/60 border border-(--border-color)/50 hover:border-violet-500/30 text-(--text-primary) hover:text-violet-500 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-(--text-muted) shrink-0" />
                      <span className="font-mono truncate select-all">{selectedLead.email}</span>
                    </a>
                    {selectedLead.phone && selectedLead.phone !== 'No phone provided' && (
                      <a 
                        href={`tel:${selectedLead.phone}`}
                        className="flex items-center gap-2.5 p-2.5 rounded-lg bg-(--bg-primary)/60 border border-(--border-color)/50 hover:border-violet-500/30 text-(--text-primary) hover:text-violet-500 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5 text-(--text-muted) shrink-0" />
                        <span className="font-mono select-all">{selectedLead.phone}</span>
                      </a>
                    )}
                  </div>

                  {/* Client Proposal Description */}
                  <div className="mb-4">
                    <span className="text-[10px] text-(--text-muted) font-bold uppercase tracking-widest block mb-2">Proposal Message</span>
                    <div className="p-3.5 rounded-xl bg-(--bg-primary)/50 border border-(--border-color) text-xs font-light text-(--text-primary) leading-relaxed max-h-[140px] overflow-y-auto pr-1">
                      {selectedLead.message}
                    </div>
                  </div>

                  {/* Admin Notes */}
                  <div className="mt-auto pt-4 border-t border-(--border-color) flex flex-col gap-2 shrink-0">
                    <span className="text-[10px] text-(--text-muted) font-bold uppercase tracking-widest block">Internal CRM Notes</span>
                    <textarea
                      rows={2}
                      value={editNotes}
                      onChange={e => setEditNotes(e.target.value)}
                      placeholder="Type custom follow-up notes, status remarks, or call reminders here..."
                      className="w-full bg-(--bg-primary) border border-(--border-color) text-xs text-(--text-primary) rounded-xl p-3 focus:outline-none focus:border-violet-500 transition-colors resize-none placeholder-neutral-400 font-light"
                    />
                    <button
                      onClick={handleSaveNotes}
                      className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold py-2 rounded-xl text-[10px] uppercase tracking-wider transition-colors shrink-0"
                    >
                      Save Notes
                    </button>
                  </div>

                </div>
              )}

            </div>

            {/* Direct Mail Setup Tip Panel */}
            <div className="p-5 rounded-3xl bg-(--bg-secondary)/50 border border-(--border-color) text-left flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-lg bg-(--bg-primary) border border-(--border-color) flex items-center justify-center text-violet-400 shrink-0 mt-0.5">
                <Mail className="w-4 h-4" />
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-(--text-primary)">One-click Response Integration</h4>
                <p className="text-[10px] text-(--text-muted) leading-relaxed font-light">
                  Clicking the mail icon in the action row or double clicking the email address will automatically draft an executive response pre-formatted with the client proposal and budget specifics inside Google Mail!
                </p>
              </div>
            </div>

          </div>

        </section>

      </div>
    </div>
  )
}
