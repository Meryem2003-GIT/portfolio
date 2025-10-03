import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
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

  const projects = [
    {
      title: t('projects.project1.title'),
      description: t('projects.project1.description'),
      technologies: ['Python', 'Django', 'JavaScript', 'HTML', 'CSS'],
      features: t('projects.project1.features'),
      status: t('projects.status'),
      category: t('projects.categories.webApp'),
      color: 'from-baby-pink to-light-pink',
      icon: '🌐'
    },
    {
      title: t('projects.project2.title'),
      description: t('projects.project2.description'),
      technologies: ['Java', 'Swing', 'MySQL', 'JDBC'],
      features: t('projects.project2.features'),
      status: t('projects.status'),
      category: t('projects.categories.desktopApp'),
      color: 'from-light-pink to-baby-pink',
      icon: '📚'
    },
    {
      title: t('projects.project3.title'),
      description: t('projects.project3.description'),
      technologies: ['C#', 'ASP.NET', 'ADO.NET', 'SQL Server'],
      features: t('projects.project3.features'),
      status: t('projects.status'),
      category: t('projects.categories.webApp'),
      color: 'from-baby-pink to-light-pink',
      icon: '💊'
    }
  ];

  const getTechIcon = (tech) => {
    let techKey = tech.toLowerCase().replace(/\s+/g, '-');
    
    // Gestion spéciale pour C#
    if (tech === 'C#') {
      techKey = 'c-sharp';
    } else {
      techKey = techKey.replace('#', 'sharp').replace('.', '-');
    }
    
    return `/assets/logos/technologies/${techKey}.png`;
  };

  return (
    <section id="projects" ref={sectionRef} className="py-20 bg-dark-gray relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-baby-pink/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-light-pink/5 rounded-full blur-3xl"></div>

      <div className="container-max section-padding relative z-10">
        <div className={`text-center mb-16 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-accent-white mb-4">
            {t('projects.title')}
          </h2>
          <p className="text-lg text-accent-white/70 max-w-2xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`glass-effect rounded-2xl p-6 hover-lift transition-all duration-500 ${
                  isVisible ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Project Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${project.color} rounded-xl flex items-center justify-center text-2xl`}>
                    {project.icon}
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-baby-pink bg-baby-pink/10 px-2 py-1 rounded-full">
                      {project.category}
                    </span>
                    <div className="text-xs text-accent-white/60 mt-1">{project.status}</div>
                  </div>
                </div>

                {/* Project Title */}
                <h3 className="text-xl font-bold text-accent-white mb-3">
                  {project.title}
                </h3>

                {/* Project Description */}
                <p className="text-accent-white/70 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Features */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-baby-pink mb-2">{t('projects.features')}</h4>
                  <div className="space-y-1">
                    {project.features.slice(0, 3).map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-baby-pink rounded-full"></div>
                        <span className="text-xs text-accent-white/70">{feature}</span>
                      </div>
                    ))}
                    {project.features.length > 3 && (
                      <div className="text-xs text-baby-pink/70">
                        +{project.features.length - 3} {t('projects.moreFeatures')}
                      </div>
                    )}
                  </div>
                </div>

                {/* Technologies */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-baby-pink mb-2">{t('projects.technologies')}</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <div
                        key={techIndex}
                        className="flex items-center space-x-1 bg-accent-white/5 rounded-full px-2 py-1"
                      >
                        <img 
                          src={getTechIcon(tech)}
                          alt={`Logo ${tech}`}
                          className="w-3 h-3 object-contain"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'inline';
                          }}
                        />
                        <span className="text-xs hidden">⚙️</span>
                        <span className="text-xs text-accent-white/80">{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hover Effect */}
                {hoveredProject === index && (
                  <div className="absolute inset-0 bg-gradient-to-r from-baby-pink/10 to-light-pink/10 rounded-2xl pointer-events-none"></div>
                )}

              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Projects;



