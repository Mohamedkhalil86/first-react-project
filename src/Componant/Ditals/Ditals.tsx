import { Link, useParams } from "react-router";
import articlesData from "../posts.json";

type Author = {
  name: string;
  role: string;
  avatar: string;
};

type Article = {
  id: string | number;
  slug?: string;
  title: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  excerpt?: string;
  content?: string;
  tags?: string[];
  author?: Author;
};

type ArticleSection = {
  id: string;
  title: string;
  body: string;
};

type ParsedArticleContent = {
  intro: string;
  sections: ArticleSection[];
};

type ArticlesData =
  | Article[]
  | {
      posts?: Article[];
    };

function parseArticleContent(
  content: string | undefined
): ParsedArticleContent {
  if (!content) {
    return {
      intro: "",
      sections: [],
    };
  }

  const parts = content.split(/\n(?=## )/);

  let intro = "";

  const sections: ArticleSection[] = [];

  parts.forEach((part: string, index: number) => {
    if (part.startsWith("## ")) {
      const lines = part.split("\n");

      const title = lines[0].replace("## ", "").trim();

      const body = lines.slice(1).join("\n").trim();

      sections.push({
        id: `section-${index}`,
        title,
        body,
      });
    } else {
      intro = part.trim();
    }
  });

  return {
    intro,
    sections,
  };
}

export default function ArticleDetails() {
  const { slug } = useParams();

  const targetParam = slug
    ? decodeURIComponent(slug).trim()
    : "";

  const postsList: Article[] = Array.isArray(articlesData)
    ? (articlesData as Article[])
    : ((articlesData as { posts?: Article[] })?.posts ?? []);

  console.log("URL PARAM:", targetParam);
  console.log("POSTS:", postsList);
  console.log(
    "SLUGS:",
    postsList.map((post: Article) => post.slug)
  );

  const article = postsList.find(
    (post: Article) =>
      String(post.slug ?? "").trim() === targetParam
  );

  const relatedArticles = postsList
    .filter((item: Article) => item.id !== article?.id)
    .slice(0, 3);

  const { intro, sections } = parseArticleContent(
    article?.content
  );

  if (!article) {
    return (
      <div
        className="bg-[#0a0a0a] min-h-screen flex items-center justify-center text-white"
        dir="rtl"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            المقال غير موجود
          </h2>

          <p className="text-neutral-500 mb-6">
            القيمة المطلوبة: {targetParam || "غير موجودة"}
          </p>

          <Link
            to="/blogs"
            className="px-4 py-2 bg-orange-500 rounded-xl text-white"
          >
            العودة للمدونة
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article
      className="bg-[#0a0a0a] min-h-screen text-right"
      dir="rtl"
    >
      <div className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <img
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover"
          src={article.image}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />

        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/30 to-transparent" />

        <div className="absolute top-24 right-8 left-8">
          <nav className="inline-flex items-center gap-2 px-4 py-2 bg-black/30 backdrop-blur-md rounded-full text-sm border border-white/10">
            <Link
              className="text-white/70 hover:text-white transition-colors"
              to="/"
            >
              <i className="fa-solid fa-home"></i>
            </Link>

            <i className="fa-solid fa-chevron-left text-white/30 text-xs"></i>

            <Link
              className="text-white/70 hover:text-white transition-colors"
              to="/blogs"
            >
              المدونة
            </Link>

            <i className="fa-solid fa-chevron-left text-white/30 text-xs"></i>

            <span className="text-orange-400 font-medium truncate max-w-[200px]">
              {article.category}
            </span>
          </nav>
        </div>

        <div className="absolute top-32 left-0 right-0 p-8 md:p-12">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Link
                className="px-4 py-2 bg-orange-500 text-white text-sm font-bold rounded-full hover:bg-orange-600 transition-colors"
                to={`/blogs?category=${article.category}`}
              >
                {article.category}
              </Link>

              <div className="flex items-center gap-4 text-white/70 text-sm">
                <span className="flex items-center gap-2">
                  <i className="fa-regular fa-calendar"></i>
                  {article.date}
                </span>

                <span className="flex items-center gap-2">
                  <i className="fa-regular fa-clock"></i>
                  {article.readTime}
                </span>
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight max-w-4xl">
              {article.title}
            </h1>

            {article.author && (
              <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 w-fit">
                <img
                  alt={article.author.name}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-orange-500/50"
                  src={article.author.avatar}
                />

                <div>
                  <p className="font-bold text-white">
                    {article.author.name}
                  </p>

                  <p className="text-sm text-white/60">
                    {article.author.role}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-[1fr_300px] gap-12">
          <div className="order-2 lg:order-1">
            {article.excerpt && (
              <div className="p-6 bg-gradient-to-r from-orange-500/10 to-yellow-500/5 rounded-2xl border border-orange-500/20 mb-10">
                <p className="text-lg text-neutral-200 leading-relaxed italic">
                  "{article.excerpt}"
                </p>
              </div>
            )}

            <div className="prose-custom">
              {intro && (
                <p className="text-neutral-300 leading-relaxed mb-6 text-lg whitespace-pre-line">
                  {intro}
                </p>
              )}

              {sections.map(
                (section: ArticleSection) => (
                  <div key={section.id}>
                    <h2
                      id={section.id}
                      className="text-2xl md:text-3xl font-bold text-white mt-14 mb-6 flex items-center gap-4 scroll-mt-24"
                    >
                      <span className="flex items-center justify-center w-10 h-10 bg-orange-500/10 rounded-xl border border-orange-500/30">
                        <i className="fa-solid fa-camera text-orange-500"></i>
                      </span>

                      {section.title}
                    </h2>

                    <p className="text-neutral-300 leading-relaxed mb-6 text-lg whitespace-pre-line">
                      {section.body}
                    </p>
                  </div>
                )
              )}
            </div>

            {article.tags &&
              article.tags.length > 0 && (
                <div className="mt-14 p-6 bg-[#111111] rounded-2xl border border-[#262626]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center border border-orange-500/30">
                      <i className="fa-solid fa-tags text-orange-500"></i>
                    </div>

                    <h3 className="font-bold text-white">
                      الوسوم
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {article.tags.map(
                      (tag: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-4 py-2 bg-[#1a1a1a] text-neutral-400 text-sm rounded-full border border-[#262626] hover:border-orange-500/50 hover:text-orange-500 transition-colors cursor-pointer"
                        >
                          #{tag}
                        </span>
                      )
                    )}
                  </div>
                </div>
              )}

            <div className="mt-6 p-6 bg-[#111111] rounded-2xl border border-[#262626]">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center border border-orange-500/30">
                    <i className="fa-solid fa-share-nodes text-orange-500"></i>
                  </div>

                  <h3 className="font-bold text-white">
                    شارك المقال
                  </h3>
                </div>

                <div className="flex gap-2">
                  <button className="w-11 h-11 bg-[#1a1a1a] border border-[#262626] rounded-xl flex items-center justify-center text-neutral-400 hover:bg-[#1da1f2] hover:text-white transition-all">
                    <i className="fa-brands fa-x-twitter"></i>
                  </button>

                  <button className="w-11 h-11 bg-[#1a1a1a] border border-[#262626] rounded-xl flex items-center justify-center text-neutral-400 hover:bg-[#0077b5] hover:text-white transition-all">
                    <i className="fa-brands fa-linkedin-in"></i>
                  </button>

                  <button className="w-11 h-11 bg-[#1a1a1a] border border-[#262626] rounded-xl flex items-center justify-center text-neutral-400 hover:bg-[#25d366] hover:text-white transition-all">
                    <i className="fa-brands fa-whatsapp"></i>
                  </button>

                  <button className="w-11 h-11 bg-[#1a1a1a] border border-[#262626] rounded-xl flex items-center justify-center text-neutral-400 hover:bg-orange-500 hover:text-white transition-all">
                    <i className="fa-solid fa-link"></i>
                  </button>
                </div>
              </div>
            </div>

            {article.author && (
              <div className="mt-6 p-8 bg-gradient-to-br from-[#161616] to-[#111111] rounded-2xl border border-[#262626]">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <img
                    alt={article.author.name}
                    className="w-24 h-24 rounded-2xl object-cover ring-4 ring-orange-500/20"
                    src={article.author.avatar}
                  />

                  <div className="text-center sm:text-right flex-1">
                    <span className="text-xs text-orange-500 font-semibold uppercase tracking-wider">
                      كاتب المقال
                    </span>

                    <h3 className="text-xl font-bold text-white mt-1">
                      {article.author.name}
                    </h3>

                    <p className="text-neutral-500 text-sm mb-3">
                      {article.author.role}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <aside className="order-1 lg:order-2">
            <div className="lg:sticky lg:top-24 space-y-6">
              {sections.length > 0 && (
                <div className="p-6 bg-[#111111] rounded-2xl border border-[#262626]">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center border border-orange-500/30">
                      <i className="fa-solid fa-list text-orange-500"></i>
                    </div>

                    <h3 className="font-bold text-white">
                      محتويات المقال
                    </h3>
                  </div>

                  <nav className="space-y-2">
                    {sections.map(
                      (
                        sec: ArticleSection,
                        index: number
                      ) => (
                        <a
                          key={sec.id}
                          href={`#${sec.id}`}
                          className="flex items-center gap-3 p-3 rounded-xl text-neutral-400 hover:text-orange-500 hover:bg-orange-500/5 transition-all duration-300 group"
                        >
                          <span className="flex items-center justify-center w-6 h-6 bg-[#1a1a1a] rounded-lg text-xs font-bold text-neutral-500 group-hover:bg-orange-500/10 group-hover:text-orange-500 transition-colors">
                            {index + 1}
                          </span>

                          <span className="text-sm">
                            {sec.title}
                          </span>
                        </a>
                      )
                    )}
                  </nav>
                </div>
              )}

              <div className="p-6 bg-[#111111] rounded-2xl border border-[#262626]">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-[#0a0a0a] rounded-xl">
                    <i className="fa-regular fa-clock text-orange-500 text-xl mb-2"></i>

                    <p className="text-white font-bold">
                      {article.readTime}
                    </p>

                    <p className="text-neutral-500 text-xs">
                      وقت القراءة
                    </p>
                  </div>

                  <div className="text-center p-4 bg-[#0a0a0a] rounded-xl">
                    <i className="fa-regular fa-calendar text-orange-500 text-xl mb-2"></i>

                    <p className="text-white font-bold text-sm">
                      {article.date}
                    </p>

                    <p className="text-neutral-500 text-xs">
                      تاريخ النشر
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-orange-500/10 to-yellow-500/5 rounded-2xl border border-orange-500/20">
                <div className="text-center">
                  <div className="w-14 h-14 bg-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <i className="fa-solid fa-envelope text-orange-500 text-xl"></i>
                  </div>

                  <h3 className="font-bold text-white mb-2">
                    لا تفوّت جديدنا
                  </h3>

                  <p className="text-neutral-400 text-sm mb-4">
                    اشترك للحصول على أحدث المقالات
                  </p>

                  <Link
                    className="block w-full py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-colors text-center"
                    to="/blogs"
                  >
                    تصفح المزيد
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {relatedArticles.length > 0 && (
          <div className="mt-20 pt-12 border-t border-[#262626]">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <span className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center border border-orange-500/30">
                  <i className="fa-solid fa-images text-orange-500 text-xl"></i>
                </span>

                <div>
                  <h2 className="text-2xl font-bold text-white">
                    مقالات قد تعجبك
                  </h2>

                  <p className="text-neutral-500 text-sm">
                    استكشف المزيد من المحتوى المميز
                  </p>
                </div>
              </div>

              <Link
                className="hidden sm:flex items-center gap-2 text-orange-500 hover:text-orange-400 transition-colors group"
                to="/blogs"
              >
                عرض الكل

                <i className="fa-solid fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((rel: Article) => (
                <Link
                  key={rel.id}
                  to={`/blogs/${rel.slug || rel.id}`}
                  className="group relative bg-[#111111] rounded-2xl overflow-hidden border border-[#262626] hover:border-orange-500/30 transition-all duration-500"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      src={rel.image}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#111111] to-transparent"></div>

                    <span className="absolute top-4 right-4 px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">
                      {rel.category}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold text-white group-hover:text-orange-500 transition-colors line-clamp-2 mb-3">
                      {rel.title}
                    </h3>

                    <div className="flex items-center justify-between text-sm text-neutral-500">
                      {rel.author && (
                        <span className="flex items-center gap-2">
                          <img
                            alt={rel.author.name}
                            className="w-6 h-6 rounded-full"
                            src={rel.author.avatar}
                          />

                          {rel.author.name}
                        </span>
                      )}

                      <span>{rel.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}