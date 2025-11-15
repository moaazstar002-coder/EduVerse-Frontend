import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import FilterBar from '../components/FilterBar';
import CourseCard from '../components/CourseCard';
import { coursesData, categories } from '../data/coursesData';
import './Courses.css';

export default function Courses() {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [priceRange, setPriceRange] = useState('all');

  const filteredCourses = useMemo(() => {
    return coursesData.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = !selectedCategory || course.category === selectedCategory;

      const matchesPrice = () => {
        if (priceRange === 'all') return true;
        if (priceRange === 'free') return course.price === 0;
        if (priceRange === 'under50') return course.price > 0 && course.price < 50;
        if (priceRange === '50-100') return course.price >= 50 && course.price <= 100;
        if (priceRange === 'over100') return course.price > 100;
        return true;
      };

      return matchesSearch && matchesCategory && matchesPrice();
    });
  }, [searchTerm, selectedCategory, selectedDifficulty, priceRange]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="courses-page">
      <div className="courses-header">
        <div className="header-content">
          <h1>Explore Courses</h1>
          <p>Discover thousands of courses from expert instructors</p>
        </div>
      </div>

      <div className="courses-container">
        <FilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedDifficulty={selectedDifficulty}
          setSelectedDifficulty={setSelectedDifficulty}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          categories={categories}
        />

        <div className="courses-results">
          <div className="results-header">
            <h2>Showing {filteredCourses.length} courses</h2>
            {(searchTerm || selectedCategory || selectedDifficulty || priceRange !== 'all') && (
              <button
                className="clear-filters"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                  setSelectedDifficulty('');
                  setPriceRange('all');
                }}
              >
                Clear Filters
              </button>
            )}
          </div>

          {filteredCourses.length > 0 ? (
            <motion.div
              className="courses-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredCourses.map((course) => (
                <motion.div key={course.id} variants={itemVariants}>
                  <CourseCard course={course} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="no-courses">
              <div className="no-courses-icon">🔍</div>
              <h3>No courses found</h3>
              <p>Try adjusting your filters or search term</p>
              <button
                className="btn-reset"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                  setSelectedDifficulty('');
                  setPriceRange('all');
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
