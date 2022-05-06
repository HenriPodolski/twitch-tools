import React, { useState } from 'react';
import defaultThemeStyles from './index.module.scss';
import lolThemeStyles from './index.lol-theme.module.scss';
import cx from 'classnames';
import useSWR from 'swr';
import { useEffect, useRef } from 'react';
import ClassicalNoise from '../lib/graphics/classical-noise';
import { Message } from '../additional';

import currentContent from '../content';

const twitchContent = {
  ...currentContent,
};

const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
  ...args: any[]
) => {
  const res = await fetch(input, init);
  return res.json();
};

function HomePage(props: any) {
  const styles =
    twitchContent.theme === 'lol' ? lolThemeStyles : defaultThemeStyles;
  const { data, error } = useSWR(
    'http://dashboard.local:3201/api/chat',
    fetcher,
    { refreshInterval: 500 }
  );
  const [canvasWaveAnimation] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasWaveAnimation) {
      return;
    }

    if (canvasRef.current) {
      const canvas = canvasRef.current,
        ctx = canvas.getContext('2d') as CanvasRenderingContext2D,
        perlin = new (ClassicalNoise as any)(),
        variation = 0.0025,
        amp = 300,
        variators: any[] = [],
        max_lines =
          navigator.userAgent.toLowerCase().indexOf('firefox') > -1 ? 25 : 40;
      let canvasWidth: any, canvasHeight: any, start_y: any;

      for (let i = 0, u = 0; i < max_lines; i++, u += 0.02) {
        variators[i] = u;
      }

      const draw = () => {
        ctx.shadowColor = 'rgba(43, 205, 255, 1)';
        ctx.shadowBlur = 0;

        for (let i = 0; i <= max_lines; i++) {
          ctx.beginPath();
          ctx.moveTo(0, start_y);
          let y;
          for (let x = 0; x <= canvasWidth; x++) {
            y = perlin.noise(x * variation + variators[i], x * variation, 0);
            ctx.lineTo(x, start_y + amp * y);
          }
          const color = Math.floor(150 * Math.abs(y));
          const alpha = Math.min(Math.abs(y) + 0.05, 0.05);
          ctx.strokeStyle = 'rgba(255,255,255,' + alpha * 2 + ')';
          ctx.stroke();
          ctx.closePath();

          variators[i] += 0.005;
        }
      };

      const animate = () => {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        draw();
        requestAnimationFrame(animate);
      };

      const resizeCanvas = () => {
        canvasWidth = document.documentElement.clientWidth;
        canvasHeight = document.documentElement.clientHeight;

        canvas.setAttribute('width', canvasWidth);
        canvas.setAttribute('height', canvasHeight);

        start_y = canvasHeight / 2;
      };

      (function init() {
        resizeCanvas();
        animate();
        window.addEventListener('resize', resizeCanvas);
      })();
    }
  }, [canvasRef.current, canvasWaveAnimation]);

  return (
    <div className={styles.Index}>
      <header className={styles.header}>
        <h1 className={styles.headline}>{twitchContent.user}</h1>
      </header>
      <main></main>
      <footer className={styles.footer}>
        <canvas className={styles.canvas} ref={canvasRef}></canvas>
        <div className={styles.dashboard}>
          <div className={styles.info}>
            <h2 className={cx(styles.headline, styles.secondLevel)}>info</h2>
            <p className={styles.text}>{twitchContent.info}</p>
          </div>
          <div>
            {twitchContent.goals && twitchContent.goals.length && (
              <>
                <h2 className={cx(styles.headline, styles.secondLevel)}>
                  goals
                </h2>
                <ol className={styles.text}>
                  {twitchContent.goals.map((goal, index) => {
                    return <li key={index}>{goal}</li>;
                  })}
                </ol>
              </>
            )}
          </div>
          <div className={styles.chatWrap}>
            <h2 className={cx(styles.headline, styles.secondLevel)}>chat</h2>
            <div className={cx(styles.chatTableWrap)}>
              {data ? (
                <table className={cx(styles.chatTable, styles.text)}>
                  <tbody>
                    {data.map((chatItem: Message, index: number) => {
                      return (
                        <tr key={`chatmessage-${index}`}>
                          <td>{chatItem.user}:</td>
                          <td>{chatItem.message}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <div className={styles.empty}>
                  <div className={cx(styles.loader, styles.aligned)}></div>
                </div>
              )}
            </div>
          </div>
        </div>
        {twitchContent.showWebCamFrame && (
          <div className={styles.videoFrame}>
            <div className={styles.loader}></div>
          </div>
        )}
      </footer>
    </div>
  );
}

export async function getServerSideProps() {
  return {
    props: {},
  };
}

export default HomePage;
