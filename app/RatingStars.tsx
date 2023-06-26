type Props = {
  rating: number;
};

export default function StarRating({ rating }: Props) {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating - filledStars >= 0.5;

  const stars = [];
  for (let i = 0; i < filledStars; i++) {
    stars.push(<span key={`star-${i}`}>★</span>);
  }

  if (hasHalfStar) {
    stars.push(<span key="star-half">½</span>);
  }

  const emptyStars = 5 - stars.length;
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<span key={`star-empty-${i}`}>☆</span>);
  }

  return <div>{stars}</div>;
}
