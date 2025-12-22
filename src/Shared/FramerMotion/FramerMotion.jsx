import { motion } from "framer-motion";

const FramerMotion = ({ scholarship }) => {
  return (
    <motion.div
      // স্ক্রিনে আসার অ্যানিমেশন
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} // এটি দিলে শুধু প্রথমবার স্ক্রল করার সময় অ্যানিমেশন হবে
      transition={{ duration: 0.5, ease: "easeOut" }}
      // হোভার অ্যানিমেশন
      whileHover={{
        y: -10,
        transition: { duration: 0.2 },
      }}
      className="max-w-sm bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden transition-shadow hover:shadow-2xl"
    >
      {/* ইমেজ সেকশন */}
      <div className="relative overflow-hidden group">
        <img
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          src={
            scholarship?.universityLogo || "https://via.placeholder.com/400x200"
          }
          alt={scholarship?.universityName}
        />
        <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
          {scholarship?.scholarshipCategory}
        </div>
      </div>

      {/* কন্টেন্ট সেকশন */}
      <div className="p-5">
        <h5 className="text-xl font-bold tracking-tight text-gray-900 mb-2 line-clamp-1">
          {scholarship?.universityName}
        </h5>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {scholarship?.scholarshipName}
        </p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-bold text-blue-600">
            ${scholarship?.applicationFees || "Free"}
          </span>

          {/* বাটন অ্যানিমেশন */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Details
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default FramerMotion;
