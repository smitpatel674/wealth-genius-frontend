import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, X, ChevronLeft, ChevronRight, Image as ImageIcon, Video } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
  const galleryRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  // Gallery images
  const galleryImages = [
    {
      id: 1,
      src: '/images/w 1.jpg',
      alt: 'Wealth Genius Gallery Image 1',
      title: 'Trading Education Session',
      category: 'Classes'
    },
    {
      id: 2,
      src: '/images/w 2.jpg',
      alt: 'Wealth Genius Gallery Image 2',
      title: 'Interactive Learning',
      category: 'Workshops'
    },
    {
      id: 3,
      src: '/images/w 3.jpg',
      alt: 'Wealth Genius Gallery Image 3',
      title: 'Student Success',
      category: 'Events'
    }
  ];

  // Video data - Local video files
  const videos = [
    {
      id: 1,
      title: 'Trading Education Video 1',
      description: 'Learn from our expert instructors about stock market trading',
      thumbnail: '/images/w 1.jpg',
      videoId: '/video/w 4.mp4',
      type: 'local'
    },
    {
      id: 2,
      title: 'Trading Education Video 2',
      description: 'Advanced trading strategies and techniques',
      thumbnail: '/images/w 2.jpg',
      videoId: '/video/w 5.mp4',
      type: 'local'
    },
    {
      id: 3,
      title: 'Trading Education Video 3',
      description: 'Master the art of profitable trading',
      thumbnail: '/images/w 3.jpg',
      videoId: '/video/w 6.mp4',
      type: 'local'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.gallery-hero', 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );

      gsap.fromTo('.gallery-item', 
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1, scale: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.gallery-grid',
            start: "top 80%",
          }
        }
      );

      gsap.fromTo('.video-item', 
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.videos-section',
            start: "top 80%",
          }
        }
      );
    }, galleryRef);

    return () => ctx.revert();
  }, []);

  // Handle image navigation
  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  // Handle video navigation
  const nextVideo = () => {
    if (selectedVideo !== null) {
      setSelectedVideo((selectedVideo + 1) % videos.length);
    }
  };

  const prevVideo = () => {
    if (selectedVideo !== null) {
      setSelectedVideo((selectedVideo - 1 + videos.length) % videos.length);
    }
  };

  // Close modals on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
        setSelectedVideo(null);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div ref={galleryRef} className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="gallery-hero text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-blue-900 mb-6">Gallery & Success Stories</h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Take a look at our vibrant learning community, student achievements, and memorable moments 
              from our trading workshops and seminars.
            </p>
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center mb-4">
              <ImageIcon className="h-8 w-8 text-blue-600 mr-3" />
              <h2 className="text-4xl font-bold text-blue-900">Photo Gallery</h2>
            </div>
            <p className="text-xl text-gray-600">Explore moments from our classes, workshops, and events</p>
          </div>

          <div className="gallery-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                className="gallery-item group relative overflow-hidden rounded-xl shadow-lg cursor-pointer transform transition-all duration-300 hover:shadow-2xl hover:scale-105"
                onClick={() => setSelectedImage(index)}
              >
                <div className="aspect-w-16 aspect-h-12 relative">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Found';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="font-bold text-lg mb-1">{image.title}</h3>
                      <p className="text-sm text-gray-200">{image.category}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Gallery Section */}
      <section className="videos-section py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center mb-4">
              <Video className="h-8 w-8 text-blue-600 mr-3" />
              <h2 className="text-4xl font-bold text-blue-900">Video Gallery</h2>
            </div>
            <p className="text-xl text-gray-600">Watch our students share their transformation stories and learn from expert sessions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <div
                key={video.id}
                className="video-item bg-white rounded-xl shadow-lg overflow-hidden group cursor-pointer transform transition-all duration-300 hover:shadow-2xl hover:scale-105"
                onClick={() => setSelectedVideo(index)}
              >
                <div className="relative">
                  <div className="aspect-w-16 aspect-h-9 relative">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/800x450?text=Video+Thumbnail';
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-50 transition-all duration-300">
                      <div className="bg-white bg-opacity-90 rounded-full p-4 transform group-hover:scale-110 transition-transform duration-300">
                        <Play className="h-8 w-8 text-blue-600 ml-1" fill="currentColor" />
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      <Play className="h-3 w-3 inline mr-1" />
                      Watch
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-gray-800 mb-2 text-lg">{video.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Lightbox Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl w-full max-h-[90vh]">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-2 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-3 transition-colors"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-3 transition-colors"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
            <div onClick={(e) => e.stopPropagation()}>
              <img
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].alt}
                className="max-w-full max-h-[90vh] mx-auto rounded-lg object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Found';
                }}
              />
              <div className="text-center mt-4 text-white">
                <h3 className="text-2xl font-bold mb-2">{galleryImages[selectedImage].title}</h3>
                <p className="text-gray-300">{galleryImages[selectedImage].category}</p>
                <p className="text-sm text-gray-400 mt-2">
                  {selectedImage + 1} / {galleryImages.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {selectedVideo !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="relative max-w-6xl w-full">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-2 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevVideo();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-3 transition-colors"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextVideo();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-3 transition-colors"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
            <div onClick={(e) => e.stopPropagation()} className="relative">
              <div className="aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden">
                {videos[selectedVideo].type === 'youtube' ? (
                  <iframe
                    className="w-full h-[600px]"
                    src={`https://www.youtube.com/embed/${videos[selectedVideo].videoId}?autoplay=1&rel=0`}
                    title={videos[selectedVideo].title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    className="w-full h-[600px] object-contain"
                    controls
                    autoPlay
                    playsInline
                    src={videos[selectedVideo].videoId}
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
              <div className="text-center mt-4 text-white">
                <h3 className="text-2xl font-bold mb-2">{videos[selectedVideo].title}</h3>
                <p className="text-gray-300">{videos[selectedVideo].description}</p>
                <p className="text-sm text-gray-400 mt-2">
                  {selectedVideo + 1} / {videos.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;