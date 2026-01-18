# Portfolio Website - Vue.js

Website Portfolio cá nhân được xây dựng bằng Vue.js 3 và Vite.

## 🚀 Tính năng

- ✅ Responsive design - Tối ưu cho mọi thiết bị
- ✅ Modern UI/UX - Giao diện đẹp và hiện đại
- ✅ Vue Router - Điều hướng trang mượt mà
- ✅ Component-based - Dễ bảo trì và mở rộng
- ✅ Sections: Hero, About, Skills, Projects, Contact

## 📋 Yêu cầu hệ thống

- Node.js >= 16.x
- npm hoặc yarn

## 🛠️ Cài đặt

1. Cài đặt dependencies:
```bash
npm install
```

2. Chạy development server:
```bash
npm run dev
```

3. Build cho production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## 📁 Cấu trúc dự án

```
portfolio-vue/
├── src/
│   ├── components/      # Các components Vue
│   │   ├── Header.vue
│   │   ├── Footer.vue
│   │   ├── Hero.vue
│   │   ├── About.vue
│   │   ├── Skills.vue
│   │   ├── Projects.vue
│   │   └── Contact.vue
│   ├── views/          # Các trang
│   │   └── Home.vue
│   ├── router/         # Vue Router config
│   │   └── index.js
│   ├── App.vue         # Component chính
│   ├── main.js         # Entry point
│   └── style.css       # Global styles
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Tùy chỉnh

### Thay đổi màu sắc

Chỉnh sửa các biến CSS trong `src/style.css`:

```css
:root {
  --primary-color: #6366f1;
  --secondary-color: #8b5cf6;
  /* ... */
}
```

### Cập nhật thông tin cá nhân

- **About section**: Sửa trong `src/components/About.vue`
- **Skills**: Cập nhật trong `src/components/Skills.vue`
- **Projects**: Thêm/sửa dự án trong `src/components/Projects.vue`
- **Contact**: Cập nhật thông tin liên hệ trong `src/components/Contact.vue`

## 🔗 Tích hợp với Laravel Backend

Để tích hợp với Laravel backend:

1. Cấu hình CORS trong Laravel
2. Tạo API endpoints trong Laravel
3. Sử dụng axios hoặc fetch để gọi API từ Vue.js
4. Cập nhật form submit trong `Contact.vue` để gửi dữ liệu đến Laravel

## 📝 Ghi chú

- Tất cả code đã được comment bằng tiếng Việt
- Dự án sẵn sàng để tích hợp với Laravel backend
- Có thể mở rộng thêm các tính năng như: Blog, Admin panel, v.v.

## 📄 License

MIT
