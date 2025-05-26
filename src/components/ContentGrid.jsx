import React, { useState } from 'react';
import { Play, Book, Music, Video, ShoppingBag, FileText, Clock, DollarSign } from 'lucide-react';
import { contentItems, getContentByPersona, getContentByType } from '../data/content';

const typeIcons = {
  book: Book,
  music: Music,
  video: Video,
  merch: ShoppingBag,
  blog: FileText
};

const typeColors = {
  book: 'bg-blue-500',
  music: 'bg-pink-500',
  video: 'bg-red-500',
  merch: 'bg-green-500',
  blog: 'bg-purple-500'
};

function ContentGrid({ activePersona }) {
  const [filter, setFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);

  const getFilteredContent = () => {
    if (filter === 'all') return contentItems;
    if (filter === 'persona') return getContentByPersona(activePersona);
    return getContentByType(filter);
  };

  const filteredContent = getFilteredContent();

  const ContentModal = ({ item, onClose }) => {
    if (!item) return null;

    const IconComponent = typeIcons[item.type];

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="relative">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-64 object-cover rounded-t-2xl"
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
            >
              ×
            </button>
            <div className={`absolute top-4 left-4 ${typeColors[item.type]} text-white px-3 py-1 rounded-full flex items-center space-x-2`}>
              <IconComponent size={16} />
              <span className="text-sm font-medium capitalize">{item.type}</span>
            </div>
          </div>
          
          <div className="p-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{item.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{item.description}</p>
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                {item.duration && (
                  <div className="flex items-center space-x-1">
                    <Clock size={16} />
                    <span>{item.duration}</span>
                  </div>
                )}
                {item.readTime && (
                  <div className="flex items-center space-x-1">
                    <Clock size={16} />
                    <span>{item.readTime}</span>
                  </div>
                )}
                {item.price && (
                  <div className="flex items-center space-x-1">
                    <DollarSign size={16} />
                    <span>${item.price}</span>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {item.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex space-x-3">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition-colors flex items-center justify-center space-x-2">
                <Play size={18} />
                <span>
                  {item.type === 'book' ? 'Read' :
                   item.type === 'music' ? 'Listen' :
                   item.type === 'video' ? 'Watch' :
                   item.type === 'merch' ? 'Buy' : 'View'}
                </span>
              </button>
              <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-full transition-colors">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Filters */}
          <div className="lg:w-64 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Content Filters</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    filter === 'all' ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  All Content
                </button>
                <button
                  onClick={() => setFilter('persona')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    filter === 'persona' ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  Current Persona
                </button>
              </div>
            </div>

            <div>
              <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">By Type</h4>
              <div className="space-y-2">
                {Object.keys(typeIcons).map(type => {
                  const IconComponent = typeIcons[type];
                  return (
                    <button
                      key={type}
                      onClick={() => setFilter(type)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                        filter === type ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      <IconComponent size={18} />
                      <span className="capitalize">{type}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Content Grid */}
          <div className="flex-1">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {filter === 'all' ? 'Latest Across The Verse' :
                 filter === 'persona' ? `${activePersona} Content` :
                 `${filter} Collection`}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Discover transformative content across multiple dimensions of creativity and consciousness.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredContent.map(item => {
                const IconComponent = typeIcons[item.type];
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="group cursor-pointer bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className={`absolute top-3 left-3 ${typeColors[item.type]} text-white px-2 py-1 rounded-full flex items-center space-x-1`}>
                        <IconComponent size={14} />
                        <span className="text-xs font-medium capitalize">{item.type}</span>
                      </div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 dark:bg-gray-800/90 p-3 rounded-full">
                          <Play size={24} className="text-gray-800 dark:text-white" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                        {item.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-3 text-gray-500 dark:text-gray-400">
                          {item.duration && (
                            <div className="flex items-center space-x-1">
                              <Clock size={14} />
                              <span>{item.duration}</span>
                            </div>
                          )}
                          {item.readTime && (
                            <div className="flex items-center space-x-1">
                              <Clock size={14} />
                              <span>{item.readTime}</span>
                            </div>
                          )}
                          {item.price && (
                            <div className="flex items-center space-x-1">
                              <DollarSign size={14} />
                              <span>${item.price}</span>
                            </div>
                          )}
                        </div>
                        <span className={`px-2 py-1 ${typeColors[item.type]} text-white text-xs rounded-full font-medium`}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <ContentModal 
        item={selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />
    </section>
  );
}

export default ContentGrid;
