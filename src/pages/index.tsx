import { useState } from 'react'
import ImageGrid from '../components/ImageGrid/ImageGrid'
import SearchBar from '../components/SearchBar/SearchBar'
import styles from './index.module.scss'

export default function Home() {
	const [searchQuery, setSearchQuery] = useState('')

	return (
		<div className={styles.bg}>
			<div
				className={
					searchQuery
						? `${styles.section} ${styles['search-active']}`
						: styles.section
				}
			>
				<div
					className={
						searchQuery
							? `${styles.container} ${styles.active}`
							: styles.container
					}
				>
					<div
						className={
							searchQuery
								? [
										styles.searchBarContainer,
										styles.searchBarContainerActive,
								  ].join(' ')
								: [
										styles.searchBarContainer,
										styles.searchBarContainerInactive,
								  ].join(' ')
						}
					>
						<SearchBar onSearch={setSearchQuery} />
					</div>
				</div>

				{searchQuery && <ImageGrid query={searchQuery} />}
			</div>
		</div>
	)
}
