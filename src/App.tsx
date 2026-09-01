import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Phone, MessageCircle, Shield, Award, Clock, Users, Scale, Gavel, Car, HeartPulse, Building2, Briefcase, ChevronRight, Star, Menu, X, Search, Filter, TrendingUp, CheckCircle2, PlayCircle, MapPin, Mail, ArrowRight, Calendar, FileText, DollarSign, Activity, AlertCircle, Eye, Lock, Zap
} from 'lucide-react'

// --- Types & Data ---
type CaseResult = {
  id: number
  amount: string
  numeric: number
  title: string
  category: string
  location: string
  year: string
  story: string
  attorney: string
}

type Lead = {
  id: string
  name: string
  injury: string
  phone: string
  status: 'New' | 'Contacted' | 'Qualified' | 'Retained' | 'Litigation'
  priority: 'High' | 'Medium' | 'Low'
  time: string
  value: string
  city: string
}

const practiceAreas = [
  { id: 'auto', title: 'Car & Truck Accidents', icon: Car, avg: '$425K', cases: '182,402', desc: 'Rear-end, DUI, trucking & rideshare collisions' },
  { id: 'medical', title: 'Medical Malpractice', icon: HeartPulse, avg: '$1.2M', cases: '21,840', desc: 'Surgical error, misdiagnosis & birth injury' },
  { id: 'work', title: 'Workers\' Compensation', icon: Briefcase, avg: '$185K', cases: '94,211', desc: 'Denied claims, workplace injury & OSHA' },
  { id: 'premises', title: 'Slip & Fall / Premises', icon: Building2, avg: '$310K', cases: '67,530', desc: 'Negligent security, falls & unsafe property' },
  { id: 'product', title: 'Defective Products', icon: Shield, avg: '$890K', cases: '12,904', desc: 'Drugs, devices & consumer product liability' },
  { id: 'wrongful', title: 'Wrongful Death', icon: Scale, avg: '$2.4M', cases: '8,412', desc: 'Compassionate representation for families' },
]

const caseResults: CaseResult[] = [
  { id: 1, amount: '$31,000,000', numeric: 31000000, title: 'Trucking Company Negligence', category: 'Auto', location: 'Florida', year: '2024', story: 'Family catastrophically injured when fatigued driver ran red light. Firm proved hours-of-service violations.', attorney: 'J. Morgan' },
  { id: 2, amount: '$12,500,000', numeric: 12500000, title: 'Birth Injury - Cerebral Palsy', category: 'Medical', location: 'Georgia', year: '2024', story: 'Delayed C-section led to permanent injury. Hospital settled after expert testimony.', attorney: 'S. Williams' },
  { id: 3, amount: '$8,300,000', numeric: 8300000, title: 'Workplace Amputation', category: 'Workplace', location: 'Tennessee', year: '2023', story: 'Factory failed to lockout machinery. OSHA citations secured maximum recovery.', attorney: 'M. Chen' },
  { id: 4, amount: '$5,750,000', numeric: 5750000, title: 'Premises - Negligent Security', category: 'Premises', location: 'New York', year: '2024', story: 'Apartment shooting due to broken locks and no security. Jury verdict.', attorney: 'D. Rodriguez' },
  { id: 5, amount: '$4,200,000', numeric: 4200000, title: 'Defective Airbag Deployment', category: 'Product', location: 'Texas', year: '2023', story: 'Takata-style inflator caused severe facial injuries. Confidential settlement.', attorney: 'A. Patel' },
  { id: 6, amount: '$2,900,000', numeric: 2900000, title: 'Rear-End Collision - Spinal Fusion', category: 'Auto', location: 'Kentucky', year: '2024', story: 'Low-speed impact required two-level fusion. Insurance offered $60K. We took it to trial.', attorney: 'J. Morgan' },
]

const testimonials = [
  { name: 'Maria G.', case: 'Car Accident - $1.2M', text: "They treated me like family. After my accident I couldn't work for 8 months — Morgan & Morgan handled everything while I healed.", stars: 5, city: 'Orlando, FL', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face' },
  { name: 'David T.', case: 'Workers\' Comp - $475K', text: "My employer denied my claim. One call changed everything. They got me surgery approved in 11 days.", stars: 5, city: 'Nashville, TN', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face' },
  { name: 'Keisha R.', case: 'Medical Malpractice', text: "Professional, relentless, and honest. They told me the truth about my case from day one and delivered more than promised.", stars: 5, city: 'Atlanta, GA', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face' },
]

const initialLeads: Lead[] = [
  { id: 'L-4812', name: 'James Whitfield', injury: 'Auto - T-bone intersection', phone: '(407) 555-0142', status: 'New', priority: 'High', time: '2 min ago', value: '$250K-$600K est.', city: 'Orlando, FL' },
  { id: 'L-4811', name: 'Sofia Alvarez', injury: 'Slip & Fall - Grocery', phone: '(305) 555-0198', status: 'New', priority: 'High', time: '7 min ago', value: '$80K-$180K est.', city: 'Miami, FL' },
  { id: 'L-4809', name: 'Derek Holmes', injury: 'Workplace - Ladder Fall', phone: '(615) 555-0133', status: 'Contacted', priority: 'Medium', time: '22 min ago', value: '$120K-$300K est.', city: 'Nashville, TN' },
  { id: 'L-4807', name: 'Angela Park', injury: 'Medical - Delayed Diagnosis', phone: '(404) 555-0161', status: 'Qualified', priority: 'High', time: '1 hr ago', value: '$900K-$1.4M est.', city: 'Atlanta, GA' },
  { id: 'L-4803', name: 'Robert Kelly', injury: 'Truck - Rear-ended by semi', phone: '(212) 555-0188', status: 'Retained', priority: 'High', time: '3 hr ago', value: '$1.1M-$2M est.', city: 'Queens, NY' },
  { id: 'L-4799', name: 'Linda Tran', injury: 'Product - Defective Hip Implant', phone: '(713) 555-0129', status: 'Litigation', priority: 'Medium', time: 'Yesterday', value: '$650K est.', city: 'Houston, TX' },
]

export default function App() {
  const [isStaffMode, setIsStaffMode] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [activeCategory, setActiveCategory] = useState('All')
  const [showChat, setShowChat] = useState(false)
  const [chatInput, setChatInput] = useState('')
  const [chatMessages, setChatMessages] = useState<{from:'user'|'bot', text:string}[]>([
    { from: 'bot', text: 'Hi, I\'m Morgan AI. I can answer questions and connect you to an intake specialist in under 2 minutes. How can I help?' }
  ])
  const [evalStep, setEvalStep] = useState(1)
  const [evalData, setEvalData] = useState({ injury: '', when: '', treatment: '', zip: '', name: '', phone: '' })
  const [showEvalSuccess, setShowEvalSuccess] = useState(false)
  const [leads, setLeads] = useState<Lead[]>(initialLeads)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(initialLeads[0])
  const [searchLeads, setSearchLeads] = useState('')
  const [toast, setToast] = useState<string | null>(null)
  const [caseSearch, setCaseSearch] = useState('')
  const heroRef = useRef<HTMLDivElement>(null)

  const showToast = (msg: string) => { setToast(msg); setTimeout(()=>setToast(null), 3000)}
  
  const filteredCases = caseResults.filter(c => 
    (activeCategory==='All' || c.category===activeCategory) && 
    (caseSearch==='' || c.title.toLowerCase().includes(caseSearch.toLowerCase()) || c.story.toLowerCase().includes(caseSearch.toLowerCase()))
  )

  const staffCounts = {
    New: leads.filter(l=>l.status==='New').length,
    Contacted: leads.filter(l=>l.status==='Contacted').length,
    Qualified: leads.filter(l=>l.status==='Qualified').length,
    Retained: leads.filter(l=>l.status==='Retained').length,
    Litigation: leads.filter(l=>l.status==='Litigation').length,
  }

  useEffect(()=>{
    if(toast) {
      const t = setTimeout(()=>setToast(null),3000)
      return ()=>clearTimeout(t)
    }
  },[toast])

  const handleChatSend = () => {
    if(!chatInput.trim()) return
    setChatMessages(prev=>[...prev, {from:'user', text: chatInput}, {from:'bot', text: 'Thanks — a licensed intake specialist will text you within 90 seconds. For immediate help call (877) 667-4265. Can I collect your zip code to match you locally?'}])
    setChatInput('')
  }

  const handleEvaluatorNext = () => {
    if(evalStep < 4) setEvalStep(s=>s+1)
    else {
      if(!evalData.name || !evalData.phone) { showToast('Please add name and phone to finish') ; return}
      setShowEvalSuccess(true)
      // add lead for staff view
      const newLead: Lead = { id: `L-${Math.floor(4800+Math.random()*200)}`, name: evalData.name || 'New Client', injury: evalData.injury || 'General Inquiry', phone: evalData.phone, status: 'New', priority: 'High', time: 'Just now', value: '$75K-$350K est.', city: evalData.zip || '—' }
      setLeads(prev=>[newLead, ...prev])
      setSelectedLead(newLead)
    }
  }

  const moveLead = (id: string, newStatus: Lead['status']) => {
    setLeads(prev=>prev.map(l=>l.id===id? {...l, status:newStatus}:l))
    if(selectedLead?.id===id) setSelectedLead(prev=> prev? {...prev, status:newStatus}:null)
    showToast(`Lead ${id} moved to ${newStatus}`)
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-slate-900 selection:bg-[#FFC400]/30">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,ital,wght@9..144,0,800;9..144,1,800&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500&display=swap');`}</style>

      {/* Top Alert Bar */}
      <div className="bg-[#FFC400] text-[#0F1F3C] text-[12px] md:text-[13px] font-bold tracking-wide">
        <div className="max-w-[1280px] mx-auto px-4 py-2 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="hidden md:inline-flex items-center gap-1.5 bg-[#0F1F3C] text-white px-2.5 py-1 rounded-full text-[11px] tracking-widest uppercase"><Zap size={12} className="fill-white"/> Fee is Free</span>
            <span className="truncate">You only pay if we win. No upfront costs. No hourly fees. <span className="hidden lg:inline"> — Available 24/7, nights & weekends.</span></span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a href="tel:8776674265" className="hidden md:inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-full font-extrabold text-[#0F1F3C] shadow-sm hover:scale-[1.02] transition">
              <Phone size={14}/> (877) 667-4265
            </a>
            <button 
              onClick={()=>setIsStaffMode(!isStaffMode)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-extrabold border transition ${isStaffMode ? 'bg-[#0F1F3C] text-white border-[#0F1F3C]' : 'bg-transparent border-[#0F1F3C] text-[#0F1F3C] hover:bg-[#0F1F3C] hover:text-white'}`}
            >
              <Lock size={12}/> {isStaffMode ? 'CLIENT VIEW' : 'STAFF PORTAL'}
            </button>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0F1F3C] text-white border-b border-white/10 backdrop-blur">
        <div className="max-w-[1280px] mx-auto px-4 h-[64px] md:h-[72px] flex items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FFC400] rounded-[8px] grid place-items-center text-[#0F1F3C] font-black text-xl leading-none" style={{fontFamily:'Fraunces'}}>M</div>
              <div>
                <div className="font-black tracking-[-0.02em] leading-none text-[18px] md:text-[20px]" style={{fontFamily:'Fraunces'}}>MORGAN & MORGAN</div>
                <div className="text-[10px] tracking-[0.18em] font-bold text-white/70 -mt-0.5">AMERICA'S LARGEST INJURY LAW FIRM • FOR THE PEOPLE</div>
              </div>
            </div>
            <nav className="hidden lg:flex items-center gap-6 text-[13px] font-semibold text-white/80 ml-6">
              <a href="#practice" className="hover:text-white">Practice Areas</a>
              <a href="#results" className="hover:text-white">Case Results</a>
              <a href="#attorneys" className="hover:text-white">Our Attorneys</a>
              <a href="#reviews" className="hover:text-white">Reviews</a>
              <span className="inline-flex items-center gap-1.5 text-[#FFC400]"><MapPin size={12}/> 1,000+ Locations</span>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-3 text-xs">
              <span className="inline-flex items-center gap-1.5 text-white/60"><Clock size={12}/> Avg. answer: <b className="text-white">47 sec</b></span>
              <span className="hidden xl:inline-flex items-center gap-1 text-emerald-400 font-bold"><span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"/> Intake Live</span>
            </div>
            <a href="tel:8776674265" className="hidden md:inline-flex items-center gap-2 bg-[#FFC400] text-[#0F1F3C] px-5 py-2.5 rounded-full font-black text-sm hover:bg-[#FFD23D] transition shadow-[0_4px_20px_rgba(255,196,0,0.35)]">
              <Phone size={16} className="fill-[#0F1F3C]"/> CALL NOW
            </a>
            <button onClick={()=>setMobileMenu(!mobileMenu)} className="lg:hidden w-10 h-10 grid place-items-center rounded-full bg-white/10 border border-white/15">
              {mobileMenu ? <X size={18}/> : <Menu size={18}/>}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {mobileMenu && (
            <motion.div initial={{height:0, opacity:0}} animate={{height:'auto', opacity:1}} exit={{height:0, opacity:0}} className="lg:hidden border-t border-white/10 bg-[#0F1F3C]">
              <div className="px-4 py-4 grid gap-3 text-sm font-semibold">
                <a href="#practice" onClick={()=>setMobileMenu(false)} className="py-2 border-b border-white/10">Practice Areas</a>
                <a href="#results" onClick={()=>setMobileMenu(false)} className="py-2 border-b border-white/10">Case Results</a>
                <a href="#attorneys" onClick={()=>setMobileMenu(false)} className="py-2 border-b border-white/10">Attorneys</a>
                <a href="tel:8776674265" className="mt-2 bg-[#FFC400] text-[#0F1F3C] text-center py-3 rounded-full font-black">CALL (877) 667-4265</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* STAFF MODE */}
      <AnimatePresence mode="wait">
        {isStaffMode ? (
          <motion.div key="staff" initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-8}} className="max-w-[1280px] mx-auto px-4 py-6">
            {/* Staff header stats */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-[28px] font-black tracking-[-0.02em] text-[#0F1F3C]" style={{fontFamily:'Fraunces'}}>Intake Command Center</h1>
                <p className="text-sm text-slate-500 font-medium">Real-time pipeline • SLA 2-min response • Fee is Free compliance mode ON</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-2 text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-full"><Activity size={14}/> Live • 4 specialists online</span>
                <button onClick={()=>showToast('Daily huddle scheduled for 9:00 AM ET')} className="hidden md:inline-flex items-center gap-2 bg-[#0F1F3C] text-white px-4 py-2 rounded-full text-xs font-bold"><Calendar size={14}/> Huddle</button>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
              {[
                {label:'New Leads (Today)', value: String(staffCounts.New + 12), sub:'+8 vs yesterday', color:'bg-amber-400'},
                {label:'Active Cases', value:'312', sub:'WIP $18.4M pipeline', color:'bg-[#0F1F3C]'},
                {label:'Settlements (MTD)', value:'$4.2M', sub:'13 closed', color:'bg-emerald-500'},
                {label:'Avg Response', value:'4m 12s', sub:'Target <2m', color:'bg-sky-500'},
                {label:'Retention Rate', value:'68%', sub:'+4% WoW', color:'bg-violet-500'},
              ].map(s=>(
                <div key={s.label} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
                  <div className={`w-8 h-1 rounded-full mb-3 ${s.color}`}/>
                  <div className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">{s.label}</div>
                  <div className="text-2xl font-black tracking-tight mt-1">{s.value}</div>
                  <div className="text-xs text-slate-500 mt-1">{s.sub}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-12 gap-4">
              {/* Left: Intake Queue */}
              <div className="col-span-12 lg:col-span-3 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col max-h-[720px]">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="font-black text-sm tracking-tight flex items-center gap-2"><span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"/> INTAKE QUEUE</h3>
                  <span className="text-xs font-bold bg-slate-900 text-white px-2 py-1 rounded-full">{leads.length}</span>
                </div>
                <div className="p-3 border-b border-slate-100">
                  <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
                    <input value={searchLeads} onChange={e=>setSearchLeads(e.target.value)} placeholder="Search name, ID, city..." className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#FFC400]/40"/>
                  </div>
                  <div className="flex gap-1.5 mt-3">
                    {['All','High','New'].map(f=>(
                      <button key={f} onClick={()=>showToast(`Filter: ${f}`)} className="text-xs font-bold px-3 py-1.5 rounded-full border bg-white border-slate-200 hover:border-slate-300">{f}</button>
                    ))}
                  </div>
                </div>
                <div className="overflow-auto divide-y divide-slate-100 flex-1">
                  {leads.filter(l=> !searchLeads || (l.name+l.id+l.city).toLowerCase().includes(searchLeads.toLowerCase())).map(l=>(
                    <button key={l.id} onClick={()=>setSelectedLead(l)} className={`w-full text-left p-4 hover:bg-slate-50 transition ${selectedLead?.id===l.id ? 'bg-[#0F1F3C] !text-white hover:bg-[#0F1F3C]' : ''}`}>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className={`text-sm font-extrabold leading-none ${selectedLead?.id===l.id? 'text-white':'text-slate-900'}`}>{l.name} <span className={`text-[11px] font-mono ml-1 ${selectedLead?.id===l.id?'text-white/70':'text-slate-400'}`}>{l.id}</span></div>
                          <div className={`text-xs mt-1 ${selectedLead?.id===l.id?'text-white/80':'text-slate-500'}`}>{l.injury} • {l.city}</div>
                        </div>
                        <span className={`text-[10px] font-black px-2 py-1 rounded-full leading-none shrink-0 ${l.priority==='High'?'bg-red-500 text-white': l.priority==='Medium'?'bg-amber-400 text-slate-900':'bg-slate-200 text-slate-600'} ${selectedLead?.id===l.id && l.priority==='High'?'ring-2 ring-white':''}`}>{l.priority.toUpperCase()}</span>
                      </div>
                      <div className={`flex items-center gap-2 mt-2.5 text-xs ${selectedLead?.id===l.id?'text-white/70':'text-slate-500'}`}><Clock size={12}/> {l.time} • {l.phone} <span className={`ml-auto font-bold ${selectedLead?.id===l.id?'text-[#FFC400]':'text-emerald-600'}`}>{l.value}</span></div>
                      <div className="mt-2 flex gap-1">
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${selectedLead?.id===l.id?'bg-white/15 border-white/20 text-white':'bg-slate-50 border-slate-200 text-slate-600'}`}>{l.status}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Center: Kanban */}
              <div className="col-span-12 lg:col-span-6 bg-slate-50 rounded-2xl border border-slate-200 p-4 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-black text-sm tracking-tight flex items-center gap-2"><Gavel size={16}/> PIPELINE</h3>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="hidden md:inline-flex items-center gap-1 text-slate-500"><Filter size={12}/> Drag simulation: click status to move</span>
                    <button onClick={()=>showToast('New intake form opened')} className="bg-[#FFC400] text-[#0F1F3C] px-3 py-1.5 rounded-full font-black text-xs">+ New Lead</button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                  {(['New','Contacted','Qualified','Retained','Litigation'] as Lead['status'][]).map(col=>(
                    <div key={col} className="bg-white rounded-xl border border-slate-200 p-2 min-h-[420px]">
                      <div className="flex items-center justify-between px-2 py-1.5">
                        <span className="text-[11px] font-black tracking-widest text-slate-500">{col.toUpperCase()}</span>
                        <span className="text-xs font-black bg-slate-900 text-white w-6 h-6 grid place-items-center rounded-full">{staffCounts[col]}</span>
                      </div>
                      <div className="grid gap-2 mt-2">
                        {leads.filter(l=>l.status===col).map(l=>(
                          <div key={l.id} onClick={()=>setSelectedLead(l)} className="group bg-white border border-slate-200 rounded-xl p-3 hover:border-[#0F1F3C]/20 hover:shadow-md cursor-pointer transition">
                            <div className="text-sm font-bold leading-tight">{l.name}</div>
                            <div className="text-xs text-slate-500 mt-1 line-clamp-2">{l.injury}</div>
                            <div className="flex items-center gap-1 mt-2 text-[11px] font-mono text-slate-500"><Phone size={10}/> {l.phone}</div>
                            <div className="mt-3 flex flex-wrap gap-1">
                              {(['Contacted','Qualified','Retained','Litigation'] as Lead['status'][]).filter(s=>s!==col).slice(0,2).map(ns=>(
                                <button key={ns} onClick={(e)=>{e.stopPropagation(); moveLead(l.id, ns)}} className="text-[10px] font-bold px-2 py-1 rounded-full bg-slate-900 text-white hover:bg-black">{ns} →</button>
                              ))}
                            </div>
                          </div>
                        ))}
                        {leads.filter(l=>l.status===col).length===0 && <div className="text-xs text-slate-400 text-center py-8 border border-dashed border-slate-200 rounded-xl">No leads</div>}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div className="bg-white border border-slate-200 rounded-xl p-3 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-emerald-50 grid place-items-center text-emerald-600"><DollarSign size={16}/></div>
                    <div><div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Avg Settlement</div><div className="font-black">$487K</div></div>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-xl p-3 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-amber-50 grid place-items-center text-amber-600"><TrendingUp size={16}/></div>
                    <div><div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Conversion</div><div className="font-black">34.2%</div></div>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-xl p-3 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-sky-50 grid place-items-center text-sky-600"><Clock size={16}/></div>
                    <div><div className="text-xs font-bold text-slate-500 uppercase tracking-widest">SLA Breaches</div><div className="font-black">2 today</div></div>
                  </div>
                </div>
              </div>

              {/* Right: Lead Detail */}
              <div className="col-span-12 lg:col-span-3">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="bg-[#0F1F3C] text-white p-4">
                    <div className="text-[11px] font-bold tracking-[0.14em] text-white/60">LEAD DETAIL</div>
                    {selectedLead ? (
                      <>
                        <div className="text-lg font-black mt-1" style={{fontFamily:'Fraunces'}}>{selectedLead.name}</div>
                        <div className="text-sm text-white/70">{selectedLead.id} • {selectedLead.city}</div>
                      </>
                    ) : <div className="text-sm text-white/70 mt-2">Select a lead</div>}
                  </div>
                  {selectedLead && (
                    <div className="p-4 space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                          <div className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">Injury Type</div>
                          <div className="text-sm font-bold mt-1">{selectedLead.injury}</div>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                          <div className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">Est. Value</div>
                          <div className="text-sm font-black text-emerald-600 mt-1">{selectedLead.value}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone size={14} className="text-slate-400"/> <a href={`tel:${selectedLead.phone}`} className="font-bold hover:underline">{selectedLead.phone}</a>
                        <span className="ml-auto inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200">{selectedLead.priority} Priority</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <button onClick={()=>showToast(`Calling ${selectedLead.name}...`)} className="bg-[#FFC400] text-[#0F1F3C] py-2.5 rounded-full font-black text-sm flex items-center justify-center gap-2"><Phone size={16}/> Call</button>
                        <button onClick={()=>showToast(`SMS opened for ${selectedLead.name}`)} className="bg-[#0F1F3C] text-white py-2.5 rounded-full font-bold text-sm flex items-center justify-center gap-2"><MessageCircle size={16}/> Text</button>
                      </div>
                      <div>
                        <div className="text-xs font-black tracking-widest text-slate-500 uppercase mb-2">Quick Actions</div>
                        <div className="grid grid-cols-2 gap-2">
                          {(['Contacted','Qualified','Retained','Litigation'] as Lead['status'][]).map(s=>(
                            <button key={s} onClick={()=>moveLead(selectedLead.id, s)} className={`py-2 rounded-full text-xs font-bold border ${selectedLead.status===s ? 'bg-[#0F1F3C] text-white border-[#0F1F3C]' : 'bg-white border-slate-200 hover:border-slate-300'}`}>{s}</button>
                          ))}
                        </div>
                      </div>
                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                        <div className="text-xs font-black flex items-center gap-1.5 text-amber-900"><AlertCircle size={14}/> Intake Checklist</div>
                        <ul className="mt-2 space-y-1.5 text-xs text-amber-900/80">
                          <li className="flex gap-2"><CheckCircle2 size={14} className="text-emerald-600 shrink-0"/> Police report requested</li>
                          <li className="flex gap-2"><CheckCircle2 size={14} className="text-emerald-600 shrink-0"/> Medical auth signed</li>
                          <li className="flex gap-2"><span className="w-3.5 h-3.5 rounded-full border border-amber-300 shrink-0 mt-0.5"/> Photos / Dashcam pending</li>
                        </ul>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Notes</div>
                        <textarea placeholder="Add private note..." className="w-full h-20 bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFC400]/30" defaultValue="Client reports severe back pain, ER visit same day. At-fault driver cited. Wants Spanish-speaking attorney."/>
                        <button onClick={()=>showToast('Note saved & synced to FileVine')} className="mt-2 w-full bg-white border border-slate-200 py-2 rounded-full text-xs font-bold hover:bg-slate-50">Save Note → FileVine</button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-4 bg-white rounded-2xl border border-slate-200 p-4">
                  <h4 className="font-black text-sm">Today’s Calendar</h4>
                  <div className="mt-3 space-y-2.5 text-sm">
                    <div className="flex gap-3 items-center"><span className="text-xs font-mono bg-slate-900 text-white px-2 py-1 rounded-full">10:00</span> <span>Intake review — Whitfield</span></div>
                    <div className="flex gap-3 items-center"><span className="text-xs font-mono bg-slate-100 border px-2 py-1 rounded-full">11:30</span> <span>Demand package — Park</span></div>
                    <div className="flex gap-3 items-center"><span className="text-xs font-mono bg-slate-100 border px-2 py-1 rounded-full">2:00</span> <span>Deposition prep — Kelly</span></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="client" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
            {/* Hero */}
            <div ref={heroRef} className="bg-[#0F1F3C] relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none opacity-20" style={{background: 'radial-gradient(800px 400px at 20% -10%, #FFC400 0%, transparent 60%), radial-gradient(600px 300px at 90% 0%, #2A4A8A 0%, transparent 60%)'}} />
              <div className="max-w-[1280px] mx-auto px-4 py-8 md:py-12 grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start relative">
                {/* Left Copy */}
                <div className="text-white pt-2">
                  <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold tracking-wide">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"/> 47 people got help in the last hour • Live intake
                  </div>
                  <h1 className="mt-5 text-[42px] md:text-[56px] font-black leading-[0.9] tracking-[-0.03em]" style={{fontFamily:'Fraunces'}}>
                    INJURED?<br/>
                    <span className="text-[#FFC400] italic font-extrabold">WE FIGHT.</span><br/>
                    FOR THE PEOPLE.
                  </h1>
                  <p className="mt-4 text-[16px] md:text-[18px] leading-relaxed text-white/75 max-w-[560px] font-medium">
                    America’s largest injury firm. No fee unless you win. Free case review in 90 seconds — we’ve recovered <span className="text-white font-black">$20+ Billion</span> for clients.
                  </p>

                  <div className="mt-6 grid grid-cols-3 gap-3 max-w-[560px]">
                    {[
                      {k:'$20B+', v:'Recovered'},
                      {k:'1,000+', v:'Attorneys'},
                      {k:'4.8★', v:'40k+ Reviews'},
                    ].map(s=>(
                      <div key={s.k} className="bg-white/10 border border-white/10 rounded-2xl p-4 backdrop-blur text-center">
                        <div className="text-[22px] font-black leading-none" style={{fontFamily:'Fraunces'}}>{s.k}</div>
                        <div className="text-[11px] font-bold tracking-widest text-white/60 uppercase mt-1">{s.v}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <a href="#evaluator" className="inline-flex items-center gap-2 bg-[#FFC400] text-[#0F1F3C] px-6 py-3.5 rounded-full font-black text-sm shadow-[0_8px_30px_rgba(255,196,0,0.35)] hover:bg-[#FFD23D] transition">
                      FREE CASE EVALUATION <ArrowRight size={18}/>
                    </a>
                    <a href="tel:8776674265" className="inline-flex items-center gap-2 bg-white text-[#0F1F3C] px-6 py-3.5 rounded-full font-black text-sm hover:bg-slate-100 transition">
                      <Phone size={18}/> (877) 667-4265
                    </a>
                  </div>

                  <div className="mt-6 flex items-center gap-4 text-xs font-semibold text-white/70">
                    <span className="inline-flex items-center gap-1.5"><Shield size={14} className="text-emerald-400"/> No win, no fee guarantee</span>
                    <span className="hidden sm:inline-flex items-center gap-1.5"><Lock size={14} className="text-white/50"/> Confidential & secure</span>
                    <span className="inline-flex items-center gap-1"><Star size={12} className="fill-[#FFC400] text-[#FFC400]"/> 4.8/5 Google</span>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-3 opacity-90">
                    <span className="text-[11px] font-bold tracking-widest text-white/50 uppercase">As seen on</span>
                    <span className="text-white/80 font-black text-sm tracking-tight">CNN • NYT • WSJ • FORBES • USA TODAY</span>
                  </div>
                </div>

                {/* Right: Evaluator */}
                <div id="evaluator" className="lg:sticky lg:top-[88px]">
                  <div className="bg-white rounded-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.35)] overflow-hidden border border-slate-200">
                    <div className="bg-[#0F1F3C] text-white p-5 flex items-center justify-between">
                      <div>
                        <div className="text-[11px] font-black tracking-[0.14em] text-[#FFC400]">90-SECOND CASE EVALUATOR</div>
                        <div className="font-black text-[18px] leading-none mt-1" style={{fontFamily:'Fraunces'}}>Do I Have A Case?</div>
                      </div>
                      <div className="hidden sm:flex items-center gap-2 text-xs font-bold bg-white/10 border border-white/15 px-3 py-1.5 rounded-full">
                        <Eye size={14}/> 2,184 evaluations today
                      </div>
                    </div>

                    <div className="px-5 pt-4">
                      <div className="flex gap-1.5">
                        {[1,2,3,4].map(i=>(
                          <div key={i} className={`h-1.5 rounded-full flex-1 transition ${i<=evalStep ? 'bg-[#FFC400]' : 'bg-slate-200'}`}/>
                        ))}
                      </div>
                      <div className="flex justify-between text-[11px] font-bold tracking-widest text-slate-500 uppercase mt-2">
                        <span>Step {evalStep} of 4</span>
                        <span className="text-emerald-600 flex items-center gap-1"><Lock size={10}/> Encrypted</span>
                      </div>
                    </div>

                    <div className="p-5">
                      {!showEvalSuccess ? (
                        <>
                          {evalStep===1 && (
                            <div>
                              <h3 className="font-black text-[18px] tracking-tight">What happened?</h3>
                              <p className="text-sm text-slate-500 mt-1">Select the closest match — we’ll estimate value instantly.</p>
                              <div className="grid grid-cols-2 gap-2.5 mt-4">
                                {[
                                  'Car Accident','Truck / Semi','Motorcycle','Slip & Fall','Work Injury','Medical Error','Product Defect','Wrongful Death'
                                ].map(opt=>(
                                  <button key={opt} onClick={()=>setEvalData(prev=>({...prev, injury: opt}))} className={`text-left p-3 rounded-2xl border-2 text-sm font-bold transition ${evalData.injury===opt ? 'border-[#0F1F3C] bg-[#0F1F3C] text-white shadow' : 'border-slate-200 bg-slate-50 hover:border-slate-300 text-slate-800'}`}>{opt}</button>
                                ))}
                              </div>
                            </div>
                          )}
                          {evalStep===2 && (
                            <div>
                              <h3 className="font-black text-[18px] tracking-tight">When did this happen?</h3>
                              <p className="text-sm text-slate-500 mt-1">Timing affects statute of limitations.</p>
                              <div className="grid gap-2 mt-4">
                                {['Within last 7 days','Within last 30 days','1 - 6 months ago','6 - 12 months ago','1 - 2 years ago','Over 2 years ago'].map(opt=>(
                                  <button key={opt} onClick={()=>setEvalData(prev=>({...prev, when: opt}))} className={`text-left px-4 py-3 rounded-full border font-bold text-sm flex items-center justify-between ${evalData.when===opt ? 'bg-[#0F1F3C] text-white border-[#0F1F3C]' : 'bg-white border-slate-200 hover:border-slate-300'}`}>{opt} {evalData.when===opt && <CheckCircle2 size={16} className="text-[#FFC400]"/>}</button>
                                ))}
                              </div>
                            </div>
                          )}
                          {evalStep===3 && (
                            <div>
                              <h3 className="font-black text-[18px] tracking-tight">Did you get medical treatment?</h3>
                              <div className="grid gap-2 mt-4">
                                {['ER / Hospital','Urgent Care','Doctor Visit','No treatment yet','Ongoing treatment'].map(opt=>(
                                  <button key={opt} onClick={()=>setEvalData(prev=>({...prev, treatment: opt}))} className={`text-left px-4 py-3 rounded-full border font-bold text-sm ${evalData.treatment===opt ? 'bg-[#FFC400] border-[#FFC400] text-slate-900' : 'bg-white border-slate-200 hover:border-slate-300'}`}>{opt}</button>
                                ))}
                              </div>
                              <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-3 flex gap-2 text-xs text-amber-900">
                                <AlertCircle size={16} className="shrink-0"/> Not getting care hurts your case. We can connect you to doctors with no upfront cost.
                              </div>
                            </div>
                          )}
                          {evalStep===4 && (
                            <div>
                              <h3 className="font-black text-[18px] tracking-tight">Where can we reach you?</h3>
                              <p className="text-sm text-slate-500 mt-1">Free, confidential. No spam — ever.</p>
                              <div className="grid gap-3 mt-4">
                                <input value={evalData.name} onChange={e=>setEvalData(prev=>({...prev, name:e.target.value}))} placeholder="Full name" className="w-full px-4 py-3 rounded-full border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FFC400]/30 text-sm"/>
                                <input value={evalData.phone} onChange={e=>setEvalData(prev=>({...prev, phone:e.target.value}))} placeholder="Mobile phone" className="w-full px-4 py-3 rounded-full border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FFC400]/30 text-sm"/>
                                <div className="grid grid-cols-2 gap-3">
                                  <input value={evalData.zip} onChange={e=>setEvalData(prev=>({...prev, zip:e.target.value}))} placeholder="ZIP code" className="w-full px-4 py-3 rounded-full border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FFC400]/30 text-sm"/>
                                  <select className="w-full px-4 py-3 rounded-full border border-slate-200 bg-slate-50 text-sm">
                                    <option>English</option><option>Español</option>
                                  </select>
                                </div>
                                <label className="flex gap-2 text-xs text-slate-500 leading-tight mt-1">
                                  <input type="checkbox" defaultChecked className="mt-0.5"/> I agree to be contacted by Morgan & Morgan via call/text even if on DNC. Message rates may apply. Reply STOP to opt out.
                                </label>
                              </div>
                            </div>
                          )}

                          <div className="mt-6 flex gap-3">
                            {evalStep>1 && <button onClick={()=>setEvalStep(s=>s-1)} className="px-5 py-3 rounded-full border border-slate-200 font-bold text-sm bg-white hover:bg-slate-50">Back</button>}
                            <button 
                              onClick={handleEvaluatorNext} 
                              disabled={(evalStep===1 && !evalData.injury) || (evalStep===2 && !evalData.when) || (evalStep===3 && !evalData.treatment)}
                              className="flex-1 bg-[#0F1F3C] text-white py-3.5 rounded-full font-black text-sm flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-black transition"
                            >
                              {evalStep===4 ? 'GET MY FREE EVALUATION' : 'Continue'} <ChevronRight size={16}/>
                            </button>
                          </div>
                          <div className="mt-3 flex items-center justify-center gap-4 text-[11px] font-bold text-slate-400">
                            <span className="flex items-center gap-1"><Shield size={12}/> SSL Secure</span>
                            <span className="flex items-center gap-1"><Award size={12}/> Attorney Reviewed</span>
                            <span className="flex items-center gap-1"><Clock size={12}/> 90 sec</span>
                          </div>
                        </>
                      ) : (
                        <div className="text-center py-2">
                          <div className="w-14 h-14 rounded-full bg-emerald-500 grid place-items-center mx-auto text-white"><CheckCircle2 size={28}/></div>
                          <h3 className="font-black text-xl mt-4" style={{fontFamily:'Fraunces'}}>Strong Case Detected</h3>
                          <p className="text-sm text-slate-600 mt-2 leading-relaxed">Based on thousands of similar {evalData.injury.toLowerCase()} cases, your estimated case value is:</p>
                          <div className="mt-4 bg-[#0F1F3C] text-white rounded-2xl p-4">
                            <div className="text-xs tracking-widest font-bold text-white/60 uppercase">Estimated Range</div>
                            <div className="text-3xl font-black mt-1" style={{fontFamily:'Fraunces'}}>$125,000 — $450,000*</div>
                            <div className="text-xs text-white/60 mt-1">*Estimate only. Final value depends on liability & damages. Free attorney review.</div>
                          </div>
                          <div className="mt-4 grid grid-cols-2 gap-3">
                            <a href="tel:8776674265" className="bg-[#FFC400] text-[#0F1F3C] py-3 rounded-full font-black text-sm flex items-center justify-center gap-2"><Phone size={16}/> Call Now</a>
                            <button onClick={()=>{setShowEvalSuccess(false); setEvalStep(1); setEvalData({injury:'', when:'', treatment:'', zip:'', name:'', phone:''})}} className="bg-white border border-slate-200 py-3 rounded-full font-bold text-sm">New Evaluation</button>
                          </div>
                          <div className="mt-3 text-xs text-slate-500">An intake specialist will call <b>{evalData.phone || 'you'}</b> within 2 minutes. Check your phone.</div>
                        </div>
                      )}
                    </div>
                    <div className="px-5 pb-4">
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center gap-3">
                        <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face" alt="Attorney" className="w-9 h-9 rounded-full object-cover"/>
                        <div className="text-xs leading-tight">
                          <div className="font-bold">John Morgan, Founder</div>
                          <div className="text-slate-500">“We’re For The People — not the powerful.”</div>
                        </div>
                        <span className="ml-auto text-[10px] font-black bg-[#FFC400] text-[#0F1F3C] px-2 py-1 rounded-full">LIVE</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-center gap-2 text-xs font-bold text-white/70">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"/> 12 specialists available now • Hablamos Español
                  </div>
                </div>
              </div>

              {/* Live winning ticker */}
              <div className="bg-[#FFC400] border-y border-black/10 overflow-hidden">
                <div className="flex items-center gap-6 py-2.5 animate-[marquee_30s_linear_infinite] whitespace-nowrap text-sm font-black tracking-tight text-[#0F1F3C]">
                  <span className="inline-flex items-center gap-2 bg-[#0F1F3C] text-white px-3 py-1 rounded-full text-xs tracking-widest"><TrendingUp size={12}/> LIVE RESULTS</span>
                  {caseResults.map(c=>(
                    <span key={c.id} className="inline-flex items-center gap-2">{c.amount} — {c.title} ({c.location}) <span className="w-1.5 h-1.5 bg-[#0F1F3C] rounded-full"/></span>
                  ))}
                  {caseResults.map(c=>(
                    <span key={c.id+'dup'} className="inline-flex items-center gap-2">{c.amount} — {c.title} ({c.location}) <span className="w-1.5 h-1.5 bg-[#0F1F3C] rounded-full"/></span>
                  ))}
                </div>
              </div>
            </div>

            {/* Trust Ribbon */}
            <div className="bg-white border-b border-slate-200">
              <div className="max-w-[1280px] mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-1">
                      {[0,1,2,3].map(i=><img key={i} src={`https://i.pravatar.cc/100?img=${10+i}`} alt="" className="w-7 h-7 rounded-full border-2 border-white object-cover"/> )}
                    </div>
                    <div className="text-xs leading-none">
                      <div className="font-black flex items-center gap-1"><Star size={12} className="fill-amber-400 text-amber-400"/> 4.8/5 (40,826 reviews)</div>
                      <div className="text-slate-500">Trusted by families nationwide</div>
                    </div>
                  </div>
                  <div className="hidden md:flex items-center gap-2 text-xs font-bold">
                    <span className="px-2.5 py-1 rounded-full bg-slate-900 text-white">BBB A+</span>
                    <span className="px-2.5 py-1 rounded-full border border-slate-200">Super Lawyers®</span>
                    <span className="px-2.5 py-1 rounded-full border border-slate-200">Best Law Firms — U.S. News</span>
                    <span className="px-2.5 py-1 rounded-full border border-slate-200">Avvo 10.0</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs font-bold">
                  <span className="hidden sm:inline text-slate-500 uppercase tracking-widest">Offices nationwide</span>
                  <span className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full"><MapPin size={12}/> Orlando • Tampa • NYC • Atlanta • Nashville • Houston + 900 more</span>
                </div>
              </div>
            </div>

            {/* Practice Areas */}
            <section id="practice" className="max-w-[1280px] mx-auto px-4 py-10">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <div className="text-xs font-black tracking-[0.14em] text-[#0F1F3C]/60 uppercase">We handle everything so you can heal</div>
                  <h2 className="text-[30px] md:text-[36px] font-black tracking-[-0.02em] leading-none mt-2" style={{fontFamily:'Fraunces'}}>Practice Areas</h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="hidden md:inline text-sm text-slate-500 font-medium">Not sure where you fit? We evaluate any injury caused by negligence.</span>
                  <a href="#evaluator" className="inline-flex items-center gap-2 bg-[#0F1F3C] text-white px-4 py-2 rounded-full text-sm font-bold">Check My Case <ArrowRight size={14}/></a>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {practiceAreas.map(pa=>(
                  <div key={pa.id} className="group bg-white border border-slate-200 rounded-2xl p-5 hover:border-[#0F1F3C]/20 hover:shadow-[0_12px_30px_rgba(15,31,60,0.08)] transition">
                    <div className="flex items-start justify-between">
                      <div className="w-11 h-11 rounded-xl bg-[#0F1F3C] text-white grid place-items-center group-hover:bg-[#FFC400] group-hover:text-[#0F1F3C] transition">
                        <pa.icon size={20}/>
                      </div>
                      <span className="text-xs font-black bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-full">Avg {pa.avg}</span>
                    </div>
                    <h3 className="font-black text-[17px] leading-tight mt-4">{pa.title}</h3>
                    <p className="text-sm text-slate-500 mt-1 leading-relaxed">{pa.desc}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-500">{pa.cases} cases handled</span>
                      <button onClick={()=>showToast(`Learn more about ${pa.title}`)} className="text-sm font-black inline-flex items-center gap-1 text-[#0F1F3C] group-hover:gap-1.5 transition">Learn more <ChevronRight size={14}/></button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 bg-[#0F1F3C] rounded-2xl p-5 md:p-6 flex flex-wrap items-center justify-between gap-4 text-white overflow-hidden relative">
                <div className="absolute inset-0 opacity-10" style={{background: 'radial-gradient(400px 200px at 80% 50%, #FFC400 0%, transparent 60%)'}}/>
                <div className="relative flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#FFC400] grid place-items-center text-[#0F1F3C]"><Gavel size={20}/></div>
                  <div>
                    <div className="font-black text-lg leading-none" style={{fontFamily:'Fraunces'}}>Not on the list? We still want to hear from you.</div>
                    <div className="text-sm text-white/70">If someone’s negligence hurt you, call us. If we can’t help, we’ll point you to who can — free.</div>
                  </div>
                </div>
                <a href="tel:8776674265" className="relative bg-white text-[#0F1F3C] px-6 py-3 rounded-full font-black text-sm inline-flex items-center gap-2">Talk to intake now <Phone size={16}/></a>
              </div>
            </section>

            {/* Case Results */}
            <section id="results" className="bg-white border-y border-slate-200">
              <div className="max-w-[1280px] mx-auto px-4 py-10">
                <div className="flex flex-wrap gap-4 items-end justify-between">
                  <div>
                    <div className="text-xs font-black tracking-[0.14em] text-slate-500 uppercase">Proven results</div>
                    <h2 className="text-[30px] md:text-[36px] font-black tracking-[-0.02em] leading-none mt-2" style={{fontFamily:'Fraunces'}}>Real Case Results</h2>
                    <p className="text-sm text-slate-500 mt-2 max-w-[560px]">Every case is different. These are actual recoveries for real clients. We publish verdicts and settlements with court records where permitted.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
                      <input value={caseSearch} onChange={e=>setCaseSearch(e.target.value)} placeholder="Search results..." className="pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-sm w-[220px] focus:outline-none focus:ring-2 focus:ring-[#FFC400]/30"/>
                    </div>
                    <button onClick={()=>showToast('Full case database: 15,000+ results available to clients')} className="hidden md:inline-flex items-center gap-2 border border-slate-200 px-4 py-2.5 rounded-full text-sm font-bold bg-white hover:bg-slate-50">View all results <ArrowRight size={14}/></button>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {['All','Auto','Medical','Workplace','Premises','Product'].map(cat=>(
                    <button key={cat} onClick={()=>setActiveCategory(cat)} className={`px-4 py-2 rounded-full text-sm font-black border transition ${activeCategory===cat ? 'bg-[#0F1F3C] text-white border-[#0F1F3C]' : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'}`}>{cat}</button>
                  ))}
                  <span className="ml-auto hidden md:inline-flex items-center gap-2 text-xs font-bold text-slate-500"><Filter size={12}/> Filtered: {filteredCases.length} results</span>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                  {filteredCases.map(c=>(
                    <div key={c.id} className="group bg-[#F8F9FB] border border-slate-200 rounded-2xl p-5 hover:bg-white hover:shadow-[0_12px_30px_rgba(15,31,60,0.08)] hover:border-slate-300 transition">
                      <div className="flex items-start justify-between gap-3">
                        <div className="inline-flex items-center gap-1.5 bg-white border border-slate-200 px-2.5 py-1 rounded-full text-[11px] font-black tracking-widest uppercase text-slate-600">{c.category} • {c.location} • {c.year}</div>
                        <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">VERIFIED</span>
                      </div>
                      <div className="text-[32px] font-black tracking-tight mt-3" style={{fontFamily:'Fraunces', color:'#0F1F3C'}}>{c.amount}</div>
                      <h3 className="font-bold text-[15px] leading-tight mt-1">{c.title}</h3>
                      <p className="text-sm text-slate-600 mt-2 leading-relaxed line-clamp-3">{c.story}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs text-slate-500">Lead: <b className="text-slate-800">{c.attorney}</b></span>
                        <button onClick={()=>showToast('Case details PDF: available after consultation (ethics rules)')} className="text-sm font-black inline-flex items-center gap-1 text-[#0F1F3C]">Case details <ChevronRight size={14}/></button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-wrap items-center gap-3 text-sm">
                  <span className="inline-flex items-center gap-2 font-black text-amber-900"><Scale size={16}/> Truth in advertising:</span>
                  <span className="text-amber-900/80">“Prior results do not guarantee a similar outcome.” We publish only consented, court-verified results. Ask your attorney about likely range for your case.</span>
                  <button onClick={()=>showToast('Ethics & disclaimers opened')} className="ml-auto text-xs font-black bg-white border border-amber-200 px-3 py-1.5 rounded-full">Read disclaimers</button>
                </div>
              </div>
            </section>

            {/* Why Morgan */}
            <section className="max-w-[1280px] mx-auto px-4 py-10">
              <div className="grid lg:grid-cols-2 gap-6">
                <div>
                  <div className="text-xs font-black tracking-[0.14em] text-slate-500 uppercase">Why families choose Morgan & Morgan</div>
                  <h2 className="text-[28px] md:text-[34px] font-black tracking-[-0.02em] leading-none mt-2" style={{fontFamily:'Fraunces'}}>Size Is Your Advantage</h2>
                  <p className="text-sm text-slate-600 mt-3 leading-relaxed">Insurance companies have armies of lawyers. So should you. Our scale means doctors, investigators, and trial teams in every time zone — at no upfront cost to you.</p>
                  
                  <div className="mt-6 bg-white border border-slate-200 rounded-2xl overflow-hidden">
                    <div className="grid grid-cols-3 text-xs font-black tracking-widest uppercase">
                      <div className="p-3 text-slate-500">Feature</div>
                      <div className="p-3 bg-[#0F1F3C] text-white text-center">Morgan & Morgan</div>
                      <div className="p-3 text-center text-slate-500">Typical Firm</div>
                    </div>
                    {[
                      ['Fee if you lose','$0 — Fee is Free','Often $0 but check fine print'],
                      ['Upfront costs','We front all costs','You may pay filing/expert fees'],
                      ['Trial-ready','1,000+ trial attorneys','1–5 attorneys'],
                      ['Investigators','In-house team, 24/7','Outsourced'],
                      ['Medical network','50-state referral network','Local only'],
                    ].map(([feat, us, them])=>(
                      <div key={feat} className="grid grid-cols-3 text-sm border-t border-slate-100">
                        <div className="p-3 font-bold text-slate-700">{feat}</div>
                        <div className="p-3 bg-amber-50 text-center font-bold text-[#0F1F3C] flex items-center justify-center gap-1.5"><CheckCircle2 size={14} className="text-emerald-600"/> {us}</div>
                        <div className="p-3 text-center text-slate-500">{them}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white border border-slate-200 rounded-2xl p-5">
                    <h3 className="font-black flex items-center gap-2"><Award size={18} className="text-[#FFC400]"/> Trust Signals</h3>
                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3"><div className="font-black">35+ Years</div><div className="text-slate-500 text-xs">Founded 1988, Orlando</div></div>
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3"><div className="font-black">500+ Trials / Year</div><div className="text-slate-500 text-xs">We actually go to court</div></div>
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3"><div className="font-black">No Fee Unless We Win</div><div className="text-slate-500 text-xs">Contingency — 33-40%</div></div>
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3"><div className="font-black">Free Consult 24/7</div><div className="text-slate-500 text-xs">Nights & weekends</div></div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold">
                      <span className="px-3 py-1.5 rounded-full bg-slate-900 text-white inline-flex items-center gap-1.5"><Shield size={12}/> Licensed in 50 states + DC</span>
                      <span className="px-3 py-1.5 rounded-full border border-slate-200">A+ BBB Accredited</span>
                      <span className="px-3 py-1.5 rounded-full border border-slate-200">Hablamos Español</span>
                    </div>
                  </div>

                  <div className="bg-[#0F1F3C] rounded-2xl p-5 text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10" style={{background:'radial-gradient(500px 200px at 100% 0%, #FFC400 0%, transparent 60%)'}}/>
                    <div className="relative">
                      <div className="text-xs font-black tracking-[0.14em] text-[#FFC400]">FOR INJURED CLIENTS</div>
                      <h3 className="font-black text-xl mt-2" style={{fontFamily:'Fraunces'}}>Your Recovery Checklist</h3>
                      <p className="text-sm text-white/70 mt-2">Do these now — it protects health and case value.</p>
                      <div className="mt-4 grid gap-2">
                        {[
                          'Seek medical care within 24 hours — even if you feel "okay"',
                          'Save everything: photos, bills, names of witnesses',
                          'Don\'t give recorded statement to insurance alone',
                          'Call us before you sign anything — we review free'
                        ].map((item,i)=>(
                          <div key={i} className="flex gap-2.5 bg-white/10 border border-white/10 rounded-xl p-3 text-sm">
                            <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5"/> <span>{item}</span>
                          </div>
                        ))}
                      </div>
                      <button onClick={()=>showToast('Checklist PDF downloaded')} className="mt-4 w-full bg-[#FFC400] text-[#0F1F3C] py-3 rounded-full font-black text-sm inline-flex items-center justify-center gap-2"><FileText size={16}/> Download Checklist PDF</button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Testimonials */}
            <section id="reviews" className="bg-white border-y border-slate-200">
              <div className="max-w-[1280px] mx-auto px-4 py-10">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <div className="text-xs font-black tracking-[0.14em] text-slate-500 uppercase">Client stories</div>
                    <h2 className="text-[28px] md:text-[34px] font-black tracking-[-0.02em] mt-2" style={{fontFamily:'Fraunces'}}>For The People, By The Results</h2>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold bg-slate-50 border border-slate-200 px-3 py-2 rounded-full">
                    <Star size={14} className="fill-amber-400 text-amber-400"/> 40,826 Google reviews • <span className="text-emerald-600">4.8 average</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  {testimonials.map(t=>(
                    <div key={t.name} className="bg-[#F8F9FB] border border-slate-200 rounded-2xl p-5">
                      <div className="flex items-center gap-3">
                        <img src={t.image} alt={t.name} className="w-11 h-11 rounded-full object-cover"/>
                        <div>
                          <div className="font-black text-sm">{t.name} • <span className="font-normal text-slate-500">{t.city}</span></div>
                          <div className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 inline-flex px-2 py-0.5 rounded-full mt-1">{t.case}</div>
                        </div>
                        <span className="ml-auto flex gap-0.5">{Array.from({length:5}).map((_,i)=><Star key={i} size={14} className="fill-amber-400 text-amber-400"/>)}</span>
                      </div>
                      <p className="text-sm leading-relaxed mt-4 text-slate-700">“{t.text}”</p>
                      <button onClick={()=>showToast(`Playing ${t.name} video testimonial`)} className="mt-4 inline-flex items-center gap-1.5 text-xs font-black bg-white border border-slate-200 px-3 py-1.5 rounded-full hover:bg-slate-50"><PlayCircle size={14}/> Watch story</button>
                    </div>
                  ))}
                </div>

                <div className="mt-6 grid md:grid-cols-3 gap-3">
                  <div className="bg-[#0F1F3C] text-white rounded-2xl p-5 flex items-center gap-3">
                    <img src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=200&h=200&fit=crop" alt="Office" className="w-16 h-16 rounded-xl object-cover"/>
                    <div><div className="font-black">Video consultations available</div><div className="text-sm text-white/70">Meet your attorney from home. Secure, recorded, free.</div></div>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                    <div className="font-black text-amber-900 flex items-center gap-2"><Shield size={16}/> Your info is protected</div>
                    <div className="text-sm text-amber-900/70 mt-1">Attorney-client privilege starts at first contact. Encrypted intake, HIPAA-aware staff.</div>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center justify-between">
                    <div><div className="font-black">Prefer to talk?</div><div className="text-sm text-slate-500">Average hold time 47 seconds</div></div>
                    <a href="tel:8776674265" className="bg-[#FFC400] text-[#0F1F3C] px-4 py-2 rounded-full font-black text-sm inline-flex items-center gap-2"><Phone size={14}/> Call</a>
                  </div>
                </div>
              </div>
            </section>

            {/* Attorneys */}
            <section id="attorneys" className="max-w-[1280px] mx-auto px-4 py-10">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <div className="text-xs font-black tracking-[0.14em] text-slate-500 uppercase">Meet your team</div>
                  <h2 className="text-[28px] md:text-[34px] font-black tracking-[-0.02em] mt-2" style={{fontFamily:'Fraunces'}}>Trial Lawyers Who Actually Try Cases</h2>
                </div>
                <button onClick={()=>showToast('Full attorney directory: 1,000+ profiles')} className="inline-flex items-center gap-2 border border-slate-200 bg-white px-4 py-2 rounded-full text-sm font-bold">Browse all attorneys <ArrowRight size={14}/></button>
              </div>
              <div className="grid md:grid-cols-4 gap-4 mt-6">
                {[
                  {name:'John Morgan', role:'Founder • Trial Attorney', exp:'35+ years', win:'$20B+ recovered', img:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face'},
                  {name:'Ultima Morgan', role:'Managing Partner', exp:'20+ years', win:'Mass torts', img:'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face'},
                  {name:'Mike Mills', role:'Chief Trial Counsel', exp:'1,200+ trials', win:'Board Certified', img:'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'},
                  {name:'Dan Morgan', role:'Partner • Auto Litigation', exp:'18 years', win:'$300M+ verdicts', img:'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face'},
                ].map(a=>(
                  <div key={a.name} className="bg-white border border-slate-200 rounded-2xl overflow-hidden group hover:shadow-lg transition">
                    <div className="h-48 overflow-hidden relative">
                      <img src={a.img} alt={a.name} className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-500"/>
                      <span className="absolute bottom-3 left-3 bg-[#FFC400] text-[#0F1F3C] text-xs font-black px-2.5 py-1 rounded-full">{a.win}</span>
                    </div>
                    <div className="p-4">
                      <div className="font-black leading-tight">{a.name}</div>
                      <div className="text-xs text-slate-500 font-semibold">{a.role} • {a.exp}</div>
                      <div className="mt-3 flex gap-2">
                        <button onClick={()=>showToast(`Profile: ${a.name}`)} className="flex-1 bg-[#0F1F3C] text-white py-2 rounded-full text-xs font-bold">View profile</button>
                        <button onClick={()=>showToast(`Message sent to ${a.name}'s team`)} className="px-3 py-2 rounded-full border border-slate-200 text-xs font-bold bg-white">Contact</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Final CTA */}
            <section className="bg-[#0F1F3C] text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-20" style={{background:'radial-gradient(700px 300px at 20% 0%, #FFC400 0%, transparent 60%)'}}/>
              <div className="max-w-[1280px] mx-auto px-4 py-10 md:py-14 grid lg:grid-cols-2 gap-8 items-center relative">
                <div>
                  <div className="inline-flex items-center gap-2 bg-[#FFC400] text-[#0F1F3C] px-3 py-1 rounded-full text-xs font-black">FREE CASE REVIEW • 90 SECONDS</div>
                  <h2 className="text-[32px] md:text-[42px] font-black leading-[0.9] tracking-[-0.02em] mt-4" style={{fontFamily:'Fraunces'}}>Hurt? Let’s make it right.<br/><span className="text-[#FFC400]">Start free today.</span></h2>
                  <p className="text-white/70 mt-4 leading-relaxed">No fee unless you win. We’ll tell you honestly if you have a case and what it’s worth — even if the answer is no.</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a href="#evaluator" className="bg-[#FFC400] text-[#0F1F3C] px-6 py-3 rounded-full font-black inline-flex items-center gap-2">Start my free evaluation <ArrowRight size={18}/></a>
                    <a href="tel:8776674265" className="bg-white text-[#0F1F3C] px-6 py-3 rounded-full font-black inline-flex items-center gap-2"><Phone size={18}/> (877) 667-4265</a>
                  </div>
                  <div className="mt-4 flex items-center gap-3 text-xs text-white/60 font-semibold">
                    <span className="flex items-center gap-1.5"><Clock size={12}/> 24/7 intake</span>
                    <span className="flex items-center gap-1.5"><Shield size={12}/> Confidential</span>
                    <span className="flex items-center gap-1.5"><Award size={12}/> No win, no fee</span>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-5 text-slate-900 shadow-xl">
                  <h3 className="font-black text-lg tracking-tight">Prefer a human now?</h3>
                  <div className="mt-4 grid gap-3">
                    <a href="tel:8776674265" className="flex items-center gap-3 bg-[#0F1F3C] text-white p-4 rounded-2xl hover:bg-black transition">
                      <span className="w-10 h-10 rounded-full bg-[#FFC400] grid place-items-center text-[#0F1F3C]"><Phone size={18}/></span>
                      <div><div className="font-black leading-none">Call intake</div><div className="text-sm text-white/70">(877) 667-4265 • Avg 47 sec answer</div></div>
                      <ChevronRight size={18} className="ml-auto text-white/60"/>
                    </a>
                    <button onClick={()=>setShowChat(true)} className="flex items-center gap-3 bg-white border-2 border-slate-200 p-4 rounded-2xl hover:border-slate-300 transition text-left">
                      <span className="w-10 h-10 rounded-full bg-emerald-500 grid place-items-center text-white"><MessageCircle size={18}/></span>
                      <div><div className="font-black leading-none">Chat live</div><div className="text-sm text-slate-500">90-second triage • Real specialist</div></div>
                      <span className="ml-auto w-2 h-2 bg-emerald-500 rounded-full animate-pulse"/>
                    </button>
                    <button onClick={()=>showToast('Text "HELP" to 66742 — SMS intake started')} className="flex items-center gap-3 bg-white border border-slate-200 p-4 rounded-2xl hover:bg-slate-50 transition text-left">
                      <span className="w-10 h-10 rounded-full bg-slate-900 grid place-items-center text-white"><Mail size={18}/></span>
                      <div><div className="font-black leading-none">Text us</div><div className="text-sm text-slate-500">Text HELP to 66742</div></div>
                      <ArrowRight size={18} className="ml-auto text-slate-400"/>
                    </button>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5"><div className="font-black">En Español</div><div className="text-slate-500">Se habla español</div></div>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5"><div className="font-black">Video Call</div><div className="text-slate-500">From home</div></div>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5"><div className="font-black">Home Visits</div><div className="text-slate-500">If needed</div></div>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#0A162E] text-white/70 border-t border-white/10">
              <div className="max-w-[1280px] mx-auto px-4 py-8">
                <div className="grid md:grid-cols-4 gap-8 text-sm">
                  <div>
                    <div className="flex items-center gap-2 text-white">
                      <div className="w-8 h-8 bg-[#FFC400] rounded-lg grid place-items-center text-[#0F1F3C] font-black" style={{fontFamily:'Fraunces'}}>M</div>
                      <span className="font-black tracking-tight">MORGAN & MORGAN</span>
                    </div>
                    <p className="mt-3 leading-relaxed text-white/60">America’s largest injury law firm. For The People. Offices nationwide. Past results do not guarantee similar outcomes. Free consultation does not create attorney-client relationship.</p>
                    <div className="mt-4 flex gap-2 text-xs font-bold">
                      <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/10">© 2025 Morgan & Morgan</span>
                      <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/10">Privacy • Terms</span>
                    </div>
                  </div>
                  <div>
                    <div className="font-black text-white tracking-wide text-xs uppercase">Contact</div>
                    <ul className="mt-3 space-y-2">
                      <li className="flex items-center gap-2"><Phone size={14}/> (877) 667-4265</li>
                      <li className="flex items-center gap-2"><Mail size={14}/> intake@forthepeople.com</li>
                      <li className="flex items-center gap-2"><MapPin size={14}/> 20 N Orange Ave, Orlando, FL 32801</li>
                    </ul>
                    <div className="mt-4 inline-flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/20 text-emerald-300 px-3 py-1.5 rounded-full text-xs font-bold"><span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"/> Intake is live now</div>
                  </div>
                  <div>
                    <div className="font-black text-white tracking-wide text-xs uppercase">Practice Areas</div>
                    <ul className="mt-3 space-y-1.5">
                      {practiceAreas.slice(0,6).map(p=><li key={p.id}><a href="#practice" className="hover:text-white">{p.title}</a></li>)}
                    </ul>
                  </div>
                  <div>
                    <div className="font-black text-white tracking-wide text-xs uppercase">For Staff</div>
                    <p className="mt-3 text-white/60 leading-relaxed">Staff portal shows mock intake pipeline, SLA tracking, and lead assignment. All data is demo — no real client info.</p>
                    <button onClick={()=>setIsStaffMode(true)} className="mt-4 bg-[#FFC400] text-[#0F1F3C] px-4 py-2 rounded-full font-black text-xs inline-flex items-center gap-2">Open Staff Portal <ArrowRight size={14}/></button>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-white/10 text-xs leading-relaxed text-white/40">
                  Disclaimer: The information on this website is for general information purposes only. Nothing on this site should be taken as legal advice for any individual case or situation. This information is not intended to create, and receipt or viewing does not constitute, an attorney-client relationship. *Fee is Free: You pay nothing unless we win. Contingent fee varies by case type and stage. Costs may be advanced and recoverable.
                </div>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fast Contact - Floating */}
      {!isStaffMode && (
        <>
          <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-2">
            <motion.button whileHover={{scale:1.03}} whileTap={{scale:0.97}} onClick={()=>setShowChat(true)} className="hidden md:inline-flex items-center gap-2 bg-[#0F1F3C] text-white px-5 py-3 rounded-full font-black shadow-[0_12px_30px_rgba(0,0,0,0.25)] border border-white/10">
              <MessageCircle size={18}/> Chat now — 47 sec avg
            </motion.button>
            <a href="tel:8776674265" className="md:hidden inline-flex items-center gap-2 bg-[#FFC400] text-[#0F1F3C] px-5 py-3 rounded-full font-black shadow-xl justify-center"><Phone size={18}/> Call (877) 667-4265</a>
          </div>
          {/* Mobile sticky call bar */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-slate-200 p-3 flex gap-2">
            <a href="tel:8776674265" className="flex-1 bg-[#FFC400] text-[#0F1F3C] py-3 rounded-full font-black text-center inline-flex items-center justify-center gap-2"><Phone size={16}/> Call Now</a>
            <button onClick={()=>setShowChat(true)} className="flex-1 bg-[#0F1F3C] text-white py-3 rounded-full font-black inline-flex items-center justify-center gap-2"><MessageCircle size={16}/> Chat</button>
          </div>
        </>
      )}

      {/* Chat Widget */}
      <AnimatePresence>
        {showChat && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 grid place-items-end p-4 bg-black/40 backdrop-blur-sm" onClick={()=>setShowChat(false)}>
            <motion.div initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} exit={{y:20, opacity:0}} onClick={e=>e.stopPropagation()} className="w-full max-w-[380px] bg-white rounded-[20px] shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[78vh]">
              <div className="bg-[#0F1F3C] text-white p-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#FFC400] grid place-items-center text-[#0F1F3C] font-black" style={{fontFamily:'Fraunces'}}>M</div>
                <div>
                  <div className="font-black text-sm leading-none">Morgan & Morgan • Live Intake</div>
                  <div className="text-xs text-white/70 flex items-center gap-1.5"><span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"/> Typically replies in 47 seconds • Encrypted</div>
                </div>
                <button onClick={()=>setShowChat(false)} className="ml-auto w-8 h-8 grid place-items-center rounded-full bg-white/10 hover:bg-white/15"><X size={16}/></button>
              </div>
              <div className="flex-1 overflow-auto p-4 space-y-3 bg-[#F8F9FB]">
                {chatMessages.map((m,i)=>(
                  <div key={i} className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${m.from==='bot' ? 'bg-white border border-slate-200 text-slate-800' : 'bg-[#0F1F3C] text-white ml-auto'}`}>{m.text}</div>
                ))}
                <div className="flex flex-wrap gap-2">
                  {['Car accident','Work injury','Slip & fall','Medical error'].map(q=>(
                    <button key={q} onClick={()=>setChatMessages(prev=>[...prev, {from:'user', text:q}, {from:'bot', text:'Got it — I\'ll connect you to the right team. What city did this happen in?'}])} className="text-xs font-bold px-3 py-1.5 rounded-full bg-white border border-slate-200 hover:border-slate-300">{q}</button>
                  ))}
                </div>
              </div>
              <div className="p-3 border-t border-slate-200 bg-white flex gap-2">
                <input value={chatInput} onChange={e=>setChatInput(e.target.value)} onKeyDown={e=> e.key==='Enter' && handleChatSend()} placeholder="Type your message…" className="flex-1 px-4 py-3 rounded-full bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FFC400]/30 text-sm"/>
                <button onClick={handleChatSend} className="w-11 h-11 grid place-items-center rounded-full bg-[#FFC400] text-[#0F1F3C] hover:bg-[#FFD23D]"><ArrowRight size={18}/></button>
              </div>
              <div className="px-4 pb-3 flex items-center justify-between text-[11px] text-slate-500">
                <span className="inline-flex items-center gap-1"><Lock size={10}/> Attorney-client privileged after intake</span>
                <button onClick={()=>showToast('Transcript emailed')} className="font-bold text-[#0F1F3C]">Email transcript</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} exit={{y:20, opacity:0}} className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-4 py-3 rounded-full text-sm font-semibold shadow-xl border border-white/10 flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-400"/> {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`@keyframes marquee { 0% { transform: translateX(0)} 100% { transform: translateX(-50%)} }`}</style>
    </div>
  )
}
