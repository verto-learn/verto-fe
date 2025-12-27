import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SendHorizontal } from "lucide-react";
import { TopicSelect } from "../../components/quiz/TopicSelect";
import { QuizQuestion } from "../../components/quiz/QuizQuestion";
import { QuizSummary } from "../../components/quiz/QuizSummary";
import { useTopic } from "../../hooks/topic/useTopic";
import { useQuiz } from "../../hooks/quiz/useQuiz";
import { useSubmitQuiz } from "../../hooks/quiz/useSubmitQuiz";

const Quiz = () => {
  const { data, isLoading: isLoadingTopics } = useTopic();
  const topics = data?.data;

  const [selectedTopic, setSelectedTopic] = useState("");
  const [isTopicSelected, setIsTopicSelected] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { data: quizData, isFetching: isLoadingQuiz } = useQuiz(
    isTopicSelected ? selectedTopic : null
  );

  const { formik, data: submitResult, isPending: isSubmitting } = useSubmitQuiz(() => {
    setIsSubmitted(true);
  });

  // Ambil data hasil dari dalam objek response data
  const resultData = submitResult?.data; 

  const handleSelectTopic = (id) => {
    setSelectedTopic(id);
    setIsTopicSelected(true);
    formik.setFieldValue("topicId", id);
  };

  const handleAnswer = (questionId, option) => {
    const updated = formik.values.answers.filter((a) => a.questionId !== questionId);
    formik.setFieldValue("answers", [...updated, { questionId, answerIndex: option }]);
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center  p-6 relative">
      <AnimatePresence mode="wait">
        
        {/* Step 1: Pilih Topik */}
        {!isTopicSelected && !isLoadingTopics && (
          <motion.div key="topic" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <TopicSelect topics={topics} selected={selectedTopic} onChange={handleSelectTopic} />
          </motion.div>
        )}

        {/* Step 2: Loading */}
        {isTopicSelected && isLoadingQuiz && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
             <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
          </motion.div>
        )}

        {/* Step 3: Soal Quiz */}
        {isTopicSelected && !isLoadingQuiz && quizData && !isSubmitted && (
          <motion.div key="quiz" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }} className="w-full max-w-2xl flex flex-col gap-6">
            {quizData.map((q, i) => (
              <QuizQuestion key={q.id} question={q} index={i} onAnswer={handleAnswer} />
            ))}
            <button
              onClick={formik.handleSubmit}
              disabled={isSubmitting}
              className="bg-accent text-white py-3 rounded-xl hover:bg-indigo-600 transition flex justify-center items-center gap-2"
            >
              {isSubmitting ? "Mengirim..." : "Submit Jawaban"} <SendHorizontal size={18}/>
            </button>
          </motion.div>
        )}

        {/* Step 4: Summary */}
        {isSubmitted && resultData && (
          <motion.div key="result" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <QuizSummary result={resultData} />
          </motion.div>
        )}

      </AnimatePresence>
    </section>
  );
};

export default Quiz;