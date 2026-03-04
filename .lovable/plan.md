

# Plan: Update Website to Match Reference Screenshots Exactly

## What Changes Are Needed

Based on the uploaded reference images, the current site needs significant updates to match the client's exact design and content. Here's what differs:

---

### 1. Add Company Logo
- Copy the uploaded logo image to `src/assets/logo.png`
- Replace the circular "X" logo placeholder in both **Navbar** and **Footer** with the actual logo image
- The navbar shows the logo icon + "X ELEVATORS PVT. LTD." text in bold

### 2. Navbar Updates
- Use the actual logo image instead of the gold circle
- Company name text: "X ELEVATORS PVT. LTD." (all caps, bold)
- Phone number displayed: `+91 9844002026`
- CTA button: "Get Quote" (red/primary background)
- Active link styling: gold/primary underline on current page

### 3. Home Page (Index.tsx) — Major Content Updates
Based on the reference screenshot:

- **Hero**: Title "Exceeding Safety" (not "Exceeding Trust"), with a background image/gradient effect
- **"Our Impact" section**: Update stats to match — `75+` Projects Installed, `120+` Happy Customers, `99%` Automation
- **"Complete Elevator Solutions"**: Keep similar but update card content to match reference (Residential, Commercial, Maintenance/AMC, Modernization with "Explore" buttons)
- **"Finishes & Pricing"**: Update to 3 tiers — Basic ₹5-6 Lakhs, Standard ₹5-8 Lakhs, Premium ₹10-20 Lakhs with updated feature lists
- **"Intelligent Elevator Systems"**: Keep similar structure
- **AMC Plans**: Update pricing to Silver ₹20,000/year, Gold ₹35,000/year (Best Popular), Platinum ₹70,000/year with updated features (Bimonthly maintenance, 24/7 emergency support, etc.)
- **FAQ section**: Keep but ensure styling matches (gold icon badges on each question)
- **"Let's Connect" contact section**: Update contact details — phone `+91 9844002026`, email `info@xelevators.in`, address update

### 4. About Page — Major Content Rewrite
From the reference:
- Hero: "About X Elevators Pvt Ltd" with descriptive paragraphs about the company
- Stats: `75+` Projects Installed, `120+` Happy Customers, `99%` Automation
- **"The Brand Story"**: New section with founding story mentioning **Mohammed Anas** (Founder & CEO) and **Mohammed Asif** (COO/Chief Operating Officer), the meaning of "X" — Excellence, Exceeding expectations, Exclusivity, Extraordinary
- **"What Defines Us"**: 5 value cards — Design Excellence, Engineering Precision, Disciplined Delivery, Digital Transparency, Lifetime Support Commitment
- **"Our Team"**: 2 team members — Mohammed Anas (Founder & CEO) and Mohammed Asif (COO), with photos replaced by initials/placeholders, and `25+ People` stat
- **Industries We Serve**: Residential Complexes, Commercial Complexes, Hospitals & Healthcare, Hotels & Malls, Industrial Facilities (5 items with icons)
- **"Certifications & Compliance"**: Split into Certifications & Standards (ISO 9001:2015, CE Marked, BIS Approved, IoT Certified) and Registration Details (Udyam Registration, MSME, Startup India Certified, GST Registered, Suppliers: Versatile)
- **CTA buttons**: "Request Free Site Inspection" and "Chat with Engineer on Whatsapp"

### 5. Services Page — Content Updates
From the reference:
- Hero: "Our Services"
- **"Our Service Philosophy"** section: New philosophical statement about predicting issues and communicating clearly
- **"Why Choose X Elevators?"**: 3 cards — ISO Certified, <60 Min Response, Certified Technicians
- **AMC Plans**: Silver ₹20,000/year, Gold ₹35,000/year (Best Popular), Platinum ₹70,000/year
- **"Additional Services"**: Maintenance & AMC card, Modernization card — each with sub-features listed in 2-column grid

### 6. Products Page — Major Overhaul
From the reference:
- Hero: "Our Products" with breadcrumb-like tabs (MRL Based Elevators, Full Structure Elevator)
- **"Elevator Solutions"**: 4 categories — Residential Elevators, Commercial Elevators, Hospital Elevators, Capsule Elevators — each with image placeholder, features in 2-column grid, and "Learn More" button
- **"Finishes & Pricing"**: Basic ₹5-6 Lakhs, Standard ₹5-8 Lakhs, Premium ₹10-20 Lakhs
- **"Curated Packages"**: 3 package cards — Budget Choice, Luxury Premium Selection, Hospital Standard Choice with detailed specs
- **"Design Customization"** gallery sections: Door Design, Cabin Design, False Ceiling Design, COP/LOP Design, Display Types, Hand Rails Types, Flooring Types — each with image grid placeholders

### 7. Careers Page — Content Updates
From the reference:
- Hero: "Join Our Team"
- **Culture section**: 3 cards — Growth, Team Culture, Learning
- **"Current Openings"**: 3 job cards — Installation Engineer (Operations, Bangalore & Chennai, Full-time), Service Technician (Maintenance, Chennai, Full-time), Sales Executive (Sales, Bangalore & Chennai, Full-time)
- **"Apply Now" form**: Updated with fields — Full Name, Email, Phone, Position (dropdown), Years of Experience, "Tell us about yourself..." textarea, Upload Resume (PDF/DOC) with file upload button, Submit Application button

### 8. Footer Updates
- Use actual logo image
- Company name: "X ELEVATORS PVT. LTD."
- Tagline: "Elevating Trust. Engineering the Future. Next-generation elevator solutions with uncompromising commitment to quality."
- Badges: "ISO Certified", "Licensed", "99% Automation"
- **Quick Links**: Home, About Us, Services, Product, Career, Contact
- **Our Services**: Passenger Elevators, Home Elevators, Commercial Elevators, Maintenance & AMC, Modernization
- **Contact Us**: +91 9844002026 (Main), +91 6384961909, info@xelevators.in, xelevators.in

### 9. Global Contact Details Update
Replace all placeholder contact info across all pages:
- Main phone: `+91 9844002026`
- Secondary phone: `+91 6384961909`
- Email: `info@xelevators.in`
- Website: `xelevators.in`

---

## Files to Create/Modify

| File | Action |
|------|--------|
| `src/assets/logo.png` | Copy uploaded logo |
| `src/components/Navbar.tsx` | Logo, phone number, styling |
| `src/components/Footer.tsx` | Logo, contact details, badges, links |
| `src/pages/Index.tsx` | Full content rewrite to match reference |
| `src/pages/About.tsx` | Full content rewrite — brand story, team, certifications |
| `src/pages/Services.tsx` | Content update — philosophy, AMC pricing, additional services |
| `src/pages/Products.tsx` | Major overhaul — elevator categories, packages, design customization gallery |
| `src/pages/Careers.tsx` | Update openings, add culture section, resume upload |
| `src/pages/Contact.tsx` | Update contact details |

## Technical Approach
- All changes are content and layout updates within existing component architecture
- No new dependencies needed
- Reuse existing `GlassCard`, `SectionHeading`, `PageHero`, `StatCard` components
- Add the actual logo as an imported asset

