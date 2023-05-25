import React from 'react';

function Footer() {
  return (
    <footer className="Footer">
      <div className="container">
        <h5>Remember to "Be Awesome!"</h5>
        <p>&copy; 2023 Your App. All rights reserved.</p>
        <p>Click on a logo to visit the a Creator's GitHub page.</p>
        <div className="social-icons">
          <a href="https://github.com/mynamebrogrammer" target="_blank" rel="noopener noreferrer">
            <span role="img" aria-label="Hungry Emoji">🤤</span>
          </a>
          <a href="https://github.com/koshea1124" target="_blank" rel="noopener noreferrer">
            <span role="img" aria-label="Robot Emoji">🤖</span>
          </a>
          <a href="https://github.com/TyGosley" target="_blank" rel="noopener noreferrer">
            <span role="img" aria-label="Poop Emoji">💩</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
