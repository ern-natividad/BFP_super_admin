import React, { useState, useEffect } from 'react'
import '../style/content.css'
import '../style/newsroom.css'

function ContentManagement() {
  const [openSections, setOpenSections] = useState({ electrical: true, kitchen: false })
  const [showNewsModal, setShowNewsModal] = useState(false)
  const [activeTab, setActiveTab] = useState('safety')

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }))
  }
  // Open a universal modal for adding tips to any section
  const openGlobalAddTip = () => {
    setSafetyForm({ open: true, section: 'electrical', id: null, task: '', desc: '' })
    setSafetyModalOpen(true)
  }

  // Safety Tips state
  const [safetyTips, setSafetyTips] = useState({
    electrical: [
      { id: 1, task: 'Avoid Overloading Outlets', desc: 'Never plug too many devices into one outlet or……' },
      { id: 2, task: 'Check Wires and Cords Regularly', desc: 'Inspect electrical cords for fraying, cracks, or ………' },
      { id: 3, task: 'If sparks occur', desc: 'Unplug the device if safe, turn off the breaker………' },
    ],
    kitchen: [
      { id: 1, task: 'Keep a Lid Nearby', desc: 'Smother small grease fires by sliding a lid over the pan.' },
      { id: 2, task: 'Stay in the Kitchen', desc: 'Never leave cooking unattended, especially when frying.' },
      { id: 3, task: 'Turn Pot Handles Inward', desc: 'Prevent spills and burns by keeping handles out of reach.' },
      { id: 4, task: 'Keep Flammables Away', desc: 'Keep towels, paper, and packaging at least 3 feet from the stove.' },
      { id: 5, task: 'Have a Fire Extinguisher Nearby', desc: 'Store a Class K or ABC extinguisher in the kitchen and know how to use it.' },
    ],
  })
  const [safetySearch, setSafetySearch] = useState('')
  const [safetyForm, setSafetyForm] = useState({ open: false, section: 'electrical', id: null, task: '', desc: '' })
  const [safetyModalOpen, setSafetyModalOpen] = useState(false) // used for Kitchen popup

  // Persist safety tips to localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('safetyTips')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed && parsed.electrical && parsed.kitchen) setSafetyTips(parsed)
      }
    } catch {}
  }, [])

  useEffect(() => {
    try { localStorage.setItem('safetyTips', JSON.stringify(safetyTips)) } catch {}
  }, [safetyTips])

  // Emergency Contacts state and handlers
  const [contacts, setContacts] = useState([
    { id: 1, category: 'BFP District 1', station: 'BFP Zamboanga Central', hotline: '0935-123-4567', location: 'Tetuan' },
    { id: 2, category: 'BFP District 2', station: 'BFP Ayala Substation', hotline: '0936-876-3210', location: 'Ayala' },
    { id: 3, category: 'Medical', station: 'Zamboanga City Medical Center', hotline: '0917-234-6789', location: 'Veterans Ave.' },
  ])
  const [ecForm, setEcForm] = useState({ category: '', station: '', hotline: '', location: '' })
  const [ecSearch, setEcSearch] = useState('')
  const [editingId, setEditingId] = useState(null)

  const onEcChange = (e) => setEcForm({ ...ecForm, [e.target.name]: e.target.value })
  const resetEcForm = () => { setEcForm({ category: '', station: '', hotline: '', location: '' }); setEditingId(null) }
  const saveContact = (e) => {
    e.preventDefault()
    if (!ecForm.category || !ecForm.station || !ecForm.hotline || !ecForm.location) return
    if (editingId) {
      setContacts((prev) => prev.map((c) => (c.id === editingId ? { ...c, ...ecForm } : c)))
    } else {
      const nextId = contacts.length ? Math.max(...contacts.map((c) => c.id)) + 1 : 1
      setContacts((prev) => [...prev, { id: nextId, ...ecForm }])
    }
    resetEcForm()
  }
  const editContact = (c) => { setEditingId(c.id); setEcForm({ category: c.category, station: c.station, hotline: c.hotline, location: c.location }) }
  const deleteContact = (id) => setContacts((prev) => prev.filter((c) => c.id !== id))
  const filteredContacts = contacts.filter((c) => {
    const q = ecSearch.toLowerCase()
    return [c.category, c.station, c.hotline, c.location].some((v) => v.toLowerCase().includes(q))
  })

  // Safety Tips helpers
  const filterTips = (arr) => {
    const q = safetySearch.toLowerCase()
    if (!q) return arr
    return arr.filter((t) => t.task.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q))
  }
  const openAddTip = (section) => {
    setSafetyForm({ open: true, section, id: null, task: '', desc: '' })
    setSafetyModalOpen(true)
  }
  const openEditTip = (section, tip) => {
    setSafetyForm({ open: true, section, id: tip.id, task: tip.task, desc: tip.desc })
    setSafetyModalOpen(true)
  }
  const cancelTip = () => {
    setSafetyForm({ open: false, section: 'electrical', id: null, task: '', desc: '' })
    setSafetyModalOpen(false)
  }
  const saveTip = (e) => {
    e.preventDefault()
    const { section, id, task, desc } = safetyForm
    if (!task.trim() || !desc.trim()) return
    setSafetyTips((prev) => {
      const list = [...prev[section]]
      if (id) {
        const idx = list.findIndex((t) => t.id === id)
        if (idx > -1) list[idx] = { ...list[idx], task, desc }
      } else {
        const nextId = list.length ? Math.max(...list.map((t) => t.id)) + 1 : 1
        list.push({ id: nextId, task, desc })
      }
      return { ...prev, [section]: list }
    })
    cancelTip()
  }
  const deleteTip = (section, id) => setSafetyTips((prev) => ({ ...prev, [section]: prev[section].filter((t) => t.id !== id) }))

  const newsItems = [
    {
      id: 1,
      title: '“3-Alarm Fire Controlled in ZC”',
      date: 'October 03, 2025',
      image: '/news1.jpg', // Save the provided image as public/news1.jpg
    },
    {
      id: 2,
      title: '“Grass Fire Spreads Near Vacant Lot in San Pedro”',
      date: 'October 12, 2025',
      image: '/news1.jpg',
    },
    {
      id: 3,
      title: '“Kitchen Fire Contained in San Pedro Residence”',
      date: 'October 19, 2025',
      image: '/news1.jpg',
    },
  ]

  return (
    <>
    <div className="cm-wrapper">
      <div className="cm-header">
        <h1 className="cm-title">Content Management</h1>
        <div className="cm-profile-area">
          <button className="cm-icon-button cm-bell" aria-label="Notifications" />
          <div className="cm-user-chip">
            <span className="cm-user-avatar" />
            <span className="cm-user-name">shane</span>
          </div>
        </div>
      </div>

      <div className="cm-tabs">
        <button className={`cm-tab ${activeTab === 'news' ? 'cm-tab-active' : ''}`} onClick={() => setActiveTab('news')}>News Room</button>
        <button className={`cm-tab ${activeTab === 'safety' ? 'cm-tab-active' : ''}`} onClick={() => setActiveTab('safety')}>Safety Tips</button>
        <button className={`cm-tab ${activeTab === 'contacts' ? 'cm-tab-active' : ''}`} onClick={() => setActiveTab('contacts')}>Emergency Contacts</button>
      </div>

      <div className="cm-card">
        {activeTab === 'safety' && (
        <>
        <div className="cm-card-head">
          <div className="cm-card-title">
            <h2>Safety Tips management</h2>
            <p>Manage and publish essential fire safety guidelines for public awareness.</p>
          </div>
          <div className="cm-search">
            <span className="cm-search-icon" />
            <input className="cm-search-input" placeholder="Search" value={safetySearch} onChange={(e)=>setSafetySearch(e.target.value)} />
          </div>
          <button className="cm-small-btn cm-small-btn--outline" onClick={openGlobalAddTip}>+ Add Safety tips</button>
        </div>

        <div className="cm-accordion">
          <div className="cm-section">
            <div className="cm-section-bar cm-section-bar--amber">
              <button className="cm-section-toggle" onClick={() => toggleSection('electrical')} aria-expanded={openSections.electrical}>
                <span className={openSections.electrical ? 'cm-caret-down' : 'cm-caret-right'} />
              </button>
              <div className="cm-section-title">
                <strong>Electrical Fire Safety Tips</strong>
                <span className="cm-section-meta">{safetyTips.electrical.length} tasks</span>
              </div>
              <button className="cm-small-btn cm-small-btn--outline" onClick={()=>openAddTip('electrical')}>+ Add Safety tips</button>
            </div>

            {openSections.electrical && (
              <div className="cm-table">
                <div className="cm-thead">
                  <div className="cm-th">Task Name</div>
                  <div className="cm-th">Description</div>
                  <div className="cm-th cm-th-actions">Actions</div>
                </div>
                <div className="cm-tbody">
                  {/* Electrical now uses modal form; no inline add/edit row here */}
                  {filterTips(safetyTips.electrical).map((row) => (
                    <div key={`e-${row.id}`} className="cm-tr">
                      <div className="cm-td">{row.task}</div>
                      <div className="cm-td">{row.desc}</div>
                      <div className="cm-td cm-actions">
                        <button className="cm-btn cm-btn--dark" onClick={()=>openEditTip('electrical', row)}>Edit</button>
                        <button className="cm-btn cm-btn--danger" onClick={()=>deleteTip('electrical', row.id)}>Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="cm-section">
            <div className="cm-section-bar cm-section-bar--mint">
              <button className="cm-section-toggle" onClick={() => toggleSection('kitchen')} aria-expanded={openSections.kitchen}>
                <span className={openSections.kitchen ? 'cm-caret-down' : 'cm-caret-right'} />
              </button>
              <div className="cm-section-title">
                <strong>Kitchen Fire Safety Tips</strong>
                <span className="cm-section-meta">{safetyTips.kitchen.length} tasks</span>
              </div>
              <button className="cm-small-btn cm-small-btn--outline" onClick={()=>openAddTip('kitchen')}>+ Add Safety tips</button>
            </div>

            {openSections.kitchen && (
              <div className="cm-table">
                <div className="cm-thead">
                  <div className="cm-th">Task Name</div>
                  <div className="cm-th">Description</div>
                  <div className="cm-th cm-th-actions">Actions</div>
                </div>
                <div className="cm-tbody">
                  {/* Kitchen uses modal form; no inline add/edit row here */}
                  {filterTips(safetyTips.kitchen).map((row) => (
                    <div key={`k-${row.id}`} className="cm-tr">
                      <div className="cm-td">{row.task}</div>
                      <div className="cm-td">{row.desc}</div>
                      <div className="cm-td cm-actions">
                        <button className="cm-btn cm-btn--dark" onClick={()=>openEditTip('kitchen', row)}>Edit</button>
                        <button className="cm-btn cm-btn--danger" onClick={()=>deleteTip('kitchen', row.id)}>Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        </>
        )}

        {activeTab === 'news' && (
          <>
            <div className="nr-list-head">
              <div className="nr-list-title">
                <h2>News Room</h2>
                <p>For posting general articles, announcements, and updates from BFP</p>
              </div>
            </div>
            <div className="nr-list-toolbar">
              <div className="cm-search">
                <span className="cm-search-icon" />
                <input className="cm-search-input" placeholder="Search" />
              </div>
              <button className="cm-small-btn cm-small-btn--outline" onClick={() => setShowNewsModal(true)}>+ Add news</button>
            </div>

            <div className="nr-grid">
              {newsItems.map((n) => (
                <div key={n.id} className="nr-card" onClick={() => setShowNewsModal(true)}>
                  <button className="nr-card-edit" title="Edit" onClick={(e) => { e.stopPropagation(); setShowNewsModal(true); }} />
                  <div className="nr-card-media" style={n.image ? { backgroundImage: `url(${n.image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined} />
                  <div className="nr-card-body">
                    <h3 className="nr-card-title">{n.title}</h3>
                    <p className="nr-card-date">{n.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'contacts' && (
          <>
            <div className="cm-card-head">
              <div className="cm-card-title">
                <h2>Emergency Contacts</h2>
                <p>For updating and managing official contact numbers and emergency hotlines</p>
              </div>
            </div>

            <div className="cm-search" style={{ marginTop: 8 }}>
              <span className="cm-search-icon" />
              <input className="cm-search-input" placeholder="Search" value={ecSearch} onChange={(e)=>setEcSearch(e.target.value)} />
            </div>

            <div className="ec-form">
              <form onSubmit={saveContact}>
                <div className="ec-grid">
                  <div className="ec-field">
                    <label>Category</label>
                    <input className="ec-input" name="category" value={ecForm.category} onChange={onEcChange} placeholder="Value" />
                  </div>
                  <div className="ec-field">
                    <label>Station</label>
                    <input className="ec-input" name="station" value={ecForm.station} onChange={onEcChange} placeholder="Value" />
                  </div>
                  <div className="ec-field">
                    <label>Hot-line Number</label>
                    <input className="ec-input" name="hotline" value={ecForm.hotline} onChange={onEcChange} placeholder="Value" />
                  </div>
                </div>
                <div className="ec-grid">
                  <div className="ec-field ec-field--wide">
                    <label>Location</label>
                    <input className="ec-input" name="location" value={ecForm.location} onChange={onEcChange} placeholder="Value" />
                  </div>
                  <div className="ec-actions">
                    <button type="submit" className="cm-small-btn cm-small-btn--outline">{editingId ? 'Update Contact' : 'Save Contact'}</button>
                    {editingId && (
                      <button type="button" className="cm-small-btn" onClick={resetEcForm}>Cancel</button>
                    )}
                  </div>
                </div>
              </form>
            </div>

            <div className="ec-table">
              <div className="ec-thead">
                <div className="ec-th">Category</div>
                <div className="ec-th">Station</div>
                <div className="ec-th">Hotline Number</div>
                <div className="ec-th">Location</div>
                <div className="ec-th ec-th-actions">Actions</div>
              </div>
              <div className="ec-tbody">
                {filteredContacts.map((c) => (
                  <div key={c.id} className="ec-tr">
                    <div className="ec-td">{c.category}</div>
                    <div className="ec-td">{c.station}</div>
                    <div className="ec-td">{c.hotline}</div>
                    <div className="ec-td">{c.location}</div>
                    <div className="ec-td ec-row-actions">
                      <button className="cm-btn cm-btn--dark" onClick={()=>editContact(c)}>Edit</button>
                      <button className="cm-btn cm-btn--danger" onClick={()=>deleteContact(c.id)}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
    {showNewsModal && (
      <div className="nr-modal-overlay" role="dialog" aria-modal="true">
        <div className="nr-modal">
          <div className="nr-modal-header">
            <button className="nr-back" onClick={() => setShowNewsModal(false)}>Back</button>
            <h2 className="nr-title">News Room CMS</h2>
            <div className="nr-spacer" />
          </div>

          <div className="nr-sheet">
            <form className="nr-form" onSubmit={(e)=> e.preventDefault()}>
              <div className="nr-field">
                <label>Headline Photo <span className="nr-help">Main image for the article</span></label>
                <div className="nr-dropzone nr-dropzone--xl">
                  <span className="nr-drop-icon" />
                  <button type="button" className="nr-drop-remove" aria-label="remove" />
                </div>
              </div>

              <div className="nr-field">
                <label>Headline or Title</label>
                <input className="nr-input" placeholder="Value" />
              </div>

              <div className="nr-field">
                <label>Description</label>
                <textarea className="nr-input" rows="3" placeholder="Value" />
              </div>

              <div className="nr-field">
                <label>Author</label>
                <input className="nr-input nr-input--sm" placeholder="Value" />
              </div>

              <div className="nr-field">
                <label>Additional Photos <span className="nr-help">optional extra images for more content</span></label>
                <div className="nr-dropzone nr-dropzone--sm">
                  <span className="nr-drop-icon" />
                </div>
              </div>

              <div className="nr-actions">
                <button type="submit" className="nr-post">Post News</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )}
    {safetyModalOpen && (
      <div className="nr-modal-overlay" role="dialog" aria-modal="true">
        <div className="nr-modal">
          <div className="nr-modal-header">
            <button className="nr-back" onClick={cancelTip}>Back</button>
            <h2 className="nr-title">{safetyForm.section==='kitchen' ? 'Kitchen' : 'Electrical'} Fire Safety Tip</h2>
            <div className="nr-spacer" />
          </div>
          <div className="nr-sheet">
            <form className="nr-form" onSubmit={saveTip}>
              <div className="nr-field">
                <label>Section</label>
                <select className="nr-input" value={safetyForm.section} onChange={(e)=>setSafetyForm({...safetyForm, section: e.target.value})}>
                  <option value="electrical">Electrical Fire Safety Tips</option>
                  <option value="kitchen">Kitchen Fire Safety Tips</option>
                </select>
              </div>
              <div className="nr-field">
                <label>Task Name</label>
                <input className="nr-input" placeholder="Task name" value={safetyForm.task} onChange={(e)=>setSafetyForm({...safetyForm, task:e.target.value})} />
              </div>
              <div className="nr-field">
                <label>Description</label>
                <textarea className="nr-input" rows="3" placeholder="Description" value={safetyForm.desc} onChange={(e)=>setSafetyForm({...safetyForm, desc:e.target.value})} />
              </div>
              <div className="nr-actions">
                <button type="submit" className="nr-post">{safetyForm.id? 'Update' : 'Save'}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )}
    </>
  )
}

export default ContentManagement

