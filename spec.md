# TechDen Store

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Full used GPU storefront with 7 pages
- 39 pre-loaded GPU listings with realistic specs
- Admin dashboard with password protection ("techden2026")
- GPU comparison tool (up to 3 GPUs side by side)
- Contact actions: Buy on WhatsApp, Copy UPI ID, Send Email Inquiry
- Search and filter (brand, price range) on Home and Browse pages
- Featured GPU toggle from admin dashboard

### Modify
- N/A (new project)

### Remove
- N/A

## Implementation Plan

### Backend (Motoko)
- GPU data type: id, name, brand, series, vram, price (INR), condition, performanceRating, description, releaseYear, tdp, isFeatured, imageUrl
- CRUD operations: addGPU, updateGPU, removeGPU, getGPUs, getGPU, getFeaturedGPUs, toggleFeatured
- Admin auth: verifyAdminPassword (hashed check against "techden2026")
- Seed 39 GPUs on first deploy

### Frontend Pages
1. **Home** - Hero section, featured GPU cards, search bar, brand/price filters
2. **Browse GPUs** - Full catalog grid with search + filters (brand, price range)
3. **GPU Details** - Full product page with specs table, contact action buttons
4. **About TechDen Store** - Store info page
5. **Contact Seller** - WhatsApp / UPI / Email contact section
6. **Admin Dashboard** - Password gate, then full CRUD + featured toggle
7. **GPU Comparison Tool** - Select up to 3 GPUs, side-by-side spec table

### Contact Actions
- Buy on WhatsApp: `https://wa.me/918638316552?text=I'm interested in [GPU name]`
- Copy UPI ID: copies `piush.6552@waaxis` with toast confirmation
- Send Email Inquiry: `mailto:vanquetty.exe@gmail.com?subject=Inquiry: [GPU name]`

### Design
- Dark theme, green/cyan accent colors, gaming/tech aesthetic
- Card-based GPU listings with specs badge chips
