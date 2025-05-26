import { MovieCarousel } from "@/components/movie-carousel";
import { NewsCard } from "@/components/news-card";

// Mock data for news articles
const featuredNews = {
  id: "33638",
  title: "Lật Mặt 8: Vòng Tay Nắng – Lật cát khác biệt về đề tài gia đình so với Lật Mặt 7",
  excerpt: "So sánh Lật Mặt 7 và Lật Mặt 8 – hai bộ phim cùng khai thác chủ đề gia đình nhưng mang thông điệp và xung đột khác biệt.",
  imageUrl: "https://ext.same-assets.com/2834133890/3766437863.png",
  category: "Đánh giá phim",
  author: "miduynph",
  date: "1 ngày trước"
};

const newsArticles = [
  {
    id: "33635",
    title: "Thám Tử Kiền: Kỳ Án Không Đầu – 9 vai diễn ấn tượng của Đinh Ngọc Diệp",
    imageUrl: "https://ext.same-assets.com/2834133890/2408326402.png",
    category: "Tin điện ảnh",
    author: "miduynph",
    date: "1 ngày trước"
  },
  {
    id: "33636",
    title: "Lật Mặt 8 - 100 tỷ sau 5 ngày ra rạp liệu có lập nên kỷ lục khủng hơn phần 7?",
    imageUrl: "https://ext.same-assets.com/2834133890/3452606385.png",
    category: "Tin điện ảnh",
    author: "Moveek",
    date: "1 ngày trước"
  },
  {
    id: "33633",
    title: "Lật Mặt 8: Vòng Tay Nắng - Phim hot nhất ngày lễ 30/4 đứng đầu doanh thu phòng vé",
    imageUrl: "https://ext.same-assets.com/2834133890/2459205923.jpeg",
    category: "Tin điện ảnh",
    author: "Moveek",
    date: "3 ngày trước"
  },
  {
    id: "33630",
    title: "Review Thunderbolts*: Biệt Đội Sấm Sét – Cú lật mặt kết thúc phase 5 của Marvel",
    imageUrl: "https://ext.same-assets.com/2834133890/505354355.jpeg",
    category: "Đánh giá phim",
    author: "miduynph",
    date: "3 ngày trước"
  },
];

export default function Home() {
  
  return (
    <div className="container mx-auto max-w-7xl px-4 py-6">
      <MovieCarousel title="Đang chiếu" viewAllLink="/dang-chieu" />
      <MovieCarousel title="Sắp chiếu" viewAllLink="/sap-chieu" />

      {/* News Section */}
      <div className="py-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-moveek-darkgray">Tin mới cập nhật</h2>
          <a
            href="/tin-tuc"
            className="text-sm text-moveek-lightgray hover:text-moveek-red"
          >
            Xem tất cả
          </a>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Featured News */}
          <div className="md:col-span-2">
            <NewsCard
              id={featuredNews.id}
              title={featuredNews.title}
              excerpt={featuredNews.excerpt}
              imageUrl={featuredNews.imageUrl}
              category={featuredNews.category}
              author={featuredNews.author}
              date={featuredNews.date}
              large={true}
            />
          </div>

          {/* Sidebar News */}
          <div className="space-y-4">
            {newsArticles.slice(0, 3).map((article) => (
              <NewsCard
                key={article.id}
                id={article.id}
                title={article.title}
                imageUrl={article.imageUrl}
                category={article.category}
                author={article.author}
                date={article.date}
              />
            ))}
          </div>
        </div>

        {/* More News - 2 columns on mobile, 4 on desktop */}
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {newsArticles.slice(0, 4).map((article) => (
            <NewsCard
              key={article.id}
              id={article.id}
              title={article.title}
              imageUrl={article.imageUrl}
              category={article.category}
              author={article.author}
              date={article.date}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
