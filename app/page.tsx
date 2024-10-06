// app/page.tsx
import Link from 'next/link';
export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Welcome to ChatGPT</h1>
                <p className="text-lg mb-8">
                    Experience the power of AI conversation. Click below to start chatting!
                </p>
                <Link href="/chat" className="bg-white text-indigo-600 rounded-lg px-6 py-3 font-semibold transition duration-300 hover:bg-gray-200">
                    Start Chatting
                </Link>
            </div>
        </div>
    );
}
