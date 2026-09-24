import  { useMemo } from 'react'
import { Link } from 'react-router'
import articlesData from '../../Componant/posts.json'

interface Post  {
  id: number
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  author: {
    name: string
    avatar: string
    role: string
  }
  image: string
  date: string
  readTime: string
  featured?: boolean
  tags?: string[]
}

export default function Home() {

 

  const posts: Post[] = Array.isArray(articlesData)
    ? articlesData
    : articlesData?.posts || []


  const latestPosts = useMemo(() => {
    return [...posts]
      .sort(
        (a, b) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      )
      .slice(0, 3)
  }, [posts])

 

  const categories = useMemo(() => {
    const categoryMap = new Map<string, number>()

    posts.forEach((post) => {
      if (!post.category) return

      categoryMap.set(
        post.category,
        (categoryMap.get(post.category) || 0) + 1
      )
    })

    return Array.from(categoryMap.entries()).map(
      ([name, count]) => ({
        name,
        count,
      })
    )
  }, [posts])

 

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      'إضاءة': 'fa-sun',
      'بورتريه': 'fa-user',
      'مناظر طبيعية': 'fa-mountain-sun',
      'تقنيات': 'fa-sliders',
      'معدات': 'fa-camera',
      'تصوير': 'fa-camera-retro',
      'عدسات': 'fa-camera',
      'فوتوغرافيا': 'fa-image',
    }

    return icons[category] || 'fa-camera'
  }

  return (
    <>

    

      <section className="relative pt-20 min-h-[90vh] flex items-center overflow-hidden bg-[#0a0a0a]">

        <div className="absolute inset-0 bg-[linear-gradient(rgba(38,38,38,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(38,38,38,0.5)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl blob" />

        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl blob"
          style={{ animationDelay: '-2s' }}
        />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

          <div className="text-center max-w-4xl mx-auto">

            <div className="section-label bg-brand2 p-3 border border-2 border-brand rounded-4xl inline-flex items-center gap-2 mb-8 animate-fade-in">

              <span className="text-sm font-medium text-neutral-300">
                مرحباً بك في عدسة
              </span>

              <span className="relative flex gap-2 h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
              </span>

              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />

            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
              اكتشف <span className="text-brand">فن</span> <br />
              التصوير الفوتوغرافي
            </h1>

            <p className="text-xl md:text-2xl text-neutral-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              انغمس في أسرار المحترفين ونصائح عملية لتطوير مهاراتك في التصوير.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">

              <Link
                to="/who"
                className="bg-transparent p-3 rounded-4xl border border-1 border-gray-800 hover:bg-brand2 hover:text-brand hover:border-brand text-white inline-flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <span>اعرف المزيد</span>
              </Link>

              <Link
                to="/blogs"
                className="bg-brand p-3 rounded-4xl text-white inline-flex items-center justify-center gap-2 group"
              >
                <svg
                  className="w-5 h-5 group-hover:-translate-x-1 transition-transform rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>

                <span>استكشف المقالات</span>
              </Link>

            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">

              <div
                className="glass-card p-4 hover:scale-105 border border-1 border-gray-800 rounded-3xl transition-transform duration-300"
                style={{ animationDelay: '300ms' }}
              >
                <i className="fa-solid fa-pen-nib text-2xl text-orange-500 mb-1" />

                <p className="text-2xl text-amber-400 md:text-3xl font-bold gradient-text">
                  6
                </p>

                <p className="text-neutral-500 text-sm">
                  كاتب
                </p>
              </div>

              <div
                className="glass-card border border-1 border-gray-800 rounded-3xl p-4 hover:scale-105 transition-transform duration-300"
                style={{ animationDelay: '200ms' }}
              >
                <i className="fa-solid fa-folder-open text-2xl text-orange-500 mb-1" />

                <p className="text-2xl md:text-3xl text-amber-400 font-bold gradient-text">
                  {categories.length}
                </p>

                <p className="text-neutral-500 text-sm">
                  تصنيفات
                </p>
              </div>

              <div
                className="glass-card p-4 border border-1 border-gray-800 rounded-3xl hover:scale-105 transition-transform duration-300"
                style={{ animationDelay: '100ms' }}
              >
                <i className="fa-solid fa-users text-2xl text-orange-500 mb-1" />

                <p className="text-2xl md:text-3xl text-amber-400 font-bold gradient-text">
                  +10 ألف
                </p>

                <p className="text-neutral-500 text-sm">
                  قارئ
                </p>
              </div>

              <div
                className="glass-card p-4 border border-1 border-gray-800 rounded-3xl hover:scale-105 transition-transform duration-300"
                style={{ animationDelay: '0ms' }}
              >
                <i className="fa-solid fa-newspaper text-2xl text-orange-500 mb-1" />

                <p className="text-2xl text-amber-400 md:text-3xl font-bold gradient-text">
                  {posts.length}
                </p>

                <p className="text-neutral-500 text-sm">
                  مقالة
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>


     

      <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">

        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-orange-500/5 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">

            <Link
              to="/blogs"
              className="group inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-medium transition-all duration-300 hover:-translate-y-0.5"
            >
              <svg
                className="w-4 h-4 group-hover:-translate-x-1 transition-transform rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>

              عرض الكل
            </Link>

            <div className="flex flex-col items-end">

              <span className="inline-flex items-center gap-2 border border-brand bg-brand2 text-brand px-4 py-1.5 rounded-full text-sm font-medium mb-4">

                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
                </span>

                <span>مميز</span>

              </span>

              <h2 className="text-4xl md:text-6xl font-bold text-white">
                مقالات مختارة
              </h2>

              <p className="text-gray-500 mt-10 text-2xl max-w-lg">
                محتوى منتقى لبدء رحلة تعلمك
              </p>

            </div>
          </div>

          <div className="space-y-8">

            

            <article className="group relative bg-[#161616] rounded-3xl overflow-hidden border border-[#262626] hover:border-orange-500/30 transition-all duration-500">

              <Link
                to="/blogs/mastering-golden-hour-photography"
                className="block"
              >

                <div className="grid md:grid-cols-2 gap-0">

                  <div className="p-8 md:p-10 flex flex-col justify-center bg-[#161616] order-2 md:order-1">

                    <div className="flex flex-col items-start text-right" dir="rtl">

                      <div className="flex items-center gap-3 mb-4">

                        <span className="px-3 py-1 bg-orange-500/10 text-orange-500 text-xs font-semibold rounded-full border border-orange-500/20">
                          إضاءة
                        </span>

                        <span className="flex items-center gap-1 text-sm text-neutral-500">

                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>

                          <span>8 دقائق للقراءة</span>

                        </span>

                      </div>

                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-orange-500 transition-colors duration-300 leading-tight">
                        إتقان تصوير الساعة الذهبية: دليل شامل
                      </h2>

                      <p className="text-neutral-400 mb-6 leading-relaxed">
                        تعلم كيفية التقاط صور مذهلة خلال الساعة الذهبية مع نصائح احترافية حول الإضاءة والتكوين.
                      </p>

                    </div>

                    <div className="flex items-center justify-between mt-auto">

                      <span className="inline-flex items-center gap-2 text-orange-500 font-semibold text-sm group-hover:gap-3 transition-all duration-300">

                        <svg
                          className="w-5 h-5 rotate-180"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>

                        اقرأ المقال

                      </span>

                      <div className="flex items-center gap-3">

                        <div>
                          <p className="text-sm font-semibold text-white">
                            سالم أحمد
                          </p>

                          <p className="text-xs text-neutral-500">
                            ١٥ يناير ٢٠٢٦
                          </p>
                        </div>

                        <div className="relative">

                          <img
                            alt="سالم أحمد"
                            className="w-12 h-12 rounded-full object-cover ring-2 ring-[#262626] shadow-md"
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                          />

                          <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-orange-500 rounded-full border-2 border-[#161616]" />

                        </div>

                      </div>

                    </div>

                  </div>

                  <div className="relative h-72 md:h-[400px] overflow-hidden order-1 md:order-2">

                    <img
                      alt="إتقان تصوير الساعة الذهبية: دليل شامل"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      src="https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=800&h=400&fit=crop"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="absolute top-4 right-4">

                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-xs font-semibold rounded-full">

                        <svg
                          className="w-3.5 h-3.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>

                        مميز

                      </span>

                    </div>

                  </div>

                </div>

              </Link>

            </article>


          

            <article className="group relative bg-[#161616] rounded-3xl overflow-hidden border border-[#262626] hover:border-orange-500/30 transition-all duration-500">

              <Link
                to="/blogs/portrait-photography-secrets"
                className="block"
              >

                <div className="grid md:grid-cols-2 gap-0">

                  <div className="p-8 md:p-10 flex flex-col justify-center bg-[#161616] order-2 md:order-1">

                    <div className="flex flex-col items-start text-right" dir="rtl">

                      <div className="flex items-center gap-3 mb-4">

                        <span className="px-3 py-1 bg-orange-500/10 text-orange-500 text-xs font-semibold rounded-full border border-orange-500/20">
                          بورتريه
                        </span>

                        <span className="flex items-center gap-1 text-sm text-neutral-500">

                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>

                          <span>6 دقائق للقراءة</span>

                        </span>

                      </div>

                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-orange-500 transition-colors duration-300 leading-tight">
                        أسرار تصوير البورتريه: كيف تلتقط روح الشخصية
                      </h2>

                      <p className="text-neutral-400 mb-6 leading-relaxed">
                        اكتشف تقنيات احترافية لتصوير بورتريهات تعبيرية تكشف عن شخصية الموضوع الحقيقية.
                      </p>

                    </div>

                    <div className="flex items-center justify-between mt-auto">

                      <span className="inline-flex items-center gap-2 text-orange-500 font-semibold text-sm group-hover:gap-3 transition-all duration-300">

                        <svg
                          className="w-5 h-5 rotate-180"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>

                        اقرأ المقال

                      </span>

                      <div className="flex items-center gap-3">

                        <div>
                          <p className="text-sm font-semibold text-white">
                            محمد علي
                          </p>

                          <p className="text-xs text-neutral-500">
                            ١٢ يناير ٢٠٢٦
                          </p>
                        </div>

                        <div className="relative">

                          <img
                            alt="محمد علي"
                            className="w-12 h-12 rounded-full object-cover ring-2 ring-[#262626] shadow-md"
                            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
                          />

                          <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-orange-500 rounded-full border-2 border-[#161616]" />

                        </div>

                      </div>

                    </div>

                  </div>

                  <div className="relative h-72 md:h-[400px] overflow-hidden order-1 md:order-2">

                    <img
                      alt="أسرار تصوير البورتريه: كيف تلتقط روح الشخصية"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop&crop=face"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="absolute top-4 right-4">

                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-xs font-semibold rounded-full">

                        <svg
                          className="w-3.5 h-3.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>

                        مميز

                      </span>

                    </div>

                  </div>

                </div>

              </Link>

            </article>


            

            <article className="group relative bg-[#161616] rounded-3xl overflow-hidden border border-[#262626] hover:border-orange-500/30 transition-all duration-500">

              <Link
                to="/blogs/landscape-photography-guide"
                className="block"
              >

                <div className="grid md:grid-cols-2 gap-0">

                  <div className="p-8 md:p-10 flex flex-col justify-center bg-[#161616] order-2 md:order-1">

                    <div className="flex flex-col items-start text-right" dir="rtl">

                      <div className="flex items-center gap-3 mb-4">

                        <span className="px-3 py-1 bg-orange-500/10 text-orange-500 text-xs font-semibold rounded-full border border-orange-500/20">
                          مناظر طبيعية
                        </span>

                        <span className="flex items-center gap-1 text-sm text-neutral-500">

                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>

                          <span>10 دقائق للقراءة</span>

                        </span>

                      </div>

                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-orange-500 transition-colors duration-300 leading-tight">
                        دليل تصوير المناظر الطبيعية: من المبتدئ إلى المحترف
                      </h2>

                      <p className="text-neutral-400 mb-6 leading-relaxed">
                        استكشف تقنيات تصوير المناظر الطبيعية الخلابة وكيفية التقاط جمال الطبيعة بعدستك.
                      </p>

                    </div>

                    <div className="flex items-center justify-between mt-auto">

                      <span className="inline-flex items-center gap-2 text-orange-500 font-semibold text-sm group-hover:gap-3 transition-all duration-300">

                        <svg
                          className="w-5 h-5 rotate-180"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>

                        اقرأ المقال

                      </span>

                      <div className="flex items-center gap-3">

                        <div>

                          <p className="text-sm font-semibold text-white">
                            إبراهيم حسن
                          </p>

                          <p className="text-xs text-neutral-500">
                            ١٠ يناير ٢٠٢٦
                          </p>

                        </div>

                        <div className="relative">

                          <img
                            alt="إبراهيم حسن"
                            className="w-12 h-12 rounded-full object-cover ring-2 ring-[#262626] shadow-md"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                          />

                          <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-orange-500 rounded-full border-2 border-[#161616]" />

                        </div>

                      </div>

                    </div>

                  </div>

                  <div className="relative h-72 md:h-[400px] overflow-hidden order-1 md:order-2">

                    <img
                      alt="دليل تصوير المناظر الطبيعية: من المبتدئ إلى المحترف"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="absolute top-4 right-4">

                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-xs font-semibold rounded-full">

                        <svg
                          className="w-3.5 h-3.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 01.951-.69l1.07-3.292z" />
                        </svg>

                        مميز

                      </span>

                    </div>

                  </div>

                </div>

              </Link>

            </article>

          </div>

        </div>
      </section>


     

      <section className="py-24 bg-[#111111] relative border-y border-[#262626]">

        <div
          dir="rtl"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >

          <div className="text-center mb-12">
 <div className="section-label bg-brand2 p-3 border border-2 border-brand rounded-4xl inline-flex items-center gap-2 mb-8 animate-fade-in">

           <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />

              <span className="relative flex gap-2 h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
              </span>

              
   <span className="text-sm font-medium text-neutral-300">
               
التصنيفات
              </span>
            </div>
           

            <h2 className=" text-6xl font-bold text-white">
              استكشف حسب الموضوع
            </h2>

            <p className=" max-w-lg text-gray-400 mt-8 mx-auto">
              اعثر على محتوى مصمم حسب اهتماماتك
            </p>

          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">

            {categories.map((category, index) => (

              <Link
                key={category.name}
                to={`/blogs?category=${encodeURIComponent(category.name)}`}
                className="
                  group
                  relative
                  block
                  p-6
                  rounded-2xl
                  bg-[#161616]
                  border
                  border-[#262626]
                  overflow-hidden
                  hover:border-orange-500/30
                  transition-all
                  duration-500
                  hover:-translate-y-1
                "
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-br
                    from-orange-500
                    to-yellow-500
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity
                    duration-500
                  "
                />

                <div className="relative z-10">

                  <div
                    className="
                      w-12
                      h-12
                      bg-orange-500/10
                      rounded-xl
                      flex
                      items-center
                      justify-center
                      mb-4
                      group-hover:bg-white/20
                      transition-colors
                      duration-300
                      border
                      border-orange-500/20
                      group-hover:border-transparent
                    "
                  >

                    <i
                      className={`
                        fa-solid
                        ${getCategoryIcon(category.name)}
                        text-xl
                        text-orange-500
                        group-hover:text-white
                        transition-colors
                        duration-300
                      `}
                    />

                  </div>

                  <h3
                    className="
                      font-bold
                      text-lg
                      text-white
                      group-hover:text-white
                      transition-colors
                      duration-300
                      mb-1
                    "
                  >
                    {category.name}
                  </h3>

                  <p
                    className="
                      text-sm
                      text-neutral-500
                      group-hover:text-white/80
                      transition-colors
                      duration-300
                    "
                  >
                    {category.count} مقالة
                  </p>

                  <div
                    className="
                      absolute
                      top-6
                      left-6
                      w-8
                      h-8
                      rounded-full
                      bg-[#262626]
                      flex
                      items-center
                      justify-center
                      opacity-0
                      group-hover:opacity-100
                      group-hover:bg-white/20
                      transition-all
                      duration-300
                    "
                  >

                    <svg
                      className="w-4 h-4 text-white rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >

                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />

                    </svg>

                  </div>

                </div>

              </Link>

            ))}

          </div>

        </div>
      </section>


     

      <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">

        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-orange-500/5 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
<Link
              to="/blogs"
              className="group inline-flex items-center gap-2 text-orange-500 font-semibold hover:text-orange-400 transition-colors"
            >

             

              <svg
                className="w-5 h-5 group-hover:-translate-x-1 transition-transform rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />

              </svg>
 عرض جميع المقالات
            </Link>
            <div className='items-end flex flex-col'>

             <div className="text-brand  bg-brand2 p-3 border border-2 border-brand rounded-4xl inline-flex items-center gap-2 mb-8 animate-fade-in">
الاحدث
           

              <span className="relative flex gap-2 h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
              </span>
<span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
              
   <span className="text-sm font-medium text-neutral-300">
               

              </span>
            </div>

              <h2 className="text-6xl font-bold text-white">
                أحدث المقالات
              </h2>

              <p className="text-gray-400 mt-8 max-w-lg">
                محتوى جديد طازج من المطبعة
              </p>

            </div>

            

          </div>


          {/* Latest Posts */}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {latestPosts.map((post, index) => (

              <article
                key={post.id}
                className="group card overflow-hidden"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >

                <Link
                  to={`/blogs/${post.slug}`}
                  className="block"
                >

                  {/* Image */}

                  <div className="relative h-52 overflow-hidden">

                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Category */}

                    <div className="absolute top-4 right-4">

                      <span className="px-3 py-1 bg-[#0a0a0a]/80 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-[#333333]">
                        {post.category}
                      </span>

                    </div>

                  </div>


                  {/* Content */}

                  <div className="p-6">

                    {/* Meta */}

                    <div className="flex items-center gap-3 text-sm text-neutral-500 mb-3">

                      <span className="flex items-center gap-1">

                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >

                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />

                        </svg>

                        {post.readTime}

                      </span>

                      <span className="w-1 h-1 bg-neutral-600 rounded-full" />

                      <span>

                        {new Date(post.date).toLocaleDateString(
                          'ar-EG',
                          {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          }
                        )}

                      </span>

                    </div>


                    {/* Title */}

                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-500 transition-colors duration-300 line-clamp-2 leading-tight">
                      {post.title}
                    </h3>


                    {/* Excerpt */}

                    <p className="text-neutral-400 mb-5 line-clamp-2 text-sm leading-relaxed">
                      {post.excerpt}
                    </p>


                    {/* Footer */}

                    <div className="flex items-center justify-between pt-4 border-t border-[#262626]">

                      {/* Author */}

                      <div className="flex items-center gap-3">

                        <img
                          src={post.author?.avatar}
                          alt={post.author?.name}
                          className="w-9 h-9 rounded-full object-cover ring-2 ring-[#262626]"
                        />

                        <div>

                          <p className="text-sm font-medium text-white">
                            {post.author?.name}
                          </p>

                          <p className="text-xs text-neutral-500">
                            {post.author?.role}
                          </p>

                        </div>

                      </div>


                      {/* Arrow */}

                      <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500 transition-colors duration-300 border border-orange-500/20 group-hover:border-transparent">

                        <svg
                          className="w-4 h-4 text-orange-500 group-hover:text-white transition-colors duration-300 rotate-180"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >

                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />

                        </svg>

                      </div>

                    </div>

                  </div>

                </Link>

              </article>

            ))}

          </div>

        </div>
      </section>







      <section className="py-24 relative overflow-hidden bg-[#0a0a0a]">


  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/10 rounded-full blur-3xl" />

  <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

    <div className="bg-[#161616] rounded-3xl border border-[#262626] p-8 md:p-12 lg:p-16 text-center">

      {/* Icon */}
      <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">

        <svg
          className="w-8 h-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>

      </div>

      
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">

        اشترك في{" "}

        <span className="text-amber-400">
          نشرتنا الإخبارية
        </span>

      </h2>

      <p className="text-neutral-400  mb-8 max-w-xl mx-auto">

        احصل على نصائح التصوير الحصرية ودروس جديدة مباشرة في بريدك الإلكتروني

      </p>

      {/* Subscribe Form */}
      <form
        className="flex  flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-6"
        onSubmit={(e) => e.preventDefault()}
      >
  <button
          type="submit"
          className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
        >
          اشترك الآن
        </button>
        <input
        dir='rtl'
          type="email"
          placeholder="أدخل بريدك الإلكتروني"
          className="flex-1 px-5 py-4 rounded-xl bg-[#0a0a0a] border border-[#262626] focus:outline-none focus:border-orange-500/50 text-white placeholder-neutral-500 transition-colors"
        />

      

      </form>

      
      <div dir='rtl' className="flex  flex-wrap items-center justify-center gap-4 text-sm text-neutral-500">

        <div className="flex items-center gap-4">

         
          <div className="flex -space-x-2 space-x-reverse">

            <img
              className="w-8 h-8 rounded-full border-2 border-[#161616]"
              alt=""
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face"
            />

            <img
              className="w-8 h-8 rounded-full border-2 border-[#161616]"
              alt=""
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face"
            />

            <img
              className="w-8 h-8 rounded-full border-2 border-[#161616]"
              alt=""
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
            />

          </div>

          <span>
            انضم لـ{" "}
            <span className="text-white font-medium">
              +10,000
            </span>{" "}
            مصور
          </span>

        </div>

       
        <span className="hidden sm:inline text-[#262626]">
          •
        </span>

        <span>
          بدون إزعاج
        </span>

        
        <span className="hidden sm:inline text-[#262626]">
          •
        </span>

        <span>
          إلغاء الاشتراك في أي وقت
        </span>

      </div>

    </div>

  </div>

</section>

    </>
  )
}