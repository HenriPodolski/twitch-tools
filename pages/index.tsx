import React, { useState, useCallback } from 'react';
import defaultThemeStyles from './index.module.scss';
import lolThemeStyles from './index.lol-theme.module.scss';
import nba2kThemeStyles from './index.nba2k-theme.module.scss';
import cx from 'classnames';
import useSWR from 'swr';
import { useEffect, useRef } from 'react';
import ClassicalNoise from '../lib/graphics/classical-noise';
import { Message } from '../additional';

import currentContent from '../content';
import { GetServerSidePropsContext } from 'next';
import GoliveBot from '../lib/twitch/golive-bot';

const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
  ...args: any[]
) => {
  const res = await fetch(input, init);
  return res.json();
};

function HomePage({ twitchContent }: any) {
  const { data, error } = useSWR(
    'http://dashboard.local:3201/api/chat',
    fetcher,
    { refreshInterval: 500 }
  );
  const [canvasWaveAnimation] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const styles = useCallback(() => {
    let theme = defaultThemeStyles;

    switch (true) {
      case twitchContent.theme === 'lol': {
        theme = lolThemeStyles;
        break;
      }
      case twitchContent.theme === 'nba2k': {
        theme = nba2kThemeStyles;
        break;
      }
    }

    return theme;
  }, [twitchContent.theme]);

  useEffect(() => {
    if (!canvasWaveAnimation) {
      return;
    }

    if (canvasRef.current) {
      const canvas = canvasRef.current,
        ctx = canvas.getContext('2d') as CanvasRenderingContext2D,
        perlin = new (ClassicalNoise as any)(),
        variation = 0.0025,
        amp = 700,
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
    <div className={styles().Index}>
      <header className={styles().header}>
        <h1 className={styles().headline}>{twitchContent.user}</h1>
        {twitchContent.additionalHeaderElement && (
          <div className={styles().additionalHeaderElement}>
            {twitchContent.additionalHeaderElement}
          </div>
        )}
      </header>
      <main></main>
      <footer
        className={cx(styles().footer, {
          [styles()['no-cam']]: !twitchContent.showWebCam,
        })}
      >
        <canvas className={styles().canvas} ref={canvasRef}></canvas>
        <div className={styles().dashboard}>
          <div className={styles().info}>
            <h2 className={cx(styles().headline, styles().secondLevel)}>
              info
            </h2>
            <p className={styles().text}>{twitchContent.info}</p>
          </div>
          <div>
            {twitchContent.goals && Boolean(twitchContent.goals.length) && (
              <>
                <h2 className={cx(styles().headline, styles().secondLevel)}>
                  goals
                </h2>
                <ol className={styles().text}>
                  {twitchContent.goals.map((goal: string, index: number) => {
                    return <li key={index}>{goal}</li>;
                  })}
                </ol>
              </>
            )}
          </div>
          <div className={styles().chatWrap}>
            {data?.length > 0 && (
              <h2 className={cx(styles().headline, styles().secondLevel)}>
                chat
              </h2>
            )}
            <div className={cx(styles().chatTableWrap)}>
              {data && !twitchContent.disableChat ? (
                <table className={cx(styles().chatTable, styles().text)}>
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
                <div className={styles().empty}>
                  <div className={cx(styles().loader, styles().aligned)}></div>
                </div>
              )}
            </div>
          </div>
        </div>
        {twitchContent.showWebCamFrame && (
          <div className={styles().videoFrame}>
            <div className={styles().loader}></div>
          </div>
        )}
      </footer>
    </div>
  );
}

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const { showWebCam } = query;
  GoliveBot({ user: process.env.BROADCAST_CHANNEL as string });
  const twitchContent = {
    ...currentContent,
    showWebCam:
      typeof showWebCam !== undefined
        ? showWebCam === 'true'
          ? true
          : showWebCam === 'false'
          ? false
          : currentContent.showWebCam
        : currentContent.showWebCam,
  };
  return {
    props: {
      twitchContent,
    },
  };
}

export default HomePage;
