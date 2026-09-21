'use client';

import { useState, useEffect } from 'react';

interface AppItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  price: string;
  url: string;
}

const defaultApps: AppItem[] = [
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
  }
];

export default function Home() {
  const [apps, setApps] = useState<AppItem[]>(defaultApps);
  const [showModal, setShowModal] = useState(false);

  // フォーム用ステート
  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('ツール・効率化');
  const [price, setPrice] = useState('¥1,000 JPY');
  const [url, setUrl] = useState('https://example.com');

  useEffect(() => {
    const saved = localStorage.getItem('my_yasuyuki_apps_v2');
    if (saved) {
      try {
        setApps(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    const newApp: AppItem = {
      id: 'app-' + Date.now(),
      name,
      tagline,
      description,
      category,
      price,
      url
    };

    const updated = [newApp, ...apps];
    setApps(updated);
    localStorage.setItem('my_yasuyuki_apps_v2', JSON.stringify(updated));

    // フォーム初期化 & 閉じる
    setName('');
    setTagline('');
    setDescription('');
    setShowModal(false);
  };

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#030712', color: '#f9fafb', padding: '40px 16px', fontFamily: 'sans-serif', position: 'relative' }}>
      
      {/* 左上の小さな新規作成タブ */}
      <div style={{ position: 'absolute', top: '16px', left: '16px' }}>
        <button 
          onClick={() => setShowModal(true)}
          style={{ padding: '6px 12px', backgroundColor: 'rgba(8, 145, 178, 0.15)', border: '1px solid rgba(8, 145, 178, 0.3)', color: '#22d3ee', fontSize: '11px', fontWeight: 'bold', borderRadius: '8px', cursor: 'pointer' }}
        >
          ＋ 新規作成
        </button>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* ヘッダー */}
        <header style={{ textAlign: 'center', marginBottom: '40px', marginTop: '16px' }}>
          <span style={{ display: 'inline-block', padding: '4px 12px', backgroundColor: 'rgba(6, 182, 212, 0.1)', border: '1px solid rgba(6, 182, 212, 0.2)', borderRadius: '999px', color: '#22d3ee', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '12px' }}>
            Product Portfolio & Tools
          </span>
          <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px', background: 'linear-gradient(to right, #ffffff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Yasuyuki Dev Apps
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '14px', maxWidth: '480px', margin: '0 auto', lineHeight: '1.5' }}>
            開発・運営中のプロダクト一覧。あなたの課題をスマートに解決する実用的なツール群。
          </p>
        </header>

        {/* モーダルフォーム */}
        {showModal && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', zIndex: 100 }}>
            <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px', width: '100%', maxWidth: '440px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: '#fff' }}>新しいアプリを追加</h3>
              <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '11px', color: '#94a3b8' }}>アプリ名 *</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="例: TaskMaster" style={{ width: '100%', padding: '8px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '6px', color: '#fff', fontSize: '14px' }} />
                </div>
                <div>
                  <label style={{ fontSize: '11px', color: '#94a3b8' }}>キャッチコピー</label>
                  <input type="text" value={tagline} onChange={e => setTagline(e.target.value)} placeholder="例: 爆速でタスクを消化" style={{ width: '100%', padding: '8px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '6px', color: '#fff', fontSize: '14px' }} />
                </div>
                <div>
                  <label style={{ fontSize: '11px', color: '#94a3b8' }}>説明</label>
                  <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="アプリの説明文" rows={2} style={{ width: '100%', padding: '8px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '6px', color: '#fff', fontSize: '14px' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <div>
                    <label style={{ fontSize: '11px', color: '#94a3b8' }}>カテゴリ</label>
                    <input type="text" value={category} onChange={e => setCategory(e.target.value)} style={{ width: '100%', padding: '8px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '6px', color: '#fff', fontSize: '14px' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '11px', color: '#94a3b8' }}>価格</label>
                    <input type="text" value={price} onChange={e => setPrice(e.target.value)} style={{ width: '100%', padding: '8px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '6px', color: '#fff', fontSize: '14px' }} />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '11px', color: '#94a3b8' }}>URL</label>
                  <input type="url" value={url} onChange={e => setUrl(e.target.value)} style={{ width: '100%', padding: '8px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '6px', color: '#fff', fontSize: '14px' }} />
                </div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                  <button type="submit" style={{ flex: 1, padding: '10px', backgroundColor: '#0891b2', color: '#fff', fontWeight: 'bold', borderRadius: '6px', border: 'none', cursor: 'pointer' }}>追加</button>
                  <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: '10px', backgroundColor: '#334155', color: '#fff', fontWeight: 'bold', borderRadius: '6px', border: 'none', cursor: 'pointer' }}>キャンセル</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* アプリ一覧 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {apps.map((app) => (
            <div key={app.id} style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid #1e293b', borderRadius: '14px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ padding: '2px 8px', backgroundColor: '#1e293b', color: '#cbd5e1', fontSize: '11px', borderRadius: '6px' }}>{app.category}</span>
                <span style={{ color: '#22d3ee', fontWeight: 'bold', fontSize: '13px' }}>{app.price}</span>
              </div>
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', marginBottom: '2px' }}>{app.name}</h2>
                <p style={{ fontSize: '13px', color: '#22d3ee', marginBottom: '6px' }}>{app.tagline}</p>
                <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.4' }}>{app.description}</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '8px', borderTop: '1px solid #1e293b' }}>
                <a href={app.url} target="_blank" rel="noopener noreferrer" style={{ padding: '6px 14px', background: 'linear-gradient(to right, #0891b2, #2563eb)', color: '#fff', fontSize: '13px', fontWeight: 'bold', borderRadius: '8px', textDecoration: 'none' }}>
                  アプリを開く →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* フッター */}
        <footer style={{ marginTop: '60px', textAlign: 'center', fontSize: '11px', color: '#475569' }}>
          &copy; 2026 Yasuyuki Dev Apps. All rights reserved.
        </footer>
      </div>
    </main>
  );
}
