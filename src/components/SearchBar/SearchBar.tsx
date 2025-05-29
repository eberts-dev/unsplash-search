import Image from 'next/image'
import { useState } from 'react'
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
			</div>
			<button className={styles.button} type='submit'>
				Искать
			</button>
		</form>
	)
}
