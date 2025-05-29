declare module 'unsplash-js' {
	export interface Photo {
		id: string
		urls: {
			regular: string
			small?: string
			thumb?: string
		}
		alt_description: string | null
		user: {
			name: string
		}
	}

	export interface SearchResponse {
		type: 'search'
		results: Photo[]
		total: number
		total_pages: number
		errors?: string[]
	}
}

declare module 'unsplash-js/lib/unsplash' {
	import { Options } from 'unsplash-js'

	interface SearchFilters {
		orientation?: 'landscape' | 'portrait' | 'squarish'
		collections?: string[]
	}

	type SearchMethod = {
		photos(
			keyword: string,
			page?: number,
			perPage?: number,
			filters?: SearchFilters
		): Promise<{ response: SearchResponse }>
	}

	export default class Unsplash {
		constructor(options: Options)
		search: SearchMethod
	}
}
