import React, { useState } from 'react'
import TopicForm from '../../components/form/TopicForm'
import { useTopic } from '../../hooks/topic/useTopic';

const CreateTopics = () => {
    const [open, setOpen] = useState(false)
    const { data, isLoading, isError, error } = useTopic();
    const topic = data?.data;
    const truncateText = (text, maxLength = 80) => {
        if (!text) return '-'
        return text.length > maxLength
            ? text.slice(0, maxLength) + '...'
            : text
    }

    return (
        <section className='py-12'>
            <div className="flex justify-between items-center mb-8">
                <h1 className='text-2xl font-bold'>Topics</h1>

                <button
                    onClick={() => setOpen(true)}
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
                >
                    + Create Topic
                </button>
            </div>
            <div>
                {isLoading && <p>Loading topics...</p>}
                {isError && <p className="text-red-500">Error loading topics: {error.message}</p>}
                {!isLoading && !isError && topic && topic.length === 0 && (
                    <p>No topics available. Click "Create Topic" to add one.</p>
                )}
                {!isLoading && !isError && topic && topic.length > 0 && (
                    <table className='w-full mt-6 overflow-x-auto bg-primary/70 rounded-lg'>
                        <thead className='bg-primary rounded-lg'>
                            <tr>
                                <th className="text-left px-4 py-2">Title</th>
                                <th className="text-left px-4 py-2">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topic.map((item) => (
                                <tr key={item.id}>
                                    <td className="px-4 py-6 opacity-50">{item.name}</td>
                                    <td className="px-4 py-6 opacity-50">{truncateText(item.description, 95)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <TopicForm
                isOpen={open}
                onClose={() => setOpen(false)}
            />
        </section>
    )
}

export default CreateTopics
