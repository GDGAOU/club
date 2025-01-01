This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Google Developer Student Club Platform

A comprehensive platform for managing GDSC activities with role-based access control.

### Role Hierarchy
- **Admin**: Full control over platform
- **Co-Admin**: Manages content and members
- **Club Members**: Create and moderate content
- **Normal Users**: Access and submit content

### Current Features
1. **Blogs System**
   - Blog submission
   - Blog viewing
   - Approval workflow needed

2. **Discounts**
   - Student discount listings
   - Discount submission
   - Approval workflow needed

3. **Papers/Resources**
   - Paper repository
   - Resource sharing
   - Approval workflow needed

4. **Groups**
   - Group creation
   - Group management
   - Role-based access needed

### Planned Features & Approval Workflow

1. **Content Submission System**
   - Normal Users → Club Members approval
   - Club Members → Co-Admin approval
   - Co-Admin → Admin approval

2. **Dashboard Features by Role**
   
   **Normal Users Can:**
   - Submit blogs, discounts, papers
   - View approved content
   - Join groups
   - Track submission status

   **Club Members Additional:**
   - Approve normal user submissions
   - Create study materials
   - Manage groups
   - Submit featured content

   **Co-Admin Additional:**
   - Approve club member submissions
   - Manage member applications
   - Content moderation
   - Event management

   **Admin Additional:**
   - Full platform management
   - Role management
   - Feature visibility control
   - System configuration

3. **Upcoming Features**
   - [ ] Approval Dashboard
   - [ ] Notification System
   - [ ] Activity Logging
   - [ ] User Analytics
   - [ ] Event Management
   - [ ] Resource Library
   - [ ] Discussion Forums

### Development Roadmap

**Phase 1: Approval System** (Current Focus)
- Implement approval workflows
- Add submission tracking
- Create moderation dashboard

**Phase 2: Enhanced Features**
- Event management system
- Resource library
- Discussion forums

**Phase 3: Analytics & Optimization**
- User analytics
- Performance monitoring
- Feature optimization

### Tech Stack
