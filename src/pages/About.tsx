import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PageHero, SectionHeading, GlassCard, StatCard, SectionDivider, ScrollReveal } from "@/components/ui/shared";
import { Shield, Award, Users, Target, Building2, Heart, Lightbulb, CheckCircle2, Pencil, Cog, Clock, Monitor, HeadphonesIcon, Home, Building, Hospital, Hotel, Factory } from "lucide-react";
import { CTABanner, TrustBadges } from "@/components/CTABanner";
import BrochureDownload from "@/components/BrochureDownload";

const founders = [
  {
    name: "Mohammed Anas",
    role: "Founder & CEO",
    desc: "Visionary leader with deep expertise in elevator engineering and business strategy, setting the course for X Elevators' rapid growth across India.",
    image: "/images/Mohammed Anas.jpeg",
    delay: 0,
  },
  {
    name: "Mohammed Asif",
    role: "Chief Operating Officer",
    desc: "Operations expert ensuring seamless project delivery, quality control, and an exceptional customer experience at every touchpoint.",
    image: "/images/Mohammed Asif.png",
    delay: 0.15,
  },
];


const values = [
  { icon: <Pencil className="w-6 h-6" />, title: "Design Excellence", desc: "Every elevator is thoughtfully designed to complement the architecture and aesthetics of your space." },
  { icon: <Cog className="w-6 h-6" />, title: "Engineering Precision", desc: "Precision-engineered components ensure smooth, safe, and reliable operation for years to come." },
  { icon: <Clock className="w-6 h-6" />, title: "Disciplined Delivery", desc: "We commit to timelines and deliver projects on schedule without compromising quality." },
  { icon: <Monitor className="w-6 h-6" />, title: "Digital Transparency", desc: "Real-time project tracking and IoT-enabled monitoring keep you informed at every step." },
  { icon: <HeadphonesIcon className="w-6 h-6" />, title: "Lifetime Support", desc: "Our relationship doesn't end at installation — we provide dedicated support throughout the elevator's lifecycle." },
];

const industries = [
  { icon: <Home className="w-6 h-6" />, label: "Residential Complexes" },
  { icon: <Building className="w-6 h-6" />, label: "Commercial Complexes" },
  { icon: <Hospital className="w-6 h-6" />, label: "Hospitals & Healthcare" },
  { icon: <Hotel className="w-6 h-6" />, label: "Hotels & Malls" },
  { icon: <Factory className="w-6 h-6" />, label: "Industrial Facilities" },
];

const certifications = [
  "ISO 9001:2015 Quality Management",
  "CE Marked Elevator Systems",
  "BIS Approved Components",
  "IoT Certified Systems",
];

const registrations = [
  "Udyam Registration",
  "MSME Registered",
  "Startup India Certified",
  "GST Registered",
  "Suppliers: Versatile",
];

const About = () => (
  <>
    <PageHero badge="About Us" title="About X Elevators Pvt Ltd" subtitle="We are a next-generation elevator company focused on delivering safe, smart, and stylish vertical transportation solutions across India. Founded with a vision to redefine the elevator industry through quality engineering, digital transparency, and customer-first approach." backgroundImage="/images/hero-about.webp" />

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
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {founders.map((founder) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: founder.delay, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -10, transition: { duration: 0.3, ease: "easeOut" } }}
              className="group relative rounded-3xl overflow-hidden cursor-pointer"
              style={{
                background: "linear-gradient(160deg, hsl(212 50% 15% / 0.65) 0%, hsl(212 48% 10% / 0.45) 55%, hsl(212 55% 8% / 0.5) 100%)",
                backdropFilter: "blur(32px) saturate(1.3)",
                WebkitBackdropFilter: "blur(32px) saturate(1.3)",
                border: "1px solid hsl(43 66% 52% / 0.12)",
                boxShadow: "inset 0 1px 0 hsl(0 0% 100% / 0.06), inset 0 -1px 0 hsl(213 62% 3% / 0.3), 0 20px 80px hsl(213 62% 3% / 0.5), 0 4px 16px hsl(213 62% 3% / 0.3)",
              }}
            >
              {/* Animated gradient border glow on hover */}
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow: "0 0 0 1px hsl(43 66% 52% / 0.25), 0 0 60px hsl(43 66% 52% / 0.1), 0 0 120px hsl(43 66% 52% / 0.05)" }}
              />
              {/* Top shimmer line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Light-sweep reflection */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0, x: "-100%" }}
                whileHover={{ opacity: 1, x: "150%", transition: { duration: 0.65, ease: "easeInOut" } }}
                style={{ background: "linear-gradient(105deg, transparent 40%, hsl(0 0% 100% / 0.04) 50%, transparent 60%)", width: "60%" }}
              />
              {/* Inner gradient intensifies on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative z-10 p-8 flex flex-col items-center text-center">
                {/* Avatar with gold ring + halo */}
                <div className="relative mb-7">
                  {/* Pulsing halo orb */}
                  <motion.div
                    className="absolute -inset-4 rounded-full bg-primary/15 blur-2xl"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.55, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: founder.delay }}
                  />
                  {/* Gold gradient ring */}
                  <div
                    className="relative p-[3px] rounded-full group-hover:p-[2px] transition-all duration-300"
                    style={{
                      background: "linear-gradient(135deg, hsl(43 66% 52%) 0%, hsl(43 80% 72%) 40%, hsl(43 55% 40%) 70%, hsl(43 66% 52%) 100%)",
                      boxShadow: "0 0 24px hsl(43 66% 52% / 0.25), 0 0 48px hsl(43 66% 52% / 0.1)",
                    }}
                  >
                    {/* Inner avatar container */}
                    <div className="relative rounded-full overflow-hidden w-28 h-28 bg-secondary">
                      <motion.img
                        src={founder.image}
                        alt={founder.name}
                        className="w-full h-full object-cover object-top"
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        loading="lazy"
                      />
                      {/* Hover brightness overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                    </div>
                  </div>
                </div>

                {/* Name */}
                <h3 className="text-xl font-heading font-bold text-foreground mb-1 tracking-tight">
                  {founder.name}
                </h3>
                {/* Role */}
                <p className="text-primary text-sm font-semibold tracking-wide mb-4">
                  {founder.role}
                </p>
                {/* Separator */}
                <div className="w-10 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mb-4 group-hover:w-16 transition-all duration-500" />
                {/* Description */}
                <p className="text-muted-foreground/75 text-sm leading-relaxed">
                  {founder.desc}
                </p>
              </div>
            </motion.div>
          ))}
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
      <div className="container mx-auto px-4 lg:px-8 pt-8">
        <SectionHeading badge="Industries" title="Industries We Serve" />
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
          {industries.map((ind, i) => (
            <GlassCard key={ind.label} className="p-5 text-center" premium delay={i * 0.08}>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary mx-auto mb-3 icon-glow">{ind.icon}</div>
              <span className="text-foreground text-sm font-medium">{ind.label}</span>
            </GlassCard>
          ))}
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
