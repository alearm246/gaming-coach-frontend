import Link from 'next/link'

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gray-950 text-white flex flex-col">
            {/* Navbar */}
            <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-800">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                        GC
                    </div>
                    <span className="font-semibold text-lg">Gaming Coach</span>
                </div>
                <div className="flex items-center gap-4">
                    <Link href="/login" className="text-gray-400 hover:text-white text-sm transition-colors">
                        Sign in
                    </Link>
                    <Link href="/register" className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
                        Get started
                    </Link>
                </div>
            </nav>

            {/* Hero */}
            <div className="flex-1 flex flex-col items-center justify-center text-center px-4 gap-6">
                <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-2xl mb-2">
                    GC
                </div>
                <h1 className="text-5xl font-bold max-w-2xl leading-tight">
                    Your personal Clash Royale AI coach
                </h1>
                <p className="text-gray-400 text-lg max-w-xl">
                    Connect your account, analyze your match history, and get personalized coaching advice powered by AI.
                </p>
                <div className="flex gap-4 mt-2">
                    <Link href="/register" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
                        Get started for free
                    </Link>
                    <Link href="/login" className="bg-gray-800 hover:bg-gray-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
                        Sign in
                    </Link>
                </div>

                {/* Feature pills */}
                <div className="flex gap-3 mt-6 flex-wrap justify-center">
                    {['Match history analysis', 'AI powered coaching', 'Elixir insights', 'Deck advice'].map(feature => (
                        <span key={feature} className="bg-gray-800 text-gray-300 text-sm px-4 py-2 rounded-full">
                            {feature}
                        </span>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <footer className="text-center text-gray-600 text-sm py-6 border-t border-gray-800">
                Built with Flask, PostgreSQL, pgvector, and Next.js
            </footer>
        </div>
    )
}