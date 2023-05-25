import React from 'react';
import { Link } from 'react-router-dom';

const HelpfulLinks = () => {
  const links = [
    { title: 'Very Well Mind', url: 'https://www.verywellmind.com/' },
    { title: 'Ways to Increase Positive Emotions for Teens', url: 'https://kidshealth.org/en/teens/positive-emotions.html' },
    { title: '18 Positive Websites', url: 'https://www.joincake.com/blog/positive-websites/' },
    { title: 'Check Out Some of Our Favorite Apps', url: 'https://www.healthline.com/health/mental-health/mental-health-apps' },
    { title: 'How to Stay Positive at Work', url: 'https://www.verywellmind.com/how-to-stay-positive-3144810' },
    { title: 'Suicide Prevention', url: 'https://www.wellspacehealth.org/services/behavioral-health-prevention/suicide-prevention' },
    { title: 'Better Help', url: 'https://www.betterhelp.com/' },
  ];

  return (
    <div>
      <h2>Helpful Links</h2>
      <div className="link-cards">
        {links.map((link, index) => (
          <div className="link-card" key={index}>
            <h3>{link.title}</h3>
            <Link to={link.url} target="_blank" rel="noopener noreferrer">
              Visit Link
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelpfulLinks;
