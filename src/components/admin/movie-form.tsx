import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, Loader2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import { uploadToCloudinary } from "@/lib/api/cloudinary/upload"
import { MovieResponse } from "@/types/movie-response"
import { MovieRequest } from "@/types/movie-request"
import { validateMovieForm, ValidationError } from "@/lib/validations/movie-validation"

interface MovieFormProps {
  movie?: MovieResponse;
  onSubmit: (data: MovieRequest) => Promise<void>;
  onCancel: () => void;
}

const GENRES = [
  { value: "Hành động", label: "Hành động" },
  { value: "Hài hước", label: "Hài hước" },
  { value: "Tâm lý", label: "Tâm lý" },
  { value: "Kinh dị", label: "Kinh dị" },
  { value: "Tình cảm", label: "Tình cảm" },
  { value: "Hoạt hình", label: "Hoạt hình" },
  { value: "Phiêu lưu", label: "Phiêu lưu" },
  { value: "Khoa học viễn tưởng", label: "Khoa học viễn tưởng" }
];

const STATUS_OPTIONS = [
  { value: "COMING_SOON", label: "Sắp chiếu" },
  { value: "NOW_SHOWING", label: "Đang chiếu" },
];

export function MovieForm({ movie, onSubmit, onCancel }: MovieFormProps) {
  const [formData, setFormData] = useState<MovieRequest>({
    movieCode: movie?.movieCode || "",
    title: movie?.title || "",
    englishTitle: movie?.englishTitle || "",
    posterUrl: movie?.posterUrl || "",
    backdropUrl: movie?.backdropUrl || "",
    genres: movie?.genres || [],
    duration: movie?.duration || 0,
    releaseDate: movie?.releaseDate || "",
    director: movie?.director || "",
    castList: movie?.castList || [],
    trailerUrl: movie?.trailerUrl || "",
    featured: movie?.featured || false,
    status: movie?.status || "Sắp chiếu"
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState({
    poster: false,
    backdrop: false,
    trailer: false
  });
  const [fileUrls, setFileUrls] = useState({
    posterUrl: movie?.posterUrl || "",
    backdropUrl: movie?.backdropUrl || "",
    trailerUrl: movie?.trailerUrl || ""
  });
  const [selectedFiles, setSelectedFiles] = useState({
    poster: null as File | null,
    backdrop: null as File | null,
    trailer: null as File | null
  });

  const generateMovieId = (title: string): string => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => {
      const updatedData = {
        ...prev,
        [name]: newValue
      };

      if (name === 'title' && !movie) {
        updatedData.movieCode = generateMovieId(value);
      }

      return updatedData;
    });

    // Validate field on change
    const validationErrors = validateMovieForm({ ...formData, [name]: newValue });
    const fieldError = validationErrors.find(error => error.field === name);
    setErrors(prev => ({
      ...prev,
      [name]: fieldError?.message || ''
    }));
  };

  const handleGenresChange = (checkedGenres: string[]) => {
    setFormData(prev => ({
      ...prev,
      genres: checkedGenres
    }));

    // Validate genres
    const validationErrors = validateMovieForm({ ...formData, genres: checkedGenres });
    const fieldError = validationErrors.find(error => error.field === 'genres');
    setErrors(prev => ({
      ...prev,
      genres: fieldError?.message || ''
    }));
  };

  const handleStatusChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      status: value
    }));

    // Validate status
    const validationErrors = validateMovieForm({ ...formData, status: value });
    const fieldError = validationErrors.find(error => error.field === 'status');
    setErrors(prev => ({
      ...prev,
      status: fieldError?.message || ''
    }));
  };

  const uploadToCloud = async (file: File, type: 'poster' | 'backdrop' | 'trailer'): Promise<string | null> => {
    try {
      setUploading(prev => ({ ...prev, [type]: true }));
      
      const url = await uploadToCloudinary(file, type);
      
      setFileUrls(prev => ({
        ...prev,
        [`${type}Url`]: url
      }));

      setFormData(prev => ({
        ...prev,
        [`${type}Url`]: url
      }));

      setErrors(prev => ({
        ...prev,
        [`${type}Url`]: ''
      }));

      toast.success(`${type === 'poster' ? 'Poster' : type === 'backdrop' ? 'Backdrop' : 'Trailer'} đã được tải lên thành công`);
      return url;
    } catch (error) {
      toast.error(`Lỗi khi tải lên ${type}`);
      console.error(`Error uploading ${type}:`, error);
      return null;
    } finally {
      setUploading(prev => ({ ...prev, [type]: false }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateMovieForm(formData);
    if (validationErrors.length > 0) {
      const newErrors: Record<string, string> = {};
      validationErrors.forEach(error => {
        newErrors[error.field] = error.message;
        //console.log(error.field, error.message);
      });
      setErrors(newErrors);
      toast.error("Vui lòng kiểm tra lại thông tin");
      return;
    }

    try {
      setSubmitting(true);
      //console.log('Form data before upload:', formData);
      
      const uploadPromises: Promise<string | null>[] = [];
      
      if (selectedFiles.poster) {
        uploadPromises.push(uploadToCloud(selectedFiles.poster, 'poster'));
      }
      if (selectedFiles.backdrop) {
        uploadPromises.push(uploadToCloud(selectedFiles.backdrop, 'backdrop'));
      }
      if (selectedFiles.trailer) {
        uploadPromises.push(uploadToCloud(selectedFiles.trailer, 'trailer'));
      }

      const urls = await Promise.all(uploadPromises);
      
      const updatedFormData: MovieRequest = {
        ...formData,
        posterUrl: urls[0] || formData.posterUrl,
        backdropUrl: urls[1] || formData.backdropUrl,
        trailerUrl: urls[2] || formData.trailerUrl
      };

      //console.log('Final form data to submit:', updatedFormData);

      await onSubmit(updatedFormData);
      
      setSelectedFiles({
        poster: null,
        backdrop: null,
        trailer: null
      });
      
      toast.success(movie ? 'Cập nhật phim thành công' : 'Thêm phim thành công');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(`Có lỗi xảy ra khi ${movie ? 'cập nhật' : 'thêm'} phim`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{movie ? 'Chỉnh sửa phim' : 'Thêm phim mới'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Tên phim</Label>
              <Input 
                id="title" 
                name="title"
                placeholder="Nhập tên phim" 
                value={formData.title}
                onChange={handleInputChange}
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && (
                <p className="text-sm text-red-500 mt-1">{errors.title}</p>
              )}
              <div className="mt-2">
                <Label htmlFor="movieCode" className="text-sm text-gray-500">Movie Code:</Label>
                <Input 
                  id="movieCode" 
                  name="movieCode"
                  value={formData.movieCode}
                  readOnly
                  className="mt-1 bg-gray-50"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="englishTitle">Tên tiếng Anh</Label>
              <Input 
                id="englishTitle" 
                name="englishTitle"
                placeholder="Nhập tên tiếng Anh" 
                value={formData.englishTitle}
                onChange={handleInputChange}
                className={errors.englishTitle ? "border-red-500" : ""}
              />
              {errors.englishTitle && (
                <p className="text-sm text-red-500 mt-1">{errors.englishTitle}</p>
              )}
            </div>
            <div>
              <Label htmlFor="genres">Thể loại</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {GENRES.map((genre) => (
                  <div key={genre.value} className="flex items-center space-x-2">
                    <Checkbox 
                      id={genre.value}
                      checked={formData.genres.includes(genre.value)}
                      onCheckedChange={(checked) => {
                        const newGenres = checked
                          ? [...formData.genres, genre.value]
                          : formData.genres.filter(g => g !== genre.value);
                        handleGenresChange(newGenres);
                      }}
                    />
                    <Label htmlFor={genre.value}>{genre.label}</Label>
                  </div>
                ))}
              </div>
              {errors.genres && (
                <p className="text-sm text-red-500 mt-1">{errors.genres}</p>
              )}
            </div>
            <div>
              <Label htmlFor="duration">Thời lượng (phút)</Label>
              <Input 
                id="duration" 
                name="duration"
                type="number" 
                placeholder="110"
                value={formData.duration}
                onChange={handleInputChange}
                className={errors.duration ? "border-red-500" : ""}
              />
              {errors.duration && (
                <p className="text-sm text-red-500 mt-1">{errors.duration}</p>
              )}
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="releaseDate">Ngày khởi chiếu</Label>
              <Input 
                id="releaseDate" 
                name="releaseDate"
                type="date"
                value={formData.releaseDate}
                onChange={handleInputChange}
                className={errors.releaseDate ? "border-red-500" : ""}
              />
              {errors.releaseDate && (
                <p className="text-sm text-red-500 mt-1">{errors.releaseDate}</p>
              )}
            </div>
            <div>
              <Label htmlFor="director">Đạo diễn</Label>
              <Input 
                id="director" 
                name="director"
                placeholder="Nhập tên đạo diễn"
                value={formData.director}
                onChange={handleInputChange}
                className={errors.director ? "border-red-500" : ""}
              />
              {errors.director && (
                <p className="text-sm text-red-500 mt-1">{errors.director}</p>
              )}
            </div>
            <div>
              <Label htmlFor="castList">Diễn viên</Label>
              <Input 
                id="castList" 
                name="castList"
                placeholder="Nhập tên diễn viên (phân cách bằng dấu phẩy)"
                value={formData.castList.join(", ")}
                onChange={(e) => {
                  const castList = e.target.value.split(",").map(s => s.trim());
                  setFormData(prev => ({ ...prev, castList }));
                  // Validate castList
                  const validationErrors = validateMovieForm({ ...formData, castList });
                  const fieldError = validationErrors.find(error => error.field === 'castList');
                  setErrors(prev => ({
                    ...prev,
                    castList: fieldError?.message || ''
                  }));
                }}
                className={errors.castList ? "border-red-500" : ""}
              />
              {errors.castList && (
                <p className="text-sm text-red-500 mt-1">{errors.castList}</p>
              )}
            </div>
            <div>
              <Label htmlFor="posterUrl">Poster</Label>
              <div className="flex items-center gap-2">
                <Input 
                  id="posterUrl" 
                  type="file" 
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setSelectedFiles(prev => ({ ...prev, poster: file }));
                      const previewUrl = URL.createObjectURL(file);
                      setFileUrls(prev => ({ ...prev, posterUrl: previewUrl }));
                      setFormData(prev => ({ ...prev, posterUrl: previewUrl }));
                      setErrors(prev => ({ ...prev, posterUrl: '' }));
                    }
                  }}
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => document.getElementById("posterUrl")?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Chọn ảnh
                </Button>
                {fileUrls.posterUrl && (
                  <img 
                    src={fileUrls.posterUrl} 
                    alt="Poster preview" 
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
              </div>
              {errors.posterUrl && (
                <p className="text-sm text-red-500 mt-1">{errors.posterUrl}</p>
              )}
            </div>
            <div>
              <Label htmlFor="backdropUrl">Backdrop</Label>
              <div className="flex items-center gap-2">
                <Input 
                  id="backdropUrl" 
                  type="file" 
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setSelectedFiles(prev => ({ ...prev, backdrop: file }));
                      const previewUrl = URL.createObjectURL(file);
                      setFileUrls(prev => ({ ...prev, backdropUrl: previewUrl }));
                      setFormData(prev => ({ ...prev, backdropUrl: previewUrl }));
                      setErrors(prev => ({ ...prev, backdropUrl: '' }));
                    }
                  }}
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => document.getElementById("backdropUrl")?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Chọn ảnh
                </Button>
                {fileUrls.backdropUrl && (
                  <img 
                    src={fileUrls.backdropUrl} 
                    alt="Backdrop preview" 
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
              </div>
              {errors.backdropUrl && (
                <p className="text-sm text-red-500 mt-1">{errors.backdropUrl}</p>
              )}
            </div>
            <div>
              <Label htmlFor="trailerUrl">Trailer</Label>
              <div className="flex items-center gap-2">
                <Input 
                  id="trailerUrl" 
                  type="file" 
                  accept="video/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setSelectedFiles(prev => ({ ...prev, trailer: file }));
                      const previewUrl = URL.createObjectURL(file);
                      setFileUrls(prev => ({ ...prev, trailerUrl: previewUrl }));
                      setFormData(prev => ({ ...prev, trailerUrl: previewUrl }));
                      setErrors(prev => ({ ...prev, trailerUrl: '' }));
                    }
                  }}
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => document.getElementById("trailerUrl")?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Chọn video
                </Button>
                {fileUrls.trailerUrl && (
                  <span className="text-sm text-gray-500">Video đã được chọn</span>
                )}
              </div>
              {errors.trailerUrl && (
                <p className="text-sm text-red-500 mt-1">{errors.trailerUrl}</p>
              )}
            </div>
          </div>
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) => {
                  setFormData(prev => ({ ...prev, featured: checked as boolean }));
                  // Validate featured
                  const validationErrors = validateMovieForm({ ...formData, featured: checked as boolean });
                  const fieldError = validationErrors.find(error => error.field === 'featured');
                  setErrors(prev => ({
                    ...prev,
                    featured: fieldError?.message || ''
                  }));
                }}
              />
              <Label htmlFor="featured">Phim nổi bật</Label>
            </div>
            <div>
              <Label htmlFor="status">Trạng thái</Label>
              <Select
                value={formData.status}
                onValueChange={handleStatusChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.status && (
                <p className="text-sm text-red-500 mt-1">{errors.status}</p>
              )}
            </div>
          </div>
          <div className="md:col-span-2 flex justify-end space-x-2">
            <Button 
              type="button"
              variant="outline" 
              onClick={onCancel}
              disabled={submitting}
            >
              Hủy
            </Button>
            <Button 
              type="submit" 
              className="bg-red-500 hover:bg-red-600"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {movie ? 'Đang cập nhật...' : 'Đang thêm phim...'}
                </>
              ) : (
                movie ? 'Cập nhật phim' : 'Thêm phim'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 