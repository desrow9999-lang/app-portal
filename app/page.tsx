'use client'

import { useState, useEffect } from 'react'

interface AppItem {
  id: string
  name: string
  tagline: string
  description: string
  category: string
  price: string
  url: string
}

const initialApps: AppItem[] = [
  {
    id: "reiwa-otakiage",
    name: "令和お焚き上げ文芸院",
    tagline: "デジタルお焚き上げでモヤモヤを解消",
    description: "不要なテキストやモヤモヤをデジタルお焚き上げ。心を軽くするユーモア文芸ツール。",
    category: "エンタメ・ゲーム",
    price: "¥500 JPY",
    url: "https://example.com"
  },
  {
    id: "tail-puzzle",
    name: "TailPuzzle",
    tagline: "スキマ時間で遊べる思考型パズル",
    description: "スキマ時間にサクッと遊べる、思考型パズルゲームアプリ。",
    category: "ツール・効率化",
    price: "¥980 JPY",
    url: "https://example.com"
  },
  {
    id: "dev-body",
    name: "DevBody",
    tagline: "開発者のための健康・姿勢管理",
    description: "開発者のための健康・姿勢・コンディショニング管理ツール。",
    category: "ビジネス・メンタル",
    price: "¥2,980 JPY",
    url: "https://example.com"
  }
]

export default function Home() {
  const [apps, setApps] = useState<AppItem[]>(initialApps)
  const [isOpen, setIsOpen] = useState(false)
  
  // 入力フォームの状態
  const [name, setName] = useState('')
  const [tagline, setTagline] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('ツール・効率化')
  const [price, setPrice] = useState('¥1,000 JPY')
  const [url, setUrl] = useState('https://example.com')

  // 起動時にLocalStorageからデータを読み込む
  useEffect(() => {
    const saved = localStorage.getItem('yasuyuki_apps')
    if (saved) {
      try {
        setApps(JSON.parse(saved))
      } catch (e) {
        // パース失敗時は初期値
      }
    }
  }, [])

  // データを保存する関数
  const saveApps = (newApps: AppItem[]) => {
    setApps(newApps)
    localStorage.setItem('yasuyuki_apps', JSON.stringify(newApps))
  }

  // アプリ追加処理
  const handleAddApp = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name) return

    const newApp: AppItem = {
      id: name.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Date.now().toString().slice(-4),
      name,
      tagline,
      description,
      category,
      price,
      url: url || 'https://example.com'
    }

    const updated = [newApp, ...apps]
    saveApps(updated)

    // フォームをリセットして閉じる
    setName('')
    setTagline('')
    setDescription('')
    setIsOpen(false)
  }

  // アプリ削除処理
  const handleDelete = (id: string) => {
    if (confirm('このアプリを削除してもよろしいですか？')) {
      const updated = apps.filter(app => app.id !== id)
      saveApps(updated)
    }
  }

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#030712', color: '#f9fafb', padding: '48px 16px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* ヘッダーセクション */}
        <header style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ display: 'inline-block', marginBottom: '12px', padding: '4px 12px', backgroundColor: 'rgba(6, 182, 212, 0.1)', border: '1px solid rgba(6, 182, 212, 0.2)', borderRadius: '9999px', color: '#22d3ee', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Product Portfolio & Tools
          </div>
          <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '16px', background: 'linear-gradient(to right, #ffffff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Yasuyuki Dev Apps
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '16px', maxWidth: '500px', margin: '0 auto', lineHeight: '1.6', marginBottom: '24px' }}>
            開発・運営中のプロダクト一覧。あなたの課題をスマートに解決する実用的なツール群。
          </p>

          {/* 追加ボタン */}
          <button 
            onClick={() => setIsOpen(true)}
            style={{ padding: '10px 20px', backgroundColor: '#0891b2', color: '#ffffff', fontWeight: '600', fontSize: '14px', borderRadius: '12px', border: 'none', cursor: 'pointer', boxShadow: '0 10px 15px -3px rgba(8, 145, 178, 0.3)' }}
          >
            ＋ 新規アプリを追加する
          </button>
        </header>

        {/* 追加モーダルフォーム */}
        {isOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', zIndex: 50 }}>
            <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '24px', width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px', color: '#fff' }}>新規アプリの登録</h2>
              
              <form onSubmit={handleAddApp} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>アプリ名 *</label>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    required 
                    placeholder="例: MyCoolApp"
                    style={{ width: '100%', padding: '10px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff', fontSize: '14px' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>タグライン（短いキャッチコピー）</label>
                  <input 
                    type="text" 
                    value={tagline} 
                    onChange={e => setTagline(e.target.value)} 
                    placeholder="例: 効率を最大化するツール"
                    style={{ width: '100%', padding: '10px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff', fontSize: '14px' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>詳細説明</label>
                  <textarea 
                    value={description} 
                    onChange={e => setDescription(e.target.value)} 
                    placeholder="アプリの詳細な説明文"
                    rows={3}
                    style={{ width: '100%', padding: '10px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff', fontSize: '14px' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>カテゴリ</label>
                    <input 
                      type="text" 
                      value={category} 
                      onChange={e => setCategory(e.target.value)} 
                      style={{ width: '100%', padding: '10px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff', fontSize: '14px' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>価格</label>
                    <input 
                      type="text" 
                      value={price} 
                      onChange={e => setPrice(e.target.value)} 
                      style={{ width: '100%', padding: '10px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff', fontSize: '14px' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>アプリのURL</label>
                  <input 
                    type="url" 
                    value={url} 
                    onChange={e => setUrl(e.target.value)} 
                    style={{ width: '100%', padding: '10px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff', fontSize: '14px' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                  <button 
                    type="submit"
                    style={{ flex: 1, padding: '10px', backgroundColor: '#0891b2', color: '#fff', fontWeight: '600', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
                  >
                    追加する
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsOpen(false)}
                    style={{ flex: 1, padding: '10px', backgroundColor: '#334155', color: '#fff', fontWeight: '600', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
                  >
                    キャンセル
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* アプリ一覧グリッド */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {apps.map((app) => (
            <div 
              key={app.id}
              style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid #1e293b', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)', position: 'relative' }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '16px' }}>
                  <span style={{ padding: '4px 10px', backgroundColor: 'rgba(30, 41, 59, 0.8)', color: '#cbd5e1', fontSize: '12px', fontWeight: '500', borderRadius: '8px', border: '1px solid rgba(51, 65, 85, 0.5)' }}>
                    {app.category}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#22d3ee', fontWeight: '700', fontSize: '14px', backgroundColor: 'rgba(6, 182, 212, 0.1)', padding: '4px 10px', borderRadius: '8px', border: '1px solid rgba(6, 182, 212, 0.2)' }}>
                      {app.price}
                    </span>
                    <button 
                      onClick={() => handleDelete(app.id)}
                      title="削除"
                      style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '14px', padding: '4px' }}
                    >
                      ×
                    </button>
                  </div>
                </div>

                <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#ffffff', marginBottom: '4px' }}>
                  {app.name}
                </h2>
                <p style={{ fontSize: '14px', fontWeight: '500', color: 'rgba(103, 232, 249, 0.8)', marginBottom: '12px' }}>
                  {app.tagline}
                </p>

                <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.6', marginBottom: '24px' }}>
                  {app.description}
                </p>
              </div>

              <div style={{ paddingTop: '16px', borderTop: '1px solid rgba(30, 41, 59, 0.8)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', color: '#64748b', fontFamily: 'monospace' }}>ID: {app.id}</span>
                <a 
                  href={app.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'linear-gradient(to right, #0891b2, #2563eb)', color: '#ffffff', fontSize: '14px', fontWeight: '600', borderRadius: '12px', textDecoration: 'none', boxShadow: '0 10px 15px -3px rgba(8, 145, 178, 0.2)' }}
                >
                  アプリを開く・購入 →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* フッター */}
        <footer style={{ marginTop: '80px', textAlign: 'center', fontSize: '12px', color: '#475569' }}>
          &copy; 2026 Yasuyuki Dev Apps. All rights reserved.
        </footer>
      </div>
    </main>
  )
}
