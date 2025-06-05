import { Link } from "@inertiajs/react"

interface PaginationProps {
  currentPage: number
  lastPage: number
  prevPageUrl: string | null
  nextPageUrl: string | null
}

export default function Pagination({
  currentPage,
  lastPage,
  prevPageUrl,
  nextPageUrl,
}: PaginationProps) {
  return (
    <div className="mt-12 flex justify-center">
      <div className="flex items-center gap-1">
        {prevPageUrl && (
          <Link
            href={prevPageUrl}
            className="px-3 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Previous
          </Link>
        )}

        {[...Array(lastPage)].map((_, i) => (
          <Link
            key={i}
            href={`?page=${i + 1}`}
            className={`px-3 py-1 border rounded ${
              currentPage === i + 1 ? "bg-pink-100 dark:bg-pink-800/30" : ""
            }`}
          >
            {i + 1}
          </Link>
        ))}

        {nextPageUrl && (
          <Link
            href={nextPageUrl}
            className="px-3 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Next
          </Link>
        )}
      </div>
    </div>
  )
}
