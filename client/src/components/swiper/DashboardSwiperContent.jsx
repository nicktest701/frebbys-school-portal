import { Button, Typography } from "@mui/material";
import { SwiperSlide } from "swiper/react";

function DashboardSwiperContent({ content, img }) {
  return (
    <SwiperSlide className="swiper-slide">
      <div className="swiper-content">
        <Typography
          paddingBottom={2}
          variant="h4"
          // sx={{ fontSize: { xs: 36, md: 48, lg: 60 } }}
        >
          {content}
        </Typography>
        <Typography variant="body2" paddingBottom={2}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat,
          nihil.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          // disableElevation
          sx={{ paddingX: 5 }}
        >
          Learn More
        </Button>
      </div>
      <img src={img} alt="swiper-img" />
    </SwiperSlide>
  );
}
export default DashboardSwiperContent;
