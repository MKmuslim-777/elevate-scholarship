import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const BannerSlider = () => {
  const slides = [
    {
      title: "Your Future Starts Here",
      highlight: "Unmatched Scholarships",
      description:
        "Access a curated database of fully-funded opportunities. ScholarStream connects ambitious students with global institutions.",
      btnText: "Explore Opportunities",
      image: "https://i.ibb.co.com/whwXbtf2/start-up-designers.jpg",
    },
    {
      title: "Study Abroad in 2026",
      highlight: "Global Outreach",
      description:
        "From Ivy League to European research hubs, we bridge the gap between your talent and world-class education.",
      btnText: "View Global Grants",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600",
    },
    {
      title: "Innovation & Excellence",
      highlight: "STEM Merit Awards",
      description:
        "Empowering the next generation of scientists and engineers with exclusive tech-focused financial aid.",
      btnText: "Apply Now",
      image:
        "https://i.ibb.co.com/9mqPtGdK/colleagues-looking-information-using-laptop-notebooks-study-session.jpg",
    },
  ];

  return (
    <div className="banner-wrapper mt-20" style={{ overflow: "hidden" }}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        speed={800}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        pagination={{ clickable: true, dynamicBullets: true }}
        navigation={true}
        className="mySwiper"
        style={{ height: "85vh", minHeight: "500px" }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                position: "relative",
                height: "100%",
                width: "100%",
                backgroundImage: `url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Sophisticated Gradient Overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(90deg, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.4) 50%, rgba(15, 23, 42, 0) 100%)",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    padding: "0 5%",
                    width: "100%",
                    textAlign: "left",
                  }}
                >
                  {/* Glassmorphism Card for Content */}
                  <div
                    style={{
                      maxWidth: "600px",
                      padding: "40px",
                      borderRadius: "20px",
                      backdropFilter: "blur(4px)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    <span
                      style={{
                        color: "#60a5fa",
                        textTransform: "uppercase",
                        letterSpacing: "2px",
                        fontWeight: "700",
                        fontSize: "0.9rem",
                      }}
                    >
                      {slide.highlight}
                    </span>
                    <h1
                      style={{
                        fontSize: "clamp(2.5rem, 5vw, 4rem)",
                        fontWeight: "800",
                        color: "#fff",
                        lineHeight: "1.1",
                        margin: "15px 0",
                      }}
                    >
                      {slide.title}
                    </h1>
                    <p
                      style={{
                        fontSize: "1.1rem",
                        color: "#cbd5e1",
                        lineHeight: "1.6",
                        marginBottom: "30px",
                      }}
                    >
                      {slide.description}
                    </p>
                    <div style={{ display: "flex", gap: "15px" }}>
                      <button
                        style={{
                          padding: "14px 32px",
                          backgroundColor: "#2563eb",
                          color: "white",
                          border: "none",
                          borderRadius: "8px",
                          cursor: "pointer",
                          fontWeight: "bold",
                          transition: "all 0.3s ease",
                          boxShadow: "0 4px 14px rgba(37, 99, 235, 0.4)",
                        }}
                      >
                        {slide.btnText}
                      </button>
                      <button
                        style={{
                          padding: "14px 32px",
                          backgroundColor: "transparent",
                          color: "white",
                          border: "1px solid rgba(255,255,255,0.4)",
                          borderRadius: "8px",
                          cursor: "pointer",
                          fontWeight: "bold",
                          backdropFilter: "blur(10px)",
                        }}
                      >
                        How it Works
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Global CSS for Swiper Customization */}
      <style>{`
                .swiper-button-next, .swiper-button-prev { color: white !important; transform: scale(0.7); }
                .swiper-pagination-bullet { background: white !important; opacity: 0.5; }
                .swiper-pagination-bullet-active { background: #2563eb !important; opacity: 1; }
                @media (max-width: 768px) {
                    .banner-wrapper .mySwiper { height: 70vh !important; }
                }
            `}</style>
    </div>
  );
};

export default BannerSlider;
