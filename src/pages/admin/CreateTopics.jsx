import React, { useState } from 'react'
import TopicForm from '../../components/form/TopicForm'
import { useTopic } from '../../hooks/topic/useTopic';
import TopicTable from '../../components/tables/TopicTable';
import { GraduationCap } from 'lucide-react';

const CreateTopics = () => {
    const [open, setOpen] = useState(false)
    const { data, isLoading, isError, error } = useTopic();
    const topic = data?.data;

    return (
        <section className='py-12'>
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-blue-600/20 rounded-xl">
                        <GraduationCap className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Create Topics</h1>
                        <p className="text-gray-400 text-sm">Create and manage topics</p>
                    </div>
                </div>

                <button
                    onClick={() => setOpen(true)}
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
                >
                    + Create Topic
                </button>
            </div>
            <div>
                {isLoading && (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                        <span className="ml-3 text-gray-400">Loading topics...</span>
                    </div>
                )}

                {isError && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3 text-red-400">
                        <AlertCircle className="w-5 h-5" />
                        <p>Error loading topics: {error?.message || 'Unknown error'}</p>
                    </div>
                )}

                {!isLoading && !isError && (
                    <TopicTable topics={topic} />
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
