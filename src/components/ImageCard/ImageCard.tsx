import Image from 'next/image'
import { useState } from 'react'
import closeIcon from '../../assets/img/close.svg'
import styles from './ImageCard.module.scss'

interface ImageCardProps {
	photo: {
		urls: { regular: string }
		alt_description: string | null
	}
}

export default function ImageCard({ photo }: ImageCardProps) {
	const imageUrl = photo.urls.regular
	const [loaded, setLoaded] = useState(false)
	const [zoomed, setZoomed] = useState(false)

	return (
		<>
			<div
				className={styles.photoCard}
				onClick={() => setZoomed(true)}
				style={{ cursor: 'zoom-in' }}
			>
				<div className={styles.imageWrapper}>
					<Image
						src={imageUrl}
						alt={photo.alt_description || 'Unsplash image'}
						fill
						className={loaded ? styles.imageLoaded : styles.imageLoading}
						sizes='(max-width: 768px) 100vw, 204px'
						onLoad={() => setLoaded(true)}
						priority={false}
					/>
					{!loaded && <div className={styles.skeleton} />}
				</div>
			</div>
			{zoomed && (
				<div className={styles.modal} onClick={() => setZoomed(false)}>
					<button
						className={styles.closeBtn}
						onClick={(e) => {
							e.stopPropagation()
							setZoomed(false)
						}}
						aria-label='Закрыть'
						type='button'
					>
						<Image src={closeIcon} alt='Закрыть' width={28} height={28} />
					</button>
					<Image
						src={imageUrl}
						alt={photo.alt_description || 'Unsplash image'}
						width={767.47}
						height={760}
						className={styles.modalImg}
						style={{ objectFit: 'contain' }}
						priority
					/>
				</div>
			)}
		</>
	)
}
