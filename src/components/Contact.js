import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useLanguage } from '../contexts/LanguageContext';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({ show: false, type: '', message: '' });
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification({ show: false, type: '', message: '' });
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Configuration EmailJS
      const serviceId = 'service_fcn463v';
      const templateId = 'template_c4kmucx';
      const publicKey = '67NfhB5bxAD4w3oh3';
      
      // Envoi du message via EmailJS
      await emailjs.send(serviceId, templateId, {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: 'meryemrouimi1@gmail.com'
      }, publicKey);
      
      // Succès
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      showNotification('success', t('contact.form.success'));
      
    } catch (error) {
      // Erreur
      console.error('Erreur lors de l\'envoi:', error);
      setIsSubmitting(false);
      
      showNotification('error', t('contact.form.error'));
    }
  };

  const contactInfo = [
    {
      icon: '📧',
      title: t('contact.email'),
      value: 'meryemrouimi1@gmail.com',
      link: 'mailto:meryemrouimi1@gmail.com',
      color: 'from-baby-pink to-light-pink'
    },
    {
      icon: '📱',
      title: t('contact.phone'),
      value: '+212 668680318',
      link: 'tel:+212668680318',
      color: 'from-light-pink to-baby-pink'
    },
    {
      icon: '📍',
      title: t('contact.location'),
      value: 'Temara, Rabat-Salé-Kénitra',
      link: '#',
      color: 'from-baby-pink to-light-pink'
    }
  ];

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/meryem-rouimi-681139254/',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    {
      name: 'GitHub',
      url: 'https://github.com/Meryem2003-GIT',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/mimiiss_here/',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    }
  ];

  return (
    <>
      {/* Notification personnalisée */}
      {notification.show && (
        <div className="fixed top-4 right-4 z-50 animate-slide-up">
          <div className={`glass-effect rounded-xl p-4 max-w-md shadow-2xl ${
            notification.type === 'success' 
              ? 'border-l-4 border-green-400' 
              : 'border-l-4 border-red-400'
          }`}>
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                notification.type === 'success' 
                  ? 'bg-green-400/20' 
                  : 'bg-red-400/20'
              }`}>
                {notification.type === 'success' ? (
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <p className="text-accent-white font-medium">
                  {notification.type === 'success' ? t('contact.form.successTitle') : t('contact.form.errorTitle')}
                </p>
                <p className="text-accent-white/70 text-sm">
                  {notification.message}
                </p>
              </div>
              <button
                onClick={() => setNotification({ show: false, type: '', message: '' })}
                className="text-accent-white/50 hover:text-accent-white transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <section id="contact" ref={sectionRef} className="py-20 bg-dark-gray relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-baby-pink/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-light-pink/5 rounded-full blur-3xl"></div>

      <div className="container-max section-padding relative z-10">
        <div className={`text-center mb-16 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-accent-white mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-lg text-accent-white/70 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="glass-effect rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-accent-white mb-6">
                  {t('contact.infoTitle')}
                </h3>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => {
                    const isEmail = info.title === t('contact.email');
                    const Component = isEmail ? 'a' : 'div';
                    const props = isEmail ? { href: 'mailto:meryemrouimi1@gmail.com?subject=' } : {};
                    
                    return (
                      <Component
                        key={index}
                        {...props}
                        className={`flex items-center space-x-4 p-4 rounded-xl hover-lift transition-all duration-300 ${
                          isVisible ? 'animate-fade-in' : 'opacity-0'
                        }`}
                        style={{ animationDelay: `${index * 0.2}s` }}
                      >
                        <div className={`w-12 h-12 bg-gradient-to-r ${info.color} rounded-full flex items-center justify-center text-xl`}>
                          {info.icon}
                        </div>
                        <div className="text-left">
                          <h4 className="text-accent-white font-semibold">{info.title}</h4>
                          <p className="text-accent-white/70">{info.value}</p>
                        </div>
                      </Component>
                    );
                  })}
                </div>
              </div>

              {/* Social Links */}
              <div className="glass-effect rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-accent-white mb-6">
                  {t('contact.socialTitle')}
                </h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 glass-effect rounded-full flex items-center justify-center hover-lift group transition-all duration-300 ${
                        isVisible ? 'animate-fade-in' : 'opacity-0'
                      }`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <span className="text-accent-white group-hover:text-baby-pink transition-colors duration-300">
                        {social.icon}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Message */}
              <div className="glass-effect rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-accent-white mb-4">
                  {t('contact.quickMessageTitle')}
                </h3>
                <p className="text-accent-white/70 mb-6">
                  {t('contact.quickMessageSubtitle')}
                </p>
                <div className="flex space-x-4">
                  <a
                    href="https://www.linkedin.com/in/meryem-rouimi-681139254/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-baby-pink to-light-pink text-dark-gray font-semibold rounded-full text-center hover-lift transition-all duration-300"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://www.instagram.com/mimiiss_here/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-6 py-3 glass-effect text-accent-white font-semibold rounded-full text-center hover-lift transition-all duration-300"
                  >
                    Instagram
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="glass-effect rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-accent-white mb-6">
                {t('contact.form.title')}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-accent-white font-medium mb-2">
                      {t('contact.form.name')}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-accent-white/5 border border-accent-white/10 rounded-xl text-accent-white placeholder-accent-white/50 focus:outline-none focus:border-baby-pink focus:ring-2 focus:ring-baby-pink/20 transition-all duration-300"
                      placeholder={t('contact.form.namePlaceholder')}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-accent-white font-medium mb-2">
                      {t('contact.form.email')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-accent-white/5 border border-accent-white/10 rounded-xl text-accent-white placeholder-accent-white/50 focus:outline-none focus:border-baby-pink focus:ring-2 focus:ring-baby-pink/20 transition-all duration-300"
                      placeholder={t('contact.form.emailPlaceholder')}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-accent-white font-medium mb-2">
                    {t('contact.form.subject')}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-accent-white/5 border border-accent-white/10 rounded-xl text-accent-white placeholder-accent-white/50 focus:outline-none focus:border-baby-pink focus:ring-2 focus:ring-baby-pink/20 transition-all duration-300"
                    placeholder={t('contact.form.subjectPlaceholder')}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-accent-white font-medium mb-2">
                    {t('contact.form.message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-accent-white/5 border border-accent-white/10 rounded-xl text-accent-white placeholder-accent-white/50 focus:outline-none focus:border-baby-pink focus:ring-2 focus:ring-baby-pink/20 transition-all duration-300 resize-none"
                    placeholder={t('contact.form.messagePlaceholder')}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-gradient-to-r from-baby-pink to-light-pink text-dark-gray font-semibold rounded-xl hover-lift transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-dark-gray border-t-transparent rounded-full animate-spin"></div>
                      <span>{t('contact.form.sending')}</span>
                    </>
                  ) : (
                    <>
                      <span>{t('contact.form.send')}</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Contact;



