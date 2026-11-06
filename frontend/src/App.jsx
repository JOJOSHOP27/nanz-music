
import { useEffect, useState } from 'react';
import styles from './App.module.css';

const API_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

function App() {
  const [connection, setConnection] = useState('checking');

  useEffect(() => {
    const controller = new AbortController();

    async function checkBackend() {
      try {
        const response = await fetch(
          `${API_URL}/api/health`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error('Backend unavailable');
        }

        setConnection('connected');
      } catch (error) {
        if (error.name !== 'AbortError') {
          setConnection('disconnected');
        }
      }
    }

    checkBackend();

    return () => controller.abort();
  }, []);

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>N</span>

          <span>NANZ MUSIC</span>
        </div>

        <div className={styles.profile}>
          <span>Guest</span>
        </div>
      </header>

      <section className={styles.hero}>
        <span className={styles.eyebrow}>
          YOUR PERSONAL MUSIC SPACE
        </span>

        <h1>
          Feel every
          <br />
          <span>frequency.</span>
        </h1>

        <p>
          Discover your sound.
          Experience music differently.
        </p>

        <div className={styles.status}>
          <span
            className={
              connection === 'connected'
                ? styles.online
                : styles.offline
            }
          />

          {connection === 'checking' && 'Checking backend...'}
          {connection === 'connected' && 'Backend connected'}
          {connection === 'disconnected' && 'Backend disconnected'}
        </div>
      </section>

      <section className={styles.welcome}>
        <div>
          <span className={styles.sectionLabel}>
            PROJECT FOUNDATION
          </span>

          <h2>Welcome to NANZ MUSIC</h2>

          <p>
            Your music experience starts here.
            More features are coming soon.
          </p>
        </div>

        <div className={styles.musicIcon}>
          ♪
        </div>
      </section>

      <footer className={styles.footer}>
        NANZ MUSIC © 2026
        <span>Designed for your frequency.</span>
      </footer>
    </main>
  );
}

export default App;
