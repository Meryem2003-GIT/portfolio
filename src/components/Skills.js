import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('backend');
  const sectionRef = useRef(null);
  const { t } = useLanguage();

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
        { name: 'Java', level: 85, icon: '☕' },
        { name: 'Python', level: 80, icon: '🐍' },
        { name: 'C#', level: 75, icon: '🔷' },
        { name: 'C/C++', level: 70, icon: '⚡' },
        { name: 'Node.js', level: 65, icon: '🟢' },
        { name: 'Spring Boot', level: 80, icon: '🌱' },
        { name: 'Django', level: 75, icon: '🎯' },
        { name: 'ASP.NET', level: 70, icon: '🌐' }
      ]
    },
    frontend: {
      title: t('skills.categories.frontend'),
      icon: '🎨',
      color: 'from-light-pink to-baby-pink',
      skills: [
        { name: 'HTML', level: 90, icon: '🌐' },
        { name: 'CSS', level: 85, icon: '🎨' },
        { name: 'JavaScript', level: 80, icon: '⚡' },
        { name: 'React', level: 75, icon: '⚛️' },
        { name: 'Angular', level: 70, icon: '🅰️' },
        { name: 'React Native', level: 65, icon: '📱' }
      ]
    },
    database: {
      title: t('skills.categories.database'),
      icon: '🗄️',
      color: 'from-baby-pink to-light-pink',
      skills: [
        { name: 'MySQL', level: 85, icon: '🐬' },
        { name: 'SQL Server', level: 80, icon: '🗄️' },
        { name: 'Oracle DB', level: 75, icon: '🔶' },
        { name: 'T-SQL', level: 70, icon: '📊' }
      ]
    },
    tools: {
      title: t('skills.categories.tools'),
      icon: '🛠️',
      color: 'from-light-pink to-baby-pink',
      skills: [
        { name: 'Git/GitHub', level: 85, icon: '🐙' },
        { name: 'Docker', level: 70, icon: '🐳' },
        { name: 'MS Azure', level: 65, icon: '☁️' },
        { name: 'Power BI', level: 80, icon: '📈' },
        { name: 'MS Project', level: 70, icon: '📋' },
        { name: 'PostMan', level: 75, icon: '📮' },
        { name: 'IntelliJ', level: 80, icon: '💡' },
        { name: 'VS Code', level: 90, icon: '💻' }
      ]
    },
    mobile: {
      title: t('skills.categories.mobile'),
      icon: '📱',
      color: 'from-baby-pink to-light-pink',
      skills: [
        { name: 'React Native', level: 70, icon: '📱' },
        { name: 'Android Studio', level: 65, icon: '🤖' },
        { name: 'Android SDK', level: 60, icon: '📲' }
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

          {/* Skills Grid */}
          <div className="glass-effect rounded-2xl p-8 md:p-12">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-accent-white mb-2">
                {skillCategories[activeCategory].title}
              </h3>
              <p className="text-accent-white/70">
                {t('skills.skillsIn')} {skillCategories[activeCategory].title.toLowerCase()}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillCategories[activeCategory].skills.map((skill, index) => (
                <div
                  key={index}
                  className={`glass-effect rounded-xl p-6 hover-lift transition-all duration-500 ${
                    isVisible ? 'animate-fade-in' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 flex items-center justify-center">
                        <img 
                          src={getTechLogo(skill.name)}
                          alt={`Logo ${skill.name}`}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'inline';
                          }}
                        />
                        <span className="text-2xl hidden">{skill.icon}</span>
                      </div>
                      <span className="text-lg font-semibold text-accent-white">
                        {skill.name}
                      </span>
                    </div>
                    <span className="text-baby-pink font-bold">
                      {skill.level}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-accent-white/10 rounded-full h-2 mb-2">
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r ${skillCategories[activeCategory].color} transition-all duration-1000 ease-out`}
                      style={{ 
                        width: isVisible ? `${skill.level}%` : '0%',
                        transitionDelay: `${index * 0.1}s`
                      }}
                    ></div>
                  </div>

                  {/* Skill Level Indicator */}
                  <div className="flex justify-between text-xs text-accent-white/60">
                    <span>{t('skills.levels.beginner')}</span>
                    <span>{t('skills.levels.expert')}</span>
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



