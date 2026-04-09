import { Link } from "react-router-dom";

type ArticlePreviewProps = {
  title: string;
  slug: string;
  image: string;
  imageAlt: string;
  category: string;
  categorySlug: string;
  teaser: string;
};

const ArticlePreview = ({
  title,
  slug,
  image,
  imageAlt,
  category,
  teaser,
}: ArticlePreviewProps) => (
  <Link
    to={`/article/${slug}`}
    className="group block overflow-hidden rounded-[1.6rem] border border-border bg-card transition-colors hover:border-primary/30"
  >
    <div className="aspect-[16/10] overflow-hidden">
      <img
        src={image}
        alt={imageAlt}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
    </div>
    <div className="p-5 text-right">
      <div className="text-xs uppercase tracking-widest text-primary">
        {category}
      </div>
      <h3 className="mt-2 text-lg font-semibold leading-tight">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {teaser}
      </p>
    </div>
  </Link>
);

export default ArticlePreview;
