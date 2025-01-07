// movie listing page

import Link from 'next/link';

// call movie listing api
export const getStaticProps = async () => {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_ENDPOINT}/3/movie/popular?language=en-US&page=1`,
		{
			headers: {
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
			},
		},
	);
	const data: MovieList = await res.json();

	return { props: { data } };
};

export default function Movies({ data }: { data: MovieList }) {
	console.log('data', data);
	return (
		<>
			<div className="p-5">
				this is the movie listing page
				<div className="grid grid-cols-3 gap-3">
					{data.results.map((movieData) => {
						return (
							<div key={movieData.id}>
								<img
									src={`${process.env.NEXT_PUBLIC_API_IMAGE_PATH}/${movieData.backdrop_path}`}
								/>
								<p>{movieData.original_title}</p>
								<Link href={`/movies/${movieData.id}`}>View</Link>
							</div>
						);
					})}
				</div>
			</div>
			<Link href={'/movies/2'}>Go to movie details page</Link>
		</>
	);
}

// types
type Results = {
	backdrop_path: string;
	poster_path: string;
	id: number;
	original_title: string;
	title: string;
	popularity: number;
	release_date: string;
};

type MovieList = {
	page: number;
	results: Results[];
	total_pages: number;
	total_results: number;
};
