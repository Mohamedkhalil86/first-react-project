import React, { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import articlesData from '../../Componant/posts.json'

interface Author  {
  name: string
  avatar: string
  role: string
}

interface Post  {
  id: number
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  author: Author
  image: string
  date: string
  readTime: string
  featured?: boolean
  tags?: string[]
}

export default function Blogs() {
  const posts: Post[] = Array.isArray(articlesData)
    ? articlesData
    : articlesData?.posts || []



  const [searchParams, setSearchParams] = useSearchParams()

  const categoryFromUrl =
    searchParams.get('category')?.trim() || 'الكل'

 

  const [searchTerm, setSearchTerm] = useState('')

  const [selectedCategory, setSelectedCategory] =
    useState(categoryFromUrl)

  const [viewMode, setViewMode] =
    useState<'grid' | 'list'>('grid')

  const [currentPage, setCurrentPage] = useState(1)

  const postsPerPage = 6

  

  useEffect(() => {
    const category =
      searchParams.get('category')?.trim() || 'الكل'

    setSelectedCategory(category)
    setCurrentPage(1)
  }, [searchParams])

  

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(
        posts
          .map((post) => post.category?.trim())
          .filter(Boolean)
      )
    )

    return uniqueCategories
  }, [posts])

 

  const filteredPosts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    return posts.filter((post) => {
      

      const categoryMatch =
        selectedCategory === 'الكل' ||
        post.category?.trim() === selectedCategory

     

      const searchMatch =
        !query ||
        post.title?.toLowerCase().includes(query) ||
        post.excerpt?.toLowerCase().includes(query) ||
        post.category?.toLowerCase().includes(query) ||
        post.author?.name?.toLowerCase().includes(query) ||
        post.author?.role?.toLowerCase().includes(query) ||
        post.tags?.some((tag) =>
          tag.toLowerCase().includes(query)
        )

      return categoryMatch && searchMatch
    })
  }, [posts, searchTerm, selectedCategory])

 

  const totalPages = Math.ceil(
    filteredPosts.length / postsPerPage
  )

  const paginatedPosts = useMemo(() => {
    const startIndex =
      (currentPage - 1) * postsPerPage

    const endIndex =
      startIndex + postsPerPage

    return filteredPosts.slice(
      startIndex,
      endIndex
    )
  }, [
    filteredPosts,
    currentPage,
  ])

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  )

  

  const handleCategoryChange = (
    category: string
  ) => {
    setSelectedCategory(category)
    setCurrentPage(1)

    if (category === 'الكل') {
      setSearchParams({})
    } else {
      setSearchParams({
        category,
      })
    }
  }



  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('الكل')
    setCurrentPage(1)

    setSearchParams({})
  }

 

  const formatDate = (date: string) => {
    if (!date) return ''

    const parsedDate = new Date(date)

    if (Number.isNaN(parsedDate.getTime())) {
      return date
    }

    return new Intl.DateTimeFormat('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(parsedDate)
  }


  const hasActiveFilters =
    searchTerm.trim() !== '' ||
    selectedCategory !== 'الكل'

  

  return (
    <div
      className="min-h-screen bg-[#0a0a0a]"
      dir="rtl"
    >
    

      <div className="relative py-20 overflow-hidden">

        <div className="absolute inset-0 bg-[#0a0a0a]" />

        <div
          className="
            absolute inset-0
            bg-[linear-gradient(rgba(38,38,38,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(38,38,38,0.5)_1px,transparent_1px)]
            bg-[size:60px_60px]
          "
        />

        <div className="absolute inset-0">

          <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />

          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />

        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <div className="section-label bg-brand2 px-4 py-3 mt-20 border border-2 border-brand rounded-4xl inline-flex items-center gap-2 mb-8 animate-fade-in">

            <span className="relative text-brand flex gap-2 h-2 w-2">

              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500" />

              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />

            </span>

            <svg
              className="w-4 text-brand h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />

            </svg>

            <span className="text-sm font-medium text-neutral-300">
              مدونتنا
            </span>

          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">

            استكشف{' '}

            <span className="text-amber-400">
              مقالاتنا
            </span>

          </h1>

          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            اكتشف الدروس والرؤى وأفضل الممارسات للتطوير الحديث
          </p>

        </div>

      </div>

  

      <div className="sticky top-20 z-40 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-[#262626]">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">

          

            <div
              className="
                relative
                border
                border-gray-700
                rounded-2xl
                w-full
                md:w-80
                transition-all
                duration-300
                focus-within:border-brand
                focus-within:shadow-brand
              "
            >

              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
                placeholder="ابحث في المقالات..."
                className="
                  text-white
                  w-full
                  px-5
                  py-3
                  pr-12
                  !border-transparent
                  focus:!border-transparent
                  focus:!outline-none
                  focus:!shadow-none
                  placeholder:!text-gray-500
                  bg-transparent
                "
              />

              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />

              </svg>

            </div>

           

            <div className="flex flex-wrap justify-center gap-2">

           
              <button
                type="button"
                onClick={() =>
                  handleCategoryChange('الكل')
                }
                className={`
                  px-4 py-2 rounded-xl text-sm font-medium
                  transition-all duration-300
                  ${
                    selectedCategory === 'الكل'
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                      : 'bg-[#161616] text-neutral-400 border border-[#262626] hover:border-orange-500/30'
                  }
                `}
              >
                جميع المقالات
              </button>

              

              {categories.map((category) => (

                <button
                  key={category}
                  type="button"
                  onClick={() =>
                    handleCategoryChange(category)
                  }
                  className={`
                    px-4 py-2 rounded-xl text-sm font-medium
                    transition-all duration-300
                    ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                        : 'bg-[#161616] text-neutral-400 border border-[#262626] hover:border-orange-500/30'
                    }
                  `}
                >
                  {category}
                </button>

              ))}

            </div>

          </div>

        </div>

      </div>

     

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-[146px]">

       

        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

          <p className="text-neutral-400">

            عرض{' '}

            <span className="font-bold text-white">
              {paginatedPosts.length}
            </span>

            {' '}من{' '}

            <span className="font-bold text-white">
              {filteredPosts.length}
            </span>

            {' '}مقالات

            {selectedCategory !== 'الكل' && (

              <span>

                {' '}في{' '}

                <span className="font-bold text-orange-500">
                  {selectedCategory}
                </span>

              </span>

            )}

          </p>

          <div className="flex items-center gap-2">

           

            <div className="flex items-center bg-[#161616] border border-[#262626] rounded-xl p-1">

          

              <button
                type="button"
                onClick={() =>
                  setViewMode('grid')
                }
                className={`
                  p-2 rounded-lg transition-all duration-300
                  ${
                    viewMode === 'grid'
                      ? 'bg-orange-500 text-white'
                      : 'text-neutral-400 hover:text-white'
                  }
                `}
                title="عرض شبكي"
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
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />

                </svg>

              </button>

              

              <button
                type="button"
                onClick={() =>
                  setViewMode('list')
                }
                className={`
                  p-2 rounded-lg transition-all duration-300
                  ${
                    viewMode === 'list'
                      ? 'bg-orange-500 text-white'
                      : 'text-neutral-400 hover:text-white'
                  }
                `}
                title="عرض قائمة"
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
                    d="M4 6h16M4 12h16M4 18h16"
                  />

                </svg>

              </button>

            </div>

          

            {hasActiveFilters && (

              <button
                type="button"
                onClick={clearFilters}
                className="text-sm text-neutral-500 hover:text-orange-500 flex items-center gap-1 transition-colors"
              >

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
                    d="M6 18L18 6M6 6l12 12"
                  />

                </svg>

                مسح الفلاتر

              </button>

            )}

          </div>

        </div>

      

        {filteredPosts.length === 0 ? (

          <div className="py-24 text-center">

            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">

              <svg
                className="w-10 h-10 text-orange-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.5 8.5h5m-5 4h3m-6.5 5h12a2 2 0 002-2v-10a2 2 0 00-2-2h-12a2 2 0 00-2 2v10a2 2 0 002 2z"
                />

              </svg>

            </div>

            <h2 className="text-2xl font-bold text-white mb-3">
              لا توجد مقالات
            </h2>

            <p className="text-neutral-500 mb-6">
              لم نجد مقالات تطابق البحث أو الفلاتر الحالية.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-medium hover:-translate-y-0.5 transition-all"
            >
              عرض جميع المقالات
            </button>

          </div>

        ) : (

          <>

          

            {viewMode === 'grid' ? (

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                {paginatedPosts.map((post, index) => (

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

                        <div className="absolute top-4 right-4">

                          <span className="px-3 py-1 bg-[#0a0a0a]/80 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-[#333333]">
                            {post.category}
                          </span>

                        </div>

                        {post.featured && (

                          <div className="absolute top-4 left-4">

                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-xs font-semibold rounded-full">

                              <svg
                                className="w-3.5 h-3.5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >

                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 01.951.69l1.07-3.292z" />

                              </svg>

                              مميز

                            </span>

                          </div>

                        )}

                      </div>

                     

                      <div className="p-6">

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
                            {formatDate(post.date)}
                          </span>

                        </div>

                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-500 transition-colors duration-300 line-clamp-2 leading-tight">
                          {post.title}
                        </h3>

                        <p className="text-neutral-400 mb-5 line-clamp-2 text-sm leading-relaxed">
                          {post.excerpt}
                        </p>

                     

                        <div className="flex items-center justify-between pt-4 border-t border-[#262626]">

                          <div className="flex items-center gap-3">

                            {post.author?.avatar && (

                              <img
                                src={post.author.avatar}
                                alt={post.author.name}
                                className="w-9 h-9 rounded-full object-cover ring-2 ring-[#262626]"
                              />

                            )}

                            <div>

                              <p className="text-sm font-medium text-white">
                                {post.author?.name}
                              </p>

                              <p className="text-xs text-neutral-500">
                                {post.author?.role}
                              </p>

                            </div>

                          </div>

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

            ) : (

             

              <div className="space-y-6">

                {paginatedPosts.map((post, index) => (

                  <article
                    key={post.id}
                    className="group bg-[#161616] rounded-3xl overflow-hidden border border-[#262626] hover:border-orange-500/30 transition-all duration-500"
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >

                    <Link
                      to={`/blogs/${post.slug}`}
                      className="grid md:grid-cols-[320px_1fr] gap-0"
                    >

                  

                      <div className="relative h-64 md:h-full min-h-[280px] overflow-hidden">

                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        <span className="absolute top-4 right-4 px-3 py-1 bg-[#0a0a0a]/80 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-[#333333]">
                          {post.category}
                        </span>

                        {post.featured && (

                          <span className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-xs font-semibold rounded-full">
                            مميز
                          </span>

                        )}

                      </div>

                      

                      <div className="p-7 md:p-9 flex flex-col justify-center">

                        <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-500 mb-4">

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
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0"
                              />

                            </svg>

                            {post.readTime}

                          </span>

                          <span className="w-1 h-1 bg-neutral-600 rounded-full" />

                          <span>
                            {formatDate(post.date)}
                          </span>

                        </div>

                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-orange-500 transition-colors leading-tight">
                          {post.title}
                        </h2>

                        <p className="text-neutral-400 leading-relaxed mb-6">
                          {post.excerpt}
                        </p>

                       

                        {post.tags &&
                          post.tags.length > 0 && (

                            <div className="flex flex-wrap gap-2 mb-6">

                              {post.tags
                                .slice(0, 4)
                                .map((tag) => (

                                  <span
                                    key={tag}
                                    className="px-3 py-1 bg-[#0a0a0a] text-neutral-500 text-xs rounded-full border border-[#262626]"
                                  >
                                    #{tag}
                                  </span>

                                ))}

                            </div>

                          )}

                        

                        <div className="flex items-center justify-between pt-5 border-t border-[#262626]">

                          <div className="flex items-center gap-3">

                            {post.author?.avatar && (

                              <img
                                src={post.author.avatar}
                                alt={post.author.name}
                                className="w-10 h-10 rounded-full object-cover ring-2 ring-[#262626]"
                              />

                            )}

                            <div>

                              <p className="text-sm font-medium text-white">
                                {post.author?.name}
                              </p>

                              <p className="text-xs text-neutral-500">
                                {post.author?.role}
                              </p>

                            </div>

                          </div>

                          <span className="inline-flex items-center gap-2 text-orange-500 font-semibold text-sm">

                            اقرأ المقال

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

                          </span>

                        </div>

                      </div>

                    </Link>

                  </article>

                ))}

              </div>

            )}

          

            {totalPages > 1 && (

              <div className="flex justify-center items-center gap-2 mt-12">

               

                <button
                  type="button"
                  onClick={() => {

                    setCurrentPage((prev) =>
                      Math.max(prev - 1, 1)
                    )

                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth',
                    })

                  }}
                  disabled={currentPage === 1}
                  className={`
                    w-10 h-10 rounded-xl
                    flex items-center justify-center
                    border transition-all duration-300
                    ${
                      currentPage === 1
                        ? 'border-[#262626] text-neutral-700 cursor-not-allowed'
                        : 'border-[#333333] text-neutral-400 hover:text-white hover:border-orange-500 hover:bg-orange-500/10'
                    }
                  `}
                  aria-label="الصفحة السابقة"
                >

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
                      d="M9 5l7 7-7 7"
                    />

                  </svg>

                </button>

                

                {pageNumbers.map((page) => (

                  <button
                    key={page}
                    type="button"
                    onClick={() => {

                      setCurrentPage(page)

                      window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                      })

                    }}
                    className={`
                      w-10 h-10 rounded-xl
                      flex items-center justify-center
                      font-medium
                      transition-all duration-300
                      ${
                        currentPage === page
                          ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/20'
                          : 'bg-[#161616] text-neutral-400 border border-[#262626] hover:text-white hover:border-orange-500/50'
                      }
                    `}
                  >
                    {page}
                  </button>

                ))}

             

                <button
                  type="button"
                  onClick={() => {

                    setCurrentPage((prev) =>
                      Math.min(
                        prev + 1,
                        totalPages
                      )
                    )

                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth',
                    })

                  }}
                  disabled={
                    currentPage === totalPages
                  }
                  className={`
                    w-10 h-10 rounded-xl
                    flex items-center justify-center
                    border transition-all duration-300
                    ${
                      currentPage === totalPages
                        ? 'border-[#262626] text-neutral-700 cursor-not-allowed'
                        : 'border-[#333333] text-neutral-400 hover:text-white hover:border-orange-500 hover:bg-orange-500/10'
                    }
                  `}
                  aria-label="الصفحة التالية"
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
                      d="M15 19l-7-7 7-7"
                    />

                  </svg>

                </button>

              </div>

            )}

          </>

        )}

      </div>

    </div>
  )
}