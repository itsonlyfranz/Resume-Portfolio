# Portfolio Website

A modern, responsive portfolio website built with Next.js 16, React, TypeScript, and Tailwind CSS.

## Features

- ✨ Modern and clean design with tech-focused aesthetic
- 🌓 Dark/Light mode toggle with persistent theme
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Fast and optimized performance
- 🎨 Smooth animations with Framer Motion
- 📝 MDX content management with Contentlayer
- 📧 Contact form with email integration
- 🔍 SEO optimized with metadata and structured data
- 📊 Analytics integration (Vercel Analytics)
- ♿ Accessibility compliant

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn UI
- **Animations**: Framer Motion
- **Content**: Contentlayer (MDX)
- **Forms**: React Hook Form + Zod
- **Email**: Resend
- **Analytics**: Vercel Analytics
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd Resume
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (optional, for contact form):
```bash
cp .env.example .env
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   └── contact/       # Contact form endpoint
│   ├── layout.tsx         # Root layout with theme provider
│   ├── page.tsx           # Home page
│   ├── globals.css        # Global styles
│   ├── robots.ts          # Robots.txt configuration
│   └── sitemap.ts         # Sitemap configuration
├── components/            # React components
│   ├── sections/          # Page sections
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Experience.tsx
│   │   ├── Skills.tsx
│   │   ├── Education.tsx
│   │   ├── Certifications.tsx
│   │   └── Contact.tsx
│   ├── ui/                # UI components (Shadcn)
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Footer
│   ├── theme-provider.tsx # Theme context provider
│   └── theme-toggle.tsx   # Dark/light mode toggle
├── content/               # MDX content files
│   ├── experience/        # Work experience
│   ├── education/         # Education history
│   └── certifications/    # Certifications
├── lib/                   # Utility functions
│   └── utils.ts
├── public/                # Static assets
│   └── resume.pdf         # Downloadable resume
└── contentlayer.config.ts # Contentlayer configuration
```

## Customization

### Personal Information

1. **Update content in components**:
   - Edit `components/sections/Hero.tsx` for your name and tagline
   - Update `components/sections/About.tsx` with your bio
   - Modify `components/sections/Skills.tsx` with your skills
   - Edit `components/Footer.tsx` for social links

2. **Update MDX content**:
   - Add/edit files in `content/experience/` for work history
   - Add/edit files in `content/education/` for education
   - Add/edit files in `content/certifications/` for certifications

3. **Replace resume PDF**:
   - Replace `public/resume.pdf` with your actual resume

4. **Update metadata**:
   - Edit `app/layout.tsx` for SEO metadata
   - Update `components/StructuredData.tsx` for structured data

### Styling

- Colors: Edit `app/globals.css` CSS variables
- Components: Modify files in `components/` directory
- Tailwind: Extend configuration if needed (Tailwind v4 uses CSS)

## Content Management

### Adding Work Experience

Create a new MDX file in `content/experience/`:

```mdx
---
company: "Company Name"
position: "Your Position"
startDate: "2023-01"
endDate: "Present"
description: "Brief description of your role"
technologies: ["React", "Node.js", "AWS"]
order: 1
---

## Key Achievements

- Achievement 1
- Achievement 2

## Responsibilities

- Responsibility 1
- Responsibility 2
```

### Adding Education

Create a new MDX file in `content/education/`:

```mdx
---
degree: "Your Degree"
institution: "University Name"
startDate: "2018"
endDate: "2022"
description: "Brief description"
order: 1
---

## Highlights

- Highlight 1
- Highlight 2
```

### Adding Certifications

Create a new MDX file in `content/certifications/`:

```mdx
---
name: "Certification Name"
issuer: "Issuing Organization"
date: "2023"
credentialId: "CERT-12345"
link: "https://verify-link.com"
order: 1
---

Brief description of the certification.
```

## Environment Variables

Create a `.env` file with the following variables:

```env
# Email Configuration (optional - for contact form)
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=your.email@example.com

# Site URL
NEXT_PUBLIC_SITE_URL=https://yourportfolio.com
```

### Setting up Email (Optional)

1. Sign up for [Resend](https://resend.com)
2. Get your API key
3. Add API key to `.env` file
4. Add your contact email to `.env` file

If you don't set up email, form submissions will be logged to the console in development.

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [Vercel](https://vercel.com)
3. Import your repository
4. Configure environment variables
5. Deploy!

### Build Locally

```bash
npm run build
npm start
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Performance

- Lighthouse score: 95+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Fully responsive and mobile-optimized

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## License

MIT License - feel free to use this for your own portfolio!

## Support

For issues or questions, please open an issue on GitHub.

---

Built with ❤️ using Next.js and React
