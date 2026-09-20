import fs from 'fs'
import path from 'path'
import Link from 'next/link'

interface AppItem {
  id: string
  name: string
  tagline: string
  description: string
  category: string
  price: string
  url: string
}

async function getApps(): Promise<AppItem[]> {
  try {
    const filePath = path.join(process.cwd(), 'data/apps.json')
    const fileData = fs.readFileSync(filePath, 'utf8')
    const data = JSON.parse(fileData)
    return data.apps || []
  } catch (error) {
    return []
  }
}

export default async function Home() {
  const apps = await getApps()

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* ヘッダーセクション（マーケティング視点でのキャッチコピー） */}
        <header className="text-center mb-16">
          <div className="inline-block mb-3 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-xs font-semibold tracking-wider uppercase">
            Product Portfolio & Tools
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Yasuyuki Dev Apps
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            開発・運営中のプロダクト一覧。あなたの課題をスマートに解決する実用的なツール群。
          </p>
        </header>

        {/* アプリ一覧グリッド */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {apps.map((app) => (
            <div 
              key={app.id}
              className="group relative bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between shadow-xl backdrop-blur-sm hover:shadow-cyan-500/5 hover:-translate-y-1"
            >
              <div>
                {/* カテゴリと価格バッジ */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-3 py-1 bg-slate-800/80 text-slate-300 text-xs font-medium rounded-lg border border-slate-700/50">
                    {app.category}
                  </span>
                  <span className="text-cyan-400 font-bold text-sm bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/20">
                    {app.price}
                  </span>
                </div>

                {/* アプリ名とタグライン */}
                <h2 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                  {app.name}
                </h2>
                <p className="text-sm font-medium text-cyan-300/80 mb-3">
                  {app.tagline}
                </p>

                {/* 説明文 */}
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {app.description}
                </p>
              </div>

              {/* アクションボタン */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-mono">ID: {app.id}</span>
                <a 
                  href={app.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-sm font-semibold rounded-xl hover:from-cyan-500 hover:to-blue-500 transition-all shadow-lg shadow-cyan-900/20 active:scale-95"
                >
                  アプリを開く・購入
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* フッター */}
        <footer className="mt-20 text-center text-xs text-slate-600">
          &copy; 2026 Yasuyuki Dev Apps. All rights reserved.
        </footer>
      </div>
    </main>
  )
}
