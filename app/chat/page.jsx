/** @format */

// app/chat/page.jsx
'use client';
import { useState } from 'react';
import axios from 'axios';

const Chat = () => {
	const [input, setInput] = useState('');
	const [messages, setMessages] = useState([]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!input.trim()) return;

		const newMessage = { sender: 'user', text: input };
		setMessages((prevMessages) => [...prevMessages, newMessage]);
		setInput('');

		try {
			const { data } = await axios.post('/api/handlers', { message: input });
			const botMessage = { sender: 'bot', text: data.response };
			setMessages((prevMessages) => [...prevMessages, botMessage]);
		} catch (error) {
			console.error('Error sending message:', error);
			const errorMessage = {
				sender: 'bot',
				text: 'Error: Unable to send message.',
			};
			setMessages((prevMessages) => [...prevMessages, errorMessage]);
		}
	};

	return (
		<div className='flex flex-col p-6 bg-white rounded-lg shadow-lg h-screen'>
			<h2 className='text-2xl font-bold mb-4'>Chat with GPT</h2>
			<div className='flex-1 overflow-y-auto border border-gray-300 rounded p-4 mb-4'>
				{messages.map((msg, index) => (
					<div
						key={index}
						className={`mb-2 ${
							msg.sender === 'user' ? 'text-right' : 'text-left'
						}`}>
						<span
							className={`inline-block rounded px-3 py-1 ${
								msg.sender === 'user'
									? 'bg-indigo-600 text-white'
									: 'bg-gray-200 text-gray-800'
							}`}>
							{msg.text}
						</span>
					</div>
				))}
			</div>
			<form
				onSubmit={handleSubmit}
				className='flex'>
				<input
					type='text'
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder='Type your message...'
					className='flex-1 p-2 border border-gray-300 rounded mr-2 focus:outline-none focus:ring focus:ring-indigo-500'
				/>
				<button
					type='submit'
					className='bg-indigo-600 text-white rounded p-2 hover:bg-indigo-500 transition duration-300'>
					Send
				</button>
			</form>
		</div>
	);
};

export default Chat;
