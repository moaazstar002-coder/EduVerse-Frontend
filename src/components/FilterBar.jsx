import { Search } from 'lucide-react';
import './FilterBar.css';

export default function FilterBar({ 
  searchTerm, 
  setSearchTerm, 
  selectedCategory, 
  setSelectedCategory, 
  selectedDifficulty, 
  setSelectedDifficulty,
  priceRange,
  setPriceRange,
  categories 
}) {
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const priceRanges = [
    { label: 'All Prices', value: 'all' },
    { label: 'Free', value: 'free' },
    { label: 'Under $50', value: 'under50' },
    { label: '$50 - $100', value: '50-100' },
    { label: 'Over $100', value: 'over100' },
  ];

  return (
    <div className="filter-bar">
      <div className="filter-container">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>Category</label>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Level</label>
          <select value={selectedDifficulty} onChange={(e) => setSelectedDifficulty(e.target.value)}>
            {difficulties.map((diff) => (
              <option key={diff} value={diff === 'All' ? '' : diff}>
                {diff}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Price</label>
          <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
            {priceRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
