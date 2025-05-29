declare module 'unsplash-js' {
	export interface Photo {
		id: string
		urls: { regular: string }
		alt_description: string | null
	}

	export interface SearchResponse {
		results: Photo[]
		total: number
		total_pages: number
	}
}
