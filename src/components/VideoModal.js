import { useEffect, useRef } from 'react';
import styles from '../styles/VideoModal.module.css';

export default function VideoModal({ isOpen, onClose, videoUrl, title }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.load();
    }
  }, [isOpen, videoUrl]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        {videoUrl ? (
          <div className={styles.videoContainer}>
            <video
              ref={videoRef}
              controls
              autoPlay
              className={styles.videoPlayer}
            >
              <source src={videoUrl} type="video/mp4" />
              <source src={videoUrl} type="audio/mpeg" />
              Your browser does not support the video tag.
            </video>
            {title && <h3 className={styles.videoTitle}>{title}</h3>}
          </div>
        ) : (
          <div className={styles.errorMessage}>
            <p>Video not available</p>
          </div>
        )}
      </div>
    </div>
  );
}

