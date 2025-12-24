import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCreateTopic } from '../../hooks/topic/useCreateTopic'

const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
}

const modalVariants = {
    hidden: {
        opacity: 0,
        scale: 0.9,
        y: 30
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 25
        }
    },
    exit: {
        opacity: 0,
        scale: 0.9,
        y: 30
    }
}

const TopicForm = ({ isOpen, onClose }) => {
    const { formik, isPending } = useCreateTopic()

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                    variants={backdropVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    onClick={onClose}
                >
                    <motion.div
                        className="w-full max-w-md bg-primary p-6 rounded-2xl"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h1 className="text-2xl font-bold">Create New Topic</h1>
                        <hr className='border opacity-30 my-4' />

                        <form onSubmit={formik.handleSubmit}>
                            <div className="mb-4">
                                <label className="block mb-2 font-medium">Topic Title <span className='text-red-500'>*</span></label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    className="w-full p-2 border border-gray-300/20 bg-transparent rounded-lg outline-none"
                                    placeholder="Enter topic title"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2 font-medium">Description <span className='text-red-500'>*</span></label>
                                <textarea
                                    name="description"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    className="w-full p-2 border border-gray-300/20 bg-transparent rounded-lg"
                                    placeholder="Enter topic description"
                                />
                            </div>

                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 rounded-lg border border-gray-500"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className={`px-4 py-2 rounded-lg text-white ${isPending
                                            ? 'bg-gray-500 cursor-not-allowed'
                                            : 'bg-secondary hover:bg-blue-700'
                                        }`}
                                >
                                    {isPending ? 'Creating...' : 'Create Topic'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default TopicForm
