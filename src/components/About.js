import React, { useEffect } from 'react';

function About() {
  useEffect(() => {
    document.title = 'eNotebook - About';
  }, []);

  return (
  <>
  <div className="container border shadow p-3 mb-5 bg-body rounded border-2 rounded-3 p-2" style={{marginTop: '8rem'}}>
    <h2>About eNotebook</h2><hr/>
    <br/>
    <p>eNotebook is a cloud service plateform where you can store your daily-life notes for completely free of cost.</p>
    <p>eNotebook is created using MERN stack. We used various technologies like <a href="https://getbootstrap.com/">Bootstrap 5</a>(for frontend dedigning), <a href="https://www.npmjs.com/">NPM</a>(as package manager), <a href="https://github.com">GitHub</a>(for version control) and <a href="https://fontawesome.com/v5.15/icons">Fontawesome</a>(for icons).</p>
    <p>Complete source code of eNotebook is available here.</p>
  </div>
  </>
  );
}

export default About;
