import { motion } from 'framer-motion';
import { pageTransition } from '../../utils/animations';

const PageTransition = ({ children }) => {
  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="will-change-opacity"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
