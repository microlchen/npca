import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import Toolbars from '../components/subpages/toolbar';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <div>
      <Toolbars />
      <main className={styles.main}>
        <div className={styles.spacing}></div>
        <div className={styles.center}>
          <Image
            src="/npca.png"
            alt="Next.js Logo"
            width={380}
            height={167}
            priority
          />
          <div className={styles.thirteen}>
            Novel Prediction Computational Analysis
          </div>
        </div>
        <div> TeleHealth, ran by data.</div>

        <div className={styles.spacing}></div>
        <div className={styles.spacing}></div>

        <div className={styles.grid}>
          <a
            href="./login"
            className={styles.card}
            //target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Log In <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Sign up and log in today to improve your workflow!
            </p>
          </a>

          <a
            href="./phq9p"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Forms and Calls <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Video calling, data collecting, and form filling - all in one
              platform!
            </p>
          </a>

          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Patient Profiles <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Track your patient&apos;s growth and wellness through our
              automated system over time!
            </p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Privacy and HIPAA Policies <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              NPCA will not be liable for any misuse of data. Please familiarize
              yourself with your state laws and Ferderal HIPAA regulations and
              obtain patient consent before using our services.
            </p>
          </a>
        </div>

        <div className={styles.spacing}></div>
        <div className={styles.spacing}></div>
      </main>
    </div>
  );
}
