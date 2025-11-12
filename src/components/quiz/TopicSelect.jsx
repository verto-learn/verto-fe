import { motion } from "framer-motion";

export const TopicSelect = ({ topics, selected, onChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-3 p-6 glass-card text-light rounded-2xl shadow-lg w-full max-w-md mx-auto"
    >
      <h2 className="text-xl font-semibold text-light">Choose Topic</h2>
      <select
        value={selected || ""}
        onChange={(e) => onChange(e.target.value)}
        className="p-3 bg-third rounded-xl text-light border border-accent  "
      >
        <option value="">Choose Topic</option>
        {topics.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>
    </motion.div>
  );
};
