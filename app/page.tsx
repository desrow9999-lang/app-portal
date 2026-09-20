'use client';

import { useState } from 'react';
import appsData from '@/data/apps.json';

export default function AppPortal() {
  const [selectedCategory, setSelectedCategory] = useState('すべて');

  // カテゴリ一覧の抽出
  const categories = ['すべて', ...Array.from(new Set(appsData.map((app) => app.category)))];

  // フィルタリング
  const filteredApps = selectedCategory === 'すべて'
    ? appsData
    : appsData.filter((app) => app.category === selectedCategory);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 px-4 py-8 max-w-2xl mx-auto">
      {/* ヘッダーセクション */}
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
          Yasuyuki Dev Apps
        </h1>
        <p className="text-sm text-slate-400 mt-2">
          開発・運営中のプロダクト一覧。あなたの課題を解決するツールが見つかります。
        </p>
      </header>

      {/* カテゴリ絞り込みタブ */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              selectedCategory === category
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* アプリカード一覧 */}
      <div className="grid gap-4">
        {filteredApps.map((app) => (
          <div
            key={app.id}
            className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 shadow-lg backdrop-blur-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800/50">
                  {app.category}
                </span>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-800/30">
                  {app.price}
                </span>
              </div>

              <h2 className="text-lg font-bold text-slate-100 mb-1">{app.title}</h2>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">{app.description}</p>
            </div>

            {/* アクションボタン */}
            <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between gap-3">
              <span className="text-[10px] text-slate-500 font-mono">ID: {app.id}</span>
              <a
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold py-2.5 px-4 rounded-xl shadow transition-colors"
              >
                アプリを開く / 購入する →
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* フッター */}
      <footer className="mt-12 text-center text-xs text-slate-600">
        &copy; 2026 Yasuyuki Dev. All rights reserved.
      </footer>
    </main>
  );
}
