import { useEffect, useRef, useState } from 'react'
import ImageCard from '../ImageCard/ImageCard'
import styles from './ImageGrid.module.scss'

interface UnsplashPhoto {
	id: string
	urls: { regular: string }
	alt_description: string
}

const ACCESS_KEY = 'Ip0XA55zY7b7-d19osq1L5btGg-YCeDZVpnnJjXqHxs'

export default function ImageGrid({ query }: { query: string }) {
	const [photos, setPhotos] = useState<UnsplashPhoto[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [showNoResults, setShowNoResults] = useState(false)
	const abortControllerRef = useRef<AbortController | null>(null)

	useEffect(() => {
		// Отменяем предыдущий запрос при новом поиске
		if (abortControllerRef.current) {
			abortControllerRef.current.abort()
		}

		const fetchPhotos = async () => {
			const searchQuery = query.trim()
			if (!searchQuery) {
				setPhotos([])
				return
			}

			abortControllerRef.current = new AbortController()
			setLoading(true)
			setError(null)

			try {
				const params = new URLSearchParams({
					client_id: ACCESS_KEY,
					query: searchQuery,
					language: 'ru',
					page: '1',
					orientation: 'squarish',
				})
				const url = `https://api.unsplash.com/search/photos?${params.toString()}`
				const response = await fetch(url, {
					signal: abortControllerRef.current.signal,
				})
				const data = await response.json()

				if (data.results && data.results.length > 0) {
					setPhotos(data.results)
				} else {
					setPhotos([])
				}
			} catch (error) {
				if (error instanceof Error && error.name !== 'AbortError') {
					console.error('Ошибка загрузки:', error)
					setError('Не удалось загрузить изображения')
				}
			} finally {
				setLoading(false)
			}
		}

		const debounceTimer = setTimeout(fetchPhotos, 500)
		return () => {
			clearTimeout(debounceTimer)
			abortControllerRef.current?.abort()
		}
	}, [query])

	useEffect(() => {
		if (!loading && photos.length === 0 && query.trim() && !error) {
			const timer = setTimeout(() => setShowNoResults(true), 600)
			return () => clearTimeout(timer)
		} else {
			setShowNoResults(false)
		}
	}, [loading, photos.length, query, error])

	if (loading) return <div className={styles.loader}>Загрузка...</div>
	if (error) return <div className='text-center py-8 text-red-500'>{error}</div>

	return (
		<div className={styles.wrapper}>
			<div className={styles.grid}>
				{photos.map((photo) => (
					<ImageCard key={photo.id} photo={photo} />
				))}

				{showNoResults && (
					<div className={styles.noResults}>
						К сожалению, поиск не дал результатов
					</div>
				)}
			</div>
		</div>
	)
}
