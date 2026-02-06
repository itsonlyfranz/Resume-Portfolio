# Deployment Guide

## Deploy to Vercel (Recommended)

### Prerequisites
- A GitHub account
- A Vercel account (sign up at https://vercel.com)

### Steps

1. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Portfolio website"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Import to Vercel**:
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Vercel will automatically detect Next.js

3. **Configure Environment Variables** (Optional):
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add the following variables:
     ```
     RESEND_API_KEY=your_resend_api_key
     CONTACT_EMAIL=your_email@example.com
     NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
     ```

4. **Deploy**:
   - Click "Deploy"
   - Wait for the build to complete
   - Your site will be live at `https://your-project.vercel.app`

5. **Custom Domain** (Optional):
   - Go to Settings → Domains
   - Add your custom domain
   - Configure DNS as instructed

### Automatic Deployments

Once connected to GitHub, Vercel will automatically:
- Deploy on every push to `main` branch
- Create preview deployments for pull requests
- Run build checks before deployment

## Alternative Deployment Options

### Deploy to Netlify

1. **Build Command**: `npm run build`
2. **Publish Directory**: `.next`
3. **Environment Variables**: Same as Vercel

### Deploy to Your Own Server

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Start the production server**:
   ```bash
   npm start
   ```

3. **Using PM2** (recommended for production):
   ```bash
   npm install -g pm2
   pm2 start npm --name "portfolio" -- start
   pm2 save
   pm2 startup
   ```

4. **Using Docker**:
   ```dockerfile
   FROM node:20-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   COPY . .
   RUN npm run build
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

   ```bash
   docker build -t portfolio .
   docker run -p 3000:3000 portfolio
   ```

## Post-Deployment Checklist

- [ ] Test all sections and navigation
- [ ] Verify dark/light mode toggle works
- [ ] Test contact form submission
- [ ] Check resume PDF download
- [ ] Verify responsive design on mobile devices
- [ ] Test site speed with Lighthouse
- [ ] Check SEO with Google Search Console
- [ ] Verify analytics are tracking correctly
- [ ] Update social media links
- [ ] Add custom domain (if applicable)

## Troubleshooting

### Build Fails
- Check that all dependencies are installed
- Verify environment variables are set correctly
- Check build logs for specific errors

### Contact Form Not Working
- Ensure `RESEND_API_KEY` is set
- Verify `CONTACT_EMAIL` is configured
- Check Resend dashboard for API limits

### CSS/Styling Issues
- Clear browser cache
- Check Tailwind configuration
- Verify all CSS files are imported

## Monitoring

### Vercel Analytics
- Automatically enabled for Vercel deployments
- View analytics in Vercel dashboard

### Google Analytics (Optional)
- Add tracking ID to `app/layout.tsx`
- Use `@next/third-parties/google` for Google Analytics

### Error Monitoring (Optional)
- Consider using Sentry for error tracking
- Install with: `npm install @sentry/nextjs`

## Performance Optimization

- Enable image optimization (default in Next.js)
- Use Vercel Edge Network for global CDN
- Monitor Core Web Vitals in Vercel dashboard
- Optimize images before uploading to `/public`

## Security

- Keep dependencies updated: `npm audit`
- Use environment variables for sensitive data
- Enable HTTPS (automatic with Vercel)
- Add security headers in `next.config.ts`

## Maintenance

### Updating Content
- Edit MDX files in `/content` directory
- Push changes to GitHub
- Vercel will automatically redeploy

### Updating Dependencies
```bash
npm update
npm audit fix
git commit -am "Update dependencies"
git push
```

### Monitoring Uptime
- Use services like UptimeRobot or Pingdom
- Set up alerts for downtime

## Support

For issues or questions:
- Check Next.js documentation: https://nextjs.org/docs
- Vercel documentation: https://vercel.com/docs
- GitHub issues: Create an issue in your repository
