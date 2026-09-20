export default function Home() {
  const apps = [
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

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#030712', color: '#f9fafb', padding: '48px 16px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* ヘッダーセクション */}
        <header style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{ display: 'inline-block', marginBottom: '12px', padding: '4px 12px', backgroundColor: 'rgba(6, 182, 212, 0.1)', border: '1px solid rgba(6, 182, 212, 0.2)', borderRadius: '9999px', color: '#22d3ee', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Product Portfolio & Tools
          </div>
          <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '16px', background: 'linear-gradient(to right, #ffffff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Yasuyuki Dev Apps
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '16px', maxWidth: '500px', margin: '0 auto', lineHeight: '1.6' }}>
            開発・運営中のプロダクト一覧。あなたの課題をスマートに解決する実用的なツール群。
          </p>
        </header>

        {/* アプリ一覧グリッド */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {apps.map((app) => (
            <div 
              key={app.id}
              style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid #1e293b', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)' }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '16px' }}>
                  <span style={{ padding: '4px 10px', backgroundColor: 'rgba(30, 41, 59, 0.8)', color: '#cbd5e1', fontSize: '12px', fontWeight: '500', borderRadius: '8px', border: '1px solid rgba(51, 65, 85, 0.5)' }}>
                    {app.category}
                  </span>
                  <span style={{ color: '#22d3ee', fontWeight: '700', fontSize: '14px', backgroundColor: 'rgba(6, 182, 212, 0.1)', padding: '4px 10px', borderRadius: '8px', border: '1px solid rgba(6, 182, 212, 0.2)' }}>
                    {app.price}
                  </span>
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
