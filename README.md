# 🚀 NTESHIP - Build Industry-Ready Skills With Real Projects

![NTESHIP](icons/favicon.svg)

NTESHIP is a modern, fully responsive educational platform designed to help students and professionals build industry-ready skills through real-world projects, expert mentorship, internships, and career-focused programs.

## 🌟 Features

### 📚 Courses
- **6+ Featured Courses** across Frontend, Backend, Full Stack, and Data Science
- Search and filter functionality by category
- Course cards with ratings, instructor details, pricing, and duration
- Categories: All, Frontend, Backend, Full Stack, Data Science
- Dedicated detail pages with curriculum, outcomes, requirements, and enrolment link

### 💼 Internship Programs
- **Paid internships** at top companies (Google, Microsoft, Amazon)
- 3-6 month programs with real project experience
- Stipend details, required skills, and certificate/PPO information
- Direct "Apply Now" functionality
- Detail pages with eligibility, responsibilities, benefits, and an application form

### 🔌 Course & Internship API
- `GET /api/courses` and `GET /api/courses/:slug`
- `GET /api/internships` and `GET /api/internships/:slug`
- `POST /api/applications` validates and stores internship applications locally

### 🎯 Why Choose Us
- **Live Projects** - Real-world problem solving
- **Expert Mentorship** - 1:1 guidance from industry engineers
- **Certificates** - Industry-recognized credentials
- **Resume Building** - ATS-optimized resumes
- **Mock Interviews** - Real interview simulations
- **Placement Assistance** - 95% placement rate with 200+ partners

### 💰 Pricing Plans
| Plan | Price | Key Features |
|------|-------|-------------|
| **Basic** | ₹999/mo | 5 courses, basic projects, community support |
| **Pro** | ₹2,499/mo | All courses, real projects, 1:1 mentorship, mock interviews |
| **Premium** | ₹4,999/mo | Everything in Pro + dedicated mentor, guaranteed internship, placement assistance |

### 👥 Testimonials
- Success stories from students placed at Google, Microsoft, and Amazon
- Interactive testimonial slider with navigation controls

### 📊 Live Statistics Counter
- Animated counter displaying: 10,000+ Students, 250+ Courses, 100+ Mentors, 95% Placement

### ❓ FAQ Section
- Accordion-style frequently asked questions
- Covers: eligibility, internships, placements, certificates, plans, refunds

### 📞 Contact Section
- Contact form with validation (name, email, phone, message)
- Map placeholder with location details
- Contact information (email, phone, address)

### 🔐 Authentication
- **Login Page** (`login.html`) - User login with email/password
- **Register Page** (`register.html`) - New user registration
- Form validation with error messages
- Toggle password visibility
- Links between login and register pages

## 🛠️ Technical Stack

### Frontend
- **HTML5** - Semantic markup with ARIA accessibility
- **CSS3** - Modern styling with custom properties, gradients, animations
- **Vanilla JavaScript** - No frameworks, pure JS for performance

### CSS Features
- **Dark/Light Mode** toggle with system preference detection
- **Responsive Design** - Mobile-first approach with breakpoints
- **Smooth Animations** - Scroll reveal, hover effects, transitions
- **Custom Properties** - CSS variables for theming
- **Glassmorphism** - Modern UI effects
- **Loading Overlay** - Smooth page load experience
- **Scroll Progress Bar** - Visual reading progress indicator
- **Back to Top** button

### JavaScript Modules
| File | Purpose |
|------|---------|
| `js/main.js` | Core functionality: dark mode, navigation, scroll effects, contact form, newsletter |
| `js/auth.js` | Authentication: login/register form validation, password toggle |
| `js/slider.js` | Testimonial slider with auto-play and navigation |
| `js/accordion.js` | FAQ accordion with smooth open/close |
| `js/counter.js` | Animated statistics counter on scroll |
| `js/detail.js` | Loads detail data and submits internship applications |

### Accessibility
- ARIA labels and roles throughout
- Keyboard navigation support
- Screen reader friendly
- Semantic HTML structure
- Focus management for modals and menus

## 📁 Project Structure

```
NTESHIP/
├── index.html          # Main landing page
├── login.html          # User login page
├── register.html       # User registration page
├── css/
│   ├── style.css       # Main stylesheet
│   ├── auth.css        # Authentication pages styles
│   ├── animations.css  # Animations and keyframes
│   └── responsive.css  # Responsive breakpoints
├── js/
│   ├── main.js         # Core JavaScript functionality
│   ├── auth.js         # Authentication logic
│   ├── slider.js       # Testimonial slider
│   ├── accordion.js    # FAQ accordion
│   └── counter.js      # Animated counter
├── icons/
│   └── favicon.svg     # Favicon
└── images/             # Image assets directory
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kunal-Dinho/NTESHIP.git
   ```

2. **Open the project**
   ```bash
   cd NTESHIP
   ```

3. **Launch the application and API**
   ```bash
   npm start
   ```
   Then open `http://localhost:3000`. Detail pages use this server to fetch data and submit internship applications.

## 🌐 Live Demo

Visit the live site: [https://Kunal-Dinho.github.io/NTESHIP](https://Kunal-Dinho.github.io/NTESHIP)

## 📸 Screenshots

*(Add screenshots of your project here)*

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Kunal Dinho**
- GitHub: [@Kunal-Dinho](https://github.com/Kunal-Dinho)
- LinkedIn: [Kunal Dinho](https://www.linkedin.com/feed/)
- Twitter: [@KunalDinho](https://x.com/home)

## 🙏 Acknowledgments

- All the students and mentors who make NTESHIP great
- Open source community for inspiration and tools
- Unsplash for course thumbnail images

---

<p align="center">Made with ❤️ by Kunal Dinho</p>
