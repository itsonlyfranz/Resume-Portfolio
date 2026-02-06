# Customization Guide

This guide will help you customize the portfolio with your personal information from your resume.

## Quick Start Checklist

- [ ] Update personal information in Hero section
- [ ] Replace placeholder bio in About section
- [ ] Update skills and technologies
- [ ] Add your work experience via MDX files
- [ ] Add your education via MDX files
- [ ] Add your certifications via MDX files
- [ ] Update social media links
- [ ] Replace resume PDF
- [ ] Update SEO metadata
- [ ] Customize colors (optional)

## 1. Personal Information

### Hero Section (`components/sections/Hero.tsx`)

Replace the placeholder text with your information:

```tsx
// Line 27-29: Update your name
<span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
  Your Actual Name  // Change this
</span>

// Line 31-33: Update your title
<p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
  Your Actual Title | Your Specialty | Your Focus  // Change this
</p>

// Line 40-43: Update your bio
<p className="text-lg text-muted-foreground max-w-2xl">
  Your actual professional summary here.  // Change this
</p>
```

### Footer (`components/Footer.tsx`)

Update social media links (Line 9-12):

```tsx
const socialLinks = [
  { name: "GitHub", href: "https://github.com/your-username", icon: Github },
  { name: "LinkedIn", href: "https://linkedin.com/in/your-username", icon: Linkedin },
  { name: "Twitter", href: "https://twitter.com/your-username", icon: Twitter },
  { name: "Email", href: "mailto:your-email@example.com", icon: Mail },
]
```

## 2. About Section

### Update Bio (`components/sections/About.tsx`)

Replace the placeholder text (Lines 21-34):

```tsx
// "Who I Am" section
<p className="text-muted-foreground leading-relaxed mb-4">
  Write your professional summary here - who you are, what you do,
  your background, and what makes you unique.
</p>
<p className="text-muted-foreground leading-relaxed">
  Continue with more details about your journey, interests, and values.
</p>

// "What I Do" section
<ul className="space-y-3 text-muted-foreground">
  <li className="flex items-start">
    <span className="text-primary mr-2">▹</span>
    <span>Your key responsibility or specialty #1</span>
  </li>
  // Add more items for your key activities
</ul>
```

### Update Tech Stack (Lines 10-13)

Replace with your actual technologies:

```tsx
const techStack = [
  { category: "Frontend", icon: Globe, items: ["Your", "Frontend", "Technologies"] },
  { category: "Backend", icon: Server, items: ["Your", "Backend", "Technologies"] },
  { category: "Database", icon: Database, items: ["Your", "Database", "Technologies"] },
  { category: "Tools", icon: Code2, items: ["Your", "Tools", "Technologies"] },
]
```

## 3. Skills Section

### Update Skills (`components/sections/Skills.tsx`)

Replace the skills array (Lines 7-28) with your actual skills:

```tsx
const skillCategories = [
  {
    title: "Languages",
    skills: [
      "Language1", "Language2", "Language3", "etc."
    ]
  },
  {
    title: "Frameworks & Libraries",
    skills: [
      "Framework1", "Framework2", "Framework3", "etc."
    ]
  },
  {
    title: "Tools & Technologies",
    skills: [
      "Tool1", "Tool2", "Tool3", "etc."
    ]
  },
  {
    title: "Soft Skills",
    skills: [
      "Skill1", "Skill2", "Skill3", "etc."
    ]
  }
]
```

## 4. Work Experience

### Add Your Experience

Create MDX files in `content/experience/` for each job. File naming: `company-name.mdx`

**Example**: `content/experience/tech-company.mdx`

```mdx
---
company: "Your Company Name"
position: "Your Position Title"
startDate: "2022-01"
endDate: "Present"  # or "2023-12" for past jobs
description: "Brief one-line description of your role"
technologies: ["Tech1", "Tech2", "Tech3"]
order: 1  # Lower numbers appear first
---

## Key Achievements

- Your major achievement #1 with specific metrics if possible
- Your major achievement #2 with specific metrics if possible
- Your major achievement #3 with specific metrics if possible

## Responsibilities

- Your key responsibility #1
- Your key responsibility #2
- Your key responsibility #3
```

**Tips**:
- Use metrics where possible (e.g., "Reduced load time by 40%")
- Focus on impact, not just tasks
- Keep descriptions concise and scannable
- Order field determines display order (1 = first, 2 = second, etc.)

### Remove Placeholder Experience

Delete or edit the example file:
- `content/experience/example-company.mdx`

## 5. Education

### Add Your Education

Create MDX files in `content/education/` for each degree. File naming: `institution-name.mdx`

**Example**: `content/education/university.mdx`

```mdx
---
degree: "Your Degree Title"
institution: "Your University/Institution Name"
startDate: "2014"
endDate: "2018"  # or "Present" if ongoing
description: "Brief description of your studies, major, honors, etc."
order: 1
---

## Highlights

- GPA: X.X/4.0 (if impressive)
- Academic honors or awards
- Relevant projects or research
- Teaching assistant positions
- Relevant coursework

## Relevant Coursework

- Course 1
- Course 2
- Course 3
```

## 6. Certifications

### Add Your Certifications

Create MDX files in `content/certifications/` for each cert. File naming: `cert-name.mdx`

**Example**: `content/certifications/aws.mdx`

```mdx
---
name: "Full Certification Name"
issuer: "Issuing Organization"
date: "2023"  # Year obtained
credentialId: "CERT-123456"  # Your credential ID
link: "https://verify-link.com"  # Verification link
order: 1
---

Brief description of what the certification covers (optional).
```

### Update Badge Emojis (`components/sections/Certifications.tsx`)

You can customize the badge emojis for each certification (Line 17):

```tsx
badge: "🏆"  # Change to any emoji that represents your cert
```

## 7. Contact Information

### Update Contact Details (`components/sections/Contact.tsx`)

Update your contact information (Lines 67-70):

```tsx
const contactInfo = [
  { icon: Mail, label: "Email", value: "your-email@example.com", href: "mailto:your-email@example.com" },
  { icon: Phone, label: "Phone", value: "+1 (XXX) XXX-XXXX", href: "tel:+1XXXXXXXXXX" },
  { icon: MapPin, label: "Location", value: "Your City, State/Country", href: null },
]
```

## 8. Resume PDF

### Replace the Resume PDF

1. Export your resume as a PDF
2. Name it `resume.pdf`
3. Replace the file at `public/resume.pdf`

**Tips**:
- Keep file size under 2MB
- Ensure it's a searchable PDF (not just an image)
- Match the styling with your portfolio for consistency

## 9. SEO & Metadata

### Update Site Metadata (`app/layout.tsx`)

Update the metadata object (Lines 15-44):

```tsx
export const metadata: Metadata = {
  title: {
    default: "Your Name | Your Title",
    template: "%s | Your Name",
  },
  description: "Your professional summary in one sentence.",
  keywords: ["your", "key", "skills", "and", "technologies"],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  openGraph: {
    // ... update title and description
  },
  twitter: {
    // ... update title, description, and @handle
  },
}
```

### Update Structured Data (`components/StructuredData.tsx`)

Update the JSON-LD data (Lines 4-22):

```tsx
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Your Full Name",
  url: "https://your-domain.com",
  sameAs: [
    "https://github.com/your-username",
    "https://linkedin.com/in/your-username",
    "https://twitter.com/your-username",
  ],
  jobTitle: "Your Job Title",
  worksFor: {
    "@type": "Organization",
    name: "Your Current Company",
  },
  description: "Your professional summary",
  knowsAbout: [
    "Skill1", "Skill2", "Skill3", "etc."
  ],
}
```

## 10. Color Customization (Optional)

### Update Theme Colors (`app/globals.css`)

If you want to change the accent color from electric blue:

```css
:root {
  --primary: 191 100% 50%;  /* Electric blue - change HSL values */
  --accent: 191 100% 50%;   /* Change to match primary or different */
}
```

**Popular color options**:
- Electric Blue (current): `191 100% 50%`
- Neon Green: `120 100% 50%`
- Purple: `270 100% 50%`
- Orange: `30 100% 50%`
- Cyan: `180 100% 50%`

## 11. Environment Variables

Create a `.env` file (copy from `.env.example`):

```env
# For contact form (optional)
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=your-email@example.com

# Site URL (for SEO)
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## 12. Testing Your Changes

After making changes:

1. **Run development server**:
   ```bash
   npm run dev
   ```

2. **Open** http://localhost:3000

3. **Test**:
   - All sections display correctly
   - Navigation links work
   - Dark/light mode toggle
   - Responsive design (try different screen sizes)
   - Contact form (if email configured)
   - Resume download

4. **Build for production**:
   ```bash
   npm run build
   ```

## Common Issues

### My MDX content isn't showing
- Check the frontmatter format is correct
- Ensure `order` field is set
- Run `npm run dev` to regenerate content

### Styles look broken
- Clear `.next` directory: `rm -rf .next`
- Reinstall dependencies: `npm install`
- Restart dev server

### Build fails
- Check for TypeScript errors: `npm run lint`
- Verify all required fields in MDX frontmatter
- Check console for specific error messages

## Next Steps

1. Update all placeholder content with your information
2. Test thoroughly in development
3. Build and verify production build works
4. Deploy to Vercel (see DEPLOYMENT.md)
5. Share your portfolio!

## Need Help?

- Check README.md for general information
- Check DEPLOYMENT.md for deployment help
- Review Next.js documentation: https://nextjs.org/docs
- Check component files for inline comments

---

Happy customizing! 🚀
