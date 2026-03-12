VIDEO FILES - Place your video files here

RECOMMENDED FORMAT FOR WEB:
  - Container: MP4
  - Codec: H.264 (8-bit, not 10-bit)
  - Resolution: 1080p (1920×1080) or 4K if you prefer
  - Pixel format: yuv420p (required for browser compatibility)

If you have 10-bit 4K source files, convert them first. 10-bit HDR has limited 
browser/monitor support and will often fail or look wrong on the web.

CONVERSION (using FFmpeg):

  1080p (recommended — smaller files, fast loading):
    ffmpeg -i your_source.mov -c:v libx264 -profile:v high -level 4.0 -pix_fmt yuv420p -crf 23 -vf "scale=1920:1080" grey-sprinter.mp4

  4K (keep resolution):
    ffmpeg -i your_source.mov -c:v libx264 -profile:v high -level 5.1 -pix_fmt yuv420p -crf 23 grey-sprinter.mp4

FLEET VIDEOS (place in this folder):
  Grey van (two slots):
    - Untitled.mp4.mp4  — left slot (already in use)
    - grey-sprinter.mp4 — right slot (rename your Grey van video to this if it shows "Video coming soon")
  Black van (two slots):
    - black-sprinter.mp4 — left slot (optional second clip)
    - BLACKVAN2.mp4     — right slot (already in use)

LEGACY / EXTRA SLOTS:
  - IMG_4615.mp4
  - IMG_4616.mp4
  - IMG_4628.mp4
  - IMG_4632.mp4

If a video file is missing, the section shows "Video coming soon" instead.
