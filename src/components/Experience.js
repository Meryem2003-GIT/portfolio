import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeExperience, setActiveExperience] = useState(0);
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

  const experiences = [
    {
      company: 'OptimGov',
      position: t('experience.optimgov.position'),
      period: t('experience.periods.optimgov'),
      location: 'Rabat Hay Riad',
      type: 'Stage',
      description: t('experience.optimgov.description'),
      missions: t('experience.optimgov.missions'),
      technologies: [
        { name: 'Spring Boot', category: 'Backend' },
        { name: 'Angular', category: 'Frontend' },
        { name: 'SQL Server', category: 'Database' },
        { name: 'T-SQL', category: 'Database' },
        { name: 'GitLab', category: 'DevOps' },
        { name: 'PostMan', category: 'Tools' },
        { name: 'IntelliJ', category: 'Tools' },
        { name: 'VS Code', category: 'Tools' }
      ],
      color: 'from-baby-pink to-light-pink'
    },
    {
      company: 'ONCF',
      position: t('experience.oncf.position'),
      period: t('experience.periods.oncf'),
      location: 'Rabat Agdal',
      type: 'Stage',
      description: t('experience.oncf.description'),
      missions: t('experience.oncf.missions'),
      technologies: [
        { name: 'Power BI', category: 'Analytics' },
        { name: 'Excel', category: 'Data' },
        { name: 'Python', category: 'Backend' }
      ],
      color: 'from-light-pink to-baby-pink'
    },
    {
      company: 'CMAIS',
      position: t('experience.cmais.position'),
      period: t('experience.periods.cmais'),
      location: 'Rabat Agdal',
      type: 'Stage',
      description: t('experience.cmais.description'),
      missions: t('experience.cmais.missions'),
      technologies: [
        { name: 'Excel', category: 'Data' }
      ],
      color: 'from-baby-pink to-light-pink'
    }
  ];

  const getTechnologyIcon = (tech) => {
    const techKey = tech.toLowerCase().replace(/\s+/g, '-');
    return `/assets/logos/technologies/${techKey}.png`;
  };

  return (
    <section id="experience" ref={sectionRef} className="py-20 bg-dark-gray relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-baby-pink/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-light-pink/5 rounded-full blur-3xl"></div>

      <div className="container-max section-padding relative z-10">
        <div className={`text-center mb-16 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-accent-white mb-4">
            {t('experience.title')}
          </h2>
          <p className="text-lg text-accent-white/70 max-w-2xl mx-auto">
            {t('experience.subtitle')}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Timeline Navigation */}
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            {experiences.map((exp, index) => (
              <button
                key={index}
                onClick={() => setActiveExperience(index)}
                className={`px-6 py-4 rounded-xl transition-all duration-300 text-left ${
                  activeExperience === index
                    ? 'bg-gradient-to-r from-baby-pink to-light-pink text-dark-gray'
                    : 'glass-effect text-accent-white hover:text-baby-pink'
                }`}
              >
                <div className="font-semibold">{exp.company}</div>
                <div className="text-sm opacity-80">{exp.period}</div>
              </button>
            ))}
          </div>

          {/* Experience Details */}
          <div className="glass-effect rounded-2xl p-8 md:p-12">
            {experiences[activeExperience] && (
              <div className="space-y-8">
                {/* Header */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center p-3 shadow-lg">
                      <img 
                        src={`/assets/logos/entreprises/${experiences[activeExperience].company.toLowerCase()}.png`}
                        alt={`Logo ${experiences[activeExperience].company}`}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className={`w-full h-full bg-gradient-to-r ${experiences[activeExperience].color} rounded-full flex items-center justify-center text-3xl hidden`}>
                        {experiences[activeExperience].company.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-baby-pink mb-2">
                        {experiences[activeExperience].company}
                      </h3>
                      <p className="text-xl text-accent-white font-medium">
                        {experiences[activeExperience].position}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-accent-white/70">
                    <span className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{experiences[activeExperience].period}</span>
                    </span>
                    <span className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{experiences[activeExperience].location}</span>
                    </span>
                    <span className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                      </svg>
                      <span>{experiences[activeExperience].type}</span>
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-xl font-semibold text-accent-white mb-4">{t('experience.description')}</h4>
                  <p className="text-accent-white/80 leading-relaxed">
                    {experiences[activeExperience].description}
                  </p>
                </div>

                {/* Missions */}
                <div>
                  <h4 className="text-xl font-semibold text-accent-white mb-4">{t('experience.missions')}</h4>
                  <div className="grid gap-3">
                    {experiences[activeExperience].missions.map((mission, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-baby-pink rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-accent-white/80">{mission}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="text-xl font-semibold text-accent-white mb-4">{t('experience.technologies')}</h4>
                  <div className="flex flex-wrap gap-3">
                    {experiences[activeExperience].technologies.map((tech, index) => (
                      <div
                        key={index}
                        className="glass-effect rounded-full px-4 py-2 flex items-center space-x-2 hover-lift"
                      >
                        <img 
                          src={getTechnologyIcon(tech.name)}
                          alt={`Logo ${tech.name}`}
                          className="w-5 h-5 object-contain"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'inline';
                          }}
                        />
                        <span className="text-lg hidden">⚙️</span>
                        <span className="text-accent-white font-medium">{tech.name}</span>
                        <span className="text-xs text-baby-pink/70 bg-baby-pink/10 px-2 py-1 rounded-full">
                          {tech.category}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;



