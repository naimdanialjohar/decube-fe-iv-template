// movie details page

import Link from 'next/link';
import { useRouter } from 'next/router';

export const getStaticPaths = async () => {
	return {
		paths: [
			{
				params: {
					id: '558449',
					// id: movieId,
				},
			}, // See the "paths" section below
		],
		fallback: true, // false or "blocking"
	};
};

// call movie details api
export const getStaticProps = async () => {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_ENDPOINT}/3/movie/${558449}
	`,
		{
			headers: {
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
			},
		},
	);
	const data: MovieDetails = await res.json();

	return { props: { data } };
};

export default function MovieDetails({ data }: { data: MovieDetails }) {
	const router = useRouter();
	const movieId = router.query.id;
	console.log('movie', movieId);
	console.log('movieData', data);
	return (
		<>
			<div className="p-5">
				<Link href={'/movies'}>Back To Movie List</Link>

				<div>
					<img
						src={`${process.env.NEXT_PUBLIC_API_IMAGE_PATH}/${data.backdrop_path}`}
					/>
					<p>Title: {data.title}</p>
					<p>Release Date: {data.release_date}</p>
					<p>Popularity: {data.popularity}</p>
					<p>Origin Country: {data.origin_country.concat(', ')}</p>
				</div>
			</div>
		</>
	);
}

type MovieDetails = {
	backdrop_path: string;
	origin_country: string[];
	poster_path: string;
	id: number;
	original_title: string;
	title: string;
	popularity: number;
	release_date: string;
};
