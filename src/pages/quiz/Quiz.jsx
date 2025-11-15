import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TopicSelect } from "../../components/quiz/TopicSelect";
import { QuizQuestion } from "../../components/quiz/QuizQuestion";
import { QuizSummary } from "../../components/quiz/QuizSummary";
import { useTopic } from "../../hooks/topic/useTopic";
import { useQuiz } from "../../hooks/quiz/useQuiz";
import { useSubmitQuiz } from "../../hooks/quiz/useSubmitQuiz";
import { SendHorizontal } from "lucide-react";
import { useGenerateCourse } from "../../hooks/course/useGenerateCourse";

const Quiz = () => {
  const { data, isLoading: isLoadingTopics } = useTopic();
  const topics = data?.data;

  const [selectedTopic, setSelectedTopic] = useState("");
  const [isTopicSelected, setIsTopicSelected] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { data: quizData, isFetching: isLoadingQuiz } = useQuiz(
    isTopicSelected ? selectedTopic : null
  );

  const { formik, data: result, isPending } = useSubmitQuiz(() => {
    setIsSubmitted(true);
  });

  const summary = result?.data;

  const { formik: generateFormik, isPending: isGenerating } = useGenerateCourse();

  const handleSelectTopic = (id) => {
    setSelectedTopic(id);
    setIsTopicSelected(true);
    formik.setFieldValue("topicId", id);
  };

  const handleAnswer = (questionId, option) => {

    const updated = formik.values.answers.filter(
      (a) => a.questionId !== questionId
    );


    const newAnswer = { questionId: questionId, answerIndex: option };
    formik.setFieldValue("answers", [...updated, newAnswer]);
  };


  const handleSubmit = () => formik.handleSubmit();

  const handleNext = () => {
    generateFormik.setValues({
      topic_id: selectedTopic,
      difficulty: summary.calculated_difficulty,
    });
    generateFormik.handleSubmit();
  };


  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-light p-6 overflow-hidden relative">
      <AnimatePresence mode="wait">
        {/* STEP 1: PILIH TOPIK */}
        {!isTopicSelected && !isLoadingTopics && (
          <motion.div
            key="topic-select"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.4 }}
          >
            <TopicSelect
              topics={topics}
              selected={selectedTopic}
              onChange={handleSelectTopic}
            />
          </motion.div>

        )}

        {/* STEP 2: LOADING QUIZ */}
        {isTopicSelected && isLoadingQuiz && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center"
          >
            <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-light">Memuat soal quiz...</p>
          </motion.div>
        )}

        {/* STEP 3: QUIZ MUNCUL */}
        {isTopicSelected && !isLoadingQuiz && quizData && !isSubmitted && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6 w-full max-w-2xl"
          >
            {quizData.map((q, i) => (
              <QuizQuestion
                key={q.id}
                question={q}
                index={i}
                onAnswer={handleAnswer}
              />

            ))}
            <button
              onClick={handleSubmit}
              disabled={isPending}
              className="mt-6 bg-accent flex items-center justify-center py-3 gap-x-2 rounded-xl hover:bg-secondary transition disabled:opacity-50"
            >
              {isPending ? "Sending..." : "Submit"}
              <SendHorizontal />
            </button>

          </motion.div>
        )}

        {isSubmitted && result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <QuizSummary
              score={summary.score}
              total={summary.total}
              difficulty={summary.calculated_difficulty}
              onNext={handleNext}
              isLoading={isGenerating} // ✅ dikirim ke QuizSummary
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Quiz;
