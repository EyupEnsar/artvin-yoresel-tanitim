'use client'
import { useEffect, useState } from 'react'

export default function MenuPage() {
  const [items, setItems] = useState<any[]>([])
  const [form, setForm] = useState({ label: '', labelEn: '', href: '', order: 0, isVisible: true })
  const [editId, setEditId] = useState<string | null>(null)

  async function load() { const r = await fetch('/api/menu'); setItems(await r.json()) }
  useEffect(() => { load() }, [])

  async function save() {
    if (editId) {
      await fetch(`/api/menu/${editId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      setEditId(null)
    } else {
      await fetch('/api/menu', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    }
    setForm({ label: '', labelEn: '', href: '', order: 0, isVisible: true })
    load()
  }

  async function del(id: string) {
    if (!confirm('Silmek istediğine emin misin?')) return
    await fetch(`/api/menu/${id}`, { method: 'DELETE' }); load()
  }

  function startEdit(item: any) {
    setEditId(item._id)
    setForm({ label: item.label, labelEn: item.labelEn||'', href: item.href, order: item.order||0, isVisible: item.isVisible !== false })
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Menü Yönetimi</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-5">
          <h2 className="font-semibold mb-4">{editId ? 'Menü Öğesi Düzenle' : 'Yeni Menü Öğesi'}</h2>
          <div className="space-y-3">
            <div><label className="block text-sm font-medium mb-1">Etiket (TR) *</label>
              <input value={form.label} onChange={e => setForm(f => ({ ...f, label: e.target.value }))} className="w-full border rounded px-3 py-2 text-sm text-gray-900 bg-white" /></div>
            <div><label className="block text-sm font-medium mb-1">Etiket (EN)</label>
              <input value={form.labelEn} onChange={e => setForm(f => ({ ...f, labelEn: e.target.value }))} className="w-full border rounded px-3 py-2 text-sm text-gray-900 bg-white" /></div>
            <div><label className="block text-sm font-medium mb-1">Bağlantı (href)</label>
              <input value={form.href} onChange={e => setForm(f => ({ ...f, href: e.target.value }))} placeholder="/food" className="w-full border rounded px-3 py-2 text-sm text-gray-900 bg-white" /></div>
            <div><label className="block text-sm font-medium mb-1">Sıra</label>
              <input type="number" value={form.order} onChange={e => setForm(f => ({ ...f, order: +e.target.value }))} className="w-full border rounded px-3 py-2 text-sm text-gray-900 bg-white" /></div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.isVisible} onChange={e => setForm(f => ({ ...f, isVisible: e.target.checked }))} /> Görünür
            </label>
            <div className="flex gap-2">
              <button onClick={save} className="bg-gray-900 text-white px-4 py-2 rounded text-sm hover:bg-gray-700">Kaydet</button>
              {editId && <button onClick={() => { setEditId(null); setForm({ label: '', labelEn: '', href: '', order: 0, isVisible: true }) }} className="border px-4 py-2 rounded text-sm">İptal</button>}
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b"><tr><th className="text-left px-4 py-3">Etiket</th><th className="text-left px-4 py-3">Href</th><th className="text-left px-4 py-3">Sıra</th><th className="px-4 py-3"></th></tr></thead>
            <tbody>
              {items.sort((a,b) => (a.order||0)-(b.order||0)).map(item => (
                <tr key={item._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{item.label} {!item.isVisible && <span className="text-gray-700 text-xs">(gizli)</span>}</td>
                  <td className="px-4 py-3 text-gray-700">{item.href}</td>
                  <td className="px-4 py-3 text-gray-700">{item.order}</td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button onClick={() => startEdit(item)} className="text-blue-600 hover:underline">Düzenle</button>
                    <button onClick={() => del(item._id)} className="text-red-500 hover:underline">Sil</button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-700">Kayıt yok</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
