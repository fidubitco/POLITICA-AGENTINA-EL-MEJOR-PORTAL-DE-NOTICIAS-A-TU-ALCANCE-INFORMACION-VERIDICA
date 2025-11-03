import CategoryPage from '../components/CategoryPage';
import { noticiasJudicial } from '../data/noticias-completas';

const trendingTopics = [
  { name: 'Corte Suprema', count: '12.5K' },
  { name: 'Cristina Kirchner', count: '10.8K' },
  { name: 'Causa Vialidad', count: '9.2K' },
  { name: 'Reforma Judicial', count: '7.6K' },
  { name: 'Poder Judicial', count: '6.4K' },
];

export default function JudicialPage() {
  return (
    <CategoryPage
      categoryName="Judicial"
      categorySlug="judicial"
      categoryColor="red"
      description="Noticias judiciales de Argentina: Corte Suprema, causas, sentencias y actualidad del poder judicial."
      noticias={noticiasJudicial}
      trendingTopics={trendingTopics}
    />
  );
}

