import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('about');
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

  const tabs = [
    { id: 'about', label: t('about.title'), icon: '👋' },
    { id: 'education', label: t('about.education'), icon: '🎓' },
    { id: 'languages', label: t('about.languages'), icon: '🌍' },
  ];

  const educationData = [
    {
      degree: t('about.degree'),
      field: t('about.field'),
      school: t('about.school'),
      location: 'Rabat Agdal, Maroc',
      period: '2022 - 2026',
      description: 'Spécialisation en Testing logiciel et Assurance Qualité'
    },
    {
      degree: t('about.baccalaureat'),
      field: t('about.physicsChemistry'),
      school: t('about.babElKheir'),
      location: t('about.temara'),
      period: '2021',
      description: t('about.mention')
    }
  ];

  const languages = [
    { name: t('about.arabic'), level: t('about.native'), proficiency: 100 },
    { name: t('about.french'), level: 'C1', proficiency: 90 },
    { name: t('about.english'), level: 'C1', proficiency: 85 },
  ];

  const softSkills = t('about.softSkillsList');

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-dark-gray relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-baby-pink/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-light-pink/5 rounded-full blur-3xl"></div>

      <div className="container-max section-padding relative z-10">
        <div className={`text-center mb-16 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-accent-white mb-4">
            {t('about.sectionTitle')}
          </h2>
          <p className="text-lg text-accent-white/70 max-w-2xl mx-auto">
            {t('about.sectionSubtitle')}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 mx-2 mb-4 rounded-full transition-all duration-300 flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-baby-pink to-light-pink text-dark-gray'
                    : 'glass-effect text-accent-white hover:text-baby-pink'
                }`}
              >
                <span>{tab.icon}</span>
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="glass-effect rounded-2xl p-8 md:p-12">
            {activeTab === 'about' && (
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-accent-white text-left">{t('about.title')}</h3>
                    <div className="text-left space-y-4">
                      <p className="text-accent-white/80 leading-relaxed">
                        {t('about.description')}
                      </p>
                      <p className="text-accent-white/80 leading-relaxed">
                        {t('about.description2')}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-baby-pink text-left">{t('about.softSkills')}</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {softSkills.map((skill, index) => (
                        <div
                          key={index}
                          className="flex items-start space-x-3 text-accent-white/80"
                        >
                          <div className="w-2 h-2 bg-baby-pink rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm leading-relaxed">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="glass-effect rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-baby-pink mb-4">{t('about.personalInfo')}</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-accent-white/70">{t('about.fullName')}:</span>
                        <span className="text-accent-white">Meryem Rouimi</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-accent-white/70">{t('about.ageLabel')}:</span>
                        <span className="text-accent-white">{t('about.age')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-accent-white/70">{t('about.locationLabel')}:</span>
                        <span className="text-accent-white">{t('about.location')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-accent-white/70">{t('about.emailLabel')}:</span>
                        <span className="text-baby-pink">meryemrouimi1@gmail.com</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-accent-white/70">{t('about.phoneLabel')}:</span>
                        <span className="text-accent-white">+212 668680318</span>
                      </div>
                    </div>
                  </div>

                  <div className="glass-effect rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-baby-pink mb-4">{t('about.certifications')}</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-baby-pink/20 rounded-full flex items-center justify-center">
                          <span className="text-baby-pink text-sm">✓</span>
                        </div>
                        <span className="text-accent-white">{t('about.oracleCert')}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-baby-pink/20 rounded-full flex items-center justify-center">
                          <span className="text-baby-pink text-sm">✓</span>
                        </div>
                        <span className="text-accent-white">{t('about.courseraEmsi')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'education' && (
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-accent-white text-center mb-8">{t('about.education')}</h3>
                <div className="space-y-8">
                  {educationData.map((edu, index) => (
                    <div key={index} className="border-l-2 border-baby-pink pl-6 relative">
                      <div className="absolute -left-2 top-0 w-4 h-4 bg-baby-pink rounded-full"></div>
                      <div className="space-y-2">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <h4 className="text-xl font-semibold text-accent-white">{edu.degree}</h4>
                          <span className="text-baby-pink font-medium text-sm">{edu.period}</span>
                        </div>
                        <p className="text-baby-pink font-medium">{edu.field}</p>
                        <p className="text-accent-white/70">{edu.school}</p>
                        <p className="text-accent-white/60 text-sm">{edu.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'languages' && (
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-accent-white text-center mb-8">{t('about.languages')}</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {languages.map((lang, index) => (
                    <div key={index} className="text-center space-y-3">
                      <h4 className="text-xl font-semibold text-accent-white">{lang.name}</h4>
                      <div className="inline-block px-4 py-2 bg-baby-pink/10 rounded-full">
                        <span className="text-baby-pink font-medium">{lang.level}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
