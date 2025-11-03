import CategoryPage from '../components/CategoryPage';
import { noticiasSociedad } from '../data/noticias-completas';

const trendingTopics = [
  { name: 'Educación', count: '13.8K' },
  { name: 'Salud', count: '12.4K' },
  { name: 'Seguridad', count: '10.9K' },
  { name: 'Medio Ambiente', count: '9.5K' },
  { name: 'Derechos Humanos', count: '8.2K' },
];

export default function SociedadPage() {
  return (
    <CategoryPage
      categoryName="Sociedad"
      categorySlug="sociedad"
      categoryColor="orange"
      description="Noticias de sociedad: educación, salud, seguridad, medio ambiente y actualidad social argentina."
      noticias={noticiasSociedad}
      trendingTopics={trendingTopics}
    />
  );
}

