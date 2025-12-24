import { useTopic } from '../../hooks/topic/useTopic';
import { useGenerateCourse } from '../../hooks/course/useGenerateCourse';
import { motion, AnimatePresence } from 'framer-motion'


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

const CourseForm = ({ isOpen, onClose }) => {

    const { data: topicsData, isLoading: isLoadingTopics, isError } = useTopic();
    const { formik, isPending } = useGenerateCourse();
    const topics = topicsData?.data || [];

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
                        <h1 className="text-2xl font-bold">Create New Courses</h1>
                        <hr className='border opacity-30 my-4' />

                        <form onSubmit={formik.handleSubmit} className="space-y-5">

                            {/* --- Dropdown Topic --- */}
                            <div className="flex flex-col gap-1">
                                <label htmlFor="topic_id" className="text-sm font-semibold ">
                                    Select Topic <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="topic_id"
                                    name="topic_id"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.topic_id}
                                    disabled={isLoadingTopics}
                                    className={`w-full p-2.5 border border-gray-300/20 rounded-md bg-transparent ${formik.touched.topic_id && formik.errors.topic_id
                                        ? "border-red-500"
                                        : "border-gray-300"
                                        }`}
                                >
                                    <option value="" disabled>
                                        {isLoadingTopics ? "Loading topics..." : "-- Choose a Topic --"}
                                    </option>

                                    {/* Mapping Data Topic */}
                                    {!isLoadingTopics && topics.map((topic) => (
                                        <option key={topic.id} value={topic.id}>
                                            {topic.name}
                                        </option>
                                    ))}
                                </select>

                                {/* Error Message */}
                                {formik.touched.topic_id && formik.errors.topic_id && (
                                    <span className="text-red-500 text-xs font-medium">
                                        {formik.errors.topic_id}
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-col gap-1">
                                <label htmlFor="difficulty" className="text-sm font-semibold">
                                    Select Difficulty <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="difficulty"
                                    name="difficulty"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.difficulty} // Ini sekarang bernilai "beginner" sejak awal
                                    className="w-full p-2.5 border border-gray-300/20 bg-transparent rounded-md  outline-none"
                                >
                                    {/* Hapus opsi placeholder/disabled, langsung opsi valid saja */}
                                    <option value="beginner">Beginner</option>
                                    <option value="intermediate">Intermediate</option>
                                    <option value="advanced">Advanced</option>
                                </select>
                            </div>

                            <div className='flex justify-end gap-3'>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 rounded-lg border border-gray-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isPending || isLoadingTopics}
                                    className={` py-2.5 px-4 rounded-md text-white font-bold tracking-wide transition-all duration-200 
            ${isPending || isLoadingTopics
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-secondary hover:bg-blue-700 shadow-lg hover:shadow-xl'}`}
                                >
                                    {isPending ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                                            Generating...
                                        </div>
                                    ) : (
                                        "Generate Course"
                                    )}
                                </button>
                            </div>

                        </form>


                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CourseForm;