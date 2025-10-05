import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('backend');
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const sectionRef = useRef(null);
  const { t } = useLanguage();
  const { isDark } = useTheme();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const skillCategories = {
    backend: {
      title: t('skills.categories.backend'),
      icon: '⚙️',
      color: 'from-baby-pink to-light-pink',
      skills: [
        { name: 'Java', icon: '☕' },
        { name: 'Python', icon: '🐍' },
        { name: 'C#', icon: '🔷' },
        { name: 'C/C++', icon: '⚡' },
        { name: 'Node.js', icon: '🟢' },
        { name: 'Spring Boot', icon: '🌱' },
        { name: 'Django', icon: '🎯' },
        { name: 'ASP.NET', icon: '🌐' }
      ]
    },
    frontend: {
      title: t('skills.categories.frontend'),
      icon: '🎨',
      color: 'from-light-pink to-baby-pink',
      skills: [
        { name: 'HTML', icon: '🌐' },
        { name: 'CSS', icon: '🎨' },
        { name: 'JavaScript', icon: '⚡' },
        { name: 'React', icon: '⚛️' },
        { name: 'Angular', icon: '🅰️' },
        { name: 'React Native', icon: '📱' }
      ]
    },
    database: {
      title: t('skills.categories.database'),
      icon: '🗄️',
      color: 'from-baby-pink to-light-pink',
      skills: [
        { name: 'MySQL', icon: '🐬' },
        { name: 'SQL Server', icon: '🗄️' },
        { name: 'Oracle DB', icon: '🔶' },
        { name: 'T-SQL', icon: '📊' }
      ]
    },
    tools: {
      title: t('skills.categories.tools'),
      icon: '🛠️',
      color: 'from-light-pink to-baby-pink',
      skills: [
        { name: 'Git/GitHub', icon: '🐙' },
        { name: 'Docker', icon: '🐳' },
        { name: 'MS Azure', icon: '☁️' },
        { name: 'Power BI', icon: '📈' },
        { name: 'MS Project', icon: '📋' },
        { name: 'PostMan', icon: '📮' },
        { name: 'IntelliJ', icon: '💡' },
        { name: 'VS Code', icon: '💻' }
      ]
    },
    mobile: {
      title: t('skills.categories.mobile'),
      icon: '📱',
      color: 'from-baby-pink to-light-pink',
      skills: [
        { name: 'React Native', icon: '📱' },
        { name: 'Android Studio', icon: '🤖' },
        { name: 'Android SDK', icon: '📲' }
      ]
    }
  };

  const getTechLogo = (tech) => {
    let techKey = tech.toLowerCase().replace(/\s+/g, '-');
    
    // Gestion spéciale pour certaines technologies
    if (tech === 'C#') {
      techKey = 'c-sharp';
    } else if (tech === 'C/C++') {
      techKey = 'c-cpp';
    } else if (tech === 'Git/GitHub') {
      techKey = 'git';
    } else if (tech === 'MS Azure') {
      techKey = 'azure';
    } else if (tech === 'MS Project') {
      techKey = 'ms-project';
    } else if (tech === 'Oracle DB') {
      techKey = 'oracle';
    } else if (tech === 'Android Studio') {
      techKey = 'android-studio';
    } else if (tech === 'Android SDK') {
      techKey = 'android-sdk';
    } else {
      techKey = techKey.replace('#', 'sharp').replace('.', '-');
    }
    
    return `/assets/logos/technologies/${techKey}.png`;
  };

  const getCircleStyles = (skillName) => {
    const isHovered = hoveredSkill === skillName;
    
    // NOUVELLE APPROCHE : Pas de fond, seulement des bordures
    if (isDark) {
      return {
        backgroundColor: 'transparent', // Pas de fond du tout
        border: isHovered ? '3px solid rgba(248, 180, 209, 0.8)' : '2px solid rgba(248, 180, 209, 0.4)',
        boxShadow: isHovered ? '0 0 25px rgba(248, 180, 209, 0.5)' : '0 0 10px rgba(248, 180, 209, 0.2)'
      };
    } else {
      return {
        backgroundColor: 'transparent', // Pas de fond du tout
        border: isHovered ? '3px solid rgba(248, 180, 209, 0.8)' : '2px solid rgba(248, 180, 209, 0.4)',
        boxShadow: isHovered ? '0 0 25px rgba(248, 180, 209, 0.5)' : '0 0 10px rgba(248, 180, 209, 0.2)'
      };
    }
  };

  const categories = Object.keys(skillCategories);

  return (
    <section id="skills" ref={sectionRef} className="py-20 bg-dark-gray relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-baby-pink/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-light-pink/5 rounded-full blur-3xl"></div>

      <div className="container-max section-padding relative z-10">
        <div className={`text-center mb-16 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-accent-white mb-4">
            {t('skills.title')}
          </h2>
          <p className="text-lg text-accent-white/70 max-w-2xl mx-auto">
            {t('skills.subtitle')}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Category Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full transition-all duration-300 flex items-center space-x-2 ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-baby-pink to-light-pink text-dark-gray'
                    : 'glass-effect text-accent-white hover:text-baby-pink'
                }`}
              >
                <span className="text-lg">{skillCategories[category].icon}</span>
                <span className="font-medium">{skillCategories[category].title}</span>
              </button>
            ))}
          </div>

          {/* Skills Grid - Nouvelle présentation en cercles */}
          <div className="glass-effect rounded-2xl p-8 md:p-12">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-accent-white mb-2">
                {skillCategories[activeCategory].title}
              </h3>
              <p className="text-accent-white/70">
                {t('skills.skillsIn')} {skillCategories[activeCategory].title.toLowerCase()}
              </p>
            </div>

            {/* Grille responsive avec cercles */}
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-8">
              {skillCategories[activeCategory].skills.map((skill, index) => (
                <div
                  key={index}
                  className={`group relative transition-all duration-500 ${
                    isVisible ? 'animate-fade-in' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  {/* Cercle principal */}
                  <div className="relative w-20 h-20 mx-auto">
                    {/* Cercle principal - NOUVELLE APPROCHE */}
                    <div 
                      className="relative w-full h-full rounded-full flex items-center justify-center transition-all duration-300"
                      style={{
                        ...getCircleStyles(skill.name),
                        transform: hoveredSkill === skill.name ? 'scale(1.1)' : 'scale(1)'
                      }}
                    >
                      {/* Logo de la technologie */}
                      {/* Logo de la technologie */}
<div className="w-10 h-10 flex items-center justify-center">
  <img 
    src={getTechLogo(skill.name)}
    alt={`Logo ${skill.name}`}
    className={`w-full h-full object-contain filter group-hover:brightness-110 transition-all duration-300 
      ${skill.name === 'JavaScript' ? 'scale-125' : ''}`}
    onError={(e) => {
      e.target.style.display = 'none';
      e.target.nextSibling.style.display = 'inline';
    }}
  />
  <span className="text-2xl hidden">{skill.icon}</span>
</div>

                    </div>

                    
                  </div>

                  {/* Tooltip au survol */}
                  <div className={`absolute -top-12 left-1/2 transform -translate-x-1/2 bg-dark-gray/90 backdrop-blur-sm text-accent-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-10 whitespace-nowrap`}>
                    {skill.name}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-dark-gray/90"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;



