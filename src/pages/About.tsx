import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PageHero, SectionHeading, GlassCard, StatCard, SectionDivider, ScrollReveal } from "@/components/ui/shared";
import { Shield, Award, Users, Target, Building2, Heart, Lightbulb, CheckCircle2, Pencil, Cog, Clock, Monitor, HeadphonesIcon, Home, Building, Hospital, Hotel, Factory } from "lucide-react";
import { CTABanner, TrustBadges } from "@/components/CTABanner";
import BrochureDownload from "@/components/BrochureDownload";


const values = [
  { icon: <Pencil className="w-6 h-6" />, title: "Design Excellence", desc: "Every elevator is designed to match the architecture and aesthetics of your space." },
  { icon: <Cog className="w-6 h-6" />, title: "Engineering Precision", desc: "Precision-built components ensure smooth, safe, and reliable performance." },
  { icon: <Monitor className="w-6 h-6" />, title: "Digital Reports", desc: "Clear digital reports keep you updated on project progress and system status." },
  { icon: <Target className="w-6 h-6" />, title: "Transparent Pricing", desc: "Clear and honest pricing with no hidden costs, giving you full confidence in your investment." },
  { icon: <Clock className="w-6 h-6" />, title: "Fast & Efficient Delivery", desc: "Streamlined processes ensure quick installation without compromising quality." },
  { icon: <HeadphonesIcon className="w-6 h-6" />, title: "Lifetime Support", desc: "Ongoing service and maintenance to keep your elevator running reliably for years." },
];

const certifications = [
  "ISO 9001:2015 Certified",
  "CE Marked Systems",
  "BIS Approved"
];

const registrations = [
  "MSME Registered",
  "24/7 Emergency Support"
];

const About = () => (
  <>
    <PageHero title="About X Elevators Pvt Ltd" subtitle="We are a next-generation elevator company focused on delivering safe, smart, and stylish vertical transportation solutions across India. Founded with a vision to redefine the elevator industry through quality engineering, digital transparency, and customer-first approach." backgroundImage="/images/hero-about.webp" />

    <TrustBadges />

    <section className="py-20">
      <SectionDivider />
      <div className="container mx-auto px-4 lg:px-8 pt-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <StatCard value="75+" label="Projects Installed" icon={<Building2 className="w-7 h-7" />} />
          <StatCard value="120+" label="Happy Customers" icon={<Users className="w-7 h-7" />} />
          <StatCard value="99%" label="Uptime Rate" icon={<Target className="w-7 h-7" />} />
          <StatCard value="25+" label="Team Members" icon={<Award className="w-7 h-7" />} />
        </div>
      </div>
    </section>

    <section className="py-20 relative overflow-hidden">
      <SectionDivider />

      {/* ReactBits Aurora-style animated background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Gold orb — top left */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 520, height: 520, top: "-10%", left: "-8%",
            background: "radial-gradient(circle, hsl(43 66% 52% / 0.12) 0%, hsl(43 66% 52% / 0.04) 50%, transparent 70%)",
            filter: "blur(60px)"
          }}
          animate={{ x: [0, 40, 0], y: [0, 30, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Blue orb — top right */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 480, height: 480, top: "-5%", right: "-10%",
            background: "radial-gradient(circle, hsl(210 70% 50% / 0.09) 0%, hsl(210 70% 50% / 0.03) 50%, transparent 70%)",
            filter: "blur(70px)"
          }}
          animate={{ x: [0, -35, 0], y: [0, 45, 0], scale: [1, 1.12, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        {/* Purple orb — bottom left */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 400, height: 400, bottom: "5%", left: "15%",
            background: "radial-gradient(circle, hsl(260 60% 50% / 0.07) 0%, hsl(260 60% 50% / 0.02) 50%, transparent 70%)",
            filter: "blur(80px)"
          }}
          animate={{ x: [0, 30, 0], y: [0, -25, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
        {/* Central teal orb */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 350, height: 350, top: "30%", left: "40%",
            background: "radial-gradient(circle, hsl(185 70% 45% / 0.06) 0%, transparent 70%)",
            filter: "blur(90px)"
          }}
          animate={{ x: [0, -20, 20, 0], y: [0, 30, -15, 0], scale: [1, 1.1, 0.95, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        {/* Mesh grid overlay */}
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "radial-gradient(hsl(0 0% 100%) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      </div>

      <div className="container mx-auto px-4 lg:px-8 max-w-3xl pt-8 relative z-10">
        <SectionHeading badge="Our Story" title="The Brand Story" />

        <div className="space-y-6 text-muted-foreground/80 text-base leading-relaxed">
          {/* Para 1 */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <strong className="text-foreground">X Elevators Pvt. Ltd.</strong>, founded by{" "}
            <strong className="text-primary">Mohammed Anas</strong>, a young and visionary Founder &amp; CEO,
            is the result of ambition driven by belief and purpose. From the beginning, Anas envisioned
            creating an organisation that would stand apart, challenge conventions, and redefine industry
            standards. He never allowed limitations to define his vision; instead, his mindset empowered
            him to dream bigger, move faster, and aim higher.
          </motion.p>

          {/* Para 2 */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Strengthening this vision,{" "}
            <strong className="text-primary">Mohammed Asif</strong>, as Chief Operating Officer (COO),
            joined hands to build and scale the foundation of their shared dream. Together, their leadership
            adds balance, operational strength, and strategic direction in shaping their own growing empire.
          </motion.p>

          {/* X meaning callout block */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-2xl p-6 lg:p-8 my-4"
            style={{
              background: "linear-gradient(160deg, hsl(212 50% 15% / 0.55) 0%, hsl(212 48% 10% / 0.4) 100%)",
              backdropFilter: "blur(20px)",
              border: "1px solid hsl(43 66% 52% / 0.12)",
              boxShadow: "inset 0 1px 0 hsl(0 0% 100% / 0.05), 0 8px 32px hsl(213 62% 3% / 0.3)",
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            <p className="text-foreground/80 text-sm lg:text-base mb-4">
              The foundation of X Elevators lies in the powerful meaning of the letter{" "}
              <span className="text-white font-heading font-extrabold text-xl tracking-tight">"X"</span>.
            </p>
            <p className="text-foreground/75 text-sm lg:text-base leading-relaxed">
              <strong className="text-foreground">X</strong> represents{" "}
              <span className="text-primary font-semibold">Excellence</span>,{" "}
              <span className="text-primary font-semibold">Exceeding expectations</span>,{" "}
              <span className="text-primary font-semibold">Exclusivity</span>, and the{" "}
              <span className="text-primary font-semibold">Extraordinary</span>. These values define who we
              are and how we operate — pushing boundaries, delivering superior quality, and creating
              solutions that rise above the ordinary.
            </p>
          </motion.div>

          {/* Closing statement */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-center font-heading font-semibold text-foreground text-base lg:text-lg"
          >
            X Elevators is not just a company name; it is a mindset built to elevate standards and inspire
            progress.
          </motion.p>
        </div>
      </div>
    </section>


    <CTABanner variant="inspection" />

    <section className="py-20 relative">
      <SectionDivider />
      <div className="container mx-auto px-4 lg:px-8 pt-8">
        <SectionHeading badge="Core Values" title="What Defines Us" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {values.map((v, i) => (
            <GlassCard key={i} className="p-6 text-center" premium delay={i * 0.08}>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary mx-auto mb-4 icon-glow">{v.icon}</div>
              <h3 className="text-lg font-heading font-semibold text-foreground mb-2">{v.title}</h3>
              <p className="text-muted-foreground text-sm">{v.desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 section-glow relative overflow-hidden">
      <SectionDivider />
      {/* Ambient section glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_60%,hsl(43_66%_52%/0.04),transparent_70%)] pointer-events-none" />
      <div className="container mx-auto px-4 lg:px-8 pt-8 relative z-10">
        <SectionHeading badge="Leadership" title="Our Team" subtitle="Led by experienced professionals committed to elevating your experience" />
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card rounded-3xl overflow-hidden gold-border relative group"
          >
            <div className="relative aspect-square overflow-hidden rounded-t-3xl">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-10 transition-transform duration-700 group-hover:scale-105" 
                style={{ backgroundImage: 'url("https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/694bacc0fac3a42b4b20469a/ade196248_image.png")' }}
              />
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/694bacc0fac3a42b4b20469a/a779dd4a6_WhatsAppImage2025-12-30at105802AM.jpeg" 
                alt="Mohammed Anas" 
                className="relative z-10 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-20 pointer-events-none" />
            </div>
            <div className="p-8 text-center bg-black/40 backdrop-blur-sm relative z-30">
              <h3 className="text-2xl font-bold text-white mb-2 font-heading tracking-tight drop-shadow-md">Mohammed Anas</h3>
              <p className="text-[#C9A961] font-medium mb-3 tracking-wide uppercase text-sm">Founder &amp; CEO</p>
              <div className="w-10 h-px bg-gradient-to-r from-transparent via-[#C9A961]/50 to-transparent mx-auto mb-4" />
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm mx-auto">Execution-focused leader driving engineering excellence and long-term growth.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card rounded-3xl overflow-hidden gold-border relative group"
          >
            <div className="relative aspect-square overflow-hidden rounded-t-3xl">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-10 transition-transform duration-700 group-hover:scale-105" 
                style={{ backgroundImage: 'url("https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/694bacc0fac3a42b4b20469a/ade196248_image.png")' }}
              />
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/694bacc0fac3a42b4b20469a/21f81a457_Gemini_Generated_Image_kdfiedkdfiedkdfi.png" 
                alt="Mohammed Asif" 
                className="relative z-10 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-20 pointer-events-none" />
            </div>
            <div className="p-8 text-center bg-black/40 backdrop-blur-sm relative z-30">
              <h3 className="text-2xl font-bold text-white mb-2 font-heading tracking-tight drop-shadow-md">Mohammed Asif</h3>
              <p className="text-[#C9A961] font-medium mb-3 tracking-wide uppercase text-sm">COO (Chief Operation Officer)</p>
              <div className="w-10 h-px bg-gradient-to-r from-transparent via-[#C9A961]/50 to-transparent mx-auto mb-4" />
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm mx-auto">Operational specialist ensuring quality delivery, safety compliance, and service reliability.</p>
            </div>
          </motion.div>
        </div>

        {/* Team size badge */}
        <div className="max-w-md mx-auto mt-10">
          <GlassCard className="flex flex-col items-center justify-center text-center p-6 rounded-xl border border-white/10" premium>
            <p className="text-gradient-gold text-3xl font-heading font-bold text-shadow-glow">25+</p>
            <p className="text-white font-medium text-sm mt-1">Peoples</p>
          </GlassCard>
        </div>
      </div>
    </section>

    <section className="py-20 relative">
      <SectionDivider />
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl pt-8">
        <SectionHeading badge="Quality" title="Certifications & Compliance" />
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-foreground font-heading font-semibold mb-4 text-lg">Certifications & Standards</h3>
            <div className="space-y-3">
              {certifications.map((cert, i) => (
                <GlassCard key={cert} className="p-4 flex items-center gap-3" premium delay={i * 0.06}>
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-foreground text-sm font-medium">{cert}</span>
                </GlassCard>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-foreground font-heading font-semibold mb-4 text-lg">Registration Details</h3>
            <div className="space-y-3">
              {registrations.map((reg, i) => (
                <GlassCard key={reg} className="p-4 flex items-center gap-3" premium delay={i * 0.06}>
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-foreground text-sm font-medium">{reg}</span>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    <BrochureDownload />
    <CTABanner variant="quote" />
  </>
);

export default About;
