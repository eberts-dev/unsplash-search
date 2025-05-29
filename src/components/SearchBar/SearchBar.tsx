import Image from 'next/image'
import { useState } from 'react'
import closeIcon from '../../assets/img/clear.svg'
import searchIcon from '../../assets/img/search.svg'
import styles from './SearchBar.module.scss'

interface SearchBarProps {
	onSearch: (query: string) => void
	inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}

export default function SearchBar({ onSearch, inputProps }: SearchBarProps) {
	const [query, setQuery] = useState('')

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault()
		const encodedQuery = encodeURIComponent(query) // Кодируем кириллицу в URL
		onSearch(encodedQuery)
	}

	const handleClear = () => setQuery('')

	return (
		<form className={styles.searchBarContainer} onSubmit={handleSearch}>
			<div className={styles.inputWrapper}>
				<Image
					src={searchIcon}
					alt='Поиск'
					className={styles.searchIcon}
					width={24}
					height={24}
				/>
				<input
					className={styles.input}
					type='text'
					placeholder='Телефоны, яблоки, груши...'
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					{...inputProps}
				/>
				{query && (
					<button
						type='button'
						className={styles.clearBtn}
						onClick={handleClear}
						aria-label='Очистить'
					>
						<Image src={closeIcon} alt='Очистить' width={24} height={24} />
					</button>
				)}
			</div>
			<button className={styles.button} type='submit'>
				Искать
			</button>
		</form>
	)
}
